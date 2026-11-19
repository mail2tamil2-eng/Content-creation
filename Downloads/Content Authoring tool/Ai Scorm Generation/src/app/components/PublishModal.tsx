import React, { useState, useEffect } from 'react';
import {
  X, CheckCircle2, Sparkles, Download, AlertCircle,
  RotateCcw, Loader2, Check, Upload, LayoutDashboard, ArrowLeft,
  ListChecks,
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

type CompletionSource = 'quiz' | 'slide-view' | 'knowledge-check';

type GlobalStep  = 'idle' | 'generating' | 'validating' | 'done';
type Phase       = 'criteria' | 'publishing' | 'done' | 'error';

export default function PublishModal({ courseTitle, sections, onClose, onDashboard }: Props) {
  // ── completion criteria ───────────────────────────────────
  const [completionSrcs, setCompletionSrcs] = useState<CompletionSource[]>([]);
  const [quizPassPct, setQuizPassPct]       = useState(80);
  const [slideViewPct, setSlideViewPct]     = useState(80);

  // ── publishing ───────────────────────────────────────────
  const [phase, setPhase]               = useState<Phase>('criteria');
  const [globalStep, setGlobalStep]     = useState<GlobalStep>('idle');
  const [retryKey, setRetryKey]         = useState(0);

  const slideCount     = sections.reduce((n, s) => n + s.topics.length, 0);
  const scormFile      = `${(courseTitle || 'Course').replace(/\s+/g, '_')}_SCORM.zip`;
  const totalUnits     = 2;
  const doneUnits      = (['validating','done'].includes(globalStep) ? 1 : 0) + (globalStep === 'done' ? 1 : 0);
  const progress = phase === 'done' ? 100 : Math.round((doneUnits / totalUnits) * 100);

  useEffect(() => {
    if (phase !== 'publishing') return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setGlobalStep('generating');
      await sleep(600); if (cancelled) return;

      setGlobalStep('validating');
      await sleep(700); if (cancelled) return;

      setGlobalStep('done'); setPhase('done');
    };

    run();
    return () => { cancelled = true; };
  }, [phase, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePublish = () => setPhase('publishing');
  const handleRetry   = () => { setRetryKey(k => k + 1); setPhase('publishing'); };

  // header
  const iconBg    = phase === 'done' ? '#F0FDF4' : phase === 'error' ? '#FEF2F2' : '#EBF3FF';
  const iconColor = phase === 'done' ? '#15803D' : phase === 'error' ? '#B91C1C' : '#1565F0';
  const heading   = phase === 'criteria'   ? 'Completion Criteria'
                  : phase === 'done'       ? 'Course Published!'
                  : phase === 'error'      ? 'Publishing Failed'
                  :                          'Publishing Course';
  const subhead   = phase === 'criteria'   ? 'Set when this course is marked complete for a learner'
                  : phase === 'done'       ? 'Your SCORM package is ready to download.'
                  : phase === 'error'      ? 'An error occurred during publishing. Please try again.'
                  : globalStep === 'generating' ? 'Generating SCORM package…'
                  :                               'Validating package…';

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
              {phase === 'done'      ? <CheckCircle2 size={22} color={iconColor} />
             : phase === 'error'     ? <AlertCircle  size={22} color={iconColor} />
             : phase === 'criteria'  ? <ListChecks   size={20} color={iconColor} />
             :                         <Upload        size={20} color={iconColor} />}
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

          {/* ═══ CRITERIA PHASE ═══ */}
          {phase === 'criteria' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Mark complete when — select all that apply
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

                {/* Quiz score */}
                {(() => {
                  const checked = completionSrcs.includes('quiz');
                  return (
                    <div style={{ borderRadius: 8, border: `1.5px solid ${checked ? '#93C5FD' : '#E5E7EB'}`, background: checked ? '#EBF3FF' : '#F9FAFB', transition: 'all 0.12s', overflow: 'hidden' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', userSelect: 'none' as const }}
                        onClick={() => setCompletionSrcs(prev => checked ? prev.filter(v => v !== 'quiz') : [...prev, 'quiz'])}>
                        <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? '#1565F0' : '#D1D5DB'}`, background: checked ? '#1565F0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                          {checked && <Check size={10} color="#fff" strokeWidth={3} />}
                        </span>
                        <span style={{ fontSize: 13, color: checked ? '#1565F0' : '#374151', fontWeight: checked ? 600 : 400, flex: 1 }}>Quiz score</span>
                      </label>
                      {checked && (
                        <div style={{ padding: '0 12px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 12, color: '#6B7280' }}>Minimum pass score</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                            <input type="number" min="1" max="100" value={quizPassPct}
                              onChange={e => setQuizPassPct(Math.max(1, Math.min(100, Number(e.target.value))))}
                              onClick={e => e.stopPropagation()}
                              style={{ width: 52, border: '1px solid #D1D5DB', borderRadius: 6, padding: '4px 8px', fontSize: 13, outline: 'none', fontFamily: 'inherit', textAlign: 'center', background: '#fff', color: '#1565F0', fontWeight: 600 }}
                              onFocus={e => { e.currentTarget.style.borderColor = '#1565F0'; }}
                              onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                            />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1565F0' }}>%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Slide view % */}
                {(() => {
                  const checked = completionSrcs.includes('slide-view');
                  return (
                    <div style={{ borderRadius: 8, border: `1.5px solid ${checked ? '#93C5FD' : '#E5E7EB'}`, background: checked ? '#EBF3FF' : '#F9FAFB', transition: 'all 0.12s', overflow: 'hidden' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', userSelect: 'none' as const }}
                        onClick={() => setCompletionSrcs(prev => checked ? prev.filter(v => v !== 'slide-view') : [...prev, 'slide-view'])}>
                        <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? '#1565F0' : '#D1D5DB'}`, background: checked ? '#1565F0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                          {checked && <Check size={10} color="#fff" strokeWidth={3} />}
                        </span>
                        <span style={{ fontSize: 13, color: checked ? '#1565F0' : '#374151', fontWeight: checked ? 600 : 400, flex: 1 }}>Slide view percentage</span>
                      </label>
                      {checked && (
                        <div style={{ padding: '0 12px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 12, color: '#6B7280' }}>Minimum slides viewed</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                            <input type="number" min="1" max="100" value={slideViewPct}
                              onChange={e => setSlideViewPct(Math.max(1, Math.min(100, Number(e.target.value))))}
                              onClick={e => e.stopPropagation()}
                              style={{ width: 52, border: '1px solid #D1D5DB', borderRadius: 6, padding: '4px 8px', fontSize: 13, outline: 'none', fontFamily: 'inherit', textAlign: 'center', background: '#fff', color: '#1565F0', fontWeight: 600 }}
                              onFocus={e => { e.currentTarget.style.borderColor = '#1565F0'; }}
                              onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                            />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1565F0' }}>%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Knowledge check */}
                {(() => {
                  const checked = completionSrcs.includes('knowledge-check');
                  return (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', borderRadius: 8, background: checked ? '#EBF3FF' : '#F9FAFB', border: `1.5px solid ${checked ? '#93C5FD' : '#E5E7EB'}`, transition: 'all 0.12s', userSelect: 'none' as const }}
                      onClick={() => setCompletionSrcs(prev => checked ? prev.filter(v => v !== 'knowledge-check') : [...prev, 'knowledge-check'])}>
                      <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? '#1565F0' : '#D1D5DB'}`, background: checked ? '#1565F0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                        {checked && <Check size={10} color="#fff" strokeWidth={3} />}
                      </span>
                      <span style={{ fontSize: 13, color: checked ? '#1565F0' : '#374151', fontWeight: checked ? 600 : 400 }}>Knowledge check</span>
                    </label>
                  );
                })()}


              </div>
              {completionSrcs.length === 0 && (
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, marginBottom: 0 }}>
                  No criteria selected — course defaults to slide completion tracking
                </p>
              )}
            </div>
          )}

          {/* ═══ PUBLISHING / DONE / ERROR PHASE ═══ */}
          {(phase === 'publishing' || phase === 'done' || phase === 'error') && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
                <GlobalStepRow label="Generating SCORM package"
                  status={globalStep === 'generating' ? 'active' : ['validating','done'].includes(globalStep) ? 'done' : 'pending'} />
                <GlobalStepRow label="Validating package"
                  status={globalStep === 'validating' ? 'active' : globalStep === 'done' ? 'done' : 'pending'} />

              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>
                    {phase === 'done' ? 'Published' : `${doneUnits} of ${totalUnits} steps done`}
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
                    <p style={{ fontSize: 12, color: '#991B1B', margin: '3px 0 0', lineHeight: 1.5 }}>Couldn’t generate the SCORM package. Please try again.</p>
                  </div>
                </div>
              )}

              {phase === 'done' && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#15803D', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#166534', fontWeight: 500 }}>{scormFile} · ready to download</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px 20px', borderTop: '1px solid #F3F4F6', borderRadius: '0 0 20px 20px', overflow: 'hidden', background: '#fff' }}>
          {/* Left side: back buttons */}
          <div>
            {phase === 'done' && (
              <button
                onClick={() => { setPhase('criteria'); setGlobalStep('idle'); }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9, border: '1.5px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {phase === 'criteria' && (
              <>
                <button onClick={onClose}
                  style={{ padding: '8px 18px', borderRadius: 9, border: '1.5px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                  Cancel
                </button>
                <button onClick={handlePublish}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 9, border: 'none', background: '#1565F0', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A63E8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1565F0'; }}>
                  <Upload size={14} /> Publish
                </button>
              </>
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
