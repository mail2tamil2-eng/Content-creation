import React, { useRef, useState } from 'react';
import {
  X, Sparkles, Trash2, Plus, ChevronDown, ChevronUp, RefreshCw, Upload,
  Play, Pause, Square, Mic, Globe, Wand2, FolderOpen, Crop, Move,
  Maximize2, GripVertical, RotateCcw, Image as ImageIcon, Video as VideoIcon,
  Check, AlertCircle, PanelRightClose, AlignLeft, AlignCenter, AlignRight,
} from 'lucide-react';
import type { CSTopic } from './CourseSidebar';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SlideSettingsPanelProps {
  topic: CSTopic;
  sectionTitle?: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  onUpdate: (updates: Partial<CSTopic>) => void;
  onClose: () => void;
  onChangeSlideType: () => void;
  onDelete: () => void;
  onEnhanceWithAI: () => void;
  enhancing?: boolean;
  onRegenerateSlide?: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TEXT_SLIDE_TYPES = new Set([
  'title-text','title-bullets','horizontal-series','vertical-series',
  'expandable-list','table','click-reveal','scenario','flash-card','branching-scenario',
]);

const NARRATION_LANGS  = [
  {value:'en',label:'English'},{value:'es',label:'Spanish'},{value:'fr',label:'French'},
  {value:'de',label:'German'},{value:'hi',label:'Hindi'},{value:'ar',label:'Arabic'},
  {value:'pt',label:'Portuguese'},
];
const NARRATION_VOICES = [
  {value:'male-en',label:'Male (EN)'},{value:'female-en',label:'Female (EN)'},
  {value:'male-neutral',label:'Male Neutral'},{value:'female-neutral',label:'Female Neutral'},
];
const NARRATION_TONES  = [
  {value:'professional',label:'Professional'},{value:'friendly',label:'Friendly'},
  {value:'energetic',label:'Energetic'},{value:'calm',label:'Calm'},
];

// ── Slide type display map ────────────────────────────────────────────────────

interface TypeInfo { name: string; category: 'TEXT' | 'MEDIA' | 'INTERACTIVE' | 'QUIZ'; color: string; bg: string; }

const TYPE_INFO: Record<string, TypeInfo> = {
  'title-text':         { name: 'Title + Text',       category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'title-bullets':      { name: 'Bulleted List',       category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'horizontal-series':  { name: 'Horizontal Series',   category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'vertical-series':    { name: 'Vertical Series',     category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'expandable-list':    { name: 'Expandable List',     category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'table':              { name: 'Table',               category: 'TEXT',        color: '#2563EB', bg: '#EFF6FF' },
  'image-horizontal':   { name: 'Image Horizontal',    category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'image-vertical':     { name: 'Image Vertical',      category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'media-collection':   { name: 'Media Collection',    category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'video':              { name: 'Video',               category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'audio':              { name: 'Audio',               category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'spokesperson':       { name: 'AI Spokesperson',     category: 'MEDIA',       color: '#7C3AED', bg: '#F5F3FF' },
  'hotspot':            { name: 'Hotspot',             category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'click-reveal':       { name: 'Click-to-Reveal',     category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'slider':             { name: 'Slider',              category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'drag-drop':          { name: 'Drag & Drop',         category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'matching':           { name: 'Matching',            category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'scenario':           { name: 'Sequencing',          category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'flash-card':         { name: 'Flash Card',          category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'branching-scenario': { name: 'Branching Scenario',  category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'simulation':         { name: 'Simulation',          category: 'INTERACTIVE', color: '#D97706', bg: '#FFFBEB' },
  'knowledge-check':    { name: 'Knowledge Check',     category: 'QUIZ',        color: '#059669', bg: '#ECFDF5' },
  'quiz':               { name: 'Quiz',                category: 'QUIZ',        color: '#059669', bg: '#ECFDF5' },
};

const TEMPLATE_NAMES: Record<string, string> = {
  'kc-mcq': 'KC – MCQ', 'kc-mcq-single': 'KC – MCQ Single', 'kc-tf': 'KC – True/False',
  'quiz-mcq': 'Quiz – MCQ', 'quiz-mcq-single': 'Quiz – MCQ Single', 'quiz-tf': 'Quiz – True/False',
};

function getTypeInfo(st: string, tid?: string) {
  const info = TYPE_INFO[st] ?? TYPE_INFO['title-text'];
  return { ...info, displayName: (tid && TEMPLATE_NAMES[tid]) ? TEMPLATE_NAMES[tid] : info.name };
}

// ── Design tokens ─────────────────────────────────────────────────────────────

const BORDER = '#E5E7EB';
const P = '#1565F0';
const font = 'Nunito Sans, system-ui, sans-serif';

// ── Primitives ────────────────────────────────────────────────────────────────

function FieldLabel({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 5 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{children}</label>
      {note && <span style={{ fontSize: 13, color: '#6B7280' }}>{note}</span>}
    </div>
  );
}

const focusStyle = { borderColor: P, background: '#fff' };
const blurStyle  = { borderColor: BORDER, background: '#FAFAFA' };
const inputBase: React.CSSProperties = {
  width: '100%', padding: '8px 10px', border: `1px solid ${BORDER}`,
  borderRadius: 7, fontSize: 13, color: '#111827', background: '#FAFAFA',
  outline: 'none', boxSizing: 'border-box', fontFamily: font, transition: 'border-color 0.12s',
};

function SInput({ value, onChange, placeholder, rows }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  const handlers = {
    onFocus: (e: React.FocusEvent<HTMLElement>) => Object.assign((e.currentTarget as HTMLElement).style, focusStyle),
    onBlur:  (e: React.FocusEvent<HTMLElement>) => Object.assign((e.currentTarget as HTMLElement).style, blurStyle),
  };
  if (rows) return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }} {...handlers} />;
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputBase} {...handlers} />;
}

function SSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputBase, cursor: 'pointer', appearance: 'none' as const }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
      <span style={{ fontSize: 13, color: '#374151' }}>{label}</span>
      <button type="button" onClick={() => onChange(!value)}
        style={{ width: 36, height: 20, borderRadius: 10, background: value ? P : '#D1D5DB', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.15s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </button>
    </label>
  );
}

function FieldGroup({ title, children, open: defaultOpen = true }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={() => setIsOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 16px', minHeight: 40, background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{title}</span>
        {isOpen ? <ChevronUp size={14} color="#9CA3AF" /> : <Plus size={14} color="#9CA3AF" />}
      </button>
      {isOpen && <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>}
    </div>
  );
}

const uid = () => Math.random().toString(36).slice(2, 9);

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ width: 20, height: 20, borderRadius: 4, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexShrink: 0 }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEE2E2'; (e.currentTarget as HTMLElement).style.color = '#DC2626'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
    ><X size={11} /></button>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 6, border: `1px dashed ${BORDER}`, background: 'none', cursor: 'pointer', fontSize: 13, color: P, fontWeight: 500 }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF3FF'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
    ><Plus size={11} />{label}</button>
  );
}

function AiBtn({ label, onClick, small }: { label: string; onClick: () => void; small?: boolean }) {
  return (
    <button onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 4, padding: small ? '4px 8px' : '6px 10px', borderRadius: 6, border: 'none', background: 'linear-gradient(135deg,#2D74FA,#1A63E8)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' as const }}>
      <Wand2 size={11} />{label}
    </button>
  );
}

const inlineInput: React.CSSProperties = { flex: 1, padding: '6px 8px', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, outline: 'none', background: '#FAFAFA', fontFamily: font };
const inlineTA:    React.CSSProperties = { ...inlineInput, resize: 'none' as const, lineHeight: 1.5 };

function ItemCard({ label, onRemove, children }: { label: string; onRemove: () => void; children: React.ReactNode }) {
  return (
    <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: 8, border: `1px solid ${BORDER}`, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <RemoveBtn onClick={onRemove} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{children}</div>
    </div>
  );
}

// ── 13.1 Image Management ─────────────────────────────────────────────────────

function ImageManagement({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState((t.imageUrl as string) || '');
  const [alt, setAlt]           = useState((t.alt as string) || '');
  const [caption, setCaption]   = useState((t.caption as string) || '');
  const hasImage = !!imageUrl;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('Max file size is 10 MB'); return; }
    const url = URL.createObjectURL(file);
    setImageUrl(url); u({ imageUrl: url });
  };

  const overlayBtn: React.CSSProperties = {
    width: 26, height: 26, borderRadius: 6, border: 'none',
    background: 'rgba(0,0,0,0.55)', color: '#fff', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  };

  return (
    <>
      {hasImage ? (
        <div>
          <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#000', lineHeight: 0 }}>
            <img src={imageUrl} alt={alt} style={{ width: '100%', maxHeight: 150, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 6, right: 6, display: 'flex', gap: 4 }}>
              {([
                { icon: <Crop size={12} />,     title: 'Crop' },
                { icon: <Move size={12} />,     title: 'Reposition' },
                { icon: <Maximize2 size={12} />,title: 'Resize' },
                { icon: <RefreshCw size={12} />,title: 'Regenerate with AI' },
              ]).map(a => (
                <button key={a.title} title={a.title} style={overlayBtn}>{a.icon}</button>
              ))}
              <button title="Delete image"
                onClick={() => { setImageUrl(''); u({ imageUrl: '' }); }}
                style={{ ...overlayBtn, background: 'rgba(239,68,68,0.8)' }}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
          <button onClick={() => fileRef.current?.click()}
            style={{ marginTop: 6, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '6px 0', borderRadius: 7, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
          ><Upload size={12} /> Replace image</button>
        </div>
      ) : (
        <div>
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border: `2px dashed ${BORDER}`, borderRadius: 8, padding: '20px 12px', textAlign: 'center', background: '#FAFAFA', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
          >
            <ImageIcon size={20} color="#9CA3AF" style={{ marginBottom: 6 }} />
            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#374151' }}>Upload image</p>
            <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>PNG, JPG, JPEG, SVG, WebP — max 10 MB</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            <AiBtn label="Generate with AI" onClick={() => {}} />
            <button
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '6px 0', borderRadius: 6, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font, fontWeight: 600 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
            ><FolderOpen size={11} /> Asset Library</button>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.svg,.webp" style={{ display: 'none' }} onChange={handleFile} />
      <div>
        <FieldLabel>Alt text</FieldLabel>
        <SInput value={alt} placeholder="Describe image for accessibility…" onChange={v => { setAlt(v); u({ alt: v }); }} />
      </div>
      <div>
        <FieldLabel note="optional">Caption</FieldLabel>
        <SInput value={caption} placeholder="Caption shown below image…" onChange={v => { setCaption(v); u({ caption: v }); }} />
      </div>
    </>
  );
}

// ── 13.2 Video Management ─────────────────────────────────────────────────────

function VideoFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const fileRef   = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl]   = useState((t.videoUrl as string) || '');
  const [posterUrl, setPosterUrl] = useState((t.posterUrl as string) || '');
  const [caption, setCaption]     = useState((t.caption as string) || '');
  const [subtitles, setSubtitles] = useState((t.subtitles as boolean) ?? false);
  const [autoplay, setAutoplay]   = useState((t.autoplay as boolean) ?? false);
  const [loop, setLoop]           = useState((t.loop as boolean) ?? false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) { alert('Max file size is 200 MB'); return; }
    const url = URL.createObjectURL(file);
    setVideoUrl(url); u({ videoUrl: url });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else           { videoRef.current.play(); setIsPlaying(true); }
  };

  return (
    <>
      {videoUrl ? (
        <div>
          <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#000', lineHeight: 0 }}>
            <video ref={videoRef} src={videoUrl} poster={posterUrl || undefined} style={{ width: '100%', maxHeight: 140, objectFit: 'cover', display: 'block' }} onEnded={() => setIsPlaying(false)} />
            <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={togglePlay}
                  style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
                <button title="Trim" style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Trim</span>
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button title="Delete" onClick={() => { setVideoUrl(''); u({ videoUrl: '' }); }}
                  style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'rgba(239,68,68,0.8)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => fileRef.current?.click()}
            style={{ marginTop: 6, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '6px 0', borderRadius: 7, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
          ><Upload size={12} /> Replace video</button>
        </div>
      ) : (
        <div>
          <div onClick={() => fileRef.current?.click()}
            style={{ border: `2px dashed ${BORDER}`, borderRadius: 8, padding: '20px 12px', textAlign: 'center', background: '#FAFAFA', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
          >
            <VideoIcon size={20} color="#9CA3AF" style={{ marginBottom: 6 }} />
            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#374151' }}>Upload video</p>
            <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>MP4, WebM, MOV — max 200 MB</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            <AiBtn label="Generate with AI" onClick={() => {}} />
            <button
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '6px 0', borderRadius: 6, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font, fontWeight: 600 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
            ><FolderOpen size={11} /> Asset Library</button>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept=".mp4,.webm,.mov" style={{ display: 'none' }} onChange={handleFile} />

      {/* Poster / Thumbnail */}
      <div>
        <FieldLabel note="optional">Poster / Thumbnail</FieldLabel>
        {posterUrl ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <img src={posterUrl} style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 5, border: `1px solid ${BORDER}` }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button onClick={() => posterRef.current?.click()} style={{ fontSize: 13, color: P, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>Replace</button>
              <button onClick={() => { setPosterUrl(''); u({ posterUrl: '' }); }} style={{ fontSize: 13, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>Remove</button>
            </div>
          </div>
        ) : (
          <button onClick={() => posterRef.current?.click()}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '6px 0', borderRadius: 7, border: `1px dashed ${BORDER}`, background: '#FAFAFA', fontSize: 13, color: '#6B7280', cursor: 'pointer', fontFamily: font }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
          ><Upload size={12} /> Upload poster / thumbnail</button>
        )}
        <input ref={posterRef} type="file" accept=".png,.jpg,.jpeg,.webp" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (!f) return; const url = URL.createObjectURL(f); setPosterUrl(url); u({ posterUrl: url }); }} />
      </div>

      <div>
        <FieldLabel note="optional">Caption</FieldLabel>
        <SInput value={caption} placeholder="Caption shown below video…" onChange={v => { setCaption(v); u({ caption: v }); }} />
      </div>
      <Toggle value={subtitles} label="Enable subtitles / captions" onChange={v => { setSubtitles(v); u({ subtitles: v }); }} />
      <Toggle value={autoplay}  label="Autoplay"                    onChange={v => { setAutoplay(v);  u({ autoplay: v });  }} />
      <Toggle value={loop}      label="Loop"                        onChange={v => { setLoop(v);      u({ loop: v });      }} />
    </>
  );
}

// ── 13.3 Audio Narration ──────────────────────────────────────────────────────

function AudioNarration({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [enabled, setEnabled]     = useState((t.narrationEnabled as boolean) ?? false);
  const [generated, setGenerated] = useState((t.narrationGenerated as boolean) ?? false);
  const [lang, setLang]           = useState((t.narrationLang as string) || 'en');
  const [voice, setVoice]         = useState((t.narrationVoice as string) || 'female-en');
  const [tone, setTone]           = useState((t.narrationTone as string) || 'professional');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnable = (v: boolean) => { setEnabled(v); u({ narrationEnabled: v }); };

  return (
    <div>
      <Toggle value={enabled} label="AI Audio Narration" onChange={handleEnable} />
      {enabled && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <FieldLabel>Language</FieldLabel>
              <SSelect value={lang} onChange={v => { setLang(v); u({ narrationLang: v }); }} options={NARRATION_LANGS} />
            </div>
            <div>
              <FieldLabel>Voice</FieldLabel>
              <SSelect value={voice} onChange={v => { setVoice(v); u({ narrationVoice: v }); }} options={NARRATION_VOICES} />
            </div>
          </div>
          <div>
            <FieldLabel>Tone / Style</FieldLabel>
            <SSelect value={tone} onChange={v => { setTone(v); u({ narrationTone: v }); }} options={NARRATION_TONES} />
          </div>

          {generated ? (
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Mic size={13} color="#0369A1" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0369A1' }}>Narration generated</span>
              </div>
              {/* Waveform placeholder */}
              <div style={{ height: 28, background: '#E0F2FE', borderRadius: 4, marginBottom: 8, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 2 }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, background: '#0284C7', borderRadius: 1, height: `${20 + Math.sin(i * 0.9) * 14}%`, opacity: 0.7 }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button onClick={() => setIsPlaying(v => !v)}
                  style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: '#0369A1', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
                <button onClick={() => setIsPlaying(false)}
                  style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: '#E0F2FE', color: '#0369A1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Square size={11} />
                </button>
                <div style={{ flex: 1 }} />
                <button onClick={() => {}} title="Regenerate narration"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#0369A1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  <RotateCcw size={11} /> Regenerate
                </button>
                <button onClick={() => { setGenerated(false); u({ narrationGenerated: false }); }} title="Delete narration"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  <Trash2 size={11} /> Delete
                </button>
              </div>
              <button onClick={() => fileRef.current?.click()}
                style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '5px 0', borderRadius: 6, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font }}>
                <Upload size={11} /> Replace with uploaded audio
              </button>
            </div>
          ) : (
            <button onClick={() => { setGenerated(true); u({ narrationGenerated: true }); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg,#0369A1,#7C3AED)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font }}>
              <Mic size={13} /> Generate Narration with AI
            </button>
          )}
          <input ref={fileRef} type="file" accept=".mp3,.wav,.aac" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) { setGenerated(true); u({ narrationGenerated: true }); } }} />
        </div>
      )}
    </div>
  );
}

// ── 13.2 Audio slide ──────────────────────────────────────────────────────────

function AudioFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioUrl]     = useState((t.audioUrl as string) || '');
  const [transcript, setTranscript] = useState((t.transcript as string) || '');
  return (
    <>
      {audioUrl ? (
        <div style={{ background: '#F9FAFB', borderRadius: 8, padding: '10px 12px', border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Mic size={14} color="#7C3AED" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', flex: 1 }}>Audio uploaded</span>
            <button onClick={() => { setAudioUrl(''); u({ audioUrl: '' }); }} style={{ fontSize: 13, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
          </div>
          <button onClick={() => fileRef.current?.click()} style={{ fontSize: 13, color: P, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Replace audio</button>
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${BORDER}`, borderRadius: 8, padding: '16px 12px', textAlign: 'center', background: '#FAFAFA', cursor: 'pointer' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
        >
          <Upload size={16} color="#9CA3AF" style={{ marginBottom: 5 }} />
          <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#374151' }}>Upload audio</p>
          <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>MP3, WAV, AAC — max 50 MB</p>
        </div>
      )}
      <input ref={fileRef} type="file" accept=".mp3,.wav,.aac" style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) { const url = URL.createObjectURL(f); setAudioUrl(url); u({ audioUrl: url }); } }} />
      <div>
        <FieldLabel>Transcript</FieldLabel>
        <SInput rows={4} value={transcript} placeholder="Paste or type transcript…" onChange={v => { setTranscript(v); u({ transcript: v }); }} />
      </div>
    </>
  );
}

// ── MEDIA: AI Spokesperson ────────────────────────────────────────────────────

function SpokespersonFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const [script, setScript] = useState((t.script as string) || '');
  const [avatar, setAvatar] = useState((t.avatar as string) || 'default');
  const [voice, setVoice]   = useState((t.voice as string) || 'neutral');
  const [tone, setTone]     = useState((t.tone as string) || 'professional');
  return (
    <>
      <div><FieldLabel>Script</FieldLabel><SInput rows={5} value={script} placeholder="What the spokesperson will say…" onChange={v => { setScript(v); u({ script: v }); }} /></div>
      <div><FieldLabel>Avatar</FieldLabel><SSelect value={avatar} onChange={v => { setAvatar(v); u({ avatar: v }); }} options={[{value:'default',label:'Default'},{value:'formal',label:'Formal'},{value:'casual',label:'Casual'},{value:'custom',label:'Custom'}]} /></div>
      <div><FieldLabel>Voice</FieldLabel><SSelect value={voice} onChange={v => { setVoice(v); u({ voice: v }); }} options={NARRATION_VOICES} /></div>
      <div><FieldLabel>Tone</FieldLabel><SSelect value={tone} onChange={v => { setTone(v); u({ tone: v }); }} options={NARRATION_TONES} /></div>
      <AiBtn label="Generate AI Spokesperson Video" onClick={() => {}} />
    </>
  );
}

// ── TEXT slides ───────────────────────────────────────────────────────────────

function TitleTextFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const [body, setBody]   = useState((t.content as string) || '');
  const [align, setAlign] = useState((t.alignment as string) || 'left');
  return (
    <>
      <div><FieldLabel>Body</FieldLabel><SInput rows={5} value={body} placeholder="Enter body text…" onChange={v => { setBody(v); u({ content: v }); }} /></div>
      <div>
        <FieldLabel>Alignment</FieldLabel>
        <div style={{ display: 'flex', gap: 6 }}>
          {([
            { value: 'left',   Icon: AlignLeft   },
            { value: 'center', Icon: AlignCenter  },
            { value: 'right',  Icon: AlignRight   },
          ] as const).map(({ value, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => { setAlign(value); u({ alignment: value }); }}
              style={{
                flex: 1, height: 34, borderRadius: 7, border: `1px solid ${align === value ? P : BORDER}`,
                background: align === value ? '#EBF3FF' : '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.12s',
              }}
            >
              <Icon size={15} color={align === value ? P : '#9CA3AF'} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function BulletedListFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const [intro, setIntro] = useState((t.introText as string) || '');
  const [style, setStyle] = useState((t.bulletStyle as string) || 'disc');
  const init = (): Array<{ id: string; text: string }> => {
    const b = t.bullets as string[];
    return b?.length ? b.map(x => ({ id: uid(), text: x })) : [{ id: uid(), text: '' }];
  };
  const [items, setItems] = useState(init);
  const sync = (next: typeof items) => { setItems(next); u({ bullets: next.map(i => i.text) }); };
  return (
    <>
      <div><FieldLabel note="optional">Intro text</FieldLabel><SInput value={intro} placeholder="Optional intro…" onChange={v => { setIntro(v); u({ introText: v }); }} /></div>
      <div>
        <FieldLabel>Bullet items</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {items.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', flexShrink: 0 }} />
              <input value={item.text} onChange={e => { const n = items.map((x, j) => j === i ? { ...x, text: e.target.value } : x); sync(n); }} placeholder={`Bullet ${i + 1}…`} style={inlineInput} />
              <RemoveBtn onClick={() => sync(items.filter((_, j) => j !== i))} />
            </div>
          ))}
          <AddBtn label="Add bullet" onClick={() => sync([...items, { id: uid(), text: '' }])} />
        </div>
      </div>
      <div><FieldLabel>Style</FieldLabel><SSelect value={style} onChange={v => { setStyle(v); u({ bulletStyle: v }); }} options={[{value:'disc',label:'Disc'},{value:'number',label:'Numbered'},{value:'arrow',label:'Arrow'},{value:'check',label:'Checkmark'}]} /></div>
    </>
  );
}

function SeriesFields({ t, u, dir }: { t: CSTopic; u: (x: Partial<CSTopic>) => void; dir: 'h' | 'v' }) {
  type Item = { id: string; label: string; description: string };
  const [items, setItems] = useState<Item[]>(() => (t.seriesItems as Item[])?.length ? (t.seriesItems as Item[]) : [{ id: uid(), label: '', description: '' }]);
  const [layout, setLayout] = useState((t.layout as string) || (dir === 'h' ? 'scroll' : 'stack'));
  const sync = (next: Item[]) => { setItems(next); u({ seriesItems: next }); };
  return (
    <>
      <div>
        <FieldLabel>Items</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((item, i) => (
            <ItemCard key={item.id} label={`Item ${i + 1}`} onRemove={() => sync(items.filter((_, j) => j !== i))}>
              <input value={item.label} onChange={e => { const n = items.map((x, j) => j === i ? { ...x, label: e.target.value } : x); sync(n); }} placeholder="Label…" style={inlineInput} />
              <textarea value={item.description} onChange={e => { const n = items.map((x, j) => j === i ? { ...x, description: e.target.value } : x); sync(n); }} placeholder="Description…" rows={2} style={inlineTA} />
            </ItemCard>
          ))}
          <AddBtn label="Add item" onClick={() => sync([...items, { id: uid(), label: '', description: '' }])} />
        </div>
      </div>
      <div><FieldLabel>Layout</FieldLabel><SSelect value={layout} onChange={v => { setLayout(v); u({ layout: v }); }} options={dir === 'h' ? [{value:'scroll',label:'Scroll'},{value:'fixed',label:'Fixed columns'}] : [{value:'stack',label:'Stack'},{value:'grid',label:'Grid'}]} /></div>
    </>
  );
}

function ExpandableListFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Item = { id: string; heading: string; body: string };
  const [items, setItems] = useState<Item[]>(() => (t.accordionItems as Item[])?.length ? (t.accordionItems as Item[]) : [{ id: uid(), heading: '', body: '' }]);
  const [defOpen, setDefOpen] = useState((t.defaultOpenIndex as number) ?? 0);
  const sync = (next: Item[]) => { setItems(next); u({ accordionItems: next }); };
  return (
    <>
      <div>
        <FieldLabel>Accordion items</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((item, i) => (
            <ItemCard key={item.id} label={`Item ${i + 1}`} onRemove={() => sync(items.filter((_, j) => j !== i))}>
              <input value={item.heading} onChange={e => { const n = items.map((x, j) => j === i ? { ...x, heading: e.target.value } : x); sync(n); }} placeholder="Heading…" style={inlineInput} />
              <textarea value={item.body} onChange={e => { const n = items.map((x, j) => j === i ? { ...x, body: e.target.value } : x); sync(n); }} placeholder="Body text…" rows={2} style={inlineTA} />
            </ItemCard>
          ))}
          <AddBtn label="Add item" onClick={() => sync([...items, { id: uid(), heading: '', body: '' }])} />
        </div>
      </div>
      <div>
        <FieldLabel>Default open</FieldLabel>
        <SSelect value={String(defOpen)} onChange={v => { const n = parseInt(v); setDefOpen(n); u({ defaultOpenIndex: n }); }}
          options={[{value:'-1',label:'None'}, ...items.map((_,i) => ({value:String(i),label:`Item ${i+1}`}))]} />
      </div>
    </>
  );
}

function TableFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const [headers, setHeaders] = useState<string[]>(() => (t.tableHeaders as string[]) || ['Column 1', 'Column 2', 'Column 3']);
  const [rows, setRows]       = useState<string[][]>(() => (t.tableRows as string[][]) || [['', '', '']]);
  const [hStyle, setHStyle]   = useState((t.headerStyle as string) || 'filled');
  const uH = (n: string[]) => { setHeaders(n); u({ tableHeaders: n }); };
  const uR = (n: string[][]) => { setRows(n); u({ tableRows: n }); };
  return (
    <>
      <div>
        <FieldLabel>Columns</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {headers.map((h, i) => (
            <div key={i} style={{ display: 'flex', gap: 5 }}>
              <input value={h} onChange={e => { const n = [...headers]; n[i] = e.target.value; uH(n); }} placeholder={`Col ${i+1}`} style={inlineInput} />
              {headers.length > 1 && <RemoveBtn onClick={() => uH(headers.filter((_,j) => j !== i))} />}
            </div>
          ))}
          <AddBtn label="Add column" onClick={() => uH([...headers, `Column ${headers.length+1}`])} />
        </div>
      </div>
      <div>
        <FieldLabel>Rows</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 3 }}>
              {row.map((cell, ci) => (
                <input key={ci} value={cell} onChange={e => { const n = rows.map((r,i) => i===ri ? r.map((c,j) => j===ci ? e.target.value : c) : r); uR(n); }} placeholder={headers[ci]||''} style={{ flex:1, minWidth:0, padding:'5px 6px', border:`1px solid ${BORDER}`, borderRadius:5, fontSize:11, outline:'none', background:'#FAFAFA' }} />
              ))}
              <RemoveBtn onClick={() => uR(rows.filter((_,i) => i !== ri))} />
            </div>
          ))}
          <AddBtn label="Add row" onClick={() => uR([...rows, new Array(headers.length).fill('')])} />
        </div>
      </div>
      <div><FieldLabel>Header style</FieldLabel><SSelect value={hStyle} onChange={v => { setHStyle(v); u({ headerStyle: v }); }} options={[{value:'filled',label:'Filled'},{value:'outlined',label:'Outlined'},{value:'minimal',label:'Minimal'}]} /></div>
    </>
  );
}

function ImageSeriesFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Card = { id: string; heading: string; description: string };
  const [cards, setCards]   = useState<Card[]>(() => (t.imageCards as Card[])?.length ? (t.imageCards as Card[]) : [{ id: uid(), heading: '', description: '' }]);
  const [layout, setLayout] = useState((t.layout as string) || 'horizontal');
  const sync = (next: Card[]) => { setCards(next); u({ imageCards: next }); };
  return (
    <>
      <div>
        <FieldLabel>Cards</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {cards.map((card, i) => (
            <ItemCard key={card.id} label={`Card ${i+1}`} onRemove={() => sync(cards.filter((_,j) => j !== i))}>
              <div style={{ height: 44, background: '#E5E7EB', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, color: '#6B7280', gap: 5 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D1D5DB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#E5E7EB'; }}
              ><ImageIcon size={13} /> Click to upload image</div>
              <input value={card.heading} onChange={e => { const n = cards.map((x,j) => j===i ? {...x,heading:e.target.value} : x); sync(n); }} placeholder="Heading…" style={inlineInput} />
              <textarea value={card.description} onChange={e => { const n = cards.map((x,j) => j===i ? {...x,description:e.target.value} : x); sync(n); }} placeholder="Description…" rows={2} style={inlineTA} />
            </ItemCard>
          ))}
          <AddBtn label="Add card" onClick={() => sync([...cards, { id: uid(), heading: '', description: '' }])} />
        </div>
      </div>
      <div><FieldLabel>Layout</FieldLabel><SSelect value={layout} onChange={v => { setLayout(v); u({ layout: v }); }} options={[{value:'horizontal',label:'Horizontal scroll'},{value:'grid',label:'Grid'},{value:'masonry',label:'Masonry'}]} /></div>
    </>
  );
}

// ── INTERACTIVE ───────────────────────────────────────────────────────────────

function HotspotFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Spot = { id: string; title: string; content: string };
  const [spots, setSpots] = useState<Spot[]>(() => (t.hotspots as Spot[])?.length ? (t.hotspots as Spot[]) : [{ id: uid(), title: '', content: '' }]);
  const sync = (next: Spot[]) => { setSpots(next); u({ hotspots: next }); };
  return (
    <>
      <ImageManagement t={t} u={u} />
      <div>
        <FieldLabel>Hotspots</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {spots.map((spot, i) => (
            <ItemCard key={spot.id} label={`Hotspot ${i+1}`} onRemove={() => sync(spots.filter((_,j) => j !== i))}>
              <input value={spot.title} onChange={e => { const n = spots.map((x,j) => j===i ? {...x,title:e.target.value} : x); sync(n); }} placeholder="Label…" style={inlineInput} />
              <textarea value={spot.content} onChange={e => { const n = spots.map((x,j) => j===i ? {...x,content:e.target.value} : x); sync(n); }} placeholder="Content on click…" rows={2} style={inlineTA} />
            </ItemCard>
          ))}
          <AddBtn label="Add hotspot" onClick={() => sync([...spots, { id: uid(), title: '', content: '' }])} />
        </div>
      </div>
    </>
  );
}

function ClickRevealFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Card = { id: string; front: string; back: string };
  const [cards, setCards] = useState<Card[]>(() => (t.revealCards as Card[])?.length ? (t.revealCards as Card[]) : [{ id: uid(), front: '', back: '' }]);
  const sync = (next: Card[]) => { setCards(next); u({ revealCards: next }); };
  return (
    <div>
      <FieldLabel>Reveal cards</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {cards.map((card, i) => (
          <ItemCard key={card.id} label={`Card ${i+1}`} onRemove={() => sync(cards.filter((_,j) => j !== i))}>
            <input value={card.front} onChange={e => { const n = cards.map((x,j) => j===i ? {...x,front:e.target.value} : x); sync(n); }} placeholder="Front (before click)…" style={inlineInput} />
            <textarea value={card.back} onChange={e => { const n = cards.map((x,j) => j===i ? {...x,back:e.target.value} : x); sync(n); }} placeholder="Revealed content…" rows={2} style={inlineTA} />
          </ItemCard>
        ))}
        <AddBtn label="Add card" onClick={() => sync([...cards, { id: uid(), front: '', back: '' }])} />
      </div>
    </div>
  );
}

function SliderFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  const [beforeLabel, setBeforeLabel] = useState((t.beforeLabel as string) || 'Before');
  const [afterLabel, setAfterLabel]   = useState((t.afterLabel  as string) || 'After');
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {(['Before','After'] as const).map(side => (
          <div key={side} style={{ border:`2px dashed ${BORDER}`, borderRadius:7, padding:'12px 8px', textAlign:'center', background:'#FAFAFA', cursor:'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
          >
            <Upload size={13} color="#9CA3AF" style={{ marginBottom:3 }} />
            <p style={{ margin:0, fontSize:11, color:'#374151', fontWeight:500 }}>{side}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div><FieldLabel>Before label</FieldLabel><SInput value={beforeLabel} onChange={v => { setBeforeLabel(v); u({ beforeLabel: v }); }} /></div>
        <div><FieldLabel>After label</FieldLabel><SInput value={afterLabel}   onChange={v => { setAfterLabel(v);  u({ afterLabel:  v }); }} /></div>
      </div>
    </>
  );
}

function DragDropFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type DItem = { id: string; label: string; zone: string };
  type DZone = { id: string; label: string };
  const [instr, setInstr] = useState((t.instructions as string) || '');
  const [items, setItems] = useState<DItem[]>(() => (t.dragItems as DItem[])?.length ? (t.dragItems as DItem[]) : [{ id: uid(), label: '', zone: '' }]);
  const [zones, setZones] = useState<DZone[]>(() => (t.dropZones as DZone[])?.length ? (t.dropZones as DZone[]) : [{ id: uid(), label: '' }]);
  const syncI = (n: DItem[]) => { setItems(n); u({ dragItems: n }); };
  const syncZ = (n: DZone[]) => { setZones(n); u({ dropZones: n }); };
  return (
    <>
      <div><FieldLabel>Instructions</FieldLabel><SInput value={instr} placeholder="Drag each item to its zone…" onChange={v => { setInstr(v); u({ instructions: v }); }} /></div>
      <div>
        <FieldLabel>Drag items</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', gap: 4 }}>
              <input value={item.label} onChange={e => syncI(items.map((x,j) => j===i ? {...x,label:e.target.value} : x))} placeholder={`Item ${i+1}`} style={{ ...inlineInput, flex: 2 }} />
              <select value={item.zone} onChange={e => syncI(items.map((x,j) => j===i ? {...x,zone:e.target.value} : x))} style={{ flex:1, padding:'6px 4px', border:`1px solid ${BORDER}`, borderRadius:6, fontSize:11, outline:'none', background:'#FAFAFA' }}>
                {zones.map(z => <option key={z.id} value={z.id}>{z.label || '(zone)'}</option>)}
              </select>
              <RemoveBtn onClick={() => syncI(items.filter((_,j) => j !== i))} />
            </div>
          ))}
          <AddBtn label="Add item" onClick={() => syncI([...items, { id: uid(), label: '', zone: zones[0]?.id || '' }])} />
        </div>
      </div>
      <div>
        <FieldLabel>Drop zones</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {zones.map((zone, i) => (
            <div key={zone.id} style={{ display: 'flex', gap: 4 }}>
              <input value={zone.label} onChange={e => syncZ(zones.map((x,j) => j===i ? {...x,label:e.target.value} : x))} placeholder={`Zone ${i+1}`} style={inlineInput} />
              <RemoveBtn onClick={() => syncZ(zones.filter((_,j) => j !== i))} />
            </div>
          ))}
          <AddBtn label="Add zone" onClick={() => syncZ([...zones, { id: uid(), label: '' }])} />
        </div>
      </div>
    </>
  );
}

function MatchingFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Pair = { id: string; left: string; right: string };
  const [instr, setInstr] = useState((t.instructions as string) || '');
  const [pairs, setPairs] = useState<Pair[]>(() => (t.matchPairs as Pair[])?.length ? (t.matchPairs as Pair[]) : [{ id: uid(), left: '', right: '' }]);
  const sync = (n: Pair[]) => { setPairs(n); u({ matchPairs: n }); };
  return (
    <>
      <div><FieldLabel>Instructions</FieldLabel><SInput value={instr} placeholder="Match each item on the left…" onChange={v => { setInstr(v); u({ instructions: v }); }} /></div>
      <div>
        <FieldLabel>Pairs</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {pairs.map((pair, i) => (
            <div key={pair.id} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <input value={pair.left}  onChange={e => sync(pairs.map((x,j) => j===i ? {...x,left:e.target.value} : x))} placeholder="Left…"  style={inlineInput} />
              <span style={{ color:'#9CA3AF', fontSize:12, flexShrink:0 }}>↔</span>
              <input value={pair.right} onChange={e => sync(pairs.map((x,j) => j===i ? {...x,right:e.target.value} : x))} placeholder="Right…" style={inlineInput} />
              <RemoveBtn onClick={() => sync(pairs.filter((_,j) => j !== i))} />
            </div>
          ))}
          <AddBtn label="Add pair" onClick={() => sync([...pairs, { id: uid(), left: '', right: '' }])} />
        </div>
      </div>
    </>
  );
}

function SequencingFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Step = { id: string; text: string };
  const [instr, setInstr] = useState((t.instructions as string) || '');
  const [steps, setSteps] = useState<Step[]>(() => (t.steps as Step[])?.length ? (t.steps as Step[]) : [{ id: uid(), text: '' }]);
  const sync = (n: Step[]) => { setSteps(n); u({ steps: n }); };
  return (
    <>
      <div><FieldLabel>Instructions</FieldLabel><SInput value={instr} placeholder="Arrange the steps in order…" onChange={v => { setInstr(v); u({ instructions: v }); }} /></div>
      <div>
        <FieldLabel>Steps (correct order)</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width:18, height:18, borderRadius:'50%', background:'#E5E7EB', fontSize:10, fontWeight:700, color:'#6B7280', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i+1}</span>
              <input value={step.text} onChange={e => sync(steps.map((x,j) => j===i ? {...x,text:e.target.value} : x))} placeholder={`Step ${i+1}…`} style={inlineInput} />
              <RemoveBtn onClick={() => sync(steps.filter((_,j) => j !== i))} />
            </div>
          ))}
          <AddBtn label="Add step" onClick={() => sync([...steps, { id: uid(), text: '' }])} />
        </div>
      </div>
    </>
  );
}

function FlashCardFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Card = { id: string; front: string; back: string };
  const [cards, setCards] = useState<Card[]>(() => (t.flashCards as Card[])?.length ? (t.flashCards as Card[]) : [{ id: uid(), front: '', back: '' }]);
  const sync = (n: Card[]) => { setCards(n); u({ flashCards: n }); };
  return (
    <div>
      <FieldLabel>Cards</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {cards.map((card, i) => (
          <ItemCard key={card.id} label={`Card ${i+1}`} onRemove={() => sync(cards.filter((_,j) => j !== i))}>
            <span style={{ fontSize:10, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.05em' }}>Front</span>
            <input value={card.front} onChange={e => sync(cards.map((x,j) => j===i ? {...x,front:e.target.value} : x))} placeholder="Front of card…" style={inlineInput} />
            <span style={{ fontSize:10, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.05em' }}>Back</span>
            <textarea value={card.back} onChange={e => sync(cards.map((x,j) => j===i ? {...x,back:e.target.value} : x))} placeholder="Back of card…" rows={2} style={inlineTA} />
          </ItemCard>
        ))}
        <AddBtn label="Add card" onClick={() => sync([...cards, { id: uid(), front: '', back: '' }])} />
      </div>
    </div>
  );
}

function BranchingFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type Choice = { id: string; text: string; outcome: string };
  const [scenario, setScenario] = useState((t.scenarioText as string) || '');
  const [choices, setChoices]   = useState<Choice[]>(() => (t.choices as Choice[])?.length ? (t.choices as Choice[]) : [{ id: uid(), text: '', outcome: '' }, { id: uid(), text: '', outcome: '' }]);
  const sync = (n: Choice[]) => { setChoices(n); u({ choices: n }); };
  return (
    <>
      <div><FieldLabel>Scenario</FieldLabel><SInput rows={3} value={scenario} placeholder="Describe the situation…" onChange={v => { setScenario(v); u({ scenarioText: v }); }} /></div>
      <div>
        <FieldLabel>Choices</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {choices.map((choice, i) => (
            <ItemCard key={choice.id} label={`Choice ${i+1}`} onRemove={() => sync(choices.filter((_,j) => j !== i))}>
              <input value={choice.text}    onChange={e => sync(choices.map((x,j) => j===i ? {...x,text:e.target.value} : x))} placeholder="Choice text…" style={inlineInput} />
              <input value={choice.outcome} onChange={e => sync(choices.map((x,j) => j===i ? {...x,outcome:e.target.value} : x))} placeholder="Outcome / consequence…" style={inlineInput} />
            </ItemCard>
          ))}
          <AddBtn label="Add choice" onClick={() => sync([...choices, { id: uid(), text: '', outcome: '' }])} />
        </div>
      </div>
    </>
  );
}

function SimulationFields({ t, u }: { t: CSTopic; u: (x: Partial<CSTopic>) => void }) {
  type SStep = { id: string; action: string; expected: string };
  const [instr, setInstr] = useState((t.instructions as string) || '');
  const [steps, setSteps] = useState<SStep[]>(() => (t.simSteps as SStep[])?.length ? (t.simSteps as SStep[]) : [{ id: uid(), action: '', expected: '' }]);
  const sync = (n: SStep[]) => { setSteps(n); u({ simSteps: n }); };
  return (
    <>
      <div><FieldLabel>Instructions</FieldLabel><SInput rows={2} value={instr} placeholder="What must the learner do?" onChange={v => { setInstr(v); u({ instructions: v }); }} /></div>
      <div>
        <FieldLabel>Steps</FieldLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {steps.map((step, i) => (
            <ItemCard key={step.id} label={`Step ${i+1}`} onRemove={() => sync(steps.filter((_,j) => j !== i))}>
              <input value={step.action}   onChange={e => sync(steps.map((x,j) => j===i ? {...x,action:e.target.value} : x))} placeholder="User action…" style={inlineInput} />
              <input value={step.expected} onChange={e => sync(steps.map((x,j) => j===i ? {...x,expected:e.target.value} : x))} placeholder="Expected outcome…" style={inlineInput} />
            </ItemCard>
          ))}
          <AddBtn label="Add step" onClick={() => sync([...steps, { id: uid(), action: '', expected: '' }])} />
        </div>
      </div>
    </>
  );
}

// ── 15. Quiz / Knowledge Check — multi-question editor ────────────────────────

type QOpt = { id: string; text: string; correct: boolean };
type Question = {
  id: string;
  type: 'mcq-multi' | 'mcq-single' | 'true-false';
  question: string;
  options: QOpt[];
  feedback: string;
  marks: number;
};

function defaultOptions(type: Question['type']): QOpt[] {
  if (type === 'true-false') return [{ id: uid(), text: 'True', correct: true }, { id: uid(), text: 'False', correct: false }];
  return Array.from({length:4}, () => ({ id: uid(), text: '', correct: false }));
}

function QuestionCard({
  q, index, isGraded, onUpdate, onDelete, onRegenerate,
}: {
  q: Question; index: number; isGraded: boolean;
  onUpdate: (u: Partial<Question>) => void;
  onDelete: () => void;
  onRegenerate: () => void;
}) {
  const [open, setOpen] = useState(true);
  const isTF = q.type === 'true-false';
  const isMulti = q.type === 'mcq-multi';

  const toggleCorrect = (id: string) => {
    const next = isMulti
      ? q.options.map(o => o.id === id ? {...o, correct: !o.correct} : o)
      : q.options.map(o => ({...o, correct: o.id === id}));
    onUpdate({ options: next });
  };

  return (
    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: '#F9FAFB', borderBottom: open ? `1px solid ${BORDER}` : 'none' }}>
        <GripVertical size={13} color="#9CA3AF" style={{ cursor: 'grab', flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#374151' }}>Q{index + 1}</span>
        <select value={q.type} onChange={e => { const t = e.target.value as Question['type']; onUpdate({ type: t, options: defaultOptions(t) }); }}
          style={{ fontSize: 13, border: `1px solid ${BORDER}`, borderRadius: 5, padding: '2px 4px', background: '#fff', outline: 'none', cursor: 'pointer' }}>
          <option value="mcq-multi">MCQ (multi)</option>
          <option value="mcq-single">MCQ (single)</option>
          <option value="true-false">True / False</option>
        </select>
        <button onClick={onRegenerate} title="Regenerate question" style={{ width: 22, height: 22, borderRadius: 5, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF3FF'; (e.currentTarget as HTMLElement).style.color = P; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
        ><RefreshCw size={11} /></button>
        <button onClick={onDelete} title="Delete question" style={{ width: 22, height: 22, borderRadius: 5, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEE2E2'; (e.currentTarget as HTMLElement).style.color = '#DC2626'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
        ><X size={11} /></button>
        <button onClick={() => setOpen(v => !v)} style={{ width: 22, height: 22, borderRadius: 5, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {open && (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <FieldLabel>{isTF ? 'Statement' : 'Question'}</FieldLabel>
            <SInput rows={2} value={q.question} placeholder={isTF ? 'Enter a true/false statement…' : 'Enter question…'} onChange={v => onUpdate({ question: v })} />
          </div>

          {!isTF ? (
            <div>
              <FieldLabel note={isMulti ? 'multiple correct' : 'one correct'}>Options</FieldLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {q.options.map((opt, i) => (
                  <div key={opt.id} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <button onClick={() => toggleCorrect(opt.id)}
                      style={{ width: 16, height: 16, borderRadius: isMulti ? 3 : '50%', border: `2px solid ${opt.correct ? '#059669' : BORDER}`, background: opt.correct ? '#059669' : '#fff', cursor: 'pointer', flexShrink: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {opt.correct && <Check size={9} color="#fff" strokeWidth={3} />}
                    </button>
                    <input value={opt.text} onChange={e => onUpdate({ options: q.options.map((o,j) => j===i ? {...o,text:e.target.value} : o) })}
                      placeholder={`Option ${i+1}…`}
                      style={{ ...inlineInput, background: opt.correct ? '#F0FDF4' : '#FAFAFA', borderColor: opt.correct ? '#D1FAE5' : BORDER }} />
                    {q.options.length > 2 && <RemoveBtn onClick={() => onUpdate({ options: q.options.filter((_,j) => j !== i) })} />}
                  </div>
                ))}
                <AddBtn label="Add option" onClick={() => onUpdate({ options: [...q.options, { id: uid(), text: '', correct: false }] })} />
              </div>
            </div>
          ) : (
            <div>
              <FieldLabel>Correct answer</FieldLabel>
              <div style={{ display: 'flex', gap: 8 }}>
                {q.options.map(opt => (
                  <button key={opt.id} onClick={() => toggleCorrect(opt.id)}
                    style={{ flex:1, padding:'7px 0', borderRadius:7, border:`2px solid ${opt.correct ? '#059669' : BORDER}`, background: opt.correct ? '#F0FDF4' : '#FAFAFA', fontSize:12, fontWeight: opt.correct ? 600 : 400, color: opt.correct ? '#059669' : '#374151', cursor:'pointer', transition:'all 0.12s' }}>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <FieldLabel note="optional">Feedback</FieldLabel>
            <SInput value={q.feedback} placeholder="Feedback after answer…" onChange={v => onUpdate({ feedback: v })} />
          </div>

          {isGraded && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Marks:</span>
              <input type="number" min={0} value={q.marks} onChange={e => onUpdate({ marks: parseInt(e.target.value)||0 })}
                style={{ width: 52, padding: '4px 6px', border: `1px solid ${BORDER}`, borderRadius: 5, fontSize: 13, outline: 'none' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuizEditor({ t, u, templateId }: { t: CSTopic; u: (x: Partial<CSTopic>) => void; templateId?: string }) {
  const isGraded = templateId?.startsWith('quiz-') ?? false;
  const [passScore, setPassScore] = useState((t.passingScore as number) ?? 70);
  const [retry, setRetry]         = useState((t.retryBehavior as string) || 'unlimited');
  const [generating, setGenerating] = useState(false);

  const initQuestions = (): Question[] => {
    const ex = t.questions as Question[];
    if (ex?.length) return ex;
    return [{ id: uid(), type: 'mcq-single', question: '', options: defaultOptions('mcq-single'), feedback: '', marks: 1 }];
  };
  const [questions, setQuestions] = useState<Question[]>(initQuestions);

  const syncQ = (next: Question[]) => { setQuestions(next); u({ questions: next }); };

  const addQuestion = () => syncQ([...questions, { id: uid(), type: 'mcq-single', question: '', options: defaultOptions('mcq-single'), feedback: '', marks: 1 }]);

  const generateWithAI = () => {
    setGenerating(true);
    setTimeout(() => {
      const aiQuestions: Question[] = [
        { id: uid(), type: 'mcq-single', question: 'What is the primary purpose of this topic?', options: [
          { id: uid(), text: 'Option A', correct: true }, { id: uid(), text: 'Option B', correct: false },
          { id: uid(), text: 'Option C', correct: false }, { id: uid(), text: 'Option D', correct: false },
        ], feedback: 'Correct! Option A is the right answer.', marks: 1 },
        { id: uid(), type: 'true-false', question: 'This concept applies to all scenarios.', options: [
          { id: uid(), text: 'True', correct: false }, { id: uid(), text: 'False', correct: true },
        ], feedback: 'Correct — this only applies in specific scenarios.', marks: 1 },
      ];
      syncQ(aiQuestions);
      setGenerating(false);
    }, 1000);
  };

  return (
    <>
      {/* AI toolbar */}
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={generateWithAI} disabled={generating}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 0', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg,#2D74FA,#1A63E8)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: generating ? 'default' : 'pointer', opacity: generating ? 0.7 : 1, fontFamily: font }}>
          <Wand2 size={12} />{generating ? 'Generating…' : 'Generate with AI'}
        </button>
        <button onClick={() => generateWithAI()}
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 10px', borderRadius: 7, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font, fontWeight: 600 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
        ><RotateCcw size={11} /> Regenerate all</button>
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id} q={q} index={i} isGraded={isGraded}
            onUpdate={u2 => syncQ(questions.map((x, j) => j === i ? {...x, ...u2} : x))}
            onDelete={() => syncQ(questions.filter((_, j) => j !== i))}
            onRegenerate={() => {
              const titles = ['How does this concept apply in practice?', 'Which of these is NOT a valid approach?', 'What is the correct sequence of steps?'];
              syncQ(questions.map((x, j) => j === i ? {...x, question: titles[i % titles.length]} : x));
            }}
          />
        ))}
        <AddBtn label="Add question" onClick={addQuestion} />
      </div>

      {/* Quiz config */}
      {isGraded && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingTop: 4 }}>
          <div>
            <FieldLabel>Pass %</FieldLabel>
            <input type="number" min={0} max={100} value={passScore} onChange={e => { const n = parseInt(e.target.value)||0; setPassScore(n); u({ passingScore: n }); }} style={{ ...inputBase }} />
          </div>
          <div>
            <FieldLabel>Retry</FieldLabel>
            <SSelect value={retry} onChange={v => { setRetry(v); u({ retryBehavior: v }); }} options={[{value:'unlimited',label:'Unlimited'},{value:'once',label:'Once'},{value:'none',label:'No retry'}]} />
          </div>
        </div>
      )}

      {/* Preview + Save */}
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 0', borderRadius: 7, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, color: '#374151', cursor: 'pointer', fontFamily: font, fontWeight: 600 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
        ><Play size={11} /> Preview quiz</button>
        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 0', borderRadius: 7, border: 'none', background: '#059669', color: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: font, fontWeight: 600 }}>
          <Check size={11} /> Save quiz
        </button>
      </div>

      {questions.length === 0 && (
        <div style={{ padding: '16px', textAlign: 'center', color: '#6B7280', fontSize: 13, border: `1px dashed ${BORDER}`, borderRadius: 8 }}>
          <AlertCircle size={16} style={{ marginBottom: 4, display: 'block', margin: '0 auto 6px' }} />
          No questions yet. Generate with AI or add manually.
        </div>
      )}
    </>
  );
}

// ── Type dispatcher ───────────────────────────────────────────────────────────

function TypeFields({ topic, onUpdate }: { topic: CSTopic; onUpdate: (u: Partial<CSTopic>) => void }) {
  const st  = topic.slideType as string;
  const tid = topic.templateId as string | undefined;
  switch (st) {
    case 'title-text':         return <TitleTextFields t={topic} u={onUpdate} />;
    case 'title-bullets':      return <BulletedListFields t={topic} u={onUpdate} />;
    case 'horizontal-series':  return <SeriesFields t={topic} u={onUpdate} dir="h" />;
    case 'vertical-series':    return <SeriesFields t={topic} u={onUpdate} dir="v" />;
    case 'expandable-list':    return <ExpandableListFields t={topic} u={onUpdate} />;
    case 'table':              return <TableFields t={topic} u={onUpdate} />;
    case 'image-horizontal':
    case 'image-vertical':
    case 'media-collection':   return <ImageSeriesFields t={topic} u={onUpdate} />;
    case 'video':              return <VideoFields t={topic} u={onUpdate} />;
    case 'audio':              return <AudioFields t={topic} u={onUpdate} />;
    case 'spokesperson':       return <SpokespersonFields t={topic} u={onUpdate} />;
    case 'hotspot':            return <HotspotFields t={topic} u={onUpdate} />;
    case 'click-reveal':       return <ClickRevealFields t={topic} u={onUpdate} />;
    case 'slider':             return <SliderFields t={topic} u={onUpdate} />;
    case 'drag-drop':          return <DragDropFields t={topic} u={onUpdate} />;
    case 'matching':           return <MatchingFields t={topic} u={onUpdate} />;
    case 'scenario':           return <SequencingFields t={topic} u={onUpdate} />;
    case 'flash-card':         return <FlashCardFields t={topic} u={onUpdate} />;
    case 'branching-scenario': return <BranchingFields t={topic} u={onUpdate} />;
    case 'simulation':         return <SimulationFields t={topic} u={onUpdate} />;
    case 'knowledge-check':
    case 'quiz':               return <QuizEditor t={topic} u={onUpdate} templateId={tid} />;
    default:                   return <TitleTextFields t={topic} u={onUpdate} />;
  }
}

// ── Main Panel ────────────────────────────────────────────────────────────────

export function SlideSettingsPanel({
  topic, onUpdate, onClose, onChangeSlideType, onDelete, onEnhanceWithAI, enhancing, onRegenerateSlide,
}: SlideSettingsPanelProps) {
  const [topicTitle, setTopicTitle]   = useState(topic.title);
  const [description, setDescription] = useState((topic.description as string) || '');

  const st   = topic.slideType as string;
  const tid  = topic.templateId as string | undefined;
  const info = getTypeInfo(st, tid);
  const isQuiz        = info.category === 'QUIZ';
  const isMedia       = info.category === 'MEDIA';
  const isTextBased   = TEXT_SLIDE_TYPES.has(st);
  const showNarration = isTextBased && !isQuiz && !isMedia;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, fontFamily: font }}>

      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>Topic Settings</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
            {topic.title || 'New topic'}
          </p>
        </div>
        {/* Regenerate slide structure */}
        {onRegenerateSlide && (
          <button onClick={onRegenerateSlide} title="Regenerate slide structure"
            style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${BORDER}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF3FF'; (e.currentTarget as HTMLElement).style.color = P; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
          ><RotateCcw size={14} /></button>
        )}
        <button onClick={onClose} title="Collapse Topic Settings"
          style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexShrink: 0 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
        ><PanelRightClose size={16} /></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: `${BORDER} transparent` }}>

        {/* Slide type chip */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ margin: '0 0 7px', fontSize: 13, fontWeight: 500, color: '#374151' }}>Slide Type</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', background: info.bg, borderRadius: 8, border: `1px solid ${info.color}33` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: info.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#111827' }}>{info.displayName}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: info.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{info.category}</span>
          </div>
          <button onClick={onChangeSlideType}
            style={{ marginTop: 7, fontSize: 13, fontWeight: 500, color: P, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
          ><RefreshCw size={11} />Change slide type</button>
        </div>

        {/* Content: Title + Objective */}
        <FieldGroup title="Content">
          <div>
            <FieldLabel>Topic title</FieldLabel>
            <SInput value={topicTitle} placeholder="Enter topic title…" onChange={v => { setTopicTitle(v); onUpdate({ title: v }); }} />
          </div>
          <div>
            <FieldLabel>Learning objective</FieldLabel>
            <SInput rows={2} value={description} placeholder="What will the learner know or do after this slide?" onChange={v => { setDescription(v); onUpdate({ description: v }); }} />
          </div>
        </FieldGroup>

        {/* Type-specific content */}
        <FieldGroup title={isQuiz ? 'Quiz Settings' : 'Slide Content'}>
          <TypeFields topic={topic} onUpdate={onUpdate} />
        </FieldGroup>

        {/* 13.3 Audio Narration — text slides only */}
        {showNarration && (
          <FieldGroup title="Audio Narration" open={false}>
            <AudioNarration t={topic} u={onUpdate} />
          </FieldGroup>
        )}

      </div>

      {/* Footer actions */}
      <div style={{ padding: '12px 16px', borderTop: `1px solid ${BORDER}`, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onEnhanceWithAI} disabled={enhancing}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#134780 0%,#7C3AED 100%)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: enhancing ? 'default' : 'pointer', opacity: enhancing ? 0.7 : 1 }}>
          <Sparkles size={14} />{enhancing ? 'Enhancing…' : 'Enhance with AI'}
        </button>
        <button onClick={onDelete}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', borderRadius: 9, border: '1px solid #FECACA', background: 'none', color: '#DC2626', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
        ><Trash2 size={14} />Delete topic</button>
      </div>
    </div>
  );
}
