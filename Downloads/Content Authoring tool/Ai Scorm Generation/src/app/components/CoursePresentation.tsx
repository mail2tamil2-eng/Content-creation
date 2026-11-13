import { useEffect, useId, useState, type CSSProperties } from 'react';
import type { CourseTopic } from '../courseContent';
import CourseSlideContent from './CourseSlideContent';
import './CoursePresentation.css';
import { getTemplate } from './templates/courseTemplates';
import { TemplateMotifLayer } from './templates/TemplateSlide';
import { EditableText, SlideEditContext, type SlideEditApi } from './slideEdit';
import { contrast, readableAccent } from './slideColors';
import { SlideTemplateContext } from './slidePhotos';

export interface PresentationSettings {
  template: string; primary: string; accent: string;
  background: string; font: string; buttonStyle: string; layout: string; logo?: string; foreground?: string;
  /** Heading font from the course template (falls back to `font`). */
  headingFont?: string;
  showHeader?: boolean;
  headerShowLogo?: boolean;
  headerShowCourseName?: boolean;
  showFooter?: boolean;
  footerShowCourseName?: boolean;
  footerShowPageNum?: boolean;
  footerCopyright?: string;
  footerWatermark?: string;
}
export interface CoursePresentationEditProps {
  /** Turns on click-to-edit (Step 2 editor only; never in preview/player). */
  editable?: boolean;
  /** Field key highlighted on the slide (see slideEdit.tsx). */
  selectedField?: string | null;
  /** Click/Enter on a field: `focus` false when the panel field should only be highlighted. */
  onSelectField?: (key: string | null, focus?: boolean) => void;
  /** Inline edit saved on the slide. */
  onInlineChange?: (updates: Partial<CourseTopic>) => void;
}

/** Immutably sets `value` at `path` (array indexes or object keys) inside `root`. */
function setPath(root: unknown, path: string[], value: string): unknown {
  if (!path.length) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root) || /^\d+$/.test(head)) {
    const arr = Array.isArray(root) ? [...root] : [];
    const i = Number(head);
    // A new list item created from the slide gets an id like the panel's items
    const item = arr[i] === undefined && rest.length && !/^\d+$/.test(rest[0]) ? { id: Math.random().toString(36).slice(2, 10) } : arr[i];
    arr[i] = setPath(item, rest, value);
    return arr;
  }
  const obj = { ...((root as Record<string, unknown>) ?? {}) };
  obj[head] = setPath(obj[head], rest, value);
  return obj;
}

/** Applies an inline edit for `key` to the topic; returns the update and the next field to edit. */
function applyEdit(topic: CourseTopic, key: string, value: string, opts?: { next?: boolean; source?: unknown }): { updates: Partial<CourseTopic> | null; nextKey: string | null } {
  const t = topic as Record<string, unknown>;
  if (key.startsWith('bullet:')) {
    const i = Number(key.slice(7));
    const list = [...((t.bullets as string[] | undefined) ?? [])];
    if (opts?.next) { list[i] = value; list.splice(i + 1, 0, ''); return { updates: { bullets: list } as Partial<CourseTopic>, nextKey: `bullet:${i + 1}` }; }
    if (!value && list.length > 1) list.splice(i, 1); else list[i] = value;
    return { updates: { bullets: list } as Partial<CourseTopic>, nextKey: null };
  }
  const [root, ...path] = key.split('.');
  if (!path.length) {
    const prev = (t[root] as string | undefined) ?? '';
    return { updates: prev === value ? null : ({ [root]: value } as Partial<CourseTopic>), nextKey: null };
  }
  const base = opts?.source ?? t[root];
  return { updates: { [root]: setPath(base, path, value) } as Partial<CourseTopic>, nextKey: null };
}

