import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, MoreHorizontal, FileText, List, Lock,
  GripVertical, Pencil, Trash2, Sparkles, RefreshCw, X,
  PanelLeftClose, ChevronLeft,
} from 'lucide-react';
import { SlideLibraryModal, type SlideComplexity } from './SlideLibraryModal';

// ── Design tokens ─────────────────────────────────────────────────────────────
const P                = '#1565F0';
const BORDER           = '#E5E7EB';
const SECTION_ACTIVE_BG  = '#F3F4F6'; // light gray — active/expanded section header
const TOPIC_SELECTED_BG  = '#EBF3FF'; // light blue — selected topic row
const TOPIC_SELECTED_FG  = '#1565F0'; // blue text+number for selected topic
const HOVER_BG           = '#F9FAFB'; // neutral gray — hover only

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CSTopic {
  id: string;
  title: string;
  locked?: boolean;
  [key: string]: unknown;
}

export interface CSSection {
  id: string;
  title: string;
  topics: CSTopic[];
  [key: string]: unknown;
}

export interface CourseSidebarProps {
  courseTitle: string;
  sections: CSSection[];
  selectedSection: number;
  selectedTopic: number;
  complexity?: SlideComplexity;
  onSelectTopic: (si: number, ti: number) => void;
  onSectionsChange: (updater: (prev: CSSection[]) => CSSection[]) => void;
  onCollapse: () => void;
  onBack?: () => void;
  backLabel?: string;
  onTopicInserted?: () => void;
  onOpenCourseSettings?: () => void;
}

