/**
 * Course slide templates.
 *
 * Each template is a full design: colours, fonts, corner radius and a decorative
 * "motif" that is drawn on every slide. The same tokens drive
 *   - the real-design thumbnails in the template picker,
 *   - the "Preview" popup (one sample of every slide layout),
 *   - the slides in the editor and SCORM player (CoursePresentation).
 *
 * Design reference canvas: 1280 × 720 (16:9). All sizes in TemplateSlide.css are
 * expressed in `cqw` (1cqw = 12.8px on that canvas) so a slide scales from a
 * 200px thumbnail to a full-screen player without changing proportions.
 *
 * Contrast (WCAG 2.2 AA) has been checked for every text/background pair used:
 * text on bg, muted on bg, text on surface, onPrimary on primary (all ≥ 4.5:1).
 * `accent` is decorative only — never used for body text.
 */

export type TemplateMotif =
  | 'side-band'      // solid primary band on the left edge + accent bar
  | 'gold-frame'     // thin accent frame + corner rules
  | 'soft-blobs'     // large rounded blobs in the corners
  | 'diagonal'       // diagonal colour block on the right
  | 'circles'        // overlapping circles, top-right
  | 'arc'            // big quarter-circle arc, bottom-right
  | 'hexagons'       // hexagon cluster
  | 'red-rule'       // minimal: short accent rule + hairline
  | 'dot-grid'       // dotted grid + glow
  | 'paper';         // warm paper with corner stripe

export interface TemplateColors {
  /** Slide background */
  bg: string;
  /** Cards, panels, answer options */
  surface: string;
  /** Headings accents, number badges, buttons */
  primary: string;
  /** Text/icons placed on `primary` */
  onPrimary: string;
  /** Decorative shapes only */
  accent: string;
  /** Headings and body text */
  text: string;
  /** Secondary text (eyebrows, captions) */
  muted: string;
}

export type CoverLayout = 'image-right' | 'image-left' | 'split' | 'full-bleed' | 'centered' | 'type-only';
export type ImageShape = 'rect' | 'circle' | 'arch' | 'hex';

export interface CourseTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
  mode: 'light' | 'dark';
  colors: TemplateColors;
  fonts: { heading: string; body: string };
  /** Corner radius for cards/buttons, in px on the 1280px canvas */
  radius: number;
  buttonStyle: 'rounded' | 'pill' | 'square';
  motif: TemplateMotif;
  /** Title-slide composition and the shape used for images in this template. */
  cover: { layout: CoverLayout; imageShape: ImageShape };
}

