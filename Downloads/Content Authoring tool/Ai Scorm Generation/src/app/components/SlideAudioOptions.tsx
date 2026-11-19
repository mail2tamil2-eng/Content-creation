import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, Music, Play, Square, Upload, X } from 'lucide-react';
import { cn } from './ui/utils';

export type SlideAudioSource = 'ai' | 'upload' | 'tts';
export type TtsVoice = 'female' | 'male';

export interface SlideAudioValue {
  source: SlideAudioSource;
  /** Uploaded MP3 file name (Slide Audio). */
  audioFile?: string;
  ttsVoice?: TtsVoice;
  ttsText?: string;
}

export interface SlideAudioOptionsProps {
  value: SlideAudioValue;
  onChange: (patch: Partial<SlideAudioValue>) => void;
  /** Slide title, used in the transcript placeholder. */
  slideTitle?: string;
  /** Controls shown inside the "AI Audio Narration" option (language, voice, generate…). */
  aiContent?: ReactNode;
  className?: string;
}

export const TTS_VOICES: { value: TtsVoice; label: string }[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

const OPTIONS: { value: SlideAudioSource; title: string; hint: string }[] = [
  { value: 'ai', title: 'AI Audio Narration', hint: 'AI reads the slide content aloud' },
  { value: 'upload', title: 'Slide Audio', hint: 'Upload MP3 audio for this slide' },
  { value: 'tts', title: 'Text-to-Speech', hint: 'Generate audio from text transcript' },
];

const fieldCls = 'w-full rounded-lg border border-[#D1D5DB] bg-white text-[13px] text-[#111827] placeholder:text-[#6B7280]';

/** Pick a browser voice that roughly matches the chosen voice type (preview only). */
function pickVoice(type: TtsVoice): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const en = voices.filter(v => v.lang.startsWith('en'));
  const re = type === 'female' ? /female|samantha|victoria|zira|susan|karen|aria|jenny/i : /\bmale\b|daniel|david|alex|fred|guy|mark/i;
  return en.find(v => re.test(v.name)) ?? en[0] ?? voices[0];
}

/**
 * Slide Settings › Slide Audio: choose how this slide gets its audio.
 * Radio cards; the selected card expands to show its own controls.
 */
export function SlideAudioOptions({ value, onChange, slideTitle = 'this slide', aiContent, className }: SlideAudioOptionsProps) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const text = value.ttsText ?? '';
  const voice = value.ttsVoice ?? 'female';
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => () => { if (canSpeak) window.speechSynthesis.cancel(); }, [canSpeak]);
  useEffect(() => { if (value.source !== 'tts' && speaking) { window.speechSynthesis.cancel(); setSpeaking(false); } }, [value.source, speaking]);

  const preview = () => {
    if (!canSpeak || !text.trim()) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(voice); if (v) u.voice = v;
    u.pitch = voice === 'female' ? 1.1 : 0.9;
    u.onend = u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const pickFile = (f?: File) => {
    if (!f) return;
    if (!/\.mp3$/i.test(f.name) && f.type !== 'audio/mpeg') { setError('Choose an MP3 file.'); return; }
    if (f.size > 20 * 1024 * 1024) { setError('Audio is larger than 20 MB.'); return; }
    setError(''); onChange({ audioFile: f.name });
  };

  return (
    <fieldset className={cn('m-0 flex min-w-0 flex-col gap-2 border-0 p-0', className)}>
      <legend className="sr-only">Audio source</legend>
      {OPTIONS.map(o => {
        const on = value.source === o.value;
        const optId = `${id}-${o.value}`;
        return (
          <div key={o.value}
            className={cn('rounded-[10px] border bg-white px-3 py-2.5 transition-colors', on ? 'border-[#1E3A8A] shadow-[0_0_0_1px_#1E3A8A]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]')}>
            <label htmlFor={optId} className="flex cursor-pointer items-start gap-2.5">
              <input id={optId} type="radio" name={`${id}-src`} value={o.value} checked={on} onChange={() => onChange({ source: o.value })}
                aria-describedby={`${optId}-hint`}
                className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2" />
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-[#111827]">{o.title}</span>
                <span id={`${optId}-hint`} className="block text-[13px] text-[#4B5563]">{o.hint}</span>
              </span>
            </label>

            {on && o.value === 'ai' && aiContent && <div className="mt-2.5 pl-7">{aiContent}</div>}

            {on && o.value === 'upload' && (
              <div className="mt-2.5 pl-7">
                {value.audioFile ? (
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-2.5 text-[13px] text-[#111827]">
                      <Music size={14} aria-hidden="true" className="shrink-0 text-[#1565F0]" />
                      <span className="truncate">{value.audioFile}</span>
                    </span>
                    <button type="button" aria-label="Replace audio" onClick={() => fileRef.current?.click()}
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                      <Upload size={14} aria-hidden="true" />
                    </button>
                    <button type="button" aria-label="Remove audio" onClick={() => onChange({ audioFile: undefined })}
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#B91C1C] hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); pickFile(e.dataTransfer.files?.[0]); }}
                    aria-describedby={`${optId}-hint${error ? ` ${id}-err` : ''}`}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#D1D5DB] bg-white text-[13px] font-medium text-[#374151] hover:border-[#1565F0] hover:bg-[#EBF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                    <Upload size={14} aria-hidden="true" /> Upload Audio
                  </button>
                )}
                {error && <p id={`${id}-err`} role="alert" className="m-0 mt-1 text-xs font-semibold text-[#B91C1C]">{error}</p>}
                <input ref={fileRef} type="file" accept="audio/mpeg,.mp3" tabIndex={-1} aria-hidden="true" className="sr-only"
                  onChange={e => { pickFile(e.target.files?.[0]); e.target.value = ''; }} />
              </div>
            )}

            {on && o.value === 'tts' && (
              <div className="mt-2.5 flex flex-col gap-2 pl-7">
                <div>
                  <label htmlFor={`${id}-voice`} className="mb-1 block text-xs font-semibold text-[#374151]">Voice Type</label>
                  <div className="flex gap-2">
                    <div className="relative min-w-0 flex-1">
                      <select id={`${id}-voice`} value={voice} onChange={e => onChange({ ttsVoice: e.target.value as TtsVoice })}
                        className={cn(fieldCls, 'h-9 cursor-pointer appearance-none pl-2.5 pr-8')}>
                        {TTS_VOICES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                      </select>
                      <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    </div>
                    <button type="button" onClick={preview} disabled={!canSpeak || !text.trim()} aria-pressed={speaking}
                      title={!text.trim() ? 'Enter a transcript to preview' : undefined}
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#EBF3FF] px-3 text-[13px] font-semibold text-[#1254C7] hover:bg-[#DBEAFE] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#6B7280] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                      {speaking ? <Square size={12} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
                      {speaking ? 'Stop' : 'Preview'}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor={`${id}-text`} className="sr-only">Transcript</label>
                  <textarea id={`${id}-text`} rows={5} value={text} maxLength={3000} aria-describedby={`${id}-count`}
                    onChange={e => onChange({ ttsText: e.target.value })}
                    placeholder={`Enter transcript text for ${slideTitle}...\n\nExample:\nWelcome to the ${slideTitle} section. In this part of the course, we'll explore...`}
                    className={cn(fieldCls, 'resize-y px-2.5 py-2 leading-relaxed')} />
                  <p id={`${id}-count`} className="m-0 mt-0.5 text-xs text-[#6B7280]">{text.length} / 3000 characters</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </fieldset>
  );
}