// ── uid ───────────────────────────────────────────────────────────────────────
const uid = () => `id_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

// ── PortalMenu ────────────────────────────────────────────────────────────────
function PortalMenu({
  x, y, onClose, children,
}: { x: number; y: number; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener('mousedown', fn), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', fn); };
  }, [onClose]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const left = Math.min(x, window.innerWidth - 224);
  const top = Math.min(y, window.innerHeight - 260);

  return createPortal(
    <div
      ref={ref}
      role="menu"
      style={{
        position: 'fixed', left, top, zIndex: 9999,
        background: '#fff', border: `1px solid ${BORDER}`,
        borderRadius: 10, boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        minWidth: 210, overflow: 'hidden', padding: '4px 0',
        fontFamily: 'Nunito Sans, system-ui, sans-serif',
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

// ── MenuItem ──────────────────────────────────────────────────────────────────
function MenuItem({
  icon, label, danger, divider, onClick,
}: { icon: React.ReactNode; label: string; danger?: boolean; divider?: boolean; onClick: () => void }) {
  return (
    <>
      {divider && <div style={{ height: 1, background: '#F3F4F6', margin: '3px 0' }} />}
      <button
        role="menuitem"
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 14px', background: 'none', border: 'none',
          cursor: 'pointer', fontSize: 13, color: danger ? '#DC2626' : '#374151',
          textAlign: 'left', transition: 'background 0.1s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = danger ? '#FEF2F2' : '#F9FAFB'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
      >
        <span style={{ color: danger ? '#DC2626' : '#9CA3AF', display: 'flex', flexShrink: 0 }}>{icon}</span>
        {label}
      </button>
    </>
  );
}

// ── ConfirmModal ──────────────────────────────────────────────────────────────
function ConfirmModal({
  title, message, confirmLabel, danger, onConfirm, onClose,
}: {
  title: string; message: string; confirmLabel?: string;
  danger?: boolean; onConfirm: () => void; onClose: () => void;
}) {
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, width: 400, maxWidth: 'calc(100vw - 32px)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>{title}</p>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, cursor: 'pointer', color: '#374151' }}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: danger ? '#DC2626' : P, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {confirmLabel ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── EditModal ─────────────────────────────────────────────────────────────────
function EditModal({
  title: modalTitle, value, placeholder, onSave, onClose,
}: {
  title: string; value: string; placeholder?: string;
  onSave: (v: string) => void; onClose: () => void;
}) {
  const [val, setVal] = useState(value);
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, width: 400, maxWidth: 'calc(100vw - 32px)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#111827' }}>{modalTitle}</span>
          <button
            onClick={onClose}
            style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#6B7280' }}
          >
            <X size={16} />
          </button>
        </div>
        <input
          autoFocus
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && val.trim()) { onSave(val.trim()); onClose(); } }}
          placeholder={placeholder ?? 'Enter title…'}
          style={{ width: '100%', padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 16, transition: 'border-color 0.15s' }}
          onFocus={e => { (e.currentTarget).style.borderColor = P; }}
          onBlur={e => { (e.currentTarget).style.borderColor = BORDER; }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, cursor: 'pointer', color: '#374151' }}>
            Cancel
          </button>
          <button
            onClick={() => { if (val.trim()) { onSave(val.trim()); onClose(); } }}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: P, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── GenerateSectionModal ──────────────────────────────────────────────────────
export function GenerateSectionModal({
  onGenerate, onClose,
}: {
  onGenerate: (prompt: string, location: string) => Promise<void>;
  onClose: () => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [location, setLocation] = useState('end');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try { await onGenerate(prompt.trim(), location); onClose(); }
    finally { setLoading(false); }
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, width: 480, maxWidth: 'calc(100vw - 32px)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#111827' }}>Generate section with AI</span>
          <button onClick={onClose} style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#6B7280' }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          Describe the section and topics you want to create.
        </p>
        <textarea
          autoFocus
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. A section covering communication skills for front-desk hotel staff…"
          rows={4}
          style={{ width: '100%', padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: 14, fontFamily: 'inherit', lineHeight: 1.6, transition: 'border-color 0.15s' }}
          onFocus={e => { (e.currentTarget).style.borderColor = P; }}
          onBlur={e => { (e.currentTarget).style.borderColor = BORDER; }}
        />
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Location
          </label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: '#374151', background: '#F9FAFB', outline: 'none', cursor: 'pointer' }}
          >
            <option value="end">Add at end</option>
            <option value="before">Before selected section</option>
            <option value="after">After selected section</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, cursor: 'pointer', color: '#374151' }}>
            Cancel
          </button>
          <button
            onClick={handle}
            disabled={!prompt.trim() || loading}
            style={{
              padding: '9px 18px', borderRadius: 8, border: 'none',
              background: !prompt.trim() ? '#93C5FD' : P,
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: prompt.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', gap: 6, minWidth: 110, justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Generating…
              </>
            ) : (
              <><Sparkles size={14} /> Generate</>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── SectionMenu ───────────────────────────────────────────────────────────────
export function SectionMenu({
  x, y, onClose, onEdit, onAddWithAI, onRegenerate, onDelete,
}: {
  x: number; y: number; onClose: () => void;
  onEdit: () => void; onAddWithAI: () => void;
  onRegenerate: () => void; onDelete: () => void;
}) {
  return (
    <PortalMenu x={x} y={y} onClose={onClose}>
      <MenuItem icon={<Pencil size={14} />} label="Edit section" onClick={() => { onEdit(); onClose(); }} />
      <MenuItem icon={<Sparkles size={14} />} label="Add section with AI" onClick={() => { onAddWithAI(); onClose(); }} />
      <MenuItem icon={<GripVertical size={14} />} label="Reorder section" onClick={() => { onClose(); }} />
      <MenuItem icon={<RefreshCw size={14} />} label="Regenerate complete section" onClick={() => { onRegenerate(); onClose(); }} />
      <MenuItem icon={<Trash2 size={14} />} label="Delete section" danger divider onClick={() => { onDelete(); onClose(); }} />
    </PortalMenu>
  );
}

// ── AddSlideWithAIModal ───────────────────────────────────────────────────────
function AddSlideWithAIModal({
  onAdd, onClose,
}: {
  onAdd: (prompt: string) => Promise<void>;
  onClose: () => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try { await onAdd(prompt.trim()); onClose(); }
    finally { setLoading(false); }
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, width: 480, maxWidth: 'calc(100vw - 32px)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#111827' }}>Add slide with AI</span>
          <button onClick={onClose} style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#6B7280' }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          Describe the slide you want to create and AI will generate it for you.
        </p>
        <textarea
          autoFocus
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handle(); }}
          placeholder="e.g. A slide about the importance of active listening in customer service…"
          rows={4}
          style={{ width: '100%', padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: 20, fontFamily: 'inherit', lineHeight: 1.6, transition: 'border-color 0.15s' }}
          onFocus={e => { e.currentTarget.style.borderColor = P; }}
          onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, cursor: 'pointer', color: '#374151' }}>
            Cancel
          </button>
          <button
            onClick={handle}
            disabled={!prompt.trim() || loading}
            style={{
              padding: '9px 18px', borderRadius: 8, border: 'none',
              background: !prompt.trim() ? '#93C5FD' : P,
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: prompt.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', gap: 6, minWidth: 110, justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Generating…
              </>
            ) : (
              <><Sparkles size={14} /> Generate slide</>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── TopicMenu ─────────────────────────────────────────────────────────────────
export function TopicMenu({
  x, y, onClose, onEdit, onAdd, onAddWithAI, onRegenerate, onDelete,
}: {
  x: number; y: number; onClose: () => void;
  onEdit: () => void; onAdd: () => void; onAddWithAI: () => void;
  onRegenerate: () => void; onDelete: () => void;
}) {
  return (
    <PortalMenu x={x} y={y} onClose={onClose}>
      <MenuItem icon={<Pencil size={14} />} label="Edit topic" onClick={() => { onEdit(); onClose(); }} />
      <MenuItem icon={<Plus size={14} />} label="Add topic" onClick={() => { onAdd(); onClose(); }} />
      <MenuItem icon={<Sparkles size={14} />} label="Add with AI prompt" onClick={() => { onAddWithAI(); onClose(); }} />
      <MenuItem icon={<RefreshCw size={14} />} label="Regenerate topic" onClick={() => { onRegenerate(); onClose(); }} />
      <MenuItem icon={<Trash2 size={14} />} label="Delete topic" danger divider onClick={() => { onDelete(); onClose(); }} />
    </PortalMenu>
  );
}

// ── TopicInsertControl ────────────────────────────────────────────────────────
// Renders two absolutely-positioned elements inside the parent insert-gap div
// (position:relative, height:10, overflow:visible). Visibility is opacity-only.
function TopicInsertControl({
  isActive,
  onInsert,
}: {
  isActive: boolean;
  onInsert: () => void;
}) {
  return (
    <>
      {/* Line — starts at topic-number column, ends 12px from right */}
      <div
        className="cs-insert-line"
        style={{
          position: 'absolute', top: '50%', right: 12,
          transform: 'translateY(-50%)',
          height: 2, background: '#1565F0', borderRadius: 1,
          opacity: isActive ? 1 : 0, pointerEvents: 'none',
          transition: 'opacity 0.12s ease',
          zIndex: 1,
        }}
      />
      {/* Button — center at 48px (left:30 connector + 18px right).
          translate(-50%,-50%) so left/top are the element's center point. */}
      <button
        className="cs-insert-btn"
        onClick={e => { e.stopPropagation(); onInsert(); }}
        title="Insert topic here"
        style={{
          position: 'absolute', top: '50%', left: 48,
          transform: 'translate(-50%, -50%)',
          width: 22, height: 22, borderRadius: '50%',
          border: '1.5px solid #2D74FA',
          background: 'white', color: '#1565F0',
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 0.12s ease',
          zIndex: 2,
        }}
      >
        <Plus size={10} />
      </button>
    </>
  );
}

// ── TopicItem ─────────────────────────────────────────────────────────────────
// subtleHighlight is driven by SectionItem's hoveredTi — no local hover state here.
// Background starts at the number column (50px from section item left) via nested inner div.
export function TopicItem({
  topic, ti, isSelected, subtleHighlight, isNew, onSelect, onMenu,
}: {
  topic: CSTopic; ti: number; isSelected: boolean; subtleHighlight: boolean; isNew?: boolean;
  onSelect: () => void;
  onMenu: (x: number, y: number) => void;
}) {
  const menuRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(); }}
      className={isNew ? 'cs-topic-new' : undefined}
      style={{ display: 'flex', height: 34, cursor: 'pointer', outline: 'none', userSelect: 'none' }}
    >
      {/* Left gutter — 48px wide, houses connector line. No background. */}
      <div style={{ width: 48, flexShrink: 0 }} />

      {/* Content row — background starts at 48px (= 18px right of connector at 30px).
          Left border acts as the selected-item accent; transparent when not selected
          so there is no layout shift. */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        paddingRight: 8,
        borderRadius: 6,
        borderLeft: isSelected ? `3px solid ${TOPIC_SELECTED_FG}` : '3px solid transparent',
        background: isSelected ? TOPIC_SELECTED_BG : subtleHighlight ? HOVER_BG : 'transparent',
        transition: 'background 0.12s ease, border-color 0.12s ease',
      }}>
        {/* Number */}
        <span style={{ width: 12, flexShrink: 0, fontSize: 13, fontWeight: 400, color: isSelected ? TOPIC_SELECTED_FG : '#6B7280', textAlign: 'right', lineHeight: 1, marginRight: 10 }}>
          {ti + 1}
        </span>

        {/* Lock icon */}
        {topic.locked && (
          <Lock size={12} color="#9CA3AF" style={{ flexShrink: 0, marginRight: 4 }} />
        )}

        {/* Title */}
        <span style={{
          flex: 1, fontSize: 13, color: isSelected ? TOPIC_SELECTED_FG : '#0F172A',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          lineHeight: 1, fontWeight: isSelected ? 600 : 400,
        }}>
          {topic.title}
        </span>

        {/* Three-dot menu — opacity-only, driven by subtleHighlight/isSelected */}
        <button
          ref={menuRef}
          onClick={e => {
            e.stopPropagation();
            const r = menuRef.current!.getBoundingClientRect();
            onMenu(r.left - 170, r.bottom + 4);
          }}
          title="Topic options"
          style={{
            width: 24, height: 24, borderRadius: 6, border: 'none', background: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: '#6B7280', marginLeft: 4,
            opacity: (subtleHighlight || isSelected) ? 1 : 0,
            pointerEvents: (subtleHighlight || isSelected) ? 'auto' : 'none',
            transition: 'opacity 0.12s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
}

// ── SectionItem ───────────────────────────────────────────────────────────────
export function SectionItem({
  section, si, isExpanded, selectedSection, selectedTopic,
  onToggle, onSelectTopic, onSectionMenu, onTopicMenu, onOpenSlideLibrary,
  newTopicId, isDragOver, onDragStart, onDragOver, onDrop, onDragEnd,
}: {
  section: CSSection; si: number; isExpanded: boolean;
  selectedSection: number; selectedTopic: number;
  onToggle: () => void;
  onSelectTopic: (ti: number) => void;
  onSectionMenu: (x: number, y: number) => void;
  onTopicMenu: (ti: number, x: number, y: number) => void;
  onOpenSlideLibrary: (afterTi: number) => void;
  newTopicId?: string | null;
  isDragOver: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  const [rowHovered, setRowHovered] = useState(false);
  const [hoveredTi, setHoveredTi] = useState<number | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const isSelectedSection = si === selectedSection;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      style={{
        borderRadius: 8,
        outline: isDragOver ? `2px solid ${P}` : 'none',
        outlineOffset: 2,
        marginBottom: isExpanded ? 10 : 8,
      }}
    >
      {/* ── Section header row ── */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
        onMouseEnter={() => setRowHovered(true)}
        onMouseLeave={() => setRowHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 10px 0 12px',
          height: 44,
          borderRadius: 8,
          background: isExpanded ? SECTION_ACTIVE_BG : rowHovered ? HOVER_BG : 'transparent',
          cursor: 'pointer', outline: 'none', userSelect: 'none',
          transition: 'background 0.12s',
        }}
      >
        <FileText size={15} style={{ flexShrink: 0, color: isExpanded ? P : '#6B7280' }} />

        <span style={{
          flex: 1,
          fontSize: 14, fontWeight: 600, color: '#0F172A',
          lineHeight: 1.35,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical' as const,
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
        }}>
          {section.title || 'Untitled section'}
        </span>

        <button
          ref={menuRef}
          onClick={e => {
            e.stopPropagation();
            const r = menuRef.current!.getBoundingClientRect();
            onSectionMenu(r.left - 170, r.bottom + 4);
          }}
          title="Section options"
          style={{
            width: 28, height: 28, borderRadius: 8, border: 'none', background: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: '#6B7280',
            opacity: rowHovered || isExpanded ? 1 : 0,
            pointerEvents: rowHovered || isExpanded ? 'auto' : 'none',
            transition: 'opacity 0.12s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* ── Topics body — white/transparent, no lavender ── */}
      {isExpanded && (
        <div
          style={{ position: 'relative', paddingTop: 4, paddingBottom: 4 }}
          onMouseLeave={() => setHoveredTi(null)}
        >
          {/* Connector line at 30px from section item left = 38px from sidebar edge.
              Number column is 18px to the right at 48px (= 30 + 18). */}
          {section.topics.length > 1 && (
            <div style={{
              position: 'absolute',
              left: 30, top: 22, bottom: 54,
              width: 1, background: '#D6D9E3', pointerEvents: 'none',
            }} />
          )}

          {section.topics.map((topic, ti) => (
            <React.Fragment key={topic.id}>
              {/* Topic row — z-index 1 keeps it below an active insert gap */}
              <div
                style={{ position: 'relative', zIndex: 1 }}
                onMouseEnter={() => setHoveredTi(ti)}
              >
                <TopicItem
                  topic={topic}
                  ti={ti}
                  isSelected={isSelectedSection && ti === selectedTopic}
                  subtleHighlight={hoveredTi === ti}
                  isNew={topic.id === newTopicId}
                  onSelect={() => onSelectTopic(ti)}
                  onMenu={(x, y) => onTopicMenu(ti, x, y)}
                />
              </div>

              {/* Insert gap — only between topics, never after the last.
                  Button centered on connector line (left:23 = center at 34px).
                  Line starts at 53px (just after button + 8px gap). */}
              {ti < section.topics.length - 1 && (
                <div
                  style={{
                    position: 'relative', height: 10, flexShrink: 0,
                    overflow: 'visible',
                    zIndex: hoveredTi === ti ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredTi(ti)}
                >
                  <TopicInsertControl
                    isActive={hoveredTi === ti}
                    onInsert={() => { onOpenSlideLibrary(ti); setHoveredTi(null); }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}

          {/* + New slide — aligned with topic title column (~54px from sidebar edge) */}
          <button
            onClick={() => onOpenSlideLibrary(section.topics.length - 1)}
            style={{
              marginLeft: 46, marginTop: 4,
              display: 'flex', alignItems: 'center', gap: 5,
              height: 32, padding: '0 8px', borderRadius: 6,
              border: 'none', background: 'none',
              cursor: 'pointer', fontSize: 13, color: P, fontWeight: 500,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,70,229,0.07)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          >
            <Plus size={13} color={P} />
            New slide
          </button>
        </div>
      )}
    </div>
  );
}

// ── CourseSidebar ─────────────────────────────────────────────────────────────
export function CourseSidebar({
  courseTitle, sections, selectedSection, selectedTopic, complexity,
  onSelectTopic, onSectionsChange, onCollapse, onBack, backLabel = 'Back to courses', onTopicInserted, onOpenCourseSettings,
}: CourseSidebarProps) {
  // Inject CSS :hover rule for the insert + button once on mount
  useEffect(() => {
    const id = 'cs-insert-btn-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = `
        :root { --topic-content-start: 68px; }
        .cs-insert-btn { transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease; }
        .cs-insert-btn:hover { background: #2D74FA !important; border-color: #2D74FA !important; color: white !important; }
        .cs-insert-line { left: var(--topic-content-start); right: 12px; }
        .cs-tooltip { opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.15s ease, visibility 0.15s ease; }
        .cs-tooltip-trigger:hover .cs-tooltip,
        .cs-tooltip-trigger:focus-within .cs-tooltip { opacity: 1; visibility: visible; }
        @keyframes csTopicFadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .cs-topic-new { animation: csTopicFadeIn 0.22s cubic-bezier(0.4,0,0.2,1) both; }
      `;
      document.head.appendChild(el);
    }
  }, []);

  // Only ONE section may be expanded at a time.
  const [expandedId, setExpandedId] = useState<string | null>(
    () => sections[selectedSection]?.id ?? null,
  );

  // When the selected section changes externally (topic clicked in parent),
  // ensure that section is expanded and all others are not.
  const selSectionId = sections[selectedSection]?.id;
  useEffect(() => {
    if (selSectionId) setExpandedId(selSectionId);
  }, [selSectionId]);

  // Menus
  const [sectionMenu, setSectionMenu] = useState<{ si: number; x: number; y: number } | null>(null);
  const [topicMenu, setTopicMenu] = useState<{ si: number; ti: number; x: number; y: number } | null>(null);

  // Modals
  const [editSection, setEditSection] = useState<{ si: number; title: string } | null>(null);
  const [confirmDelSection, setConfirmDelSection] = useState<number | null>(null);
  const [confirmRegenSection, setConfirmRegenSection] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState<{ si: number; ti: number; title: string } | null>(null);
  const [confirmDelTopic, setConfirmDelTopic] = useState<{ si: number; ti: number } | null>(null);
  const [confirmRegenTopic, setConfirmRegenTopic] = useState<{ si: number; ti: number } | null>(null);

  // Slide library
  const [slideLibrary, setSlideLibrary] = useState<{ si: number; afterTi: number } | null>(null);
  const [newTopicId, setNewTopicId] = useState<string | null>(null);

  // Add section
  const [showAddMenu, setShowAddMenu] = useState<{ x: number; y: number } | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [addSlideAI, setAddSlideAI] = useState<{ si: number; afterTi: number } | null>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);

  // Drag & drop reorder
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const toggleSection = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  // ── Section mutations ──────────────────────────────────────────────────────
  const doEditSection = (si: number, title: string) => {
    onSectionsChange(prev => prev.map((s, i) => i === si ? { ...s, title } : s));
  };

  const doDeleteSection = (si: number) => {
    const id = sections[si]?.id;
    if (id) setExpandedId(prev => prev === id ? null : prev);
    onSectionsChange(prev => prev.filter((_, i) => i !== si));
  };

  const doReorderSection = (from: number, to: number) => {
    onSectionsChange(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const doRegenerateSection = (si: number) => {
    const replacements = [
      { id: uid(), title: 'Introduction and Overview' },
      { id: uid(), title: 'Core Principles' },
      { id: uid(), title: 'Practical Application' },
      { id: uid(), title: 'Assessment and Review' },
    ];
    onSectionsChange(prev => prev.map((s, i) => i === si ? { ...s, topics: replacements as never[] } : s));
  };

  const doAddBlankSection = () => {
    const newSec = {
      id: uid(), title: 'Untitled section', description: '', expanded: false,
      topics: [{ id: uid(), title: 'New topic', slideType: 'title-bullets', content: '', bullets: [], locked: false }],
    };
    onSectionsChange(prev => [...prev, newSec as never]);
    setExpandedId(newSec.id);
    setTimeout(() => onSelectTopic(sections.length, 0), 0);
  };

  const doGenerateSection = async (prompt: string, location: string) => {
    await new Promise(r => setTimeout(r, 900));
    const words = prompt.split(' ');
    const titleWords = words.slice(0, Math.min(5, words.length));
    const sectionTitle = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const newSec = {
      id: uid(), title: sectionTitle, description: '', expanded: false,
      topics: [
        { id: uid(), title: `Introduction to ${sectionTitle}`, slideType: 'title-bullets', content: '', bullets: [], locked: false },
        { id: uid(), title: 'Key Concepts and Skills', slideType: 'title-bullets', content: '', bullets: [], locked: false },
        { id: uid(), title: 'Practical Examples', slideType: 'title-bullets', content: '', bullets: [], locked: false },
        { id: uid(), title: 'Summary and Next Steps', slideType: 'summary', content: '', bullets: [], locked: false },
      ],
    };
    onSectionsChange(prev => {
      const arr = [...prev];
      if (location === 'end') return [...arr, newSec as never];
      const idx = Math.max(0, selectedSection);
      if (location === 'before') arr.splice(idx, 0, newSec as never);
      else arr.splice(idx + 1, 0, newSec as never);
      return arr;
    });
    setExpandedId(newSec.id);
  };

  // ── Topic mutations ────────────────────────────────────────────────────────
  const doAddTopic = (si: number, afterTi: number, slideType = 'title-bullets', templateId?: string) => {
    const newTopic = { id: uid(), title: 'New topic', slideType, templateId, content: '', bullets: [], locked: false };
    onSectionsChange(prev => prev.map((s, i) => {
      if (i !== si) return s;
      const topics = [...s.topics];
      topics.splice(afterTi + 1, 0, newTopic as never);
      return { ...s, topics };
    }));
    setNewTopicId(newTopic.id);
    setTimeout(() => setNewTopicId(null), 600);
    setTimeout(() => {
      onSelectTopic(si, afterTi + 1);
      onTopicInserted?.();
    }, 0);
  };

  const doEditTopic = (si: number, ti: number, title: string) => {
    onSectionsChange(prev => prev.map((s, i) => {
      if (i !== si) return s;
      return { ...s, topics: s.topics.map((t, j) => j === ti ? { ...t, title } : t) };
    }));
  };

  const doDeleteTopic = (si: number, ti: number) => {
    onSectionsChange(prev => prev.map((s, i) => {
      if (i !== si) return s;
      return { ...s, topics: s.topics.filter((_, j) => j !== ti) };
    }));
  };

  const doRegenerateTopic = (si: number, ti: number) => {
    const titles = ['Advanced Techniques', 'Core Principles', 'Practical Application', 'Best Practices', 'Real-World Examples'];
    doEditTopic(si, ti, titles[Math.floor(Math.random() * titles.length)]);
  };

  const doAddTopicWithAI = async (si: number, afterTi: number, prompt: string) => {
    await new Promise(r => setTimeout(r, 900));
    const words = prompt.split(' ');
    const titleWords = words.slice(0, Math.min(6, words.length));
    const title = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    doAddTopic(si, afterTi, 'title-bullets', undefined);
    // Update the just-inserted topic with the AI-generated title
    setTimeout(() => {
      onSectionsChange(prev => prev.map((s, i) => {
        if (i !== si) return s;
        const topics = [...s.topics];
        const inserted = topics[afterTi + 1];
        if (inserted) topics[afterTi + 1] = { ...inserted, title };
        return { ...s, topics };
      }));
    }, 50);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      width: 300, minWidth: 300, maxWidth: 300,
      background: '#fff', borderRight: `1px solid ${BORDER}`,
      overflow: 'hidden', fontFamily: 'Nunito Sans, system-ui, sans-serif',
    }}>

      {/* ── Course header ── */}
      <div style={{ padding: '12px 12px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Back button */}
          <div className="cs-tooltip-trigger" style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={onBack}
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', cursor: onBack ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'background 0.12s', flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="cs-tooltip" style={{ position: 'absolute', left: '50%', top: 'calc(100% + 6px)', transform: 'translateX(-50%)', background: '#1F2937', color: '#fff', fontSize: 13, fontWeight: 500, padding: '4px 8px', borderRadius: 5, whiteSpace: 'nowrap', zIndex: 100 }}>
              {backLabel}
            </span>
          </div>

          <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#111827', lineHeight: 1.35, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {courseTitle || 'Untitled Course'}
          </span>

          {/* Collapse sidebar button */}
          <button
            onClick={onCollapse}
            title="Collapse sidebar"
            style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexShrink: 0, transition: 'background 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          >
            <PanelLeftClose size={16} />
          </button>

        </div>
      </div>

      {/* ── Sub-toolbar: metadata + Add section ── */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px 12px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', background: '#F3F4F6', borderRadius: 4, padding: '2px 7px', border: `1px solid ${BORDER}` }}>
          Draft
        </span>
        <div style={{ width: 1, height: 12, background: BORDER, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
          <List size={12} color="#9CA3AF" />
          <span style={{ fontSize: 13, color: '#6B7280' }}>
            {sections.length} section{sections.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          ref={addBtnRef}
          aria-label="Add section"
          onClick={() => {
            const r = addBtnRef.current!.getBoundingClientRect();
            setShowAddMenu({ x: r.right - 195, y: r.bottom + 6 });
          }}
          style={{
            height: 36, borderRadius: 8,
            background: '#1565F0', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, padding: '0 12px', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(75,69,215,0.25)',
            transition: 'background 0.12s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A63E8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1565F0'; }}
        >
          <Plus size={14} color="#fff" />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>Add section</span>
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px 8px', scrollbarWidth: 'thin', scrollbarColor: `${BORDER} transparent` }}>
        {sections.map((section, si) => (
          <SectionItem
            key={section.id}
            section={section}
            si={si}
            isExpanded={section.id === expandedId}
            selectedSection={selectedSection}
            selectedTopic={selectedTopic}
            onToggle={() => toggleSection(section.id)}
            onSelectTopic={ti => { onSelectTopic(si, ti); }}
            onSectionMenu={(x, y) => setSectionMenu({ si, x, y })}
            onTopicMenu={(ti, x, y) => setTopicMenu({ si, ti, x, y })}
            onOpenSlideLibrary={afterTi => setSlideLibrary({ si, afterTi })}
            newTopicId={newTopicId}
            isDragOver={dragOver === si && dragFrom !== si}
            onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; setDragFrom(si); }}
            onDragOver={e => { e.preventDefault(); setDragOver(si); }}
            onDrop={e => {
              e.preventDefault();
              if (dragFrom !== null && dragFrom !== si) doReorderSection(dragFrom, si);
              setDragFrom(null); setDragOver(null);
            }}
            onDragEnd={() => { setDragFrom(null); setDragOver(null); }}
          />
        ))}

        {sections.length === 0 && (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: '#6B7280', fontSize: 13 }}>
            No sections yet.<br />
            <button
              onClick={doAddBlankSection}
              style={{ marginTop: 12, color: P, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, textDecoration: 'underline' }}
            >
              Add your first section
            </button>
          </div>
        )}
      </div>

      {/* ── Add section popover ── */}
      {showAddMenu && (
        <PortalMenu x={showAddMenu.x} y={showAddMenu.y} onClose={() => setShowAddMenu(null)}>
          <MenuItem
            icon={<Plus size={14} />}
            label="Add blank section"
            onClick={() => { doAddBlankSection(); setShowAddMenu(null); }}
          />
          <MenuItem
            icon={<Sparkles size={14} />}
            label="Generate with AI"
            onClick={() => { setShowAddMenu(null); setShowGenerateModal(true); }}
          />
        </PortalMenu>
      )}

      {/* ── Section menu ── */}
      {sectionMenu && (
        <SectionMenu
          x={sectionMenu.x} y={sectionMenu.y}
          onClose={() => setSectionMenu(null)}
          onEdit={() => setEditSection({ si: sectionMenu.si, title: sections[sectionMenu.si]?.title ?? '' })}
          onAddWithAI={() => setShowGenerateModal(true)}
          onRegenerate={() => setConfirmRegenSection(sectionMenu.si)}
          onDelete={() => setConfirmDelSection(sectionMenu.si)}
        />
      )}

      {/* ── Topic menu ── */}
      {topicMenu && (
        <TopicMenu
          x={topicMenu.x} y={topicMenu.y}
          onClose={() => setTopicMenu(null)}
          onEdit={() => setEditTopic({ si: topicMenu.si, ti: topicMenu.ti, title: sections[topicMenu.si]?.topics[topicMenu.ti]?.title ?? '' })}
          onAdd={() => doAddTopic(topicMenu.si, topicMenu.ti)}
          onAddWithAI={() => setAddSlideAI({ si: topicMenu.si, afterTi: topicMenu.ti })}
          onRegenerate={() => setConfirmRegenTopic({ si: topicMenu.si, ti: topicMenu.ti })}
          onDelete={() => setConfirmDelTopic({ si: topicMenu.si, ti: topicMenu.ti })}
        />
      )}

      {/* ── Edit section ── */}
      {editSection && (
        <EditModal
          title="Edit section"
          value={editSection.title}
          placeholder="Section title…"
          onSave={v => doEditSection(editSection.si, v)}
          onClose={() => setEditSection(null)}
        />
      )}

      {/* ── Delete section confirm ── */}
      {confirmDelSection !== null && (
        <ConfirmModal
          title="Delete section?"
          message={`"${sections[confirmDelSection]?.title}" and all its topics will be permanently removed.`}
          confirmLabel="Delete"
          danger
          onConfirm={() => doDeleteSection(confirmDelSection)}
          onClose={() => setConfirmDelSection(null)}
        />
      )}

      {/* ── Regenerate section confirm ── */}
      {confirmRegenSection !== null && (
        <ConfirmModal
          title="Regenerate section?"
          message="All topics in this section will be replaced with AI-generated content. This cannot be undone."
          confirmLabel="Regenerate"
          onConfirm={() => doRegenerateSection(confirmRegenSection)}
          onClose={() => setConfirmRegenSection(null)}
        />
      )}

      {/* ── Edit topic ── */}
      {editTopic && (
        <EditModal
          title="Edit topic"
          value={editTopic.title}
          placeholder="Topic title…"
          onSave={v => doEditTopic(editTopic.si, editTopic.ti, v)}
          onClose={() => setEditTopic(null)}
        />
      )}

      {/* ── Delete topic confirm ── */}
      {confirmDelTopic && (
        <ConfirmModal
          title="Delete topic?"
          message={`"${sections[confirmDelTopic.si]?.topics[confirmDelTopic.ti]?.title}" will be permanently removed.`}
          confirmLabel="Delete"
          danger
          onConfirm={() => doDeleteTopic(confirmDelTopic.si, confirmDelTopic.ti)}
          onClose={() => setConfirmDelTopic(null)}
        />
      )}

      {/* ── Regenerate topic confirm ── */}
      {confirmRegenTopic && (
        <ConfirmModal
          title="Regenerate topic?"
          message="This topic's content will be replaced with AI-generated content."
          confirmLabel="Regenerate"
          onConfirm={() => doRegenerateTopic(confirmRegenTopic.si, confirmRegenTopic.ti)}
          onClose={() => setConfirmRegenTopic(null)}
        />
      )}

      {/* ── Generate with AI modal ── */}
      {showGenerateModal && (
        <GenerateSectionModal
          onGenerate={doGenerateSection}
          onClose={() => setShowGenerateModal(false)}
        />
      )}

      {/* ── Add slide with AI modal ── */}
      {addSlideAI && (
        <AddSlideWithAIModal
          onAdd={prompt => doAddTopicWithAI(addSlideAI.si, addSlideAI.afterTi, prompt)}
          onClose={() => setAddSlideAI(null)}
        />
      )}

      {/* ── Slide Library modal ── */}
      <SlideLibraryModal
        isOpen={!!slideLibrary}
        complexity={complexity ?? 'basic'}
        onClose={() => setSlideLibrary(null)}
        onInsert={(slideType, templateId) => {
          if (slideLibrary) doAddTopic(slideLibrary.si, slideLibrary.afterTi, slideType, templateId);
          setSlideLibrary(null);
        }}
      />
    </div>
  );
}
