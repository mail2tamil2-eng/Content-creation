import { forwardRef, useId, useRef, useState } from 'react';
import { ImagePlus, Images, Loader2, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { AssetLibraryDialog } from './AssetLibraryDialog';
import { cn } from './ui/utils';

export interface ImageUploadFieldProps {
  /** Visible label, e.g. "Card 1 image". */
  label: string;
  /** Uploaded image URL ('' = none). */
  value: string;
  /** Photo shown while nothing is uploaded (marked "Sample"). */
  sampleSrc?: string;
  onChange: (url: string) => void;
  /** Slide field key so click-to-edit can focus this control (data-field). */
  field?: string;
  /**
   * Show "Regenerate" (AI). Resolves with the new image URL; the field shows a loading state,
   * announces the result and calls onChange.
   */
  onRegenerate?: () => Promise<string>;
  /** Marks the current value as an AI image ("AI image" tag instead of nothing). */
  generated?: boolean;
  /** Show "Choose from Asset Library" (default true). */
  library?: boolean;
  /** Recommended image size for this slot, e.g. "1200 × 960 px (5:4)". */
  recommendedSize?: string;
  /**
   * Compact layout: Upload / Library / AI sit in one row, Remove sits on the picture and the
   * hint is one line.
   */
  compact?: boolean;
  /** Compact only: hide the label visually (e.g. inside a titled card). */
  hideLabel?: boolean;
  /** Max size in MB (default 10). */
  maxMb?: number;
  className?: string;
}

const ACCEPT = 'image/png,image/jpeg,image/webp,image/svg+xml,image/gif';

/**
 * Image picker for slide settings: thumbnail of the current image (or the sample photo),
 * an Upload / Replace button that opens the file dialog, and Remove for uploaded images.
 * Errors (wrong type, too large) are announced.
 */
export const ImageUploadField = forwardRef<HTMLButtonElement, ImageUploadFieldProps>(function ImageUploadField(
  { label, value, sampleSrc, onChange, onRegenerate, generated, field, library = true, recommendedSize, compact = false, hideLabel = false, maxMb = 10, className }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [libOpen, setLibOpen] = useState(false);
  const libBtn = useRef<HTMLButtonElement>(null);
  /** URL last picked from the Asset Library (so it isn't tagged as an AI image). */
  const [libPick, setLibPick] = useState('');
  const id = useId();
  const shown = value || sampleSrc;

  const pick = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file (PNG, JPG, WebP, SVG or GIF).'); return; }
    if (file.size > maxMb * 1024 * 1024) { setError(`Image is larger than ${maxMb} MB.`); return; }
    setError('');
    onChange(URL.createObjectURL(file));
  };

  const regenerate = async () => {
    if (!onRegenerate || busy) return;
    setBusy(true); setError(''); setStatus('Generating a new image…');
    try {
      onChange(await onRegenerate());
      setStatus('New image generated.');
    } catch {
      setStatus('');
      setError('Couldn’t generate an image. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const btn = 'inline-flex h-8 min-w-0 flex-1 items-center justify-center gap-1 rounded-[7px] border border-[#D1D5DB] bg-white px-1.5 text-xs font-semibold text-[#111827] hover:bg-[#F9FAFB] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1';
  const preview = (
    <div
      className="relative overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F3F4F6]"
      aria-busy={busy || undefined}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); pick(e.dataTransfer.files?.[0]); }}
    >
      {shown
        ? <img src={shown} alt="" className={cn('block w-full object-cover', compact ? 'aspect-[16/7]' : 'aspect-video')} />
        : <div className={cn('flex items-center justify-center text-[#6B7280]', compact ? 'aspect-[16/7]' : 'aspect-video')}><ImagePlus className="size-6" aria-hidden="true" /></div>}
      {!value && sampleSrc && !busy && (
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">{compact ? 'Sample' : 'Sample image'}</span>
      )}
      {value && generated && value !== libPick && !busy && (
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          <Sparkles className="size-3" aria-hidden="true" />AI image
        </span>
      )}
      {compact && value && !busy && (
        <button type="button" onClick={() => { onChange(''); setError(''); }} aria-label={`Remove ${label.toLowerCase()}`} title="Remove image"
          className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-md bg-white/95 text-[#B91C1C] shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
          <Trash2 className="size-3.5" aria-hidden="true" />
        </button>
      )}
      {busy && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#111827]/70 text-xs font-semibold text-white">
          <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Generating…
        </div>
      )}
    </div>
  );

  if (compact) return (
    <div className={cn('flex flex-col gap-1.5', className)} role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className={hideLabel ? 'sr-only' : 'text-[13px] font-semibold text-[#374151]'}>{label}</span>
      {preview}
      <div className="flex gap-1.5">
        <button ref={ref} type="button" data-field={field} className={btn}
          aria-label={`${value ? 'Replace' : 'Upload'} ${label.toLowerCase()}`}
          aria-describedby={`${id}-hint${error ? ` ${id}-err` : ''}`}
          onClick={() => inputRef.current?.click()}>
          {value ? <RefreshCw className="size-3.5 shrink-0" aria-hidden="true" /> : <ImagePlus className="size-3.5 shrink-0" aria-hidden="true" />}
          {value ? 'Replace' : 'Upload'}
        </button>
        {library && (
          <button ref={libBtn} type="button" className={btn} aria-haspopup="dialog" aria-label={`Choose ${label.toLowerCase()} from Asset Library`} onClick={() => setLibOpen(true)}>
            <Images className="size-3.5 shrink-0" aria-hidden="true" />Library
          </button>
        )}
        {onRegenerate && (
          <button type="button" onClick={regenerate} disabled={busy} aria-label={`Generate ${label.toLowerCase()} with AI`}
            className={cn(btn, 'border-[#93C5FD] bg-[#EBF3FF] text-[#1254C7] hover:bg-[#DBEAFE]')}>
            {busy ? <Loader2 className="size-3.5 shrink-0 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Sparkles className="size-3.5 shrink-0" aria-hidden="true" />}
            AI
          </button>
        )}
      </div>
      <p id={`${id}-hint`} className="m-0 text-xs text-[#6B7280]" title="PNG, JPG, WebP, SVG or GIF">
        {recommendedSize ? <><span className="font-semibold text-[#374151]">{recommendedSize.replace(/ \(.*\)$/, '')}</span> recommended · </> : null}max {maxMb} MB
      </p>
      <p role="status" className="sr-only">{status}</p>
      {error && <p id={`${id}-err`} role="alert" className="m-0 text-xs font-semibold text-[#B91C1C]">{error}</p>}
      {library && (
        <AssetLibraryDialog returnFocusRef={libBtn} open={libOpen} onOpenChange={setLibOpen} current={value || undefined}
          onSelect={src => { setError(''); setLibPick(src); onChange(src); setStatus('Image added from the Asset Library.'); }} />
      )}
      <input ref={inputRef} type="file" accept={ACCEPT} tabIndex={-1} aria-hidden="true" className="sr-only"
        onChange={e => { pick(e.target.files?.[0]); e.target.value = ''; }} />
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span id={`${id}-label`} className="text-[13px] font-semibold text-[#374151]">{label}</span>
      {preview}
      <div className="flex gap-1.5">
        <button
          ref={ref}
          type="button"
          data-field={field}
          aria-describedby={`${id}-label${recommendedSize ? ` ${id}-size` : ''}${error ? ` ${id}-err` : ''}`}
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[7px] border border-[#6B7280] bg-white px-3 text-[13px] font-semibold text-[#111827] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
        >
          {value ? <RefreshCw className="size-3.5" aria-hidden="true" /> : <ImagePlus className="size-3.5" aria-hidden="true" />}
          {value ? 'Replace image' : 'Upload image'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); setError(''); }}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="inline-flex size-9 items-center justify-center rounded-[7px] border border-[#6B7280] bg-white text-[#B91C1C] hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {library && (
        <button
          ref={libBtn}
          type="button"
          onClick={() => setLibOpen(true)}
          aria-haspopup="dialog"
          aria-describedby={`${id}-label`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[7px] border border-[#6B7280] bg-white px-3 text-[13px] font-semibold text-[#111827] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
        >
          <Images className="size-3.5" aria-hidden="true" />
          Choose from Asset Library
        </button>
      )}
      {onRegenerate && (
        <button
          type="button"
          onClick={regenerate}
          disabled={busy}
          aria-describedby={`${id}-label`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[7px] border border-[#93C5FD] bg-[#EBF3FF] px-3 text-[13px] font-semibold text-[#1254C7] hover:bg-[#DBEAFE] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2"
        >
          {busy
            ? <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            : <Sparkles className="size-3.5" aria-hidden="true" />}
          {busy ? 'Generating…' : 'Regenerate with AI'}
        </button>
      )}
      {recommendedSize && (
        <p id={`${id}-size`} className="m-0 text-xs text-[#374151]">
          <span className="font-semibold">Recommended size:</span> {recommendedSize}
        </p>
      )}
      <p className="m-0 text-xs text-[#6B7280]">PNG, JPG, WebP, SVG or GIF · max {maxMb} MB · or drop a file on the preview</p>
      <p role="status" className="sr-only">{status}</p>
      {error && <p id={`${id}-err`} role="alert" className="m-0 text-xs font-semibold text-[#B91C1C]">{error}</p>}
      {library && (
        <AssetLibraryDialog returnFocusRef={libBtn} open={libOpen} onOpenChange={setLibOpen} current={value || undefined}
          onSelect={src => { setError(''); setLibPick(src); onChange(src); setStatus('Image added from the Asset Library.'); }} />
      )}
      <input ref={inputRef} type="file" accept={ACCEPT} tabIndex={-1} aria-hidden="true" className="sr-only"
        onChange={e => { pick(e.target.files?.[0]); e.target.value = ''; }} />
    </div>
  );
});
