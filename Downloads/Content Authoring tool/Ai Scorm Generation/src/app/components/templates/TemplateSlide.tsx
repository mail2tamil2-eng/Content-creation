import type { CSSProperties } from 'react';
import { cn } from '../ui/utils';
import type { CourseTemplate, SampleSlideKind, TemplateMotif } from './courseTemplates';
import { SAMPLE_SLIDES } from './courseTemplates';
import './TemplateSlide.css';

/** CSS custom properties for a template (shared by samples and real slides). */
export function templateVars(t: CourseTemplate): CSSProperties {
  return {
    '--t-bg': t.colors.bg,
    '--t-surface': t.colors.surface,
    '--t-primary': t.colors.primary,
    '--t-on-primary': t.colors.onPrimary,
    '--t-accent': t.colors.accent,
    '--t-text': t.colors.text,
    '--t-muted': t.colors.muted,
    '--t-radius': `${(t.radius / 12.8).toFixed(3)}cqw`,
    '--t-btn-radius': t.buttonStyle === 'pill' ? '999px' : t.buttonStyle === 'square' ? '0px' : `${(t.radius / 12.8).toFixed(3)}cqw`,
    '--t-heading': `"${t.fonts.heading}", "Nunito Sans", system-ui, sans-serif`,
    '--t-body': `"${t.fonts.body}", "Nunito Sans", system-ui, sans-serif`,
  } as CSSProperties;
}

/**
 * Decorative shapes for a template. `strong` is used on cover/section/closing
 * slides; the subtle version is used on content slides (and in the editor).
 * Colours come from --t-primary / --t-accent so user colour overrides apply.
 */
export function TemplateMotifLayer({ motif, strong = false }: { motif: TemplateMotif; strong?: boolean }) {
  return (
    <div className={cn('tm', `tm--${motif}`, strong && 'tm--strong')} aria-hidden="true">
      <span className="tm-a" />
      <span className="tm-b" />
      <span className="tm-c" />
    </div>
  );
}

/** Placeholder artwork that stands in for a photo in sample slides. */
function ImageArt({ className, label = 'Your image' }: { className?: string; label?: string }) {
  return (
    <div className={cn('ts-image', className)}>
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="118" cy="30" r="13" fill="#fff" opacity=".55" />
        <path d="M0 100 L46 48 L78 80 L104 58 L160 100 Z" fill="#fff" opacity=".35" />
        <path d="M0 100 L30 70 L64 100 Z" fill="#fff" opacity=".25" />
      </svg>
      <span className="ts-image-label">{label}</span>
    </div>
  );
}

const COURSE = 'Leading Through Change';

