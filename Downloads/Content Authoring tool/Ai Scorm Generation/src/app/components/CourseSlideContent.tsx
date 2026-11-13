import React, { useState } from 'react';
import type { CourseTopic } from '../courseContent';
import { EditableText, EditableText as E, useSlideEdit } from './slideEdit';
import { SlideImage } from './SlideImage';
import { resolveImageShape, useSlideTemplate } from './slidePhotos';

const useEditable = () => !!useSlideEdit()?.editable;
/** In the editor an empty list shows one blank item so it can be typed into on the slide. */
function useSeeded<T>(list: T[] | undefined, blank: T): T[] {
  const editable = useEditable();
  return list?.length ? list : editable ? [blank] : [];
}

// ── Type helpers ──────────────────────────────────────────────────────────────

type AccordionItem = { id: string; heading: string; body: string };
type SeriesItem    = { id: string; label: string; description: string };
type ImageCard     = { id: string; heading: string; description: string; image?: string; alt?: string };
type HotspotItem   = { id: string; title: string; content: string };
type RevealCard    = { id: string; front: string; back: string };
type MatchPair     = { id: string; left: string; right: string };
type Step          = { id: string; text: string };
type FlashCard     = { id: string; front: string; back: string };
type Choice        = { id: string; text: string; outcome: string };
type QuizOption    = { id: string; text: string; correct: boolean };
type DragItem      = { id: string; label: string; zone: string };
type DropZone      = { id: string; label: string };

function g<T>(topic: CourseTopic, key: string): T {
  return (topic as Record<string, unknown>)[key] as T;
}

const empty = (s: string | undefined) => !s || s.trim() === '';
const Dim = ({ children }: { children: React.ReactNode }) => (
  <span style={{ opacity: 0.38, fontStyle: 'italic' }}>{children}</span>
);

// ── Shared slide-scale sizing ─────────────────────────────────────────────────

const fs = {
  sm:  'clamp(10px, 1.5cqw, 14px)',
  md:  'clamp(12px, 1.9cqw, 18px)',
  lg:  'clamp(14px, 2.2cqw, 22px)',
} as const;

// ── Slide type renderers ──────────────────────────────────────────────────────

function TitleText({ topic }: { topic: CourseTopic }) {
  const body  = g<string>(topic, 'content') || topic.content;
  const align = (g<string>(topic, 'alignment') || 'left') as React.CSSProperties['textAlign'];
  const edit  = useSlideEdit();
  const pStyle: React.CSSProperties = { margin: 0, fontSize: fs.md, lineHeight: 1.7, textAlign: align, whiteSpace: 'pre-wrap', color: 'var(--slide-text)' };
  if (edit?.editable) return <EditableText as="p" k="content" label="Body text" multiline value={body || ''} placeholder="Add body text" style={pStyle} />;
  return <p style={pStyle}>{empty(body) ? <Dim>Add body text in Slide Settings</Dim> : body}</p>;
}

function TitleBullets({ topic }: { topic: CourseTopic }) {
  const intro    = g<string>(topic, 'introText');
  const bullets  = g<string[]>(topic, 'bullets') || topic.bullets || [];
  const style    = g<string>(topic, 'bulletStyle') || 'disc';
  const editable = !!useSlideEdit()?.editable;
  // In the editor every bullet shows (empty ones as placeholders) so indexes match the panel
  const shown = editable
    ? (bullets.length ? bullets : ['']).map((text, i) => ({ text, i }))
    : bullets.map((text, i) => ({ text, i })).filter(b => b.text);

  const bullet = ({ text, i }: { text: string; i: number }, n: number) => {
    const brand = { color: 'var(--slide-primary-text, var(--slide-primary))' };
    let marker: React.ReactNode = '•';
    if (style === 'number') marker = <span style={{ ...brand, fontWeight: 700, minWidth: '1.4em', display: 'inline-block' }}>{n + 1}.</span>;
    if (style === 'arrow')  marker = <span style={brand}>→</span>;
    if (style === 'check')  marker = <span style={brand}>✓</span>;
    if (style === 'square') marker = <span style={{ display: 'inline-block', width: '0.4em', height: '0.4em', background: 'currentColor', verticalAlign: '0.15em' }} />;
    if (style === 'none')   marker = null;
    return (
      <li key={i} style={{ display: 'flex', gap: 'clamp(6px,1cqw,10px)', alignItems: 'flex-start', listStyle: 'none' }}>
        {marker !== null && <span aria-hidden={style === 'number' ? undefined : true} style={{ fontSize: fs.md, flexShrink: 0, marginTop: 2 }}>{marker}</span>}
        <EditableText k={`bullet:${i}`} label={`Bullet ${i + 1}`} value={text} placeholder={`Bullet ${i + 1}`} style={{ fontSize: fs.md, lineHeight: 1.65, flex: 1, minWidth: 0 }} />
      </li>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {intro && <EditableText as="p" k="introText" label="Intro text" value={intro} style={{ margin: 0, fontSize: fs.md, opacity: 0.85, lineHeight: 1.6 }} />}
      {shown.length
        ? <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.7cqw,8px)' }}>{shown.map(bullet)}</ul>
        : <p style={{ margin: 0, fontSize: fs.md }}><Dim>Add bullet items in Slide Settings</Dim></p>}
    </div>
  );
}

