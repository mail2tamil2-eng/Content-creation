import type { CSSProperties } from 'react';
import { useSlideEdit } from './slideEdit';
import { samplePhoto, useSlideTemplate, type ResolvedShape } from './slidePhotos';

export interface SlideImageProps {
  /** Field key of the image URL, e.g. 'imageCards.0.image' (the panel's upload button has the same data-field). */
  k: string;
  /** Name for the hover chip and screen readers, e.g. "Card 1 image". */
  label: string;
  src?: string;
  alt?: string;
  /** Which sample photo to show while nothing is uploaded. */
  sampleIndex?: number;
  /** CSS object-position for the photo. */
  position?: string;
  style?: CSSProperties;
  /** Crop shape (default rectangle). */
  shape?: ResolvedShape;
}

/** Box proportions for each shape (on the wrapper) and the crop (on the picture itself, so tags and outlines stay visible). */
function shapeBox(shape: ResolvedShape | undefined): CSSProperties {
  if (shape === 'circle' || shape === 'square') return { aspectRatio: '1', height: 'auto', minHeight: 0 };
  if (shape === 'hex') return { aspectRatio: '1.1', height: 'auto', minHeight: 0, borderRadius: 0 };
  return {};
}
function shapeCrop(shape: ResolvedShape | undefined): CSSProperties {
  switch (shape) {
    case 'circle': return { borderRadius: '50%' };
    case 'hex':    return { clipPath: 'polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)' };
    case 'arch':   return { borderRadius: '999px 999px var(--slide-radius) var(--slide-radius)' };
    case 'square': return { borderRadius: 'var(--slide-radius)' };
    default:       return {};
  }
}
const cropped = (shape: ResolvedShape | undefined) => shape === 'circle' || shape === 'hex' || shape === 'arch';

export function SlideImage({ k, label, src, alt = '', sampleIndex = 0, position, style, shape }: SlideImageProps) {
  const ctx = useSlideEdit();
  const template = useSlideTemplate();
  const isSample = !src;
  const photo = src || samplePhoto(template, sampleIndex);
  const img = <img src={photo} alt={isSample ? '' : alt} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, ...shapeCrop(shape) }} />;
  const box: CSSProperties = { position: 'relative', overflow: cropped(shape) ? 'visible' : 'hidden', ...style, ...shapeBox(shape), ...(cropped(shape) ? { borderRadius: 0 } : {}) };

  if (!ctx?.editable) return <div style={box}>{img}</div>;

  const selected = ctx.selected === k;
  return (
    <div
      data-edit={k}
      data-edit-label={`${label} · click to change`}
      className={'se-editable se-image' + (selected ? ' se-selected' : '')}
      role="button"
      tabIndex={0}
      aria-label={`${label}${isSample ? ' (sample image)' : ''}. Change image`}
      aria-pressed={selected}
      style={{ ...box, display: 'block', cursor: 'pointer' }}
      onClick={e => { e.stopPropagation(); ctx.select(k); }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.select(k); } }}
    >
      {img}
      {isSample && <span aria-hidden="true" className="se-sample-tag">Sample</span>}
    </div>
  );
}
