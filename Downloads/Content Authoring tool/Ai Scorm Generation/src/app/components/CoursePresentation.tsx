import type { CSSProperties } from 'react';
import type { CourseTopic } from '../courseContent';
import CourseSlideContent from './CourseSlideContent';
import './CoursePresentation.css';

export interface PresentationSettings {
  template: string; primary: string; accent: string;
  background: string; font: string; buttonStyle: string; layout: string; logo?: string; foreground?: string;
}
export default function CoursePresentation({ topic, courseTitle, sectionTitle, index, total, settings }: {
  topic: CourseTopic; courseTitle: string; sectionTitle?: string; index: number; total: number; settings: PresentationSettings;
}) {

  const background = settings.background;
  const dark = /^#[0-9a-f]{6}$/i.test(background) && (
    parseInt(background.slice(1, 3), 16) * .299 +
    parseInt(background.slice(3, 5), 16) * .587 +
    parseInt(background.slice(5, 7), 16) * .114 < 145
  );
  const foreground = settings.foreground || (dark ? '#ffffff' : '#172033');
  const style = {
    '--slide-bg': background, '--slide-text': foreground,
    '--slide-accent': settings.accent,
    '--slide-primary': settings.primary,
    '--slide-panel': dark ? '#ffffff12' : '#ffffffb3',
    '--slide-radius': settings.buttonStyle === 'pill' ? '24px' : settings.buttonStyle === 'square' ? '0px' : '10px',
    fontFamily: settings.font + ', Arial, sans-serif',
  } as CSSProperties;
  return <article className="course-presentation" style={style} data-testid="course-presentation" data-view="combined" data-template={settings.template} aria-label={'Slide preview: ' + topic.title}>
    <div className={'course-slide course-slide--' + settings.template} data-layout={settings.layout}>
      <div className="course-slide-decoration" aria-hidden="true" />
      <header className="course-slide-header">
        {settings.logo && <img src={settings.logo} alt="Course logo" />}
        <span>{courseTitle || 'Untitled Course'}</span><span>{String(index + 1).padStart(2, '0')}</span>
      </header>
      <main className="course-slide-main">
        <p className="course-slide-eyebrow">{sectionTitle || 'Course content'}</p>
        <h2>{topic.title}</h2><div className="course-slide-rule" />
        <CourseSlideContent key={topic.id} topic={topic} />
      </main>
      <footer className="course-slide-footer"><span>{courseTitle || 'Untitled Course'}</span><span>{index + 1} / {total}</span></footer>
    </div>
  </article>;
}