function Series({ topic, dir }: { topic: CourseTopic; dir: 'h' | 'v' }) {
  const items = useSeeded(g<SeriesItem[]>(topic, 'seriesItems'), { id: '', label: '', description: '' });
  const layout = g<string>(topic, 'layout') || (dir === 'h' ? 'scroll' : 'stack');
  if (!items.length) return <p style={{ fontSize: fs.md }}><Dim>Add series items in Slide Settings</Dim></p>;
  const panel: React.CSSProperties = { background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' };
  const gap = 'clamp(8px,1.2cqw,14px)';

  if (dir === 'h') {
    const card = (item: SeriesItem, i: number, extra: React.CSSProperties) => (
      <div key={item.id || i} style={{ ...panel, padding: 'clamp(8px,1.3cqw,14px)', minWidth: 0, ...extra }}>
        <E as="p" k={`seriesItems.${i}.label`} label={`Item ${i + 1} label`} value={item.label} placeholder={`Item ${i + 1}`} style={{ margin: '0 0 clamp(3px,0.5cqw,6px)', fontSize: fs.lg, fontWeight: 700 }} />
        <E as="p" multiline k={`seriesItems.${i}.description`} label={`Item ${i + 1} description`} value={item.description} placeholder="Description" style={{ margin: 0, fontSize: fs.sm, opacity: 0.85, lineHeight: 1.55 }} />
      </div>
    );
    // Columns: every item visible, sharing the width equally
    if (layout === 'fixed') {
      return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`, gap }}>{items.map((it, i) => card(it, i, {}))}</div>;
    }
    // Scroll row: fixed-width cards in one row that scrolls sideways
    return <div style={{ display: 'flex', gap, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'thin' }}>{items.map((it, i) => card(it, i, { flex: '0 0 clamp(150px,36%,360px)' }))}</div>;
  }

  const row = (item: SeriesItem, i: number) => (
    <div key={item.id || i} style={{ ...panel, display: 'flex', alignItems: 'flex-start', gap, padding: 'clamp(8px,1.2cqw,12px)', minWidth: 0 }}>
      <span style={{ fontSize: fs.lg, fontWeight: 800, color: 'var(--slide-primary-text, var(--slide-primary))', flexShrink: 0, minWidth: '1.6em', textAlign: 'center' }}>{i + 1}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <E as="p" k={`seriesItems.${i}.label`} label={`Step ${i + 1} label`} value={item.label} placeholder={`Step ${i + 1}`} style={{ margin: '0 0 2px', fontSize: fs.md, fontWeight: 600 }} />
        <E as="p" multiline k={`seriesItems.${i}.description`} label={`Step ${i + 1} description`} value={item.description} placeholder="Description" style={{ margin: 0, fontSize: fs.sm, opacity: 0.85, lineHeight: 1.55 }} />
      </div>
    </div>
  );
  // Two columns: steps flow left-to-right in a 2-column grid
  if (layout === 'grid') return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(6px,0.9cqw,10px)' }}>{items.map(row)}</div>;
  // Stack: one step under another
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,0.9cqw,10px)' }}>{items.map(row)}</div>;
}

function ExpandableList({ topic }: { topic: CourseTopic }) {
  const items   = useSeeded(g<AccordionItem[]>(topic, 'accordionItems'), { id: '', heading: '', body: '' });
  const defOpen = g<number>(topic, 'defaultOpenIndex') ?? 0;
  const [openIdx, setOpenIdx] = useState<number | null>(defOpen >= 0 ? defOpen : null);
  const editable = useEditable();

  if (!items.length) return <p style={{ fontSize: fs.md }}><Dim>Add accordion items in Slide Settings</Dim></p>;

  const rowPad = 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        const chevron = <span aria-hidden="true" style={{ fontSize: fs.md, color: 'var(--slide-primary-text, var(--slide-primary))', flexShrink: 0, display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}>▾</span>;
        return (
          <div key={item.id || i} style={{ border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 18%,transparent)', borderRadius: 'var(--slide-radius)', overflow: 'hidden', background: isOpen ? 'var(--slide-panel)' : 'transparent', transition: 'background 0.15s' }}>
            {editable ? (
              // Editor: heading is editable text, the chevron is its own toggle button (no nested buttons)
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: rowPad }}>
                <E k={`accordionItems.${i}.heading`} label={`Item ${i + 1} heading`} value={item.heading} placeholder={`Item ${i + 1} heading`} style={{ fontSize: fs.md, fontWeight: 600, flex: 1, minWidth: 0 }} />
                <button type="button" onClick={() => setOpenIdx(isOpen ? null : i)} aria-expanded={isOpen} aria-label={`${isOpen ? 'Collapse' : 'Expand'} item ${i + 1}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, minWidth: 24, minHeight: 24, color: 'inherit' }}>{chevron}</button>
              </div>
            ) : (
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: rowPad, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 8, color: 'var(--slide-text)' }}
              >
                <span style={{ fontSize: fs.md, fontWeight: 600, flex: 1 }}>
                  {empty(item.heading) ? <Dim>{`Item ${i + 1} heading`}</Dim> : item.heading}
                </span>
                {chevron}
              </button>
            )}
            {isOpen && (
              <div style={{ padding: 'clamp(4px,0.7cqw,8px) clamp(10px,1.5cqw,15px) clamp(8px,1.1cqw,11px)', borderTop: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)' }}>
                <E as="p" multiline k={`accordionItems.${i}.body`} label={`Item ${i + 1} description`} value={item.body} placeholder="Add description" style={{ margin: 0, fontSize: fs.sm, lineHeight: 1.65 }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Table({ topic }: { topic: CourseTopic }) {
  const stored  = g<string[]>(topic, 'tableHeaders');
  const headers = stored || ['Column 1', 'Column 2'];
  const rows    = useSeeded(g<string[][]>(topic, 'tableRows'), [] as string[]);
  const hStyle  = g<string>(topic, 'headerStyle') || 'filled';

  const thBg    = hStyle === 'filled' ? 'var(--slide-primary)' : 'transparent';
  const thColor = hStyle === 'filled' ? 'var(--slide-on-primary, #fff)' : 'var(--slide-text)';
  const thBdr   = hStyle === 'outlined' ? '2px solid var(--slide-primary)' : '1px solid transparent';
  const cell: React.CSSProperties = { padding: 'clamp(5px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', fontSize: fs.sm, textAlign: 'left', borderBottom: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)' as string };

  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: fs.sm }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ ...cell, background: thBg, color: thColor, border: thBdr, fontWeight: 700 }}>
                <E k={`tableHeaders.${i}`} label={`Column ${i + 1} heading`} value={h} placeholder={`Col ${i + 1}`} source={headers} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 ? 'var(--slide-panel)' : 'transparent' }}>
              {headers.map((_, ci) => <td key={ci} style={cell}><E k={`tableRows.${ri}.${ci}`} label={`Row ${ri + 1}, ${headers[ci] || `column ${ci + 1}`}`} value={row[ci] || ''} placeholder="–" /></td>)}
            </tr>
          )) : (
            <tr><td colSpan={headers.length} style={{ ...cell, textAlign: 'center', opacity: 0.4, fontStyle: 'italic' }}>Add rows in Slide Settings</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ImageCards({ topic }: { topic: CourseTopic }) {
  const cards  = useSeeded(g<ImageCard[]>(topic, 'imageCards'), { id: '', heading: '', description: '' });
  const layout = g<string>(topic, 'layout') || 'horizontal';
  const editable = useEditable();
  if (!cards.length) return <p style={{ fontSize: fs.md }}><Dim>Add image cards in Slide Settings</Dim></p>;

  const gap = 'clamp(6px,1cqw,12px)';
  const card = (c: ImageCard, i: number, imageHeight: string, extra?: React.CSSProperties) => (
    <div key={c.id || i} style={{ background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', overflow: 'hidden', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)', ...extra }}>
      <SlideImage k={`imageCards.${i}.image`} label={`Card ${i + 1} image`} src={c.image} alt={c.alt} sampleIndex={i} style={{ height: imageHeight }} />
      <div style={{ padding: 'clamp(6px,0.9cqw,9px)' }}>
        <E as="p" k={`imageCards.${i}.heading`} label={`Card ${i + 1} heading`} value={c.heading} placeholder={`Card ${i + 1}`} style={{ margin: '0 0 2px', fontSize: fs.sm, fontWeight: 600 }} />
        {(c.description || editable) && <E as="p" multiline k={`imageCards.${i}.description`} label={`Card ${i + 1} description`} value={c.description} placeholder="Description" style={{ margin: 0, fontSize: fs.sm, opacity: 0.85, lineHeight: 1.5 }} />}
      </div>
    </div>
  );

  // Grid: equal tiles, three per row ('masonry' from older courses shows as grid)
  if (layout === 'grid' || layout === 'masonry') {
    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap }}>{cards.map((c, i) => card(c, i, 'clamp(56px,10cqw,120px)'))}</div>;
  }
  // Scroll row: one row of wide cards that scrolls sideways
  return (
    <div style={{ display: 'flex', gap, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'thin' }}>
      {cards.map((c, i) => card(c, i, 'clamp(70px,13cqw,150px)', { flex: '0 0 clamp(150px,40%,420px)' }))}
    </div>
  );
}

