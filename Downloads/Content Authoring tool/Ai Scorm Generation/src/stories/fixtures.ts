import type { CourseTopic } from '../app/courseContent';
import { generateSlideContent } from '../app/courseContent';
import type { PresentationSettings } from '../app/components/CoursePresentation';
import { DESIGN_OPTIONS } from '../app/components/TemplatePopover';

export const COURSE_TITLE = 'Information Security Essentials';

const topic = (id: string, title: string, slideType: string): CourseTopic =>
  generateSlideContent({ id, title, slideType }, COURSE_TITLE, 2);

export const SECTIONS = [
  {
    id: 's1',
    title: 'Getting started',
    description: 'Why information security matters',
    expanded: true,
    topics: [
      topic('t1', 'Welcome to the course', 'title-text'),
      topic('t2', 'Key security principles', 'title-bullets'),
      topic('t3', 'Meet your guide', 'spokesperson'),
    ],
  },
  {
    id: 's2',
    title: 'Protecting data',
    description: 'Everyday habits that keep data safe',
    expanded: true,
    topics: [
      topic('t4', 'Spotting phishing emails', 'scenario'),
      topic('t5', 'Check your understanding', 'quiz'),
      topic('t6', 'Summary', 'summary'),
    ],
  },
];

/** Builds PresentationSettings from one of the editor's design options. */
export function presentationFor(designId = 'corporate'): PresentationSettings {
  const d = DESIGN_OPTIONS.find((o) => o.id === designId) ?? DESIGN_OPTIONS[0];
  return {
    template: d.id,
    primary: d.primary,
    accent: d.accent,
    background: d.bg,
    font: 'Nunito Sans',
    buttonStyle: 'rounded',
    layout: 'default',
  };
}
