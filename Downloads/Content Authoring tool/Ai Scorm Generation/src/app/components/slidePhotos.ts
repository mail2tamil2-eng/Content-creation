import { createContext, useContext } from 'react';
import { COURSE_TEMPLATES, getTemplate } from './templates/courseTemplates';

/**
 * Sample photos shown in image areas until the author uploads their own
 * (bundled Unsplash photos, see docs/templates/PHOTO_CREDITS.md).
 * The current template's photos come first so slides match the chosen design.
 */
const POOL: string[] = COURSE_TEMPLATES.flatMap(t => [t.photos.feature, t.photos.cover].filter((p): p is string => !!p));

export function samplePhoto(templateId: string | undefined, index: number): string {
  const t = getTemplate(templateId ?? null);
  const own = t ? [t.photos.feature, t.photos.cover].filter((p): p is string => !!p) : [];
  const list = [...own, ...POOL.filter(p => !own.includes(p))];
  return list[((index % list.length) + list.length) % list.length];
}

/** Template id of the slide being rendered (set by CoursePresentation). */
export const SlideTemplateContext = createContext<string | undefined>(undefined);
export const useSlideTemplate = () => useContext(SlideTemplateContext);

/** Picture shapes for Image + Text. 'template' follows the course template's cover shape. */
export type ImageStyle = 'template' | 'circle' | 'square' | 'rect';
export type ResolvedShape = 'rect' | 'square' | 'circle' | 'arch' | 'hex';

const SHAPE_NAMES: Record<ResolvedShape, string> = { rect: 'Rectangle', square: 'Square', circle: 'Circle', arch: 'Arch', hex: 'Hexagon' };

/** The template's own picture shape (from its cover design). */
export function templateShape(templateId: string | undefined): ResolvedShape {
  return getTemplate(templateId ?? null)?.cover.imageShape ?? 'rect';
}
export function resolveImageShape(style: string | undefined, templateId: string | undefined): ResolvedShape {
  if (style === 'circle' || style === 'square' || style === 'rect') return style;
  return templateShape(templateId);
}
export const shapeName = (s: ResolvedShape) => SHAPE_NAMES[s];
