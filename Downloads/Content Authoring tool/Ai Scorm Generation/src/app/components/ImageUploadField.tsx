import { forwardRef, useId, useRef, useState } from 'react';
import { ImagePlus, RefreshCw, Trash2 } from 'lucide-react';
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
  { label, value, sampleSrc, onChange, field, maxMb = 10, className }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const id = useId();
  const shown = value || sampleSrc;

  const pick = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file (PNG, JPG, WebP, SVG or GIF).'); return; }
    if (file.size > maxMb * 1024 * 1024) { setError(`Image is larger than ${maxMb} MB.`); return; }
    setError('');
    onChange(URL.createObjectURL(file));
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span id={`${id}-label`} className="text-[13px] font-semibold text-[#374151]">{label}</span>
      <div
        className="relative overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F3F4F6]"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); pick(e.dataTransfer.files?.[0]); }}
      >
        {shown
          ? <img src={shown} alt="" className="block aspect-video w-full object-cover" />
          : <div className="flex aspect-video items-center justify-center text-[#6B7280]"><ImagePlus className="size-6" aria-hidden="true" /></div>}
        {!value && sampleSrc && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">Sample image</span>
        )}
      </div>
      <div className="flex gap-1.5">
        <button
          ref={ref}
          type="button"
          data-field={field}
          aria-describedby={`${id}-label${error ? ` ${id}-err` : ''}`}
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
      <p className="m-0 text-xs text-[#6B7280]">PNG, JPG, WebP, SVG or GIF · max {maxMb} MB · or drop a file on the preview</p>
      {error && <p id={`${id}-err`} role="alert" className="m-0 text-xs font-semibold text-[#B91C1C]">{error}</p>}
      <input ref={inputRef} type="file" accept={ACCEPT} tabIndex={-1} aria-hidden="true" className="sr-only"
        onChange={e => { pick(e.target.files?.[0]); e.target.value = ''; }} />
    </div>
  );
});
