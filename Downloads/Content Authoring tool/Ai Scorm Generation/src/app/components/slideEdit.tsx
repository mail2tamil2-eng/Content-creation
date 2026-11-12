import React, { createContext, useContext, useLayoutEffect, useRef } from 'react';

/**
 * Click-to-edit on the slide preview (Step 2 editor).
 *
 * Field keys shared by the slide and the Slide Settings panel:
 *   'title' · 'content' · 'introText' · 'bullet:<i>' · 'slide-content' (whole content area)
 *   any other topic field as a dot path: 'instructions', 'seriesItems.2.label', 'tableRows.1.0',
 *   'questions.0.options.2.text' … (array index or object key per segment)
 * Panel inputs carry `data-field="<key>"` so the editor can focus the matching field.
 *
 * Interaction:
 *   hover            → dashed outline + label chip
 *   click / Enter    → select: matching panel field is scrolled to, highlighted and focused
 *   double-click / F2 → edit the text directly on the slide
 *     Enter = save (on a bullet: save and start a new bullet) · Shift+Enter = new line (body)
 *     Esc = cancel · clicking away = save · saving an empty bullet removes it
 */
export interface SlideEditApi {
  editable: boolean;
  selected: string | null;
  editing: string | null;
  hintId: string;
  select: (key: string | null) => void;
  startEdit: (key: string) => void;
  commit: (key: string, value: string, opts?: { next?: boolean; source?: unknown }) => void;
  cancel: () => void;
}

export const SlideEditContext = createContext<SlideEditApi | null>(null);
export const useSlideEdit = () => useContext(SlideEditContext);

type Tag = 'span' | 'p' | 'h2' | 'div';

export interface EditableTextProps {
  /** Field key, e.g. 'title' or 'bullet:2'. */
  k: string;
  /** Human name used for the hover chip and screen readers, e.g. "Bullet 2". */
  label: string;
  value: string;
  placeholder?: string;
  as?: Tag;
  /** Body text: Shift+Enter inserts a line break. */
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Current value of the key's root field when the slide shows a fallback (e.g. default table headers). */
  source?: unknown;
}

// Placeholder stays readable (≥4.5:1) even inside a parent with opacity .85
const placeholderStyle: React.CSSProperties = { opacity: 0.75, fontStyle: 'italic' };

export function EditableText({ k, label, value, placeholder, as = 'span', multiline = false, className, style, source }: EditableTextProps) {
  const ctx = useSlideEdit();
  const Tag = as as React.ElementType;
  const editRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLElement>(null);
  const done = useRef(false);
  const refocus = useRef(false);
  const editing = !!ctx?.editable && ctx.editing === k;

  useLayoutEffect(() => {
    const el = editRef.current;
    if (!editing || !el) return;
    done.current = false;
    el.textContent = value;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  useLayoutEffect(() => {
    if (!editing && refocus.current) { refocus.current = false; viewRef.current?.focus(); }
  }, [editing]);

  const display = value || (placeholder ? <span style={placeholderStyle}>{placeholder}</span> : null);
  if (!ctx?.editable) return <Tag className={className} style={style}>{display}</Tag>;

  const block = as !== 'span';
  const finish = (save: boolean, opts?: { next?: boolean }) => {
    if (done.current) return;
    done.current = true;
    const text = (editRef.current?.innerText ?? '').replace(/ /g, ' ').replace(/\n+$/, '');
    if (save) ctx.commit(k, multiline ? text.trim() : text.replace(/\s*\n\s*/g, ' ').trim(), { ...opts, source });
    else if (k.startsWith('bullet:') && !value) ctx.commit(k, ''); // Esc on a new empty bullet removes it
    else ctx.cancel();
  };

  if (editing) {
    return (
      <Tag className={className} style={style}>
        <span
          ref={editRef as React.RefObject<HTMLSpanElement>}
          className="se-editing"
          style={{ display: block ? 'block' : 'inline-block', minWidth: '2ch' }}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label={label}
          aria-multiline={multiline || undefined}
          spellCheck
          onKeyDown={e => {
            if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); refocus.current = true; finish(false); }
            else if (e.key === 'Enter' && !(multiline && e.shiftKey)) {
              e.preventDefault(); refocus.current = !k.startsWith('bullet:');
              finish(true, { next: k.startsWith('bullet:') });
            }
          }}
          onPaste={e => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); }}
          onBlur={() => finish(true)}
          onClick={e => e.stopPropagation()}
        />
      </Tag>
    );
  }

  const selected = ctx.selected === k;
  return (
    <Tag className={className} style={style}>
      <span
        ref={viewRef as React.RefObject<HTMLSpanElement>}
        data-edit={k}
        data-edit-label={label}
        className={'se-editable' + (block ? '' : ' se-inline') + (selected ? ' se-selected' : '')}
        style={{ display: block ? 'block' : 'inline' }}
        role="button"
        tabIndex={0}
        aria-label={`${label}: ${value || 'empty'}`}
        aria-describedby={ctx.hintId}
        aria-pressed={selected}
        onClick={e => { e.stopPropagation(); ctx.select(k); }}
        onDoubleClick={e => { e.stopPropagation(); ctx.startEdit(k); }}
        onKeyDown={e => {
          if (e.key === 'F2') { e.preventDefault(); ctx.startEdit(k); }
          else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.select(k); }
        }}
      >
        {display}
      </span>
    </Tag>
  );
}
