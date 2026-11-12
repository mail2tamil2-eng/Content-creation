import { useRef, useState, type ReactNode } from 'react';
import { Check, Eye } from 'lucide-react';
import { cn } from '../ui/utils';
import { COURSE_TEMPLATES, getTemplate, type CourseTemplate } from './courseTemplates';
import { TemplateSlide } from './TemplateSlide';
import { TemplatePreviewModal } from './TemplatePreviewModal';

export interface TemplateCardProps {
  template: CourseTemplate;
  selected: boolean;
  onSelect: () => void;
  /** Receives the Preview button so focus can return to it when the popup closes. */
  onPreview: (trigger: HTMLButtonElement) => void;
}

// Buttons on the hover layer: hidden (and not clickable) until the card is hovered or focused
const reveal =
  'pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto [@media(hover:none)]:pointer-events-auto ' +
  'inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-semibold shadow-md ' +
  'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2';

/**
 * One template in the picker. The thumbnail is the template's real cover slide.
 * Hover (or keyboard focus) shows a "Preview" button over the thumbnail;
 * on touch screens the button is always visible.
 */
export function TemplateCard({ template, selected, onSelect, onPreview }: TemplateCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl border-2 bg-white transition-[border-color,box-shadow]',
        selected ? 'border-[#1565F0] shadow-[0_0_0_3px_#EBF3FF]' : 'border-[#E5E7EB] hover:border-[#6B7280] hover:shadow-md',
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${template.name} template – ${template.description}`}
        className="block w-full rounded-[10px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
      >
        <span className="block overflow-hidden rounded-t-[10px]">
          <TemplateSlide template={template} kind="cover" label="" className="pointer-events-none" />
        </span>
        <span className="flex items-center justify-between gap-2 px-3 py-2">
          <span className={cn('truncate text-[13px] font-semibold', selected ? 'text-[#1254C7]' : 'text-[#111827]')}>{template.name}</span>
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            {[template.colors.primary, template.colors.accent, template.colors.bg].map((c, i) => (
              <span key={i} className="size-3 rounded-full border border-black/15" style={{ background: c }} />
            ))}
          </span>
        </span>
      </button>

      {selected && (
        <span className="pointer-events-none absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#1565F0] text-white shadow" aria-hidden="true">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}

      {/* Hover layer over the thumbnail: Preview + Use */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex aspect-video items-center justify-center gap-2 rounded-t-[10px] bg-black/0 transition-colors group-hover:bg-black/45 group-focus-within:bg-black/45">
        <button
          type="button"
          onClick={e => onPreview(e.currentTarget)}
          aria-label={`Preview ${template.name} template`}
          className={cn(reveal, 'bg-white text-[#111827] hover:bg-[#F3F4F6]')}
        >
          <Eye className="size-4" aria-hidden="true" /> Preview
        </button>
        {/* Mouse shortcut for selecting; keyboard/screen-reader users select with the card button */}
        <button
          type="button"
          onClick={onSelect}
          tabIndex={-1}
          aria-hidden="true"
          className={cn(reveal, 'bg-[#1565F0] text-white hover:bg-[#1A63E8]', '[@media(hover:none)]:hidden')}
        >
          {selected ? <><Check className="size-4" strokeWidth={3} /> Selected</> : 'Use'}
        </button>
      </div>
    </div>
  );
}

export interface TemplateGalleryProps {
  selectedId: string | null;
  onSelect: (templateId: string) => void;
  templates?: CourseTemplate[];
  /** Number of columns (default 3). */
  columns?: 2 | 3 | 4;
  /** Extra cards appended after the templates (e.g. "Blank"). */
  children?: ReactNode;
  className?: string;
}

const cols = { 2: 'grid-cols-2', 3: 'grid-cols-2 sm:grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' };

/** Grid of template cards + the Preview popup. */
export function TemplateGallery({ selectedId, onSelect, templates = COURSE_TEMPLATES, columns = 3, children, className }: TemplateGalleryProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div className={cn('grid gap-3', cols[columns], className)}>
        {templates.map(t => (
          <TemplateCard
            key={t.id}
            template={t}
            selected={selectedId === t.id}
            onSelect={() => onSelect(t.id)}
            onPreview={el => { triggerRef.current = el; setPreviewId(t.id); }}
          />
        ))}
        {children}
      </div>
      <TemplatePreviewModal
        template={getTemplate(previewId) ?? null}
        selectedId={selectedId}
        onOpenChange={open => { if (!open) setPreviewId(null); }}
        onUse={id => { onSelect(id); setPreviewId(null); }}
        returnFocusTo={triggerRef}
      />
    </>
  );
}
