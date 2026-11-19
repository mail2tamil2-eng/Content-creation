import { useId, type ReactNode } from 'react';
import { cn } from './ui/utils';

export interface LayoutOption {
  value: string;
  label: string;
  /** Small picture of the layout (see LAYOUT_ICONS). */
  icon: ReactNode;
  /** Extra words for screen readers and the tooltip, e.g. "template default". */
  hint?: string;
}

export interface LayoutOptionPickerProps {
  label: string;
  value: string;
  options: LayoutOption[];
  onChange: (value: string) => void;
  /** Slide field key so click-to-edit can find it (data-field on the group). */
  field?: string;
  className?: string;
}

/**
 * Compact segmented control: each option is a small layout icon plus a short name, all in one row.
 * Native radio buttons underneath, so Tab enters the group and arrow keys move the choice.
 */
export function LayoutOptionPicker({ label, value, options, onChange, field, className }: LayoutOptionPickerProps) {
  const name = useId();
  return (
    <fieldset className={cn('m-0 min-w-0 border-0 p-0', className)} data-field={field}>
      <legend className="mb-1.5 p-0 text-[13px] font-semibold text-[#374151]">{label}</legend>
      <div className="flex gap-0.5 rounded-lg bg-[#F3F4F6] p-0.5">
        {options.map(o => {
          const on = o.value === value;
          return (
            <label
              key={o.value}
              title={o.hint ? `${o.label} (${o.hint})` : undefined}
              className={cn(
                // `relative` anchors the visually-hidden radio inside the label, so focusing it doesn't scroll the panel away
                'relative flex h-8 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-1.5 text-xs transition-colors',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1565F0]',
                on ? 'bg-white font-semibold text-[#1254C7] shadow-[0_1px_2px_rgba(0,0,0,.12)] ring-1 ring-[#93C5FD]' : 'text-[#374151] hover:bg-white/70',
              )}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="sr-only" />
              <span aria-hidden="true" className={cn('flex shrink-0 [&>svg]:h-3.5 [&>svg]:w-5', on ? 'text-[#1565F0]' : 'text-[#6B7280]')}>{o.icon}</span>
              <span className="truncate">{o.label}{o.hint && <span className="sr-only"> ({o.hint})</span>}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const box = { width: 44, height: 30, viewBox: '0 0 44 30', fill: 'currentColor' } as const;

/** Mini diagrams for slide layouts (currentColor). */
export const LAYOUT_ICONS = {
  /** One row of cards that scrolls sideways. */
  scroll: (
    <svg {...box}><rect x="1" y="6" width="12" height="18" rx="2" /><rect x="16" y="6" width="12" height="18" rx="2" /><rect x="31" y="6" width="12" height="18" rx="2" opacity=".45" /><path d="M36 27h6l-2-1.5M42 27l-2 1.5" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
  ),
  /** Equal tiles in rows. */
  grid: (
    <svg {...box}><rect x="1" y="1" width="13" height="13" rx="2" /><rect x="15.5" y="1" width="13" height="13" rx="2" /><rect x="30" y="1" width="13" height="13" rx="2" /><rect x="1" y="16" width="13" height="13" rx="2" /><rect x="15.5" y="16" width="13" height="13" rx="2" /><rect x="30" y="16" width="13" height="13" rx="2" /></svg>
  ),
  /** All items side by side in equal columns, no scrolling. */
  columns: (
    <svg {...box}><rect x="1" y="5" width="13" height="20" rx="2" /><rect x="15.5" y="5" width="13" height="20" rx="2" /><rect x="30" y="5" width="13" height="20" rx="2" /></svg>
  ),
  /** Numbered rows, one under another. */
  stack: (
    <svg {...box}><rect x="1" y="1" width="42" height="8" rx="2" /><rect x="1" y="11" width="42" height="8" rx="2" /><rect x="1" y="21" width="42" height="8" rx="2" /></svg>
  ),
  /** Rows in two columns. */
  twoColumns: (
    <svg {...box}><rect x="1" y="1" width="20" height="8" rx="2" /><rect x="23" y="1" width="20" height="8" rx="2" /><rect x="1" y="11" width="20" height="8" rx="2" /><rect x="23" y="11" width="20" height="8" rx="2" /><rect x="1" y="21" width="20" height="8" rx="2" /></svg>
  ),
  /** Picture shapes (Image + Text "Image style"). */
  shapeRect: <svg {...box}><rect x="4" y="5" width="36" height="20" rx="2" /></svg>,
  shapeSquare: <svg {...box}><rect x="11" y="3" width="22" height="24" rx="2" /></svg>,
  shapeCircle: <svg {...box}><circle cx="22" cy="15" r="12" /></svg>,
  shapeHex: <svg {...box}><polygon points="15,3 29,3 36,15 29,27 15,27 8,15" /></svg>,
  shapeArch: <svg {...box}><path d="M11 27V14a11 11 0 0 1 22 0v13z" /></svg>,
  /** Card with border: picture on top, padded text inside the box. */
  cardBoxed: (
    <svg {...box}><rect x="1" y="1" width="20" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /><rect x="1" y="1" width="20" height="13" rx="3" /><rect x="4" y="18" width="12" height="2.5" rx="1" /><rect x="4" y="23" width="9" height="2" rx="1" opacity=".55" /><rect x="23" y="1" width="20" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /><rect x="23" y="1" width="20" height="13" rx="3" /><rect x="26" y="18" width="12" height="2.5" rx="1" /><rect x="26" y="23" width="9" height="2" rx="1" opacity=".55" /></svg>
  ),
  /** No box: rounded picture with left-aligned text underneath. */
  cardPlain: (
    <svg {...box}><rect x="1" y="1" width="20" height="16" rx="4" /><rect x="1" y="20" width="13" height="2.5" rx="1" /><rect x="1" y="25" width="9" height="2" rx="1" opacity=".55" /><rect x="23" y="1" width="20" height="16" rx="4" /><rect x="23" y="20" width="13" height="2.5" rx="1" /><rect x="23" y="25" width="9" height="2" rx="1" opacity=".55" /></svg>
  ),
  /** Picture on the left, text on the right. */
  imageLeft: (
    <svg {...box}><rect x="1" y="3" width="18" height="24" rx="2" /><rect x="23" y="5" width="19" height="4" rx="1" /><rect x="23" y="13" width="17" height="2" rx="1" opacity=".55" /><rect x="23" y="18" width="19" height="2" rx="1" opacity=".55" /><rect x="23" y="23" width="13" height="2" rx="1" opacity=".55" /></svg>
  ),
  /** Text on the left, picture on the right. */
  imageRight: (
    <svg {...box}><rect x="2" y="5" width="19" height="4" rx="1" /><rect x="2" y="13" width="17" height="2" rx="1" opacity=".55" /><rect x="2" y="18" width="19" height="2" rx="1" opacity=".55" /><rect x="2" y="23" width="13" height="2" rx="1" opacity=".55" /><rect x="25" y="3" width="18" height="24" rx="2" /></svg>
  ),
};

/** Image Gallery card style. */
export const CARD_STYLES: LayoutOption[] = [
  { value: 'boxed', label: 'Card', icon: LAYOUT_ICONS.cardBoxed },
  { value: 'plain', label: 'No box', icon: LAYOUT_ICONS.cardPlain },
];

export const IMAGE_POSITIONS: LayoutOption[] = [
  { value: 'left', label: 'Left', icon: LAYOUT_ICONS.imageLeft, hint: 'image left' },
  { value: 'right', label: 'Right', icon: LAYOUT_ICONS.imageRight, hint: 'image right' },
];

export const HORIZONTAL_SERIES_LAYOUTS: LayoutOption[] = [
  { value: 'scroll', label: 'Scroll row', icon: LAYOUT_ICONS.scroll },
  { value: 'fixed', label: 'Columns', icon: LAYOUT_ICONS.columns },
];

export const VERTICAL_SERIES_LAYOUTS: LayoutOption[] = [
  { value: 'stack', label: 'Stack', icon: LAYOUT_ICONS.stack },
  { value: 'grid', label: 'Two columns', icon: LAYOUT_ICONS.twoColumns },
];

/** Image style options; the first ("Template") shows the current template's own shape, and that shape isn't repeated. */
export function imageStyleOptions(templateShape: 'rect' | 'square' | 'circle' | 'arch' | 'hex', templateShapeName: string): LayoutOption[] {
  const icon = { rect: LAYOUT_ICONS.shapeRect, square: LAYOUT_ICONS.shapeSquare, circle: LAYOUT_ICONS.shapeCircle, arch: LAYOUT_ICONS.shapeArch, hex: LAYOUT_ICONS.shapeHex }[templateShape];
  // The template's own shape is already the first option, so it isn't listed a second time
  const others: LayoutOption[] = [
    { value: 'circle', label: 'Circle', icon: LAYOUT_ICONS.shapeCircle },
    { value: 'square', label: 'Square', icon: LAYOUT_ICONS.shapeSquare },
    { value: 'rect', label: 'Rectangle', icon: LAYOUT_ICONS.shapeRect },
  ];
  return [
    { value: 'template', label: templateShapeName, icon, hint: 'template default' },
    ...others.filter(o => o.value !== templateShape),
  ];
}
