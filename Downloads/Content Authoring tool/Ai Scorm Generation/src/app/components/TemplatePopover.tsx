import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Eye } from 'lucide-react';
import { COURSE_TEMPLATES, getTemplate } from './templates/courseTemplates';
import { TemplateSlide } from './templates/TemplateSlide';
import { TemplatePreviewModal } from './templates/TemplatePreviewModal';

export interface DesignOption {
  id: string;
  name: string;
  description: string;
  primary: string;
  accent: string;
  bg: string;
  dark: boolean;
}

/** Editor list of designs = the 10 course templates. */
export const DESIGN_OPTIONS: DesignOption[] = COURSE_TEMPLATES.map(t => ({
  id: t.id, name: t.name, description: t.description,
  primary: t.colors.primary, accent: t.colors.accent, bg: t.colors.bg, dark: t.mode === 'dark',
}));

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
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen && anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
  }, [isOpen, anchorEl]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && !previewId) onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen, onClose, previewId]);

  useEffect(() => {
    if (!isOpen || previewId) return;
    const fn = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node) && !anchorEl?.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener('mousedown', fn), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', fn); };
  }, [isOpen, onClose, anchorEl, previewId]);

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
        <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 8px' }}>Choose a Template</p>
        <p style={{ fontSize: 12, color: '#4B5563', margin: '-4px 0 6px' }}>Select a template, or use the eye icon to preview all slide layouts.</p>
        {COURSE_TEMPLATES.map(t => {
          const isSel = currentDesignId === t.id;
          return (
            <div
              key={t.id}
              className={`group relative flex items-center gap-3 rounded-[10px] border p-2 transition-colors ${isSel ? 'border-[#1565F0] bg-[#EBF3FF]' : 'border-[#E5E7EB] bg-white hover:border-[#6B7280]'}`}
            >
              <button
                type="button"
                onClick={() => onApply(t.id)}
                aria-pressed={isSel}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
              >
                <span className="block w-[104px] shrink-0 overflow-hidden rounded-md border border-black/10">
                  <TemplateSlide template={t} kind="cover" label="" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[14px] ${isSel ? 'font-bold text-[#1254C7]' : 'font-semibold text-[#111827]'}`}>{t.name}</span>
                  <span className="block truncate text-xs text-[#4B5563]">{t.description}</span>
                </span>
                {isSel && <Check size={16} color="#1565F0" aria-hidden="true" style={{ flexShrink: 0 }} />}
              </button>
              <button
                type="button"
                onClick={e => { previewTriggerRef.current = e.currentTarget; setPreviewId(t.id); }}
                aria-label={`Preview ${t.name} template`}
                title="Preview all slides"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
              >
                <Eye size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <TemplatePreviewModal
        template={getTemplate(previewId) ?? null}
        selectedId={currentDesignId}
        onOpenChange={open => { if (!open) setPreviewId(null); }}
        onUse={id => { setPreviewId(null); onApply(id); }}
        returnFocusTo={previewTriggerRef}
      />
    </div>,
    document.body,
  );
}
