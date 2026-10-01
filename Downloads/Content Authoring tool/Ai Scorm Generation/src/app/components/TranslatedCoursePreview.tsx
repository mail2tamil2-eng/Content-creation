import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CoursePresentation, { type PresentationSettings } from './CoursePresentation';
import type { CourseDocument } from '../translation/model';
import type { CourseTopic, SlideOption } from '../courseContent';

function presentationSettings(source: CourseDocument): PresentationSettings {
  const settings = source.settings;
  const saved = settings.presentationSettings && typeof settings.presentationSettings === 'object'
    ? settings.presentationSettings as Record<string, unknown> : {};
  const value = (key: string, fallback: string) => typeof saved[key] === 'string' ? saved[key] as string : fallback;
  const original = (key: string, fallback: string) => typeof settings[key] === 'string' ? settings[key] as string : fallback;
  return {
    template: value('template', original('selectedTemplate', 'vivid-blue')),
    primary: value('primary', original('primaryColor', '#134780')),
    accent: value('accent', original('secondaryColor', '#f48120')),
    background: value('background', settings.themeBackground === 'dark' ? '#111827' : settings.themeBackground === 'warm' ? '#FEF9EE' : '#FFFFFF'),
    font: value('font', original('themeFont', 'Arial')),
    buttonStyle: value('buttonStyle', original('buttonStyle', 'rounded')),
    layout: value('layout', original('slideLayout', 'single')),
    logo: value('logo', '') || undefined,
    foreground: value('foreground', '') || undefined,
  };
}
export default function TranslatedCoursePreview({ course, language, languageLabel }: {
  course: CourseDocument; language: string; languageLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const slides = course.sections.flatMap(section => section.topics.map(topic => ({topic, sectionTitle: section.title})));
  const current = slides[Math.min(index, Math.max(0, slides.length - 1))];
  const settings = presentationSettings(course);
  if (!current) return <p role="status">No slides are available in this course.</p>;
  // Older published courses store a single question directly on the slide.
  const topic = { ...current.topic } as CourseTopic;
  if (!topic.content && typeof current.topic.text === 'string' && !Array.isArray(current.topic.options)) topic.content = current.topic.text;
  if (!topic.questions?.length && Array.isArray(current.topic.options)) {
    topic.questions = [{
      id: topic.id + '-question', type: 'MCQ',
      text: typeof current.topic.text === 'string' ? current.topic.text : topic.title,
      options: current.topic.options as SlideOption[],
      points: typeof current.topic.points === 'number' ? current.topic.points : 1,
    }];
  }
  return <section aria-label={languageLabel + ' translated course preview'} className="overflow-hidden rounded-xl border border-gray-200 bg-white" data-testid="translated-course-preview">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
      <span className="text-sm font-medium text-gray-700">{languageLabel} · Course preview</span>
      <span className="text-xs text-gray-500" aria-live="polite">Slide {index + 1} of {slides.length}</span>
    </div>
    <div lang={language} className="max-h-[65vh] overflow-y-auto">
      <CoursePresentation key={language + ':' + topic.id} topic={topic} courseTitle={course.title} sectionTitle={current.sectionTitle} index={index} total={slides.length} settings={settings} />
    </div>
    <nav aria-label="Translated slide navigation" className="flex flex-wrap items-center gap-3 border-t border-gray-200 p-3">
      <button type="button" aria-label="Previous translated slide" disabled={index === 0} onClick={() => setIndex(i => Math.max(0, i - 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={16} />Previous</button>
      <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-gray-600">Slide
        <select aria-label="Translated slide" value={index} onChange={event => setIndex(Number(event.target.value))} className="min-w-0 w-full rounded-lg border border-gray-200 p-2">
          {slides.map((slide, i) => <option key={slide.topic.id} value={i}>{i + 1}. {slide.topic.title}</option>)}
        </select>
      </label>
      <button type="button" aria-label="Next translated slide" disabled={index >= slides.length - 1} onClick={() => setIndex(i => Math.min(slides.length - 1, i + 1))} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-40">Next<ChevronRight size={16} /></button>
    </nav>
  </section>;
}