export const COURSE_TEMPLATES: CourseTemplate[] = [
  {
    id: 'tpl-corporate-navy', name: 'Corporate Navy', description: 'Clear, trusted and professional',
    tags: ['Corporate', 'Compliance'], mode: 'light',
    colors: { bg: '#FFFFFF', surface: '#F1F5F9', primary: '#154880', onPrimary: '#FFFFFF', accent: '#F48120', text: '#0F172A', muted: '#475569' },
    fonts: { heading: 'Montserrat', body: 'Inter' }, radius: 10, buttonStyle: 'rounded', motif: 'side-band',
    cover: { layout: 'image-right', imageShape: 'rect' },
  },
  {
    id: 'tpl-executive-gold', name: 'Executive Gold', description: 'Dark, premium and refined',
    tags: ['Leadership', 'Premium'], mode: 'dark',
    colors: { bg: '#0F172A', surface: '#1E293B', primary: '#D4A843', onPrimary: '#0F172A', accent: '#D4A843', text: '#F8FAFC', muted: '#CBD5E1' },
    fonts: { heading: 'Playfair Display', body: 'Inter' }, radius: 4, buttonStyle: 'square', motif: 'gold-frame',
    cover: { layout: 'centered', imageShape: 'rect' },
  },
  {
    id: 'tpl-fresh-mint', name: 'Fresh Mint', description: 'Light, friendly and modern',
    tags: ['Onboarding', 'Wellbeing'], mode: 'light',
    colors: { bg: '#FFFFFF', surface: '#F0FDFA', primary: '#0F766E', onPrimary: '#FFFFFF', accent: '#5EEAD4', text: '#134E4A', muted: '#3F5F5B' },
    fonts: { heading: 'Poppins', body: 'Poppins' }, radius: 18, buttonStyle: 'pill', motif: 'soft-blobs',
    cover: { layout: 'image-left', imageShape: 'arch' },
  },
  {
    id: 'tpl-sunrise-coral', name: 'Sunrise Coral', description: 'Warm, energetic and bold',
    tags: ['Sales', 'Customer service'], mode: 'light',
    colors: { bg: '#FFF7ED', surface: '#FFFFFF', primary: '#C2410C', onPrimary: '#FFFFFF', accent: '#FB923C', text: '#431407', muted: '#7C2D12' },
    fonts: { heading: 'Montserrat', body: 'Lato' }, radius: 12, buttonStyle: 'rounded', motif: 'diagonal',
    cover: { layout: 'split', imageShape: 'rect' },
  },
  {
    id: 'tpl-ocean-breeze', name: 'Ocean Breeze', description: 'Calm blue, airy and clean',
    tags: ['Healthcare', 'General'], mode: 'light',
    colors: { bg: '#F0F7FF', surface: '#FFFFFF', primary: '#1D4ED8', onPrimary: '#FFFFFF', accent: '#38BDF8', text: '#0C1E3E', muted: '#334E7A' },
    fonts: { heading: 'Inter', body: 'Inter' }, radius: 14, buttonStyle: 'rounded', motif: 'circles',
    cover: { layout: 'image-right', imageShape: 'circle' },
  },
  {
    id: 'tpl-royal-plum', name: 'Royal Plum', description: 'Rich purple with pink highlights',
    tags: ['Creative', 'Marketing'], mode: 'dark',
    colors: { bg: '#2E1065', surface: '#3B1C78', primary: '#F472B6', onPrimary: '#2E1065', accent: '#F472B6', text: '#FFFFFF', muted: '#DDD6FE' },
    fonts: { heading: 'Montserrat', body: 'Lato' }, radius: 16, buttonStyle: 'pill', motif: 'arc',
    cover: { layout: 'full-bleed', imageShape: 'rect' },
  },
  {
    id: 'tpl-forest-hexa', name: 'Forest Hexa', description: 'Deep green with lime hexagons',
    tags: ['Sustainability', 'Safety'], mode: 'dark',
    colors: { bg: '#052E16', surface: '#14532D', primary: '#A3E635', onPrimary: '#052E16', accent: '#A3E635', text: '#F0FDF4', muted: '#BBF7D0' },
    fonts: { heading: 'Poppins', body: 'Inter' }, radius: 10, buttonStyle: 'rounded', motif: 'hexagons',
    cover: { layout: 'image-left', imageShape: 'hex' },
  },
  {
    id: 'tpl-minimal-mono', name: 'Minimal Mono', description: 'White space, black type, red accent',
    tags: ['Minimal', 'Policy'], mode: 'light',
    colors: { bg: '#FFFFFF', surface: '#F5F5F5', primary: '#111827', onPrimary: '#FFFFFF', accent: '#E11D48', text: '#111827', muted: '#4B5563' },
    fonts: { heading: 'Inter', body: 'Inter' }, radius: 0, buttonStyle: 'square', motif: 'red-rule',
    cover: { layout: 'type-only', imageShape: 'rect' },
  },
  {
    id: 'tpl-tech-grid', name: 'Tech Grid', description: 'Dark slate with cyan glow',
    tags: ['IT', 'Cyber security'], mode: 'dark',
    colors: { bg: '#0B1120', surface: '#111C33', primary: '#22D3EE', onPrimary: '#0B1120', accent: '#22D3EE', text: '#E2E8F0', muted: '#A5B4C8' },
    fonts: { heading: 'Space Grotesk', body: 'Inter' }, radius: 8, buttonStyle: 'rounded', motif: 'dot-grid',
    cover: { layout: 'image-left', imageShape: 'rect' },
  },
  {
    id: 'tpl-warm-sand', name: 'Warm Sand', description: 'Soft paper tones, classic serif',
    tags: ['Soft skills', 'HR'], mode: 'light',
    colors: { bg: '#F5EFE6', surface: '#FFFFFF', primary: '#7C4A2D', onPrimary: '#FFFFFF', accent: '#C2410C', text: '#2B1A10', muted: '#5C4033' },
    fonts: { heading: 'Merriweather', body: 'Lato' }, radius: 6, buttonStyle: 'rounded', motif: 'paper',
    cover: { layout: 'image-right', imageShape: 'arch' },
  },
];

export const DEFAULT_TEMPLATE_ID = COURSE_TEMPLATES[0].id;

export function getTemplate(id: string | null | undefined): CourseTemplate | undefined {
  return COURSE_TEMPLATES.find(t => t.id === id);
}

/** Sample slide layouts shown in the Preview popup, in the order shown. */
export type SampleSlideKind =
  | 'cover' | 'section' | 'title-text' | 'bullets' | 'image-text'
  | 'comparison' | 'process' | 'quote' | 'quiz' | 'closing';

export const SAMPLE_SLIDES: { kind: SampleSlideKind; label: string }[] = [
  { kind: 'cover',      label: 'Title' },
  { kind: 'section',    label: 'Section divider' },
  { kind: 'title-text', label: 'Title + Text' },
  { kind: 'bullets',    label: 'Bullet points' },
  { kind: 'image-text', label: 'Image + Text' },
  { kind: 'comparison', label: 'Comparison' },
  { kind: 'process',    label: 'Process steps' },
  { kind: 'quote',      label: 'Key quote' },
  { kind: 'quiz',       label: 'Knowledge check' },
  { kind: 'closing',    label: 'Summary' },
];

/** Google Fonts used by the templates (loaded in index.html). */
export const TEMPLATE_FONTS = Array.from(new Set(COURSE_TEMPLATES.flatMap(t => [t.fonts.heading, t.fonts.body])));