export default function CoursePresentation({ topic, courseTitle, sectionTitle, index, total, settings, editable = false, selectedField = null, onSelectField, onInlineChange }: {
  topic: CourseTopic; courseTitle: string; sectionTitle?: string; index: number; total: number; settings: PresentationSettings;
} & CoursePresentationEditProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const hintId = useId();
  useEffect(() => { setEditing(null); }, [topic.id]);

  const api: SlideEditApi = {
    editable, selected: selectedField, editing, hintId,
    select: key => onSelectField?.(key, true),
    startEdit: key => { setEditing(key); onSelectField?.(key, false); },
    cancel: () => setEditing(null),
    commit: (key, value, opts) => {
      const { updates, nextKey } = applyEdit(topic, key, value, opts);
      if (updates) onInlineChange?.(updates);
      setEditing(nextKey);
      if (nextKey) onSelectField?.(nextKey, false);
    },
  };

  const background = settings.background;
  const dark = /^#[0-9a-f]{6}$/i.test(background) && (
    parseInt(background.slice(1, 3), 16) * .299 +
    parseInt(background.slice(3, 5), 16) * .587 +
    parseInt(background.slice(5, 7), 16) * .114 < 145
  );
  const foreground = settings.foreground || (dark ? '#ffffff' : '#172033');
  const style = {
    '--slide-bg': background, '--slide-text': foreground,
    '--slide-accent': settings.accent,
    '--slide-primary': settings.primary,
    '--slide-panel': dark ? '#ffffff12' : '#ffffffb3',
    '--slide-radius': settings.buttonStyle === 'pill' ? '24px' : settings.buttonStyle === 'square' ? '0px' : '10px',
    '--slide-heading-font': `"${settings.headingFont || settings.font}", Arial, sans-serif`,
    '--t-primary': settings.primary, '--t-accent': settings.accent, '--t-text': foreground,
    // Brand colour for text-sized marks (list numbers, ticks, arrows) — at least 4.5:1 on the slide
    '--slide-primary-text': readableAccent(settings.primary, settings.accent, background, foreground),
    // Text on primary-coloured fills (Next button, filled table header, selected answers): white unless too light
    '--slide-on-primary': contrast('#ffffff', settings.primary) >= 4.5 ? '#ffffff' : '#0F172A',
    // Edit outline: 3:1 against light and dark slides
    '--se-ring': dark ? '#93C5FD' : '#1565F0',
    fontFamily: settings.font + ', Arial, sans-serif',
  } as CSSProperties;
  const tpl = getTemplate(settings.template);
  // Image + Text puts the title and rule in the text column, beside the picture
  const titleInContent = topic.slideType === 'image-vertical';
  const heading = <>
    <EditableText as="h2" k="title" label="Title" value={topic.title} placeholder="Add a title" />
    <div className="course-slide-rule" />
  </>;
  const showHeader  = settings.showHeader  !== false;
  const showFooter  = settings.showFooter  !== false;
  const hLogo       = settings.headerShowLogo       !== false;
  const hCourseName = settings.headerShowCourseName !== false;
  const fCourseName = settings.footerShowCourseName !== false;
  const fPageNum    = settings.footerShowPageNum    !== false;

  return <SlideEditContext.Provider value={api}><SlideTemplateContext.Provider value={settings.template}><article className={'course-presentation' + (editable ? ' is-editable' : '')} style={style} data-testid="course-presentation" data-view="combined" data-template={settings.template} aria-label={'Slide preview: ' + topic.title}>
    <div className={'course-slide course-slide--' + settings.template} data-layout={settings.layout}>
      {tpl ? <TemplateMotifLayer motif={tpl.motif} strong={topic.slideType === 'image-vertical'} /> : <div className="course-slide-decoration" aria-hidden="true" />}
      {showHeader && (
        <header className="course-slide-header">
          {hLogo && settings.logo && <img src={settings.logo} alt="Course logo" />}
          {hCourseName && <span>{courseTitle || 'Untitled Course'}</span>}
        </header>
      )}
      <main className="course-slide-main">
        <p className="course-slide-eyebrow">{sectionTitle || 'Course content'}</p>
        {!titleInContent && heading}
        <div
          className="course-slide-body"
          onClick={editable ? e => { if (!(e.target as Element).closest('[data-edit],.se-editing')) onSelectField?.('slide-content', false); } : undefined}
        >
          <CourseSlideContent key={topic.id} topic={topic} header={titleInContent ? heading : undefined} />
        </div>
        {editable && <span id={hintId} hidden>Press Enter to edit in Slide Settings, or F2 to edit on the slide.</span>}
      </main>
      {showFooter && (
        <footer className="course-slide-footer">
          <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {fCourseName && <span>{courseTitle || 'Untitled Course'}</span>}
            {settings.footerCopyright && <span style={{ opacity: 0.7 }}>{settings.footerCopyright}</span>}
            {settings.footerWatermark && <span style={{ opacity: 0.45, fontWeight: 700, letterSpacing: '0.06em' }}>{settings.footerWatermark}</span>}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw' }}>
            {fPageNum && <span>{index + 1} / {total}</span>}
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6cqw',
                background: settings.primary, color: 'var(--slide-on-primary)',
                borderRadius: settings.buttonStyle === 'pill' ? '999px' : settings.buttonStyle === 'square' ? '0px' : '8px',
                padding: '0.5cqw 1.4cqw',
                fontSize: 'clamp(9px,1.4cqw,14px)', fontWeight: 600,
                letterSpacing: '0.01em', lineHeight: 1,
              }}
            >
              Next ›
            </span>
          </span>
        </footer>
      )}
    </div>
  </article></SlideTemplateContext.Provider></SlideEditContext.Provider>;
}
