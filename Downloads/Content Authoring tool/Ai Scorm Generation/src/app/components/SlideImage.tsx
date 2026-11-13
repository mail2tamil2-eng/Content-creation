import type { CSSProperties } from 'react';
import { useSlideEdit } from './slideEdit';
import { samplePhoto, useSlideTemplate } from './slidePhotos';

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
}

/**
 * Photo on a slide. Shows the uploaded image or a sample photo matched to the template.
 * In the Step 2 editor it is selectable: hover outline + label, click/Enter opens its
 * upload control in Slide Settings; a "Sample" tag marks photos that still need replacing.
 */
export function SlideImage({ k, label, src, alt = '', sampleIndex = 0, position, style }: SlideImageProps) {
  const ctx = useSlideEdit();
  const template = useSlideTemplate();
  const isSample = !src;
  const photo = src || samplePhoto(template, sampleIndex);
  const img = <img src={photo} alt={isSample ? '' : alt} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }} />;
  const box: CSSProperties = { position: 'relative', overflow: 'hidden', ...style };

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
