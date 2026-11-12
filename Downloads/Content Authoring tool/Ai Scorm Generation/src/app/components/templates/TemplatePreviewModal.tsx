import { useEffect, useRef, useState, type RefObject } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, ChevronLeft, ChevronRight, Layers, X } from 'lucide-react';
import { cn } from '../ui/utils';
import { SAMPLE_SLIDES, type CourseTemplate } from './courseTemplates';
import { TemplateSlide } from './TemplateSlide';

export interface TemplatePreviewModalProps {
  /** Template to preview; `null` closes the popup. */
  template: CourseTemplate | null;
  onOpenChange: (open: boolean) => void;
  /** Called with the template id when the user clicks "Use this template". */
  onUse: (templateId: string) => void;
  /** Id of the template already applied to the course (shows "Selected"). */
  selectedId?: string | null;
  /** Element to focus when the popup closes (defaults to Radix behaviour). */
  returnFocusTo?: RefObject<HTMLElement | null>;
}

const iconBtn =
  'inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#374151] ' +
  'hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-40 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2';

/**
 * Popup that shows one sample of every slide layout in a template:
 * large slide on the left, details + "Use this template" on the right,
 * thumbnail strip with previous/next underneath. ← / → change the slide.
 */
export function TemplatePreviewModal({ template, onOpenChange, onUse, selectedId, returnFocusTo }: TemplatePreviewModalProps) {
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const total = SAMPLE_SLIDES.length;

  useEffect(() => { if (template) setIndex(0); }, [template?.id]);
  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [index]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(total - 1, i)));
  const isSelected = !!template && template.id === selectedId;
  const current = SAMPLE_SLIDES[index];

  return (
    <Dialog.Root open={!!template} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[10001] flex max-h-[calc(100vh-32px)] w-[calc(100%-32px)] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
          style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
          onCloseAutoFocus={e => { if (returnFocusTo?.current) { e.preventDefault(); returnFocusTo.current.focus(); } }}
          onKeyDown={e => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
          }}
        >
          {template && (
            <>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close preview" className={cn(iconBtn, 'absolute right-4 top-4 z-10 border-transparent')}>
                  <X className="size-5" />
                </button>
              </Dialog.Close>

              <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-[minmax(0,1fr)_288px] md:p-8">
                {/* Left: big slide + strip */}
                <div className="min-w-0">
                  <div className="overflow-hidden rounded-xl border border-[#E5E7EB] shadow-sm" aria-live="polite">
                    <TemplateSlide template={template} kind={current.kind} label={`${template.name} – ${current.label} sample slide, ${index + 1} of ${total}`} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[13px] text-[#4B5563]">
                    <span className="font-semibold text-[#111827]">{current.label}</span>
                    <span>{index + 1} / {total}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button type="button" className={iconBtn} aria-label="Previous slide" disabled={index === 0} onClick={() => go(index - 1)}>
                      <ChevronLeft className="size-4" />
                    </button>
                    <div ref={stripRef} className="flex min-w-0 flex-1 gap-3 overflow-x-auto px-1 py-1 [scrollbar-width:thin]" role="list" aria-label="Slide layouts">
                      {SAMPLE_SLIDES.map((s, i) => (
                        <div role="listitem" key={s.kind} className="w-[128px] shrink-0">
                          <button
                            type="button"
                            data-index={i}
                            onClick={() => setIndex(i)}
                            aria-current={i === index ? 'true' : undefined}
                            aria-label={`Show ${s.label} slide`}
                            className={cn(
                              'block w-full overflow-hidden rounded-lg border-2 transition-colors',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2',
                              i === index ? 'border-[#1565F0]' : 'border-[#E5E7EB] hover:border-[#6B7280]',
                            )}
                          >
                            <TemplateSlide template={template} kind={s.kind} label="" className="pointer-events-none" />
                          </button>
                          <p className={cn('mt-1 truncate text-center text-xs', i === index ? 'font-semibold text-[#1254C7]' : 'text-[#4B5563]')}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <button type="button" className={iconBtn} aria-label="Next slide" disabled={index === total - 1} onClick={() => go(index + 1)}>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Right: details */}
                <div className="flex flex-col gap-5 md:pt-1">
                  <div className="pr-10">
                    <Dialog.Title className="m-0 text-xl font-bold text-[#111827]">{template.name}</Dialog.Title>
                    <Dialog.Description className="mt-1 text-[13px] text-[#4B5563]">{template.description}</Dialog.Description>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#374151]">
                    <span className="inline-flex items-center gap-1.5"><Layers className="size-4 text-[#6B7280]" aria-hidden="true" />{total} slide layouts</span>
                    <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
                    <span>{template.mode === 'dark' ? 'Dark' : 'Light'} background</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map(t => (
                      <span key={t} className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-semibold text-[#4B5563]">{t}</span>
                    ))}
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.07em] text-[#4B5563]">Colours</p>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {([
                        ['Background', template.colors.bg],
                        ['Primary', template.colors.primary],
                        ['Accent', template.colors.accent],
                        ['Text', template.colors.text],
                      ] as const).map(([name, hex]) => (
                        <li key={name} className="flex items-center gap-2 text-xs text-[#374151]">
                          <span className="size-5 shrink-0 rounded-md border border-black/15" style={{ background: hex }} aria-hidden="true" />
                          <span className="min-w-0"><span className="block font-semibold">{name}</span><span className="font-mono text-[#4B5563]">{hex}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.07em] text-[#4B5563]">Fonts</p>
                    <p className="text-[13px] text-[#374151]">
                      <span style={{ fontFamily: `"${template.fonts.heading}", sans-serif` }} className="font-bold">{template.fonts.heading}</span> headings
                      <br />
                      <span style={{ fontFamily: `"${template.fonts.body}", sans-serif` }}>{template.fonts.body}</span> body text
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => onUse(template.id)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1565F0] px-4 text-sm font-semibold text-white hover:bg-[#1A63E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
                    >
                      {isSelected ? <><Check className="size-4" aria-hidden="true" />Selected – keep this template</> : 'Use this template'}
                    </button>
                    <Dialog.Close asChild>
                      <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2">
                        Close
                      </button>
                    </Dialog.Close>
                    <p className="text-center text-xs text-[#4B5563]">Tip: use ← → to browse slides</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
