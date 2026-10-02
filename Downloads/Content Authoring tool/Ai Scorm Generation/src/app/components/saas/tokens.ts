/**
 * Colours used by the live SaaS UI (AICreateCoursePage, editor panels, dashboard).
 * Prefer these over new hex values; see CLAUDE.md → "Current product palette".
 */
export const SAAS = {
  primary: '#1565F0', // AI / primary actions
  primaryHover: '#1A63E8',
  primarySoft: '#EBF3FF',
  primaryBorder: '#93C5FD',
  accent: '#F97316', // orange-500: nav highlight, Resume Editing
  brandNavy: '#134780',
  brandOrange: '#F48120',
  text: '#111827',
  textBody: '#374151',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  borderField: '#D1D5DB',
  surface: '#FFFFFF',
  page: '#F9FAFB',
  chip: '#F3F4F6',
  disabled: '#C4C4C4',
  danger: '#DC2626',
} as const;
