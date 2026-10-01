import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';

// ── Theme catalogue ──────────────────────────────────────────────────────────
interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  accent: string;
  background: string;
  isNew: boolean;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'sea-glass', name: 'Sea Glass', primary: '#2A9D8F', accent: '#48CAE4', background: '#E8F8F7', isNew: true  },
  { id: 'porcelain', name: 'Porcelain', primary: '#4B5563', accent: '#9CA3AF', background: '#FAFAF8', isNew: true  },
  { id: 'orchid',    name: 'Orchid',    primary: '#6B21A8', accent: '#C084FC', background: '#FDF4FF', isNew: true  },
  { id: 'ink',       name: 'Ink',       primary: '#0F172A', accent: '#38BDF8', background: '#F8FAFC', isNew: true  },
  { id: 'fresco',    name: 'Fresco',    primary: '#78350F', accent: '#D97706', background: '#FFFBF2', isNew: true  },
  { id: 'gold',      name: 'Gold',      primary: '#A8842E', accent: '#D4A843', background: '#FFF9E8', isNew: false },
  { id: 'moss',      name: 'Moss',      primary: '#166534', accent: '#4ADE80', background: '#F0FDF4', isNew: true  },
];

const FONT_OPTIONS = ['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display', 'Merriweather'];

// ── Exported types ────────────────────────────────────────────────────────────
export interface ThemeSettings {
  themeId: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  backgroundStyle: 'light' | 'warm' | 'dark';
  buttonStyle: 'rounded' | 'pill' | 'square';
  themeBackground: string;
}

interface ThemePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  onApply: (settings: ThemeSettings) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ThemePopover({ isOpen, onClose, anchorEl, onApply }: ThemePopoverProps) {
  const [selectedThemeId, setSelectedThemeId]   = useState('gold');
  const [primaryColor, setPrimaryColor]           = useState('#A8842E');
  const [secondaryColor, setSecondaryColor]       = useState('#D4A843');
  const [font, setFont]                           = useState('Inter');
  const [backgroundStyle, setBackgroundStyle]     = useState<'light' | 'warm' | 'dark'>('light');
  const [buttonStyle, setButtonStyle]             = useState<'rounded' | 'pill' | 'square'>('rounded');
  const [isCustomizeExpanded, setIsCustomizeExpanded] = useState(false);
  const [pos, setPos]                             = useState({ top: 60, right: 16 });
  const popoverRef = useRef<HTMLDivElement>(null);

