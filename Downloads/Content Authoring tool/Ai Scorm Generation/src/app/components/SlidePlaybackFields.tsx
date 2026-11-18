import { useId, useRef } from 'react';
import { Music, X } from 'lucide-react';
import { cn } from './ui/utils';

/** Course-wide values from Player Settings; each slide can override them. */
export interface PlaybackDefaults {
  slideDuration: number;
  slideTransition: string;
  seekBar: 'enable' | 'hide';
  backgroundMusic: boolean;
  backgroundMusicFile?: string;
}

/** Per-slide overrides. `undefined` = use the course setting. */
export interface SlidePlayback {
  slideDuration?: number;
  slideTransition?: string;
  seekBar?: 'enable' | 'hide';
  /** 'off' = no music on this slide, 'custom' = this slide's own track */
  backgroundMusic?: 'off' | 'custom';
  backgroundMusicFile?: string;
}

export interface SlidePlaybackFieldsProps {
  value: SlidePlayback;
  defaults: PlaybackDefaults;
  onChange: (patch: SlidePlayback) => void;
  className?: string;
}

export const TRANSITIONS = [
  { value: 'none', label: 'None' }, { value: 'fade', label: 'Fade' }, { value: 'slide', label: 'Slide' },
  { value: 'push', label: 'Push' }, { value: 'wipe', label: 'Wipe' }, { value: 'zoom', label: 'Zoom' },
];
const label = (list: { value: string; label: string }[], v: string) => list.find(o => o.value === v)?.label ?? v;
const SEEK = [{ value: 'enable', label: 'Shown' }, { value: 'hide', label: 'Hidden' }];

const fieldCls = 'h-9 w-full rounded-lg border border-[#6B7280] bg-white px-2.5 text-[13px] text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1';
const labelCls = 'mb-1 block text-[13px] font-semibold text-[#374151]';
const DEFAULT = '__default';

/**
 * Slide Settings › Playback: duration, transition, seek bar and background music for this slide.
 * Every field starts on "Course default (…)" so Player Settings stays the single place for course-wide values.
 */
export function SlidePlaybackFields({ value, defaults, onChange, className }: SlidePlaybackFieldsProps) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const musicDefault = defaults.backgroundMusic ? `On${defaults.backgroundMusicFile ? ` · ${defaults.backgroundMusicFile}` : ''}` : 'Off';

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor={`${id}-dur`} className={labelCls}>Duration</label>
          <div className="relative">
            <input
              id={`${id}-dur`} type="number" min={0} max={300} inputMode="numeric"
              value={value.slideDuration ?? ''} placeholder={String(defaults.slideDuration)}
              aria-describedby={`${id}-dur-hint`}
              onChange={e => onChange({ slideDuration: e.target.value === '' ? undefined : Math.max(0, Math.min(300, Number(e.target.value))) })}
              className={cn(fieldCls, 'pr-9')}
            />
            <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#4B5563]">sec</span>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-tr`} className={labelCls}>Transition</label>
          <select id={`${id}-tr`} value={value.slideTransition ?? DEFAULT} className={fieldCls}
            onChange={e => onChange({ slideTransition: e.target.value === DEFAULT ? undefined : e.target.value })}>
            <option value={DEFAULT}>Default ({label(TRANSITIONS, defaults.slideTransition)})</option>
            {TRANSITIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <p id={`${id}-dur-hint`} className="-mt-2 text-xs text-[#4B5563]">
        Empty = course setting ({defaults.slideDuration ? `${defaults.slideDuration} s` : 'manual'}). 0 = learner moves on manually.
      </p>

      <div>
        <label htmlFor={`${id}-seek`} className={labelCls}>Seek bar</label>
        <select id={`${id}-seek`} value={value.seekBar ?? DEFAULT} className={fieldCls}
          onChange={e => onChange({ seekBar: e.target.value === DEFAULT ? undefined : e.target.value as 'enable' | 'hide' })}>
          <option value={DEFAULT}>Default ({label(SEEK, defaults.seekBar)})</option>
          {SEEK.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-music`} className={labelCls}>Background music</label>
        <select id={`${id}-music`} value={value.backgroundMusic ?? DEFAULT} className={fieldCls}
          onChange={e => {
            const v = e.target.value === DEFAULT ? undefined : e.target.value as 'off' | 'custom';
            onChange({ backgroundMusic: v, ...(v !== 'custom' ? { backgroundMusicFile: undefined } : {}) });
          }}>
          <option value={DEFAULT}>Default ({musicDefault})</option>
          <option value="off">Off on this slide</option>
          <option value="custom">Different track for this slide</option>
        </select>
        {value.backgroundMusic === 'custom' && (
          <div className="mt-2 flex items-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashed border-[#6B7280] bg-white px-2.5 text-left text-[13px] text-[#111827] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
              <Music size={14} aria-hidden="true" className="shrink-0 text-[#1565F0]" />
              <span className="truncate">{value.backgroundMusicFile || 'Upload audio (MP3 or WAV, max 10 MB)'}</span>
            </button>
            {value.backgroundMusicFile && (
              <button type="button" aria-label="Remove slide music" onClick={() => onChange({ backgroundMusicFile: undefined })}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#6B7280] text-[#B91C1C] hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                <X size={14} aria-hidden="true" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="audio/mpeg,audio/wav,audio/*" tabIndex={-1} aria-hidden="true" className="sr-only"
              onChange={e => { const f = e.target.files?.[0]; if (f) onChange({ backgroundMusicFile: f.name }); e.target.value = ''; }} />
          </div>
        )}
      </div>
    </div>
  );
}
