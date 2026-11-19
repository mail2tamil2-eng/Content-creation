import { useId, useRef } from 'react';
import { ChevronDown, Music, X } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from './ui/utils';

/** Course-wide values from Global Settings; each slide can override them. */
export interface PlaybackDefaults {
  slideDuration: number;
  slideTransition: string;
  seekBar: 'enable' | 'hide';
  seekBarOption?: SeekBarOption;
  backgroundMusic: boolean;
  backgroundMusicFile?: string;
}

/** Per-slide overrides. `undefined` = use the course setting. */
export interface SlidePlayback {
  slideDuration?: number;
  slideTransition?: string;
  seekBar?: 'enable' | 'hide';
  seekBarOption?: SeekBarOption;
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
export type SeekBarOption = 'allowDrag' | 'afterCompletion' | 'readOnly';
/** What the learner can do with the seek bar when it is shown. */
export const SEEK_OPTIONS: { value: SeekBarOption; label: string }[] = [
  { value: 'allowDrag', label: 'Allow user to drag Seek Bar' },
  { value: 'afterCompletion', label: 'Allow drag after completion' },
  { value: 'readOnly', label: 'Seek bar is read only' },
];
const SEEK = [{ value: 'enable', label: 'Shown' }, { value: 'hide', label: 'Hidden' }];

const fieldCls = 'h-9 w-full rounded-lg border border-[#D1D5DB] bg-white px-2.5 text-[13px] text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1';
const labelCls = 'mb-1 block text-[13px] font-semibold text-[#374151]';
const DEFAULT = '__default';

/** Select with the same custom chevron as the other panel dropdowns. */
function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn('relative', className)}>
      <select {...props} className={cn(fieldCls, 'cursor-pointer appearance-none pr-8')} />
      <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
    </div>
  );
}

/**
 * Slide Settings › Playback: duration, transition, seek bar and background music for this slide.
 * Every field starts on "Default (…)" so Global Settings stays the single place for course-wide values.
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
              value={value.slideDuration ?? ''} placeholder={`Default (${defaults.slideDuration})`}
              onChange={e => onChange({ slideDuration: e.target.value === '' ? undefined : Math.max(0, Math.min(300, Number(e.target.value))) })}
              className={cn(fieldCls, 'pr-9')}
            />
            <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#4B5563]">sec</span>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-tr`} className={labelCls}>Transition</label>
          <Select id={`${id}-tr`} value={value.slideTransition ?? DEFAULT}
            onChange={e => onChange({ slideTransition: e.target.value === DEFAULT ? undefined : e.target.value })}>
            <option value={DEFAULT}>Default ({label(TRANSITIONS, defaults.slideTransition)})</option>
            {TRANSITIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-seek`} className={labelCls}>Seek bar</label>
        <Select id={`${id}-seek`} value={value.seekBar ?? DEFAULT}
          onChange={e => onChange({ seekBar: e.target.value === DEFAULT ? undefined : e.target.value as 'enable' | 'hide' })}>
          <option value={DEFAULT}>Default ({label(SEEK, defaults.seekBar)})</option>
          {SEEK.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        {(value.seekBar ?? defaults.seekBar) === 'enable' && (
          <>
            <label htmlFor={`${id}-seekopt`} className={cn(labelCls, 'mt-2.5')}>Seek bar control</label>
            <Select id={`${id}-seekopt`} value={value.seekBarOption ?? DEFAULT}
              onChange={e => onChange({ seekBarOption: e.target.value === DEFAULT ? undefined : e.target.value as SeekBarOption })}>
              <option value={DEFAULT}>Default ({label(SEEK_OPTIONS, defaults.seekBarOption ?? 'allowDrag')})</option>
              {SEEK_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-music`} className={labelCls}>Background music</label>
        <Select id={`${id}-music`} value={value.backgroundMusic ?? DEFAULT}
          onChange={e => {
            const v = e.target.value === DEFAULT ? undefined : e.target.value as 'off' | 'custom';
            onChange({ backgroundMusic: v, ...(v !== 'custom' ? { backgroundMusicFile: undefined } : {}) });
          }}>
          <option value={DEFAULT}>Default ({musicDefault})</option>
          {/* "Off" only differs from the default when the course has music */}
          {(defaults.backgroundMusic || value.backgroundMusic === 'off') && <option value="off">No music on this slide</option>}
          <option value="custom">{defaults.backgroundMusic ? 'Different track for this slide' : 'Add a track to this slide'}</option>
        </Select>
        {value.backgroundMusic === 'custom' && (
          <div className="mt-2 flex items-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashed border-[#D1D5DB] bg-white px-2.5 text-left text-[13px] text-[#111827] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
              <Music size={14} aria-hidden="true" className="shrink-0 text-[#1565F0]" />
              <span className="truncate">{value.backgroundMusicFile || 'Upload audio (MP3 or WAV, max 10 MB)'}</span>
            </button>
            {value.backgroundMusicFile && (
              <button type="button" aria-label="Remove slide music" onClick={() => onChange({ backgroundMusicFile: undefined })}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#B91C1C] hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
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