function SlideBody({ kind, template }: { kind: SampleSlideKind; template: CourseTemplate }) {
  const shape = `ts-shape--${template.cover.imageShape}`;
  switch (kind) {
    case 'cover': {
      const { layout } = template.cover;
      const hasImage = layout !== 'centered' && layout !== 'type-only';
      return (
        <div className={cn('ts-cover', `ts-cover--${layout}`)}>
          {layout === 'full-bleed' && <ImageArt className="ts-cover-bleed" label="Your background image" />}
          <div className="ts-cover-text">
            <p className="ts-eyebrow">Course · 25 min</p>
            <p className="ts-h1">{COURSE}</p>
            <p className="ts-lead">Practical tools to guide your team with confidence.</p>
            <span className="ts-btn">Start course ›</span>
          </div>
          {hasImage && layout !== 'full-bleed' && <ImageArt className={cn('ts-cover-image', shape)} />}
        </div>
      );
    }
    case 'section':
      return (
        <div className="ts-section">
          <span className="ts-section-num">02</span>
          <div>
            <p className="ts-eyebrow">Section</p>
            <p className="ts-h1">Building trust in your team</p>
            <span className="ts-rule" />
            <p className="ts-lead">3 slides · Knowledge check at the end</p>
          </div>
        </div>
      );
    case 'title-text':
      return (
        <div className="ts-narrow">
          <p className="ts-eyebrow">Introduction</p>
          <p className="ts-h2">Why change feels hard</p>
          <span className="ts-rule" />
          <p className="ts-p">People resist change when they don’t understand the reason behind it. As a leader, your first job is to explain the “why” clearly and often.</p>
          <p className="ts-p">In this module you’ll learn how to plan the message, listen to concerns and keep momentum.</p>
        </div>
      );
    case 'bullets':
      return (
        <div>
          <p className="ts-eyebrow">Key points</p>
          <p className="ts-h2">Signs your team needs support</p>
          <ul className="ts-bullets">
            <li><b>Less sharing.</b> People stop raising ideas in meetings.</li>
            <li><b>More rework.</b> Tasks are repeated because goals are unclear.</li>
            <li><b>Missed deadlines.</b> Priorities change without explanation.</li>
            <li><b>Quiet exits.</b> Strong performers start to disengage.</li>
          </ul>
        </div>
      );
    case 'image-text':
      return (
        <div className="ts-split">
          <ImageArt className={cn('ts-split-image', shape)} />
          <div>
            <p className="ts-eyebrow">Case study</p>
            <p className="ts-h2">Priya’s first 90 days</p>
            <span className="ts-rule" />
            <p className="ts-p">Priya took over a team mid-project. She held one-to-ones in week one and asked each person what was blocking them.</p>
            <span className="ts-chip">Tip · Listen before you act</span>
          </div>
        </div>
      );
    case 'comparison':
      return (
        <div>
          <p className="ts-eyebrow">Compare</p>
          <p className="ts-h2">Manager vs. Leader</p>
          <div className="ts-compare">
            <div className="ts-card">
              <p className="ts-card-head ts-card-head--solid">Manager</p>
              <p className="ts-row">Plans the work</p>
              <p className="ts-row">Controls the process</p>
              <p className="ts-row">Focuses on today</p>
            </div>
            <div className="ts-card">
              <p className="ts-card-head">Leader</p>
              <p className="ts-row">Shares the vision</p>
              <p className="ts-row">Builds trust</p>
              <p className="ts-row">Prepares for tomorrow</p>
            </div>
          </div>
        </div>
      );
    case 'process':
      return (
        <div>
          <p className="ts-eyebrow">Process</p>
          <p className="ts-h2">The 3-step feedback model</p>
          <div className="ts-steps">
            {[
              ['Observe', 'Describe what you saw, not what you assume.'],
              ['Impact', 'Explain how it affected the team or customer.'],
              ['Agree', 'Decide the next step together and follow up.'],
            ].map(([title, text], i) => (
              <div className="ts-step" key={title}>
                <span className="ts-step-num">{i + 1}</span>
                <p className="ts-step-title">{title}</p>
                <p className="ts-step-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'quote':
      return (
        <div className="ts-quote">
          <span className="ts-quote-mark">“</span>
          <p className="ts-quote-text">People don’t resist change. They resist being changed.</p>
          <p className="ts-quote-by">— Peter Senge, systems scientist</p>
        </div>
      );
    case 'quiz':
      return (
        <div>
          <p className="ts-eyebrow">Knowledge check · 1 of 3</p>
          <p className="ts-h3">A team member misses a deadline. What should you do first?</p>
          <div className="ts-options">
            <p className="ts-option"><span className="ts-radio" />Escalate to HR straight away</p>
            <p className="ts-option ts-option--selected"><span className="ts-radio" />Ask what got in the way and listen</p>
            <p className="ts-option"><span className="ts-radio" />Reassign the work to someone else</p>
          </div>
          <div className="ts-quiz-foot">
            <p className="ts-feedback">✓ Correct — understand the cause before acting.</p>
            <span className="ts-btn">Submit</span>
          </div>
        </div>
      );
    case 'closing':
      return (
        <div className="ts-closing">
          <div>
            <p className="ts-eyebrow">Summary</p>
            <p className="ts-h2">Key takeaways</p>
            <ul className="ts-checks">
              <li><span className="ts-check">✓</span>Explain the “why” behind every change</li>
              <li><span className="ts-check">✓</span>Listen first, then decide together</li>
              <li><span className="ts-check">✓</span>Give feedback that is specific and timely</li>
            </ul>
          </div>
          <div className="ts-finish">
            <p className="ts-finish-title">Well done!</p>
            <p className="ts-p">You have completed the course.</p>
            <span className="ts-btn">Finish course</span>
          </div>
        </div>
      );
  }
}

const STRONG: SampleSlideKind[] = ['cover', 'section', 'quote', 'closing'];

export interface TemplateSlideProps {
  template: CourseTemplate;
  kind?: SampleSlideKind;
  className?: string;
  /** Accessible name; defaults to "<template> – <layout> sample slide". Pass '' when the slide is decorative. */
  label?: string;
}

/** A 16:9 sample slide rendered in the template's real design. Scales to any width. */
export function TemplateSlide({ template, kind = 'cover', className, label }: TemplateSlideProps) {
  const layout = SAMPLE_SLIDES.find(s => s.kind === kind)?.label ?? kind;
  return (
    <div
      className={cn('ts-frame', className)}
      {...(label === '' ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label ?? `${template.name} – ${layout} sample slide` })}
    >
      <div className={cn('ts', `ts--${kind}`, `ts--${template.mode}`)} style={templateVars(template)} data-template={template.id}>
        <TemplateMotifLayer motif={template.motif} strong={STRONG.includes(kind)} />
        <div className="ts-inner">
          <SlideBody kind={kind} template={template} />
        </div>
      </div>
    </div>
  );
}
