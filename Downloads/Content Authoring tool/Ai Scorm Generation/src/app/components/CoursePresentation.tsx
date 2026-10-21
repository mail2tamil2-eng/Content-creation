import type { CSSProperties } from 'react';
import type { CourseTopic } from '../courseContent';
import CourseSlideContent from './CourseSlideContent';
import './CoursePresentation.css';

export interface PresentationSettings {
  template: string; primary: string; accent: string;
  background: string; font: string; buttonStyle: string; layout: string; logo?: string; foreground?: string;
  showHeader?: boolean;
  headerShowLogo?: boolean;
  headerShowCourseName?: boolean;
  showFooter?: boolean;
  footerShowCourseName?: boolean;
  footerShowPageNum?: boolean;
  footerCopyright?: string;
  footerWatermark?: string;
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
  const showHeader  = settings.showHeader  !== false;
  const showFooter  = settings.showFooter  !== false;
  const hLogo       = settings.headerShowLogo       !== false;
  const hCourseName = settings.headerShowCourseName !== false;
  const fCourseName = settings.footerShowCourseName !== false;
  const fPageNum    = settings.footerShowPageNum    !== false;

  return <article className="course-presentation" style={style} data-testid="course-presentation" data-view="combined" data-template={settings.template} aria-label={'Slide preview: ' + topic.title}>
    <div className={'course-slide course-slide--' + settings.template} data-layout={settings.layout}>
      <div className="course-slide-decoration" aria-hidden="true" />
      {showHeader && (
        <header className="course-slide-header">
          {hLogo && settings.logo && <img src={settings.logo} alt="Course logo" />}
          {hCourseName && <span>{courseTitle || 'Untitled Course'}</span>}
          <span>{String(index + 1).padStart(2, '0')}</span>
        </header>
      )}
      <main className="course-slide-main">
        <p className="course-slide-eyebrow">{sectionTitle || 'Course content'}</p>
        <h2>{topic.title}</h2><div className="course-slide-rule" />
        <CourseSlideContent key={topic.id} topic={topic} />
      </main>
      {showFooter && (
        <footer className="course-slide-footer">
          <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {fCourseName && <span>{courseTitle || 'Untitled Course'}</span>}
            {settings.footerCopyright && <span style={{ opacity: 0.7 }}>{settings.footerCopyright}</span>}
            {settings.footerWatermark && <span style={{ opacity: 0.45, fontWeight: 700, letterSpacing: '0.06em' }}>{settings.footerWatermark}</span>}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw' }}>
            {fPageNum && <span>{index + 1} / {total}</span>}
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6cqw',
                background: settings.primary, color: '#fff',
                borderRadius: settings.buttonStyle === 'pill' ? '999px' : settings.buttonStyle === 'square' ? '0px' : '8px',
                padding: '0.5cqw 1.4cqw',
                fontSize: 'clamp(9px,1.4cqw,14px)', fontWeight: 600,
                letterSpacing: '0.01em', lineHeight: 1,
              }}
            >
              Next ›
            </span>
          </span>
        </footer>
      )}
    </div>
  </article>;
}
