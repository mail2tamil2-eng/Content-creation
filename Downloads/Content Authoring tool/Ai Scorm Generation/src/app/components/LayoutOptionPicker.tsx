import { useId, type ReactNode } from 'react';
import { cn } from './ui/utils';

export interface LayoutOption {
  value: string;
  label: string;
  /** Small picture of the layout (see LAYOUT_ICONS). */
  icon: ReactNode;
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
 * Choose a layout by picture: each option shows a mini diagram plus its name.
 * Native radio buttons underneath, so Tab enters the group and arrow keys move the choice.
 */
export function LayoutOptionPicker({ label, value, options, onChange, field, className }: LayoutOptionPickerProps) {
  const name = useId();
  return (
    <fieldset className={cn('m-0 min-w-0 border-0 p-0', className)} data-field={field}>
      <legend className="mb-1.5 p-0 text-[13px] font-semibold text-[#374151]">{label}</legend>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map(o => {
          const on = o.value === value;
          return (
            <label
              key={o.value}
              className={cn(
                'flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 px-1 pb-1.5 pt-2 text-center text-xs transition-colors',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1565F0] has-[:focus-visible]:ring-offset-2',
                on ? 'border-[#1565F0] bg-[#EBF3FF] font-semibold text-[#1254C7]' : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#6B7280]',
              )}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="sr-only" />
              <span aria-hidden="true" className={on ? 'text-[#1565F0]' : 'text-[#6B7280]'}>{o.icon}</span>
              <span className="leading-tight">{o.label}</span>
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
  /** Picture on the left, text on the right. */
  imageLeft: (
    <svg {...box}><rect x="1" y="3" width="18" height="24" rx="2" /><rect x="23" y="5" width="19" height="4" rx="1" /><rect x="23" y="13" width="17" height="2" rx="1" opacity=".55" /><rect x="23" y="18" width="19" height="2" rx="1" opacity=".55" /><rect x="23" y="23" width="13" height="2" rx="1" opacity=".55" /></svg>
  ),
  /** Text on the left, picture on the right. */
  imageRight: (
    <svg {...box}><rect x="2" y="5" width="19" height="4" rx="1" /><rect x="2" y="13" width="17" height="2" rx="1" opacity=".55" /><rect x="2" y="18" width="19" height="2" rx="1" opacity=".55" /><rect x="2" y="23" width="13" height="2" rx="1" opacity=".55" /><rect x="25" y="3" width="18" height="24" rx="2" /></svg>
  ),
};

export const GALLERY_LAYOUTS: LayoutOption[] = [
  { value: 'horizontal', label: 'Scroll row', icon: LAYOUT_ICONS.scroll },
  { value: 'grid', label: 'Grid', icon: LAYOUT_ICONS.grid },
];

export const IMAGE_POSITIONS: LayoutOption[] = [
  { value: 'left', label: 'Image left', icon: LAYOUT_ICONS.imageLeft },
  { value: 'right', label: 'Image right', icon: LAYOUT_ICONS.imageRight },
];

export const HORIZONTAL_SERIES_LAYOUTS: LayoutOption[] = [
  { value: 'scroll', label: 'Scroll row', icon: LAYOUT_ICONS.scroll },
  { value: 'fixed', label: 'Columns', icon: LAYOUT_ICONS.columns },
];

export const VERTICAL_SERIES_LAYOUTS: LayoutOption[] = [
  { value: 'stack', label: 'Stack', icon: LAYOUT_ICONS.stack },
  { value: 'grid', label: 'Two columns', icon: LAYOUT_ICONS.twoColumns },
];

/** Image style options; the first ("Template") shows the current template's own shape. */
export function imageStyleOptions(templateShape: 'rect' | 'square' | 'circle' | 'arch' | 'hex', templateShapeName: string): LayoutOption[] {
  const icon = { rect: LAYOUT_ICONS.shapeRect, square: LAYOUT_ICONS.shapeSquare, circle: LAYOUT_ICONS.shapeCircle, arch: LAYOUT_ICONS.shapeArch, hex: LAYOUT_ICONS.shapeHex }[templateShape];
  return [
    { value: 'template', label: `Template (${templateShapeName})`, icon },
    { value: 'circle', label: 'Circle', icon: LAYOUT_ICONS.shapeCircle },
    { value: 'square', label: 'Square', icon: LAYOUT_ICONS.shapeSquare },
    { value: 'rect', label: 'Rectangle', icon: LAYOUT_ICONS.shapeRect },
  ];
}