/** Image + Text: one picture beside the body text (picture left or right). */
function ImageText({ topic, header }: { topic: CourseTopic; header?: React.ReactNode }) {
  const position = g<string>(topic, 'imagePosition') === 'right' ? 'right' : 'left';
  const body = g<string>(topic, 'content') || topic.content || '';
  const caption = g<string>(topic, 'caption');
  const editable = useEditable();
  const shape = resolveImageShape(g<string>(topic, 'imageStyle'), useSlideTemplate());
  // Shapes with fixed proportions are sized by height so they fit the slide; rectangles/arches fill the column
  const fixed = shape === 'circle' || shape === 'square' || shape === 'hex';
  return (
    <div style={{ display: 'flex', flexDirection: position === 'right' ? 'row-reverse' : 'row', gap: 'clamp(12px,2.4cqw,28px)', alignItems: 'stretch' }}>
      <figure style={{ margin: 0, flex: '0 0 46%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: fixed ? 'center' : 'stretch', justifyContent: 'center' }}>
        <SlideImage k="imageUrl" label="Image" shape={shape} src={g<string>(topic, 'imageUrl')} alt={g<string>(topic, 'alt')}
          style={fixed ? { width: 'min(100%, 33cqw)' } : { flex: 1, minHeight: 'clamp(150px,33cqw,420px)', borderRadius: 'var(--slide-radius)' }} />
        {(caption || editable) && <figcaption style={{ fontSize: fs.sm, opacity: 0.85 }}><E k="caption" label="Caption" value={caption || ''} placeholder="Add a caption (optional)" /></figcaption>}
      </figure>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {header}
        <E as="p" multiline k="content" label="Body text" value={body} placeholder="Add body text" style={{ margin: 0, fontSize: fs.md, lineHeight: 1.7, whiteSpace: 'pre-wrap' }} />
      </div>
    </div>
  );
}

function VideoSlide({ topic }: { topic: CourseTopic }) {
  const caption = g<string>(topic, 'caption');
  const editable = useEditable();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <div style={{ aspectRatio: '16/9', background: '#111', borderRadius: 'var(--slide-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(18px,4cqw,40px)' }}>
        <span style={{ opacity: 0.6 }}>▶</span>
      </div>
      {(caption || editable) && <E as="p" k="caption" label="Caption" value={caption || ''} placeholder="Add a caption" style={{ margin: 0, fontSize: fs.sm, opacity: 0.85, textAlign: 'center' }} />}
    </div>
  );
}

function AudioSlide({ topic }: { topic: CourseTopic }) {
  const transcript = g<string>(topic, 'transcript') || topic.audioScript;
  const editable = useEditable();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <div style={{ padding: 'clamp(10px,1.5cqw,16px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2cqw,12px)' }}>
        <span style={{ fontSize: 'clamp(16px,3cqw,28px)' }}>🎵</span>
        <div style={{ flex: 1, height: 'clamp(4px,0.6cqw,6px)', background: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', borderRadius: 3 }}><div style={{ width: '30%', height: '100%', background: 'var(--slide-primary)', borderRadius: 3 }} /></div>
        <span style={{ fontSize: fs.sm, opacity: 0.85 }}>0:00</span>
      </div>
      {(transcript || editable) && (
        <p style={{ margin: 0, fontSize: fs.sm, lineHeight: 1.6, opacity: 0.85 }}>
          <em>Transcript: </em><E k="transcript" multiline label="Transcript" value={transcript || ''} placeholder="Add a transcript" />
        </p>
      )}
    </div>
  );
}

function Spokesperson({ topic }: { topic: CourseTopic }) {
  const script = g<string>(topic, 'script') || topic.script;
  return (
    <div style={{ display: 'flex', gap: 'clamp(10px,1.5cqw,16px)', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: 'clamp(36px,7cqw,70px)', height: 'clamp(36px,7cqw,70px)', borderRadius: '50%', background: 'var(--slide-panel)', border: '2px solid var(--slide-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,3cqw,28px)' }}>👤</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 clamp(3px,0.5cqw,6px)', fontSize: fs.sm, fontWeight: 700, color: 'var(--slide-primary-text, var(--slide-primary))', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Presenter · {g<string>(topic, 'avatar') || 'Maya'}</p>
        <E as="p" multiline k="script" label="Script" value={script || ''} placeholder="Enter script" style={{ margin: 0, fontSize: fs.md, lineHeight: 1.65 }} />
      </div>
    </div>
  );
}

function Hotspot({ topic }: { topic: CourseTopic }) {
  const spots = useSeeded(g<HotspotItem[]>(topic, 'hotspots'), { id: '', title: '', content: '' });
  const [open, setOpen] = useState<number | null>(null);
  const editable = useEditable();
  const chip = (i: number): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 4, padding: 'clamp(4px,0.6cqw,6px) clamp(8px,1.1cqw,11px)', background: open === i ? 'var(--slide-primary)' : 'var(--slide-panel)', color: open === i ? 'var(--slide-on-primary, #fff)' : 'var(--slide-text)', border: '1px solid var(--slide-primary)', borderRadius: 'var(--slide-radius)', cursor: 'pointer', fontSize: fs.sm, fontWeight: 500 });
  const num = (i: number): React.CSSProperties => ({ width: 16, height: 16, borderRadius: '50%', background: open === i ? '#fff' : 'var(--slide-primary)', color: open === i ? 'var(--slide-primary)' : 'var(--slide-on-primary, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10, border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <SlideImage k="imageUrl" label="Hotspot image" src={g<string>(topic, 'imageUrl')} alt={g<string>(topic, 'alt')} style={{ width: '100%', height: 'clamp(110px,22cqw,280px)', borderRadius: 'var(--slide-radius)' }} />
      {spots.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {spots.map((s, i) => editable ? (
            <div key={s.id || i} style={{ ...chip(i), cursor: 'default' }}>
              <button type="button" style={num(i)} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-label={`Show hotspot ${i + 1} content`}>{i + 1}</button>
              <E k={`hotspots.${i}.title`} label={`Hotspot ${i + 1} label`} value={s.title} placeholder={`Hotspot ${i + 1}`} />
            </div>
          ) : (
            <button key={s.id || i} onClick={() => setOpen(open === i ? null : i)} style={chip(i)}>
              <span style={num(i)}>{i + 1}</span>
              {s.title || `Hotspot ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      {open !== null && spots[open] && (
        <div style={{ padding: 'clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid var(--slide-primary)', fontSize: fs.sm, lineHeight: 1.6 }}>
          <E as="p" multiline k={`hotspots.${open}.content`} label={`Hotspot ${open + 1} content`} value={spots[open].content} placeholder="Add content" style={{ margin: 0 }} />
        </div>
      )}
    </div>
  );
}

/** Two-sided card (click-reveal, flash cards). In the editor both sides show so both can be edited. */
function TwoSidedCards({ root, cards: stored, frontLabel, backLabel, emptyText }: { root: string; cards: { id: string; front: string; back: string }[]; frontLabel: string; backLabel: string; emptyText: string }) {
  const cards = useSeeded(stored, { id: '', front: '', back: '' });
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const editable = useEditable();
  if (!cards.length) return <p style={{ fontSize: fs.md }}><Dim>{emptyText}</Dim></p>;
  const base: React.CSSProperties = { flex: '1 1 clamp(100px,28%,180px)', minHeight: 'clamp(50px,8cqw,80px)', padding: 'clamp(8px,1.3cqw,14px)', borderRadius: 'var(--slide-radius)', border: '1px solid', fontSize: fs.sm, lineHeight: 1.55, textAlign: 'center' };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px,1cqw,10px)' }}>
      {cards.map((card, i) => editable ? (
        <div key={card.id || i} style={{ ...base, background: 'var(--slide-panel)', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <E as="p" k={`${root}.${i}.front`} label={`Card ${i + 1} ${frontLabel.toLowerCase()}`} value={card.front} placeholder={`Card ${i + 1} ${frontLabel.toLowerCase()}`} style={{ margin: 0, fontWeight: 600 }} />
          <span aria-hidden="true" style={{ borderTop: '1px dashed color-mix(in srgb,var(--slide-text) 35%,transparent)' }} />
          <E as="p" multiline k={`${root}.${i}.back`} label={`Card ${i + 1} ${backLabel.toLowerCase()}`} value={card.back} placeholder={backLabel} style={{ margin: 0 }} />
        </div>
      ) : (
        <div key={card.id || i} onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
          style={{ ...base, background: flipped[i] ? 'var(--slide-primary)' : 'var(--slide-panel)', color: flipped[i] ? 'var(--slide-on-primary, #fff)' : 'var(--slide-text)', borderColor: flipped[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {flipped[i] ? (card.back || <span style={{ opacity: 0.7, fontStyle: 'italic' }}>{backLabel}</span>) : (card.front || <Dim>{`Card ${i + 1}`}</Dim>)}
        </div>
      ))}
    </div>
  );
}

function ClickReveal({ topic }: { topic: CourseTopic }) {
  return <TwoSidedCards root="revealCards" cards={g<RevealCard[]>(topic, 'revealCards') || []} frontLabel="Front" backLabel="Revealed text" emptyText="Add reveal cards in Slide Settings" />;
}

function SliderSlide({ topic }: { topic: CourseTopic }) {
  const beforeLabel = g<string>(topic, 'beforeLabel') || 'Before';
  const afterLabel  = g<string>(topic, 'afterLabel') || 'After';
  const [pos, setPos] = useState(50);
  // Label chip keeps white text readable on any photo
  const lbl: React.CSSProperties = { position: 'relative', zIndex: 1, fontSize: fs.sm, color: '#fff', fontWeight: 600, background: 'rgba(0,0,0,.72)', padding: '2px 8px', borderRadius: 4 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <div style={{ position: 'relative', height: 'clamp(120px,24cqw,300px)', borderRadius: 'var(--slide-radius)', overflow: 'hidden', background: '#111', cursor: 'ew-resize' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{ flex: pos, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 8, minWidth: 0 }}>
            <SlideImage k="beforeImage" label="Before image" src={g<string>(topic, 'beforeImage')} alt={g<string>(topic, 'beforeAlt')} sampleIndex={0} style={{ position: 'absolute', inset: 0 }} />
            <E as="div" k="beforeLabel" label="Before label" value={beforeLabel} style={lbl} />
          </div>
          <div style={{ position: 'absolute', zIndex: 2, left: `${pos}%`, top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }} />
          <div style={{ flex: 100 - pos, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 8, minWidth: 0 }}>
            <SlideImage k="afterImage" label="After image" src={g<string>(topic, 'afterImage')} alt={g<string>(topic, 'afterAlt')} sampleIndex={1} style={{ position: 'absolute', inset: 0 }} />
            <E as="div" k="afterLabel" label="After label" value={afterLabel} style={lbl} />
          </div>
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))} aria-label="Compare before and after"
        style={{ width: '100%', accentColor: 'var(--slide-primary)' }} />
    </div>
  );
}

/** Optional instruction line shared by the activity slides. */
function Instructions({ topic }: { topic: CourseTopic }) {
  const instr = g<string>(topic, 'instructions');
  const editable = useEditable();
  if (!instr && !editable) return null;
  return <E as="p" k="instructions" label="Instructions" value={instr || ''} placeholder="Add instructions (optional)" style={{ margin: 0, fontSize: fs.sm, opacity: 0.9 }} />;
}

function DragDrop({ topic }: { topic: CourseTopic }) {
  const items = useSeeded(g<DragItem[]>(topic, 'dragItems'), { id: '', label: '', zone: '' });
  const zones = useSeeded(g<DropZone[]>(topic, 'dropZones'), { id: '', label: '' });
  const head: React.CSSProperties = { margin: '0 0 clamp(4px,0.6cqw,6px)', fontSize: fs.sm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.75 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <Instructions topic={topic} />
      <div style={{ display: 'flex', gap: 'clamp(8px,1.2cqw,14px)' }}>
        <div style={{ flex: 1 }}>
          <p style={head}>Items</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {items.length ? items.map((item, i) => (
              <div key={item.id || i} style={{ padding: 'clamp(5px,0.8cqw,8px) clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 6, border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', fontSize: fs.sm, cursor: 'grab' }}>
                <E k={`dragItems.${i}.label`} label={`Drag item ${i + 1}`} value={item.label} placeholder={`Item ${i + 1}`} />
              </div>
            )) : <p style={{ fontSize: fs.sm }}><Dim>No items</Dim></p>}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={head}>Zones</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {zones.length ? zones.map((zone, i) => (
              <div key={zone.id || i} style={{ padding: 'clamp(5px,0.8cqw,8px) clamp(8px,1.2cqw,12px)', background: 'transparent', borderRadius: 6, border: '2px dashed', borderColor: 'color-mix(in srgb,var(--slide-primary) 40%,transparent)', fontSize: fs.sm, minHeight: 'clamp(28px,4cqw,40px)', display: 'flex', alignItems: 'center' }}>
                <E k={`dropZones.${i}.label`} label={`Drop zone ${i + 1}`} value={zone.label} placeholder={`Zone ${i + 1}`} />
              </div>
            )) : <p style={{ fontSize: fs.sm }}><Dim>No zones</Dim></p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Matching({ topic }: { topic: CourseTopic }) {
  const pairs = useSeeded(g<MatchPair[]>(topic, 'matchPairs'), { id: '', left: '', right: '' });
  const [selected, setSelected] = useState<string | null>(null);
  const editable = useEditable();
  const box: React.CSSProperties = { padding: 'clamp(6px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', borderRadius: 6, border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', fontSize: fs.sm };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <Instructions topic={topic} />
      {pairs.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px,0.6cqw,8px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {pairs.map((pair, i) => (
              <div key={pair.id || i} style={{ ...box, background: !editable && selected === `L${i}` ? 'var(--slide-primary)' : 'var(--slide-panel)', color: !editable && selected === `L${i}` ? 'var(--slide-on-primary, #fff)' : 'var(--slide-text)', cursor: editable ? undefined : 'pointer', transition: 'all 0.12s' }}
                onClick={editable ? undefined : () => setSelected(selected === `L${i}` ? null : `L${i}`)}>
                <E k={`matchPairs.${i}.left`} label={`Pair ${i + 1} left`} value={pair.left} placeholder={`Left ${i + 1}`} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {pairs.map((pair, i) => (
              <div key={(pair.id || i) + 'r'} style={{ ...box, background: 'var(--slide-panel)' }}>
                <E k={`matchPairs.${i}.right`} label={`Pair ${i + 1} right`} value={pair.right} placeholder={`Right ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ) : <p style={{ fontSize: fs.md }}><Dim>Add pairs in Slide Settings</Dim></p>}
    </div>
  );
}

function Sequencing({ topic }: { topic: CourseTopic }) {
  const steps = useSeeded(g<Step[]>(topic, 'steps'), { id: '', text: '' });
  if (!steps.length) return <p style={{ fontSize: fs.md }}><Dim>Add steps in Slide Settings</Dim></p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <Instructions topic={topic} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
        {steps.map((step, i) => (
          <div key={step.id || i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1cqw,10px)', padding: 'clamp(6px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
            <span style={{ width: 'clamp(18px,2.5cqw,26px)', height: 'clamp(18px,2.5cqw,26px)', borderRadius: '50%', background: 'var(--slide-primary)', color: 'var(--slide-on-primary, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs.sm, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
            <E k={`steps.${i}.text`} label={`Step ${i + 1}`} value={step.text} placeholder={`Step ${i + 1}`} style={{ fontSize: fs.md, flex: 1, minWidth: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FlashCards({ topic }: { topic: CourseTopic }) {
  return <TwoSidedCards root="flashCards" cards={g<FlashCard[]>(topic, 'flashCards') || []} frontLabel="Front" backLabel="Back" emptyText="Add flash cards in Slide Settings" />;
}

function Branching({ topic }: { topic: CourseTopic }) {
  const scenario = g<string>(topic, 'scenarioText');
  const choices  = useSeeded(g<Choice[]>(topic, 'choices'), { id: '', text: '', outcome: '' });
  const [chosen, setChosen] = useState<number | null>(null);
  const editable = useEditable();
  const choiceBox = (on: boolean): React.CSSProperties => ({ padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: on ? 'var(--slide-primary)' : 'transparent', color: on ? 'var(--slide-on-primary, #fff)' : 'var(--slide-text)', border: '1px solid', borderColor: on ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 20%,transparent)', borderRadius: 'var(--slide-radius)', textAlign: 'left', fontSize: fs.md, transition: 'all 0.12s' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <div style={{ padding: 'clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
        <E as="p" multiline k="scenarioText" label="Scenario" value={scenario || ''} placeholder="Add scenario text" style={{ margin: 0, fontSize: fs.md, lineHeight: 1.65 }} />
      </div>
      {choices.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {choices.map((c, i) => editable ? (
            <div key={c.id || i} style={{ ...choiceBox(false), display: 'flex', flexDirection: 'column', gap: 4 }}>
              <E k={`choices.${i}.text`} label={`Choice ${i + 1}`} value={c.text} placeholder={`Choice ${i + 1}`} />
              <span style={{ fontSize: fs.sm, opacity: 0.85 }}>Outcome: <E k={`choices.${i}.outcome`} label={`Choice ${i + 1} outcome`} value={c.outcome} placeholder="Add outcome" /></span>
            </div>
          ) : (
            <button key={c.id || i} onClick={() => setChosen(chosen === i ? null : i)} style={{ ...choiceBox(chosen === i), cursor: 'pointer' }}>
              {c.text || <Dim>{`Choice ${i + 1}`}</Dim>}
            </button>
          ))}
          {!editable && chosen !== null && choices[chosen].outcome && (
            <div style={{ padding: 'clamp(6px,1cqw,10px)', background: 'color-mix(in srgb,var(--slide-primary) 10%,var(--slide-panel))', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'var(--slide-primary)', fontSize: fs.sm, lineHeight: 1.6 }}>
              Outcome: {choices[chosen].outcome}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Simulation({ topic }: { topic: CourseTopic }) {
  type SStep = { id: string; action: string; expected: string };
  const steps = useSeeded(g<SStep[]>(topic, 'simSteps'), { id: '', action: '', expected: '' });
  const [done, setDone] = useState<Record<number, boolean>>({});
  const editable = useEditable();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <Instructions topic={topic} />
      {steps.length ? steps.map((step, i) => (
        <div key={step.id || i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px,1.2cqw,12px)', padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: done[i] ? 'color-mix(in srgb,var(--slide-primary) 8%,var(--slide-panel))' : 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: done[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: editable ? undefined : 'pointer', transition: 'all 0.12s' }}
          onClick={editable ? undefined : () => setDone(d => ({ ...d, [i]: !d[i] }))}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${done[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 30%,transparent)'}`, background: done[i] ? 'var(--slide-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--slide-on-primary, #fff)', fontSize: 10, fontWeight: 800, marginTop: 1 }}>{done[i] ? '✓' : ''}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <E as="p" k={`simSteps.${i}.action`} label={`Step ${i + 1} action`} value={step.action} placeholder={`Action ${i + 1}`} style={{ margin: '0 0 2px', fontSize: fs.md, fontWeight: 500 }} />
            {(step.expected || editable) && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.85 }}>Expected: <E k={`simSteps.${i}.expected`} label={`Step ${i + 1} expected outcome`} value={step.expected} placeholder="Add expected outcome" /></p>}
          </div>
        </div>
      )) : <p style={{ fontSize: fs.md }}><Dim>Add steps in Slide Settings</Dim></p>}
    </div>
  );
}

function Quiz({ topic }: { topic: CourseTopic }) {
  // The Slide Settings quiz editor stores `questions[]` ({ question | text, options[{ text, correct }], feedback });
  // older/simple data may use `question` / `quizOptions` / `feedback` on the topic.
  type Q = { question?: string; text?: string; options?: { text: string; correct: boolean }[]; feedback?: string };
  const q0 = (g<Q[]>(topic, 'questions') || [])[0];
  const fromQuestions = !!q0;
  const question = (q0 ? (q0.question ?? q0.text) : undefined) || g<string>(topic, 'question') || (fromQuestions ? '' : topic.content) || '';
  const options  = (q0?.options?.map((o, i) => ({ id: String(i), text: o.text, correct: o.correct })) || g<QuizOption[]>(topic, 'quizOptions') || []);
  const feedback = (q0 ? q0.feedback : g<string>(topic, 'feedback')) || '';
  const [chosen, setChosen] = useState<number | null>(null);
  const editable = useEditable();
  const qKey = fromQuestions ? 'questions.0.question' : 'question';
  const optKey = (i: number) => fromQuestions ? `questions.0.options.${i}.text` : `quizOptions.${i}.text`;
  const fbKey = fromQuestions ? 'questions.0.feedback' : 'feedback';
  const row = (i: number, isChosen: boolean, correct: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1cqw,10px)', padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: isChosen ? (correct ? 'color-mix(in srgb,#059669 10%,var(--slide-panel))' : 'color-mix(in srgb,#DC2626 8%,var(--slide-panel))') : 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: isChosen ? (correct ? '#059669' : '#DC2626') : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', transition: 'all 0.12s' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <E as="p" multiline k={qKey} label="Question" value={question} placeholder="Enter question" style={{ margin: 0, fontSize: fs.lg, fontWeight: 600, lineHeight: 1.55 }} />
      {options.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {options.map((opt, i) => editable ? (
            <div key={opt.id || i} style={row(i, false, false)}>
              <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid color-mix(in srgb,var(--slide-text) 60%,transparent)', flexShrink: 0 }} />
              <E k={optKey(i)} label={`Option ${i + 1}`} value={opt.text} placeholder={`Option ${i + 1}`} style={{ fontSize: fs.md, flex: 1, minWidth: 0 }} />
            </div>
          ) : (
            <label key={opt.id || i} style={{ ...row(i, chosen === i, opt.correct), cursor: 'pointer' }}>
              <input type="radio" name={'q-' + topic.id} checked={chosen === i} onChange={() => setChosen(i)} style={{ accentColor: 'var(--slide-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: fs.md }}>{opt.text || <Dim>{`Option ${i + 1}`}</Dim>}</span>
            </label>
          ))}
        </div>
      )}
      {(editable || (chosen !== null && feedback)) && (
        <div style={{ margin: 0, fontSize: fs.sm, padding: 'clamp(6px,1cqw,10px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', lineHeight: 1.6 }}>
          {editable && <span style={{ fontWeight: 700 }}>Feedback: </span>}
          <E k={fbKey} multiline label="Feedback" value={feedback} placeholder="Add feedback shown after answering" />
        </div>
      )}
    </div>
  );
}

// ── Main dispatcher ───────────────────────────────────────────────────────────

/** `header` (slide title + rule) is placed inside the layout for slide types that need it (Image + Text). */
export default function CourseSlideContent({ topic, header }: { topic: CourseTopic; header?: React.ReactNode }) {
  const st = topic.slideType || 'title-text';

  switch (st) {
    case 'title-text':          return <TitleText topic={topic} />;
    case 'title-bullets':
    case 'summary':             return <TitleBullets topic={topic} />;
    case 'horizontal-series':   return <Series topic={topic} dir="h" />;
    case 'vertical-series':     return <Series topic={topic} dir="v" />;
    case 'expandable-list':     return <ExpandableList topic={topic} />;
    case 'table':               return <Table topic={topic} />;
    case 'image-horizontal':
    case 'media-collection':    return <ImageCards topic={topic} />;
    case 'image-vertical':      return <ImageText topic={topic} header={header} />;
    case 'video':               return <VideoSlide topic={topic} />;
    case 'audio':               return <AudioSlide topic={topic} />;
    case 'spokesperson':        return <Spokesperson topic={topic} />;
    case 'hotspot':             return <Hotspot topic={topic} />;
    case 'click-reveal':        return <ClickReveal topic={topic} />;
    case 'slider':              return <SliderSlide topic={topic} />;
    case 'drag-drop':           return <DragDrop topic={topic} />;
    case 'matching':            return <Matching topic={topic} />;
    case 'scenario':            return <Sequencing topic={topic} />;
    case 'flash-card':          return <FlashCards topic={topic} />;
    case 'branching-scenario':  return <Branching topic={topic} />;
    case 'simulation':          return <Simulation topic={topic} />;
    case 'knowledge-check':
    case 'quiz':                return <Quiz topic={topic} />;
    default:                    return <TitleText topic={topic} />;
  }
}
