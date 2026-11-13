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
