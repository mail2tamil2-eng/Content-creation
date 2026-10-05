import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Check, Download } from 'lucide-react';

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
  // legacy props — kept so existing call-sites don't break
  publishLmsDestination?: string;
  setPublishLmsDestination?: React.Dispatch<React.SetStateAction<string>>;
  publishLmsDropdownOpen?: boolean;
  setPublishLmsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  publishLmsPushed?: boolean;
  setPublishLmsPushed?: React.Dispatch<React.SetStateAction<boolean>>;
  publishDone?: boolean;
  setPublishDone?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublishModal({ courseTitle, sections, onClose }: Props) {
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const slideCount = sections.reduce((n, s) => n + s.topics.length, 0);
  const scormFilename = `${(courseTitle || 'Course').replace(/\s+/g, '_')}_SCORM.zip`;

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          width: '100%',
          maxWidth: 560,
          fontFamily: 'Nunito Sans, system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 18px', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: published ? '#16A34A' : '#F48120', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {published
                ? <Check size={20} color="#fff" strokeWidth={2.5} />
                : <CheckCircle2 size={20} color="#fff" />
              }
            </div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#101828', margin: 0 }}>
                {published ? 'Course Published!' : 'Publish Course'}
              </p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>
                {published
                  ? 'Your SCORM package is ready to download.'
                  : 'Generate the final SCORM package and publish your course'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 9, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 14, overflow: 'hidden' }}>

            {/* Course info row */}
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFF3E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={18} color="#F48120" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#101828', margin: 0 }}>{courseTitle || 'Untitled Course'}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>SCORM 1.2 · {slideCount} slide{slideCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                Publishing will generate the final SCORM package from your current course settings and make it available for download and distribution.
              </p>
            </div>

            {/* Action row */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: published ? 'space-between' : 'flex-end' }}>
              {published && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
                  <span style={{ fontSize: 13, color: '#166534', fontWeight: 500 }}>Ready — {scormFilename}</span>
                </div>
              )}
              {published ? (
                <button
                  onClick={() => {}}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 10, border: 'none', background: '#16A34A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#15803D'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#16A34A'; }}
                >
                  <Download size={14} /> Download SCORM
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 24px', borderRadius: 10, border: 'none', background: publishing ? '#F9AB68' : '#F48120', color: '#fff', fontSize: 13, fontWeight: 600, cursor: publishing ? 'default' : 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!publishing) (e.currentTarget as HTMLElement).style.background = '#E07310'; }}
                  onMouseLeave={e => { if (!publishing) (e.currentTarget as HTMLElement).style.background = '#F48120'; }}
                >
                  {publishing ? (
                    <>
                      <svg style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                        <path fill="#fff" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Publishing…
                    </>
                  ) : (
                    <><CheckCircle2 size={14} /> Publish</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '0 24px 20px' }}>
          <button
            onClick={onClose}
            style={{ padding: '9px 22px', borderRadius: 10, border: '1px solid #D1D5DB', background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
