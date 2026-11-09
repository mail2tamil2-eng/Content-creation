import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DESIGN_OPTIONS } from './TemplatePopover';
import { THEME_OPTIONS, ThemeSettings } from './ThemePopover';

const FONT_OPTIONS = ['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display', 'Merriweather'];

interface TemplateThemePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  currentDesignId: string;
  onApplyTemplate: (designId: string) => void;
  onApplyTheme: (settings: ThemeSettings) => void;
}

export function TemplateThemePopover({
  isOpen, onClose, anchorEl, currentDesignId, onApplyTemplate, onApplyTheme,
}: TemplateThemePopoverProps) {
  const [selectedThemeId, setSelectedThemeId] = useState('gold');
  const [primaryColor, setPrimaryColor] = useState('#A8842E');
  const [secondaryColor, setSecondaryColor] = useState('#D4A843');
  const [font, setFont] = useState('Inter');
  const [backgroundStyle, setBackgroundStyle] = useState<'light' | 'warm' | 'dark'>('light');
  const [buttonStyle, setButtonStyle] = useState<'rounded' | 'pill' | 'square'>('rounded');
  const [isCustomizeExpanded, setIsCustomizeExpanded] = useState(false);
  const [pos, setPos] = useState({ top: 60, right: 16 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
  }, [isOpen, anchorEl]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node) && !anchorEl?.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener('mousedown', fn), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', fn); };
  }, [isOpen, onClose, anchorEl]);

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
    onApplyTheme(buildSettings({ themeId: id, primaryColor: t.primary, secondaryColor: t.accent, themeBackground: t.background }));
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-label="Template and Theme"
      style={{
        position: 'fixed',
        top: pos.top,
        right: pos.right,
        width: 360,
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
        <span style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Template & Theme</span>
        <button
          onClick={onClose}
          style={{ width: 28, height: 28, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#6B7280', transition: 'background 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>

        {/* ── Template section ── */}
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Template</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {DESIGN_OPTIONS.map(design => {
              const isSel = currentDesignId === design.id;
              return (
                <button
                  key={design.id}
                  onClick={() => onApplyTemplate(design.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    background: '#fff',
                    border: isSel ? `1.5px solid ${design.primary}` : '1px solid #E5E7EB',
                    borderRadius: 10, cursor: 'pointer', width: '100%', textAlign: 'left',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; }}
                  onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
                >
                  <div style={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {isSel && <Check size={16} color={design.primary} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: isSel ? 600 : 500, color: '#111827', margin: 0 }}>{design.name}</p>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{design.description}</p>
                  </div>
                  <div style={{
                    width: 62, height: 38, borderRadius: 6,
                    background: design.bg, border: '1px solid #E5E7EB',
                    padding: '5px 7px', flexShrink: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    boxSizing: 'border-box',
                  }}>
                    <div>
                      <div style={{ height: 3, background: design.primary, borderRadius: 2, width: '65%', marginBottom: 3 }} />
                      <div style={{ height: 2, background: design.dark ? 'rgba(255,255,255,0.2)' : '#E2E8F0', borderRadius: 2, width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 7, fontWeight: 700, color: '#fff', background: design.accent, borderRadius: 2, padding: '1px 4px' }}>Next</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Theme section ── */}
        <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px 20px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Theme</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {THEME_OPTIONS.map(theme => {
              const isSel = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '10px 12px',
                    background: '#fff',
                    border: isSel ? `1.5px solid ${theme.primary}` : '1px solid #E5E7EB',
                    borderRadius: 10, cursor: 'pointer', width: '100%', textAlign: 'left',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; }}
                  onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
                >
                  <div style={{ width: 20, marginRight: 8, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {isSel && <Check size={16} color={theme.primary} />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: isSel ? 600 : 400, color: '#111827', flex: 1 }}>{theme.name}</span>
                  {theme.isNew && (
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', background: '#F3F4F6', borderRadius: 4, padding: '2px 6px', marginRight: 10, flexShrink: 0 }}>NEW</span>
                  )}
                  <div style={{ width: 76, height: 44, borderRadius: 6, background: theme.background, border: '1px solid #E5E7EB', padding: '6px 8px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <div>
                      <div style={{ height: 3, background: '#CBD5E1', borderRadius: 2, width: '65%', marginBottom: 3 }} />
                      <div style={{ height: 2, background: '#E2E8F0', borderRadius: 2, width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', background: theme.primary, borderRadius: 3, padding: '2px 5px' }}>Next</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Customize appearance ── */}
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
              {/* Colour combination */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Colour Combination</p>
                {[
                  { label: 'Primary color', value: primaryColor, onChange: (v: string) => { setPrimaryColor(v); onApplyTheme(buildSettings({ primaryColor: v })); } },
                  { label: 'Secondary color', value: secondaryColor, onChange: (v: string) => { setSecondaryColor(v); onApplyTheme(buildSettings({ secondaryColor: v })); } },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: '#6B7280', marginRight: 10, fontFamily: 'monospace' }}>{row.value.toUpperCase()}</span>
                    <label style={{ width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', position: 'relative', display: 'block', flexShrink: 0 }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: row.value, border: '2px solid rgba(0,0,0,0.12)' }} />
                      <input type="color" value={row.value} onChange={e => row.onChange(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 'none', padding: 0, margin: 0 }} />
                    </label>
                  </div>
                ))}
              </div>

              {/* Font style */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Font Style</p>
                <div style={{ position: 'relative' }}>
                  <select
                    value={font}
                    onChange={e => { setFont(e.target.value); onApplyTheme(buildSettings({ font: e.target.value })); }}
                    style={{ width: '100%', padding: '10px 36px 10px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, color: '#111827', appearance: 'none', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                  >
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Background style */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Background Style</p>
                <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 3 }}>
                  {(['Light', 'Warm', 'Dark'] as const).map(opt => {
                    const key = opt.toLowerCase() as 'light' | 'warm' | 'dark';
                    const active = backgroundStyle === key;
                    return (
                      <button key={key} onClick={() => { setBackgroundStyle(key); onApplyTheme(buildSettings({ backgroundStyle: key })); }}
                        style={{ flex: 1, padding: '7px 0', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400, background: active ? '#1E293B' : 'transparent', color: active ? '#fff' : '#6B7280', transition: 'all 0.15s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Button style */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Button Style</p>
                <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 3 }}>
                  {(['Rounded', 'Pill', 'Square'] as const).map(opt => {
                    const key = opt.toLowerCase() as 'rounded' | 'pill' | 'square';
                    const active = buttonStyle === key;
                    return (
                      <button key={key} onClick={() => { setButtonStyle(key); onApplyTheme(buildSettings({ buttonStyle: key })); }}
                        style={{ flex: 1, padding: '7px 0', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400, background: active ? '#1E293B' : 'transparent', color: active ? '#fff' : '#6B7280', transition: 'all 0.15s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
