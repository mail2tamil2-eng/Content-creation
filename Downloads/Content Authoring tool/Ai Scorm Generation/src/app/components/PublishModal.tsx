import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X, CheckCircle2, Sparkles, Download, AlertCircle,
  RotateCcw, Loader2, Check, Upload, Search, ChevronDown, Building2, LayoutDashboard, ArrowLeft,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  topics: { id: string; title: string }[];
}

interface Props {
  courseTitle: string;
  sections: Section[];
  onClose: () => void;
  onDashboard?: () => void;
  onTranslate?: () => void;
  publishLmsDestination?: string;
  setPublishLmsDestination?: React.Dispatch<React.SetStateAction<string>>;
  publishLmsDropdownOpen?: boolean;
  setPublishLmsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  publishLmsPushed?: boolean;
  setPublishLmsPushed?: React.Dispatch<React.SetStateAction<boolean>>;
  publishDone?: boolean;
  setPublishDone?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Tenant { id: string; name: string; url: string; color: string; bg: string; }

const ALL_TENANTS: Tenant[] = [
  { id: 'axlekorp',  name: 'Axle KORP',    url: 'lms.axlekorp.com',     color: '#154880', bg: '#EEF4FB' },
  { id: 'zell',      name: 'Zell Learning', url: 'lms.zelllearning.com', color: '#1565F0', bg: '#EBF3FF' },
  { id: 'agums',     name: 'Agums',         url: 'lms.agums.io',         color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'hotelhub',  name: 'Hotelhub',      url: 'lms.hotelhub.net',     color: '#C2410C', bg: '#FFF3E5' },
  { id: 'datafy',    name: 'Datafy',        url: 'lms.datafy.com',       color: '#15803D', bg: '#F0FDF4' },
  { id: 'edgewise',  name: 'Edgewise',      url: 'lms.edgewise.io',      color: '#B45309', bg: '#FFFBEB' },
  { id: 'syncore',   name: 'Syncore',       url: 'lms.syncore.net',      color: '#0E7490', bg: '#ECFEFF' },
  { id: 'nexlearn',  name: 'NexLearn',      url: 'lms.nexlearn.com',     color: '#9333EA', bg: '#FAF5FF' },
  { id: 'brighthub', name: 'BrightHub',     url: 'lms.brighthub.io',     color: '#DC2626', bg: '#FEF2F2' },
  { id: 'skillport', name: 'Skillport',     url: 'lms.skillport.com',    color: '#065F46', bg: '#ECFDF5' },
];

type GlobalStep  = 'idle' | 'generating' | 'validating' | 'transferring' | 'done';
type Phase       = 'select' | 'publishing' | 'done' | 'error';
type TenantStatus = 'pending' | 'active' | 'done' | 'error';

export default function PublishModal({ courseTitle, sections, onClose, onDashboard }: Props) {
  // ── selection ────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<string[]>(['axlekorp']);
  const [dropOpen, setDropOpen]       = useState(false);
  const [search, setSearch]           = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
        setSearch('');
      }
    };
    if (dropOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen]);

  // ── publishing ───────────────────────────────────────────
  const [phase, setPhase]               = useState<Phase>('select');
  const [globalStep, setGlobalStep]     = useState<GlobalStep>('idle');
  const [tenantStatus, setTenantStatus] = useState<Record<string, TenantStatus>>({});
  const [retryKey, setRetryKey]         = useState(0);

  const slideCount     = sections.reduce((n, s) => n + s.topics.length, 0);
  const scormFile      = `${(courseTitle || 'Course').replace(/\s+/g, '_')}_SCORM.zip`;
  const chosenTenants  = ALL_TENANTS.filter(t => selectedIds.includes(t.id));
  const totalUnits     = 2 + chosenTenants.length;
  const doneUnits      =
    (['validating','transferring','done'].includes(globalStep) ? 1 : 0) +
    (['transferring','done'].includes(globalStep) ? 1 : 0) +
    Object.values(tenantStatus).filter(s => s === 'done').length;
  const progress = phase === 'done' ? 100 : Math.round((doneUnits / totalUnits) * 100);

  const filtered = useMemo(() =>
    search.trim()
      ? ALL_TENANTS.filter(t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.url.toLowerCase().includes(search.toLowerCase()))
      : ALL_TENANTS,
    [search]);

  useEffect(() => {
    if (phase !== 'publishing') return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setGlobalStep('generating');
      setTenantStatus(Object.fromEntries(chosenTenants.map(t => [t.id, 'pending' as TenantStatus])));
      await sleep(480); if (cancelled) return;

      setGlobalStep('validating');
      await sleep(560); if (cancelled) return;

      setGlobalStep('transferring');
      for (const t of chosenTenants) {
        if (cancelled) return;
        setTenantStatus(p => ({ ...p, [t.id]: 'active' }));
        await sleep(620); if (cancelled) return;
        setTenantStatus(p => ({ ...p, [t.id]: 'done' }));
      }
      if (!cancelled) { setGlobalStep('done'); setPhase('done'); }
    };

    run();
    return () => { cancelled = true; };
  }, [phase, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePublish = () => setPhase('publishing');
  const handleRetry   = () => { setRetryKey(k => k + 1); setPhase('publishing'); };

  const allChecked  = ALL_TENANTS.every(t => selectedIds.includes(t.id));
  const someChecked = selectedIds.length > 0 && !allChecked;
  const toggleAll   = () => setSelectedIds(allChecked ? [] : ALL_TENANTS.map(t => t.id));
  const toggleOne   = (id: string) =>
    setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  // header
  const iconBg    = phase === 'done' ? '#F0FDF4' : phase === 'error' ? '#FEF2F2' : '#EBF3FF';
  const iconColor = phase === 'done' ? '#15803D' : phase === 'error' ? '#B91C1C' : '#1565F0';
  const heading   = phase === 'select' ? 'Publish to LMS' : phase === 'done' ? 'Course Published!' : phase === 'error' ? 'Publishing Failed' : 'Publishing to LMS';
  const subhead   = phase === 'select'     ? 'Select one or more LMS tenants to publish this course'
                  : phase === 'done'       ? `Successfully published to ${chosenTenants.length} tenant${chosenTenants.length > 1 ? 's' : ''}.`
                  : phase === 'error'      ? 'An error occurred during publishing. Please try again.'
                  : globalStep === 'generating' ? 'Generating SCORM package…'
                  : globalStep === 'validating' ? 'Validating package…'
                  : `Publishing to ${chosenTenants.length} tenant${chosenTenants.length > 1 ? 's' : ''}…`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 24px 60px rgba(15,23,42,0.18)', width: '100%', maxWidth: 520, fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 18px', borderBottom: '1px solid #F3F4F6', borderRadius: '20px 20px 0 0', overflow: 'hidden', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
              {phase === 'done'  ? <CheckCircle2 size={22} color={iconColor} />
             : phase === 'error' ? <AlertCircle  size={22} color={iconColor} />
             :                     <Upload        size={20} color={iconColor} />}
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>{heading}</p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0', lineHeight: 1.4 }}>{subhead}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexShrink: 0, transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '18px 24px 20px' }}>

          {/* Course strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB', marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFF3E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={16} color="#F48120" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{courseTitle || 'Untitled Course'}</p>
              <p style={{ fontSize: 11, color: '#6B7280', margin: '1px 0 0' }}>SCORM 1.2 · {slideCount} slide{slideCount !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* ═══ SELECT PHASE ═══ */}
          {phase === 'select' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                LMS Tenant
              </label>

              {/* Multi-select dropdown */}
              <div ref={dropRef} style={{ position: 'relative' }}>

                {/* Trigger */}
                <div
                  onClick={() => setDropOpen(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5,
                    minHeight: 42, padding: '6px 36px 6px 10px',
                    border: `1.5px solid ${dropOpen ? '#1565F0' : '#6B7280'}`,
                    borderRadius: 10, background: '#fff', cursor: 'pointer',
                    position: 'relative', transition: 'border-color 0.15s',
                  }}
                >
                  {selectedIds.length === 0 ? (
                    <span style={{ fontSize: 13, color: '#9CA3AF' }}>Select tenants…</span>
                  ) : (
                    chosenTenants.map(t => (
                      <span
                        key={t.id}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px 2px 7px', borderRadius: 6, background: t.bg, border: `1px solid ${t.color}30`, fontSize: 12, fontWeight: 600, color: t.color, lineHeight: 1.4 }}
                      >
                        {t.name}
                        <button
                          onClick={e => { e.stopPropagation(); toggleOne(t.id); }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: 3, border: 'none', background: 'transparent', cursor: 'pointer', color: t.color, padding: 0, opacity: 0.7 }}
                        >
                          <X size={10} strokeWidth={2.5} />
                        </button>
                      </span>
                    ))
                  )}
                  {/* Chevron */}
                  <ChevronDown
                    size={15}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: `translateY(-50%) rotate(${dropOpen ? 180 : 0}deg)`, color: '#6B7280', transition: 'transform 0.2s', pointerEvents: 'none' }}
                  />
                </div>

                {/* Dropdown panel */}
                {dropOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 12, boxShadow: '0 8px 24px rgba(15,23,42,0.12)', zIndex: 100, overflow: 'hidden' }}>

                    {/* Search inside dropdown */}
                    <div style={{ padding: '10px 10px 6px', borderBottom: '1px solid #F3F4F6' }}>
                      <div style={{ position: 'relative' }}>
                        <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                        <input
                          type="text"
                          placeholder="Search tenants…"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          onClick={e => e.stopPropagation()}
                          autoFocus
                          style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px 6px 28px', fontSize: 13, color: '#111827', border: '1.5px solid #E5E7EB', borderRadius: 8, background: '#F9FAFB', outline: 'none', fontFamily: 'inherit' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#1565F0'; e.currentTarget.style.background = '#fff'; }}
                          onBlur={e  => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#F9FAFB'; }}
                        />
                      </div>
                    </div>

                    {/* Select All row */}
                    <div style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <button
                        onClick={e => { e.stopPropagation(); toggleAll(); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${allChecked || someChecked ? '#1565F0' : '#D1D5DB'}`, background: allChecked ? '#1565F0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.13s' }}>
                          {allChecked  && <Check size={10} color="#fff" strokeWidth={3} />}
                          {someChecked && <span style={{ width: 8, height: 2, background: '#1565F0', borderRadius: 1, display: 'block' }} />}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Select All</span>
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9CA3AF' }}>{ALL_TENANTS.length} tenants</span>
                      </button>
                    </div>

                    {/* Tenant list */}
                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                      {filtered.length === 0 ? (
                        <div style={{ padding: '20px 0', textAlign: 'center' }}>
                          <Building2 size={24} style={{ color: '#D1D5DB', margin: '0 auto 6px', display: 'block' }} />
                          <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>No tenants found</p>
                        </div>
                      ) : filtered.map(t => {
                        const checked   = selectedIds.includes(t.id);
                        const isDefault = t.id === 'axlekorp';
                        return (
                          <button
                            key={t.id}
                            onClick={e => { e.stopPropagation(); toggleOne(t.id); }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 14px', background: checked ? t.bg : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                            onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                            onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          >
                            {/* Checkbox */}
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? t.color : '#D1D5DB'}`, background: checked ? t.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.13s' }}>
                              {checked && <Check size={10} color="#fff" strokeWidth={3} />}
                            </div>
                            {/* Avatar */}
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: t.bg, border: `1px solid ${t.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: t.color }}>{t.name.charAt(0)}</span>
                            </div>
                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <p style={{ fontSize: 13, fontWeight: checked ? 600 : 400, color: checked ? t.color : '#111827', margin: 0 }}>{t.name}</p>
                                {isDefault && <span style={{ fontSize: 10, fontWeight: 700, color: '#154880', background: '#EEF4FB', border: '1px solid #ADC8E8', padding: '0px 5px', borderRadius: 99 }}>Default</span>}
                              </div>
                              <p style={{ fontSize: 11, color: '#9CA3AF', margin: '1px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.url}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer count */}
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{filtered.length} of {ALL_TENANTS.length} shown</span>
                      <button
                        onClick={e => { e.stopPropagation(); setDropOpen(false); setSearch(''); }}
                        style={{ fontSize: 12, fontWeight: 600, color: '#1565F0', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Helper text */}
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6, marginBottom: 0 }}>
                {selectedIds.length === 0
                  ? 'Choose at least one tenant to publish'
                  : `${selectedIds.length} tenant${selectedIds.length > 1 ? 's' : ''} selected`}
              </p>
            </div>
          )}

          {/* ═══ PUBLISHING / DONE / ERROR PHASE ═══ */}
          {phase !== 'select' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
                <GlobalStepRow label="Generating SCORM package"
                  status={globalStep === 'generating' ? 'active' : ['validating','transferring','done'].includes(globalStep) ? 'done' : 'pending'} />
                <GlobalStepRow label="Validating package"
                  status={globalStep === 'validating' ? 'active' : ['transferring','done'].includes(globalStep) ? 'done' : 'pending'} />

                {/* Transfer block */}
                <div style={{ padding: '8px 12px', borderRadius: 10, background: globalStep === 'transferring' ? '#F0F6FF' : 'transparent', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phase === 'done' ? '#F0FDF4' : globalStep === 'transferring' ? '#EBF3FF' : '#F3F4F6', border: `1.5px solid ${phase === 'done' ? '#86EFAC' : globalStep === 'transferring' ? '#93C5FD' : '#E5E7EB'}`, transition: 'all 0.25s' }}>
                      {phase === 'done'              ? <Check    size={13} color="#15803D" strokeWidth={2.5} />
                     : globalStep === 'transferring' ? <Loader2  size={13} color="#1565F0" style={{ animation: 'spin 1s linear infinite' }} />
                     :                                 <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D1D5DB', display: 'block' }} />}
                    </div>
                    <p style={{ fontSize: 13, margin: 0, flex: 1, fontWeight: globalStep === 'transferring' ? 600 : phase === 'done' ? 500 : 400, color: phase === 'done' ? '#15803D' : globalStep === 'transferring' ? '#1254C7' : '#9CA3AF', transition: 'color 0.25s' }}>
                      Transferring to LMS tenants
                    </p>
                    {phase === 'done'              && <span style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>Done</span>}
                    {!['transferring','done'].includes(globalStep) && phase !== 'done' && <span style={{ fontSize: 11, color: '#D1D5DB', fontWeight: 500 }}>Pending</span>}
                  </div>

                  {/* Per-tenant rows */}
                  {(globalStep === 'transferring' || phase === 'done') && (
                    <div style={{ marginTop: 8, marginLeft: 40, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {chosenTenants.map(t => {
                        const st: TenantStatus = tenantStatus[t.id] ?? 'pending';
                        return (
                          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 8, background: st === 'active' ? '#fff' : 'transparent', border: st === 'active' ? '1px solid #E5E7EB' : '1px solid transparent', transition: 'all 0.15s' }}>
                            <div style={{ width: 22, height: 22, borderRadius: 5, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: t.color }}>{t.name.charAt(0)}</span>
                            </div>
                            <p style={{ fontSize: 12, margin: 0, flex: 1, fontWeight: st === 'active' ? 600 : st === 'done' ? 500 : 400, color: st === 'done' ? '#15803D' : st === 'active' ? t.color : '#9CA3AF', transition: 'color 0.2s' }}>{t.name}</p>
                            {st === 'done'    && <Check   size={12} color="#15803D" strokeWidth={2.5} />}
                            {st === 'active'  && <Loader2 size={12} color={t.color} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />}
                            {st === 'pending' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E5E7EB', display: 'block', flexShrink: 0 }} />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>
                    {phase === 'done' ? `Published to ${chosenTenants.length} tenant${chosenTenants.length > 1 ? 's' : ''}` : `${doneUnits} of ${totalUnits} steps done`}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: phase === 'done' ? '#15803D' : '#1565F0' }}>{progress}%</span>
                </div>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: phase === 'done' ? '#15803D' : '#1565F0', borderRadius: 99, transition: 'width 0.45s ease, background 0.3s' }} />
                </div>
              </div>

              {phase === 'error' && (
                <div style={{ marginTop: 14, padding: '12px 14px', background: '#FEF2F2', borderRadius: 10, border: '1px solid #FECACA', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <AlertCircle size={15} color="#B91C1C" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#B91C1C', margin: 0 }}>Publishing Error</p>
                    <p style={{ fontSize: 12, color: '#991B1B', margin: '3px 0 0', lineHeight: 1.5 }}>Failed to transfer the SCORM package to one or more LMS tenants. Please check your connections and try again.</p>
                  </div>
                </div>
              )}

              {phase === 'done' && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#15803D', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#166534', fontWeight: 500 }}>{scormFile} · published to {chosenTenants.map(t => t.name).join(', ')}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: phase === 'done' ? 'space-between' : 'flex-end', padding: '14px 24px 20px', borderTop: '1px solid #F3F4F6', borderRadius: '0 0 20px 20px', overflow: 'hidden', background: '#fff' }}>
          {phase === 'done' && (
            <button
              onClick={() => { setPhase('select'); setGlobalStep('idle'); setTenantStatus({}); }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9, border: '1.5px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            {phase === 'select' && (
              <button onClick={handlePublish} disabled={selectedIds.length === 0}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 22px', borderRadius: 9, border: 'none', background: selectedIds.length === 0 ? '#C4C4C4' : '#1565F0', color: '#fff', fontSize: 13, fontWeight: 600, cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (selectedIds.length > 0) (e.currentTarget as HTMLElement).style.background = '#1A63E8'; }}
                onMouseLeave={e => { if (selectedIds.length > 0) (e.currentTarget as HTMLElement).style.background = '#1565F0'; }}>
                <Upload size={14} />
                {selectedIds.length === 0 ? 'Select a Tenant' : selectedIds.length === 1 ? `Publish to ${chosenTenants[0]?.name}` : `Publish to ${selectedIds.length} Tenants`}
              </button>
            )}
            {phase === 'error' && (
              <button onClick={handleRetry}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 9, border: 'none', background: '#1565F0', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A63E8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1565F0'; }}>
                <RotateCcw size={13} /> Retry Publishing
              </button>
            )}
            {phase === 'done' && (
              <>
                <button onClick={onDashboard}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 9, border: '1.5px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                  <LayoutDashboard size={14} /> Go to Dashboard
                </button>
                <button onClick={() => {}}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 9, border: 'none', background: '#15803D', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#166534'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#15803D'; }}>
                  <Download size={14} /> Download SCORM
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalStepRow({ label, status }: { label: string; status: 'pending' | 'active' | 'done' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 10, background: status === 'active' ? '#F0F6FF' : 'transparent', transition: 'background 0.2s' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: status === 'done' ? '#F0FDF4' : status === 'active' ? '#EBF3FF' : '#F3F4F6', border: `1.5px solid ${status === 'done' ? '#86EFAC' : status === 'active' ? '#93C5FD' : '#E5E7EB'}`, transition: 'all 0.25s' }}>
        {status === 'done'   ? <Check   size={13} color="#15803D" strokeWidth={2.5} />
       : status === 'active' ? <Loader2 size={13} color="#1565F0" style={{ animation: 'spin 1s linear infinite' }} />
       : <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D1D5DB', display: 'block' }} />}
      </div>
      <p style={{ fontSize: 13, margin: 0, flex: 1, fontWeight: status === 'active' ? 600 : status === 'done' ? 500 : 400, color: status === 'done' ? '#15803D' : status === 'active' ? '#1254C7' : '#9CA3AF', transition: 'color 0.25s' }}>
        {label}
      </p>
      {status === 'done'    && <span style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>Done</span>}
      {status === 'pending' && <span style={{ fontSize: 11, color: '#D1D5DB', fontWeight: 500 }}>Pending</span>}
    </div>
  );
}
