import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';

export interface DesignOption {
  id: string;
  name: string;
  description: string;
  primary: string;
  accent: string;
  bg: string;
  dark: boolean;
}

export const DESIGN_OPTIONS: DesignOption[] = [
  { id: 'corporate', name: 'Corporate',  description: 'Clear and professional',  primary: '#134780', accent: '#F48120', bg: '#FFFFFF', dark: false },
  { id: 'modern',    name: 'Modern',     description: 'Confident dark styling',   primary: '#6D28D9', accent: '#10B981', bg: '#111827', dark: true  },
  { id: 'minimal',   name: 'Minimal',    description: 'Simple and focused',       primary: '#111827', accent: '#3B82F6', bg: '#FFFFFF', dark: false },
  { id: 'bold',      name: 'Bold',       description: 'Bright and expressive',    primary: '#7C3AED', accent: '#F97316', bg: '#FFFFFF', dark: false },
  { id: 'natural',   name: 'Natural',    description: 'Fresh green accents',      primary: '#166534', accent: '#CA8A04', bg: '#FFFFFF', dark: false },
  { id: 'warm',      name: 'Warm',       description: 'Soft and welcoming',       primary: '#92400E', accent: '#D97706', bg: '#FEF9EE', dark: false },
  { id: 'ocean',     name: 'Ocean',      description: 'Calm blue tones',          primary: '#0369A1', accent: '#06B6D4', bg: '#FFFFFF', dark: false },
  { id: 'elegant',   name: 'Elegant',    description: 'Rich and refined',         primary: '#3B1C6A', accent: '#D4A843', bg: '#111827', dark: true  },
];

interface TemplatePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  currentDesignId: string;
  onApply: (designId: string) => void;
}

export function TemplatePopover({ isOpen, onClose, anchorEl, currentDesignId, onApply }: TemplatePopoverProps) {
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

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-label="Template selection"
      style={{
        position: 'fixed',
        top: pos.top,
        right: pos.right,
        width: 320,
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
        <span style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Template</span>
        <button
          onClick={onClose}
          style={{ width: 28, height: 28, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#6B7280', transition: 'background 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Design list */}
      <div style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 8px' }}>Choose a Design</p>
        {DESIGN_OPTIONS.map(design => {
          const isSel = currentDesignId === design.id;
          return (
            <button
              key={design.id}
              onClick={() => { onApply(design.id); }}
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
              {/* Check / spacer */}
              <div style={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                {isSel && <Check size={16} color={design.primary} />}
              </div>

              {/* Name + description */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: isSel ? 600 : 500, color: '#111827', margin: 0 }}>{design.name}</p>
                <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{design.description}</p>
              </div>

              {/* Mini preview */}
              <div style={{
                width: 62, height: 38, borderRadius: 6,
                background: design.bg,
                border: '1px solid #E5E7EB',
                padding: '5px 7px',
                flexShrink: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxSizing: 'border-box',
              }}>
                <div>
                  <div style={{ height: 3, background: design.primary, borderRadius: 2, width: '65%', marginBottom: 3 }} />
                  <div style={{ height: 2, background: design.dark ? 'rgba(255,255,255,0.2)' : '#E2E8F0', borderRadius: 2, width: '100%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 7, fontWeight: 700, color: '#fff', background: design.accent, borderRadius: 2, padding: '1px 4px' }}>
                    Next
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}
