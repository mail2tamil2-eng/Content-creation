/**
 * Design tokens — mirrors the "Design system" section of CLAUDE.md.
 * CLAUDE.md is the source of truth; keep this file in sync when it changes.
 */
export const SCALES = {
  primary: { 50: '#EEF4FB', 100: '#D6E4F4', 200: '#ADC8E8', 300: '#7EA6D6', 400: '#4B7FBF', 500: '#2A62A3', 600: '#1B5491', 700: '#154880', 800: '#10375F', 900: '#0B2642' },
  accent: { 50: '#FEF3E9', 100: '#FDE3CB', 200: '#FBC795', 300: '#F8A65C', 400: '#F48120', 500: '#F05A28', 600: '#D4461A', 700: '#A93715', 800: '#7F2A12', 900: '#551D0D' },
  neutral: { 50: '#F8FAFC', 100: '#F1F4F8', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
} as const;

export const SEMANTIC = [
  { name: 'Success', fg: '#15803D', bg: '#F0FDF4' },
  { name: 'Warning', fg: '#B45309', bg: '#FFFBEB' },
  { name: 'Error', fg: '#B91C1C', bg: '#FEF2F2' },
  { name: 'Info', fg: '#154880', bg: '#EEF4FB' },
] as const;

export const APPROVED_PAIRS_LIGHT = [
  { use: 'Body text', fg: '#0F172A', bg: '#FFFFFF' },
  { use: 'Secondary text', fg: '#475569', bg: '#FFFFFF' },
  { use: 'Secondary text on page bg', fg: '#475569', bg: '#F8FAFC' },
  { use: 'Placeholder / helper text', fg: '#64748B', bg: '#FFFFFF' },
  { use: 'Link / primary text', fg: '#154880', bg: '#FFFFFF' },
  { use: 'Primary button', fg: '#FFFFFF', bg: '#154880' },
  { use: 'Primary button hover', fg: '#FFFFFF', bg: '#10375F' },
  { use: 'Info badge', fg: '#154880', bg: '#EEF4FB' },
  { use: 'Orange text', fg: '#A93715', bg: '#FFFFFF' },
  { use: 'Orange badge', fg: '#7F2A12', bg: '#FDE3CB' },
  { use: 'Accent button', fg: '#0F172A', bg: '#F48120' },
  { use: 'Accent button (white text)', fg: '#FFFFFF', bg: '#A93715' },
  { use: 'Success alert', fg: '#15803D', bg: '#F0FDF4' },
  { use: 'Warning alert', fg: '#B45309', bg: '#FFFBEB' },
  { use: 'Error alert', fg: '#B91C1C', bg: '#FEF2F2' },
] as const;

export const APPROVED_PAIRS_DARK = [
  { use: 'Body text', fg: '#F8FAFC', bg: '#1E293B' },
  { use: 'Secondary text', fg: '#94A3B8', bg: '#1E293B' },
  { use: 'Link / primary text', fg: '#7EA6D6', bg: '#1E293B' },
  { use: 'Primary button', fg: '#0F172A', bg: '#7EA6D6' },
  { use: 'Accent text', fg: '#F48120', bg: '#1E293B' },
] as const;

export const FORBIDDEN_LIGHT = [
  { use: 'accent-400 text on white', fg: '#F48120', bg: '#FFFFFF' },
  { use: 'White on accent-400', fg: '#FFFFFF', bg: '#F48120' },
  { use: 'White on accent-500', fg: '#FFFFFF', bg: '#F05A28' },
  { use: 'neutral-400 readable text', fg: '#94A3B8', bg: '#FFFFFF' },
] as const;

export const TYPE_SCALE = [
  { token: 'display', size: 36, line: 44, weight: 800, use: 'Hero, dashboard welcome' },
  { token: 'h1', size: 30, line: 38, weight: 700, use: 'Page titles' },
  { token: 'h2', size: 24, line: 32, weight: 700, use: 'Section titles' },
  { token: 'h3', size: 20, line: 28, weight: 600, use: 'Card titles' },
  { token: 'h4', size: 18, line: 26, weight: 600, use: 'Sub-sections' },
  { token: 'body-lg', size: 16, line: 24, weight: 400, use: 'Default body' },
  { token: 'body-sm', size: 14, line: 20, weight: 400, use: 'Tables, forms, secondary' },
  { token: 'caption', size: 12, line: 16, weight: 600, use: 'Labels, badges, meta' },
] as const;

export const SPACING = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80] as const;
export const RADII = { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 } as const;
export const SHADOWS = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
  md: '0 4px 12px rgba(15, 23, 42, 0.08)',
  lg: '0 12px 32px rgba(15, 23, 42, 0.12)',
} as const;

/** WCAG 2.x relative-luminance contrast ratio. */
export function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