  // ── Position below anchor ─────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
  }, [isOpen, anchorEl]);

  // ── Escape key ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  // ── Click outside ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node) &&
          !anchorEl?.contains(e.target as Node)) {
        onClose();
      }
    };
    const t = setTimeout(() => document.addEventListener('mousedown', fn), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', fn); };
  }, [isOpen, onClose, anchorEl]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const buildSettings = (overrides: Partial<ThemeSettings> = {}): ThemeSettings => ({
    themeId: selectedThemeId,
    primaryColor,
    secondaryColor,
    font,
    backgroundStyle,
    buttonStyle,
    themeBackground: THEME_OPTIONS.find(t => t.id === selectedThemeId)?.background ?? '#FFFFFF',
    ...overrides,
  });

  const handleThemeSelect = (id: string) => {
    const t = THEME_OPTIONS.find(th => th.id === id)!;
    setSelectedThemeId(id);
    setPrimaryColor(t.primary);
    setSecondaryColor(t.accent);
    onApply(buildSettings({ themeId: id, primaryColor: t.primary, secondaryColor: t.accent, themeBackground: t.background }));
  };

  if (!isOpen) return null;

  // ── Render ────────────────────────────────────────────────────────────────
  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-label="Theme settings"
      style={{
        position: 'fixed',
        top: pos.top,
        right: pos.right,
        width: 350,
        maxWidth: 'calc(100vw - 32px)',
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 14,
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        zIndex: 9999,
        overflow: 'hidden',
        fontFamily: 'Nunito Sans, system-ui, sans-serif',
      }}
    >
      {/* Drag handle */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 2 }}>
        <div style={{ width: 28, height: 4, background: '#D1D5DB', borderRadius: 2 }} />
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 14px', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Theme</span>
        <HoverButton onClick={onClose} aria-label="Close theme panel" style={{ width: 28, height: 28, borderRadius: 8 }}>
          <X size={16} />
        </HoverButton>
      </div>

      {/* Scrollable body */}
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>

        {/* ── Theme list ── */}
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#374151', margin: '0 0 10px' }}>Theme</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {THEME_OPTIONS.map(theme => {
              const isSel = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '10px 12px',
                    background: '#fff',
                    border: isSel ? `1.5px solid ${theme.primary}` : '1px solid #E5E7EB',
                    borderRadius: 10, cursor: 'pointer',
                    width: '100%', textAlign: 'left',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; }}
                  onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
                >
                  {/* Check / spacer */}
                  <div style={{ width: 20, marginRight: 8, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {isSel && <Check size={16} color={theme.primary} />}
                  </div>

                  {/* Name */}
                  <span style={{ fontSize: 14, fontWeight: isSel ? 600 : 400, color: '#111827', flex: 1 }}>
                    {theme.name}
                  </span>

                  {/* NEW pill */}
                  {theme.isNew && (
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', background: '#F3F4F6', borderRadius: 4, padding: '2px 6px', marginRight: 10, flexShrink: 0 }}>
                      NEW
                    </span>
                  )}

                  {/* Mini preview */}
                  <div style={{ width: 76, height: 44, borderRadius: 6, background: theme.background, border: '1px solid #E5E7EB', padding: '6px 8px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <div>
                      <div style={{ height: 3, background: '#CBD5E1', borderRadius: 2, width: '65%', marginBottom: 3 }} />
                      <div style={{ height: 2, background: '#E2E8F0', borderRadius: 2, width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', background: theme.primary, borderRadius: 3, padding: '2px 5px' }}>
                        Next
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Customize appearance accordion ── */}
        <div style={{ borderTop: '1px solid #F3F4F6' }}>
          <button
            onClick={() => setIsCustomizeExpanded(v => !v)}
            style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: isCustomizeExpanded ? '1px solid #F3F4F6' : 'none' }}
          >
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#111827' }}>Customize appearance</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: '#6B7280' }}>Optional</p>
            </div>
            {isCustomizeExpanded ? <ChevronUp size={16} color="#6B7280" /> : <ChevronDown size={16} color="#6B7280" />}
          </button>

          {isCustomizeExpanded && (
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* COLOUR COMBINATION */}
              <div>
                <SectionLabel>Colour Combination</SectionLabel>
                {([
                  { label: 'Primary color',   value: primaryColor,   set: (v: string) => { setPrimaryColor(v);   onApply(buildSettings({ primaryColor: v })); } },
                  { label: 'Secondary color', value: secondaryColor, set: (v: string) => { setSecondaryColor(v); onApply(buildSettings({ secondaryColor: v })); } },
                ] as const).map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: '#6B7280', marginRight: 10, fontFamily: 'monospace' }}>{row.value.toUpperCase()}</span>
                    <label style={{ width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', position: 'relative', display: 'block', flexShrink: 0 }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: row.value, border: '2px solid rgba(0,0,0,0.12)' }} />
                      <input
                        type="color"
                        value={row.value}
                        onChange={e => row.set(e.target.value)}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 'none', padding: 0, margin: 0 }}
                      />
                    </label>
                  </div>
                ))}
              </div>

              {/* FONT STYLE */}
              <div>
                <SectionLabel>Font Style</SectionLabel>
                <div style={{ position: 'relative' }}>
                  <select
                    value={font}
                    onChange={e => { setFont(e.target.value); onApply(buildSettings({ font: e.target.value })); }}
                    style={{ width: '100%', padding: '10px 36px 10px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, color: '#111827', appearance: 'none', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                  >
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* BACKGROUND STYLE */}
              <div>
                <SectionLabel>Background Style</SectionLabel>
                <SegmentedControl
                  options={['Light', 'Warm', 'Dark']}
                  value={backgroundStyle}
                  onChange={v => { setBackgroundStyle(v as 'light' | 'warm' | 'dark'); onApply(buildSettings({ backgroundStyle: v as 'light' | 'warm' | 'dark' })); }}
                />
              </div>

              {/* BUTTON STYLE */}
              <div>
                <SectionLabel>Button Style</SectionLabel>
                <SegmentedControl
                  options={['Rounded', 'Pill', 'Square']}
                  value={buttonStyle}
                  onChange={v => { setButtonStyle(v as 'rounded' | 'pill' | 'square'); onApply(buildSettings({ buttonStyle: v as 'rounded' | 'pill' | 'square' })); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── Small helpers (keep file self-contained) ──────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
      {children}
    </p>
  );
}

function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 3 }}>
      {options.map(opt => {
        const key = opt.toLowerCase();
        const active = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{ flex: 1, padding: '7px 0', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400, background: active ? '#1E293B' : 'transparent', color: active ? '#fff' : '#6B7280', transition: 'all 0.15s' }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function HoverButton({ children, onClick, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: '#6B7280', background: hovered ? '#F3F4F6' : 'transparent', transition: 'background 0.15s', ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
