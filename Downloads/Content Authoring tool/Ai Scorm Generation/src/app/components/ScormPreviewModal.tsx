import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import CoursePresentation, { type PresentationSettings } from './CoursePresentation';
import type { CourseTopic } from '../courseContent';
import {
  Play, Pause, LogOut, Menu as MenuIcon, HelpCircle, X, ChevronLeft, ChevronRight,
  SkipBack, SkipForward, Volume2, VolumeX, RotateCcw, Maximize, Minimize, FileText,
} from 'lucide-react';

interface Topic extends CourseTopic {}

interface Section {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  expanded: boolean;
}

type Panel = 'none' | 'menu' | 'help' | 'transcript';

interface Props {
  presentationSettings: PresentationSettings;
  courseTitle: string;
  sections: Section[];
  scormPlaying: boolean;
  setScormPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  scormSidePanel: Panel;
  setScormSidePanel: React.Dispatch<React.SetStateAction<Panel>>;
  scormSlideIdx: number;
  setScormSlideIdx: React.Dispatch<React.SetStateAction<number>>;
  scormSelectedAnswer: number | null;
  setScormSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  scormAnswerChecked: boolean;
  setScormAnswerChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const PANEL_TITLES: Record<Exclude<Panel, 'none'>, string> = { menu: 'Menu', help: 'Help', transcript: 'Transcript' };
const SPEEDS = ['1x', '1.25x', '1.5x', '2x'] as const;

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e2939]';
const ctrlBase = `h-10 min-w-10 rounded-xl flex items-center justify-center text-white transition-colors motion-reduce:transition-none disabled:opacity-40 disabled:cursor-not-allowed ${focusRing}`;
/** Bottom-bar control (filled). */
const ctrl = `${ctrlBase} bg-white/10 hover:bg-white/20`;
/** Top-bar / panel icon button (no fill until hover). */
const ghost = `${ctrlBase} hover:bg-white/10`;
const ctrlOn = 'bg-[rgba(255,105,0,0.25)] ring-1 ring-inset ring-[#ff8904]';

/**
 * SCORM player preview. A modal dialog (Radix): focus is trapped inside, Esc or Exit closes it
 * and focus returns to the button that opened it. Every control has an accessible name, toggles
 * report their state (aria-pressed / aria-expanded), and slide changes are announced.
 */
export default function ScormPreviewModal({
  courseTitle, sections, presentationSettings,
  scormPlaying, setScormPlaying,
  scormSidePanel, setScormSidePanel,
  scormSlideIdx, setScormSlideIdx,
  setScormSelectedAnswer, setScormAnswerChecked,
  onClose,
}: Props) {
  const allTopics: Topic[] = sections.flatMap(sec => sec.topics);
  const totalSlides = Math.max(allTopics.length, 1);
  const currentSlide = allTopics[scormSlideIdx];
  const title = courseTitle || 'Information Security Management System';
  const atFirst = scormSlideIdx <= 0;
  const atLast = scormSlideIdx >= totalSlides - 1;

  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  // Return focus to whatever opened the player (the parent unmounts this component to close it)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    return () => { setTimeout(() => { if (opener?.isConnected) opener.focus(); }, 0); };
  }, []);
  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  const goTo = (i: number) => {
    setScormSlideIdx(Math.min(totalSlides - 1, Math.max(0, i)));
    setScormSelectedAnswer(null);
    setScormAnswerChecked(false);
  };
  const togglePanel = (p: Exclude<Panel, 'none'>) => setScormSidePanel(v => (v === p ? 'none' : p));
  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => undefined);
    else void el.requestFullscreen?.().catch(() => undefined);
  };

  const panelId = 'scorm-side-panel';
  const slideLabel = `Slide ${scormSlideIdx + 1} of ${totalSlides}`;

  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm" />
        {/* Sits below the 80px app header so it never overlaps it */}
        <Dialog.Content
          ref={playerRef}
          data-testid="scorm-player"
          onPointerDownOutside={e => e.preventDefault()}
          className="fixed left-1/2 z-[201] flex w-[calc(100%-32px)] max-w-[1080px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-[#101828] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] focus:outline-none top-[calc(50%+40px)] max-h-[calc(100vh-96px)] [&:fullscreen]:inset-0 [&:fullscreen]:h-full [&:fullscreen]:w-full [&:fullscreen]:max-w-none [&:fullscreen]:max-h-none [&:fullscreen]:translate-x-0 [&:fullscreen]:translate-y-0 [&:fullscreen]:rounded-none"
        >
          {/* TOP BAR */}
          <header className="flex h-[77px] flex-shrink-0 items-center justify-between border-b border-[#364153] bg-black/50 px-4">
            <div className="flex min-w-0 items-center gap-3">
              <div aria-hidden="true" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg,#ff8904 0%,#f54900 100%)' }}>
                <Play className="h-5 w-5 fill-white text-white" />
              </div>
              <div className="min-w-0">
                <Dialog.Title className="truncate text-base font-bold leading-tight text-white">{title}</Dialog.Title>
                <Dialog.Description className="mt-0.5 text-xs text-[#99a1af]">SCORM Player Preview</Dialog.Description>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Course menu" aria-expanded={scormSidePanel === 'menu'} aria-controls={scormSidePanel === 'menu' ? panelId : undefined}
                onClick={() => togglePanel('menu')} className={`${ghost} w-10 ${scormSidePanel === 'menu' ? ctrlOn : ''}`}>
                <MenuIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Help" aria-expanded={scormSidePanel === 'help'} aria-controls={scormSidePanel === 'help' ? panelId : undefined}
                onClick={() => togglePanel('help')} className={`${ghost} w-10 ${scormSidePanel === 'help' ? ctrlOn : ''}`}>
                <HelpCircle aria-hidden="true" className="h-5 w-5" />
              </button>
              <Dialog.Close aria-label="Exit preview" className={`${ghost} w-10`}>
                <LogOut aria-hidden="true" className="h-5 w-5" />
              </Dialog.Close>
            </div>
          </header>

          {/* CONTENT */}
          <div className="flex min-h-[500px] flex-1 overflow-hidden">
            {scormSidePanel !== 'none' && (
              <aside id={panelId} aria-labelledby={`${panelId}-title`}
                className="flex w-[349px] max-w-[45%] flex-shrink-0 flex-col border-r border-[rgba(255,105,0,0.3)] bg-[rgba(30,41,57,0.95)]">
                <div className="flex h-[61px] items-center justify-between border-b border-[rgba(255,105,0,0.3)] px-4">
                  <div className="flex items-center gap-2">
                    {scormSidePanel === 'menu' && <MenuIcon aria-hidden="true" className="h-5 w-5 text-[#ff8904]" />}
                    {scormSidePanel === 'help' && <HelpCircle aria-hidden="true" className="h-5 w-5 text-[#ff8904]" />}
                    {scormSidePanel === 'transcript' && <FileText aria-hidden="true" className="h-5 w-5 text-[#ff8904]" />}
                    <h2 id={`${panelId}-title`} className="text-lg font-semibold text-white">{PANEL_TITLES[scormSidePanel]}</h2>
                  </div>
                  <button type="button" aria-label={`Close ${PANEL_TITLES[scormSidePanel].toLowerCase()}`} onClick={() => setScormSidePanel('none')}
                    className={`${ghost} h-8 w-8 min-w-8`}>
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {scormSidePanel === 'menu' && (
                    <nav aria-label="Course slides">
                      <ol className="space-y-1.5 p-3">
                        {allTopics.map((t, idx) => {
                          const isActive = idx === scormSlideIdx;
                          return (
                            <li key={t.id}>
                              <button type="button" aria-current={isActive ? 'step' : undefined}
                                onClick={() => { goTo(idx); setScormSidePanel('none'); }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors motion-reduce:transition-none ${focusRing} ${isActive ? 'border border-[rgba(255,105,0,0.4)] bg-[rgba(255,105,0,0.2)]' : 'hover:bg-white/5'}`}>
                                <span aria-hidden="true" className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${isActive ? 'bg-[#C2410C] text-white' : 'bg-[#364153] text-[#d1d5dc]'}`}>{idx + 1}</span>
                                <span className={`text-base font-medium ${isActive ? 'text-[#ffb86a]' : 'text-[#d1d5dc]'}`}>{t.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>
                  )}
                  {scormSidePanel === 'help' && (
                    <dl className="space-y-6 px-6 py-6">
                      {[
                        { heading: 'Screen title', body: "The 'Screen title' is displayed on the top left corner of the screen" },
                        { heading: 'Menu', body: 'Here you can see all the available topics in this course' },
                        { heading: 'Help', body: "Here you can see the 'Help' page" },
                        { heading: 'Page no.', body: 'Here you can see the page that you are in right now' },
                        { heading: 'Previous', body: 'Course navigation – You can go to the previous screen' },
                        { heading: 'Next', body: 'Course navigation – You can go to the next screen' },
                        { heading: 'Transcript', body: 'Here you can see the voice-over transcript' },
                        { heading: 'Exit', body: "Here you can 'Exit' the course. You can also press Esc." },
                      ].map(item => (
                        <div key={item.heading}>
                          <dt className="text-lg font-semibold leading-tight text-white">{item.heading}</dt>
                          <dd className="mt-1 text-base leading-6 text-[#d1d5dc]">{item.body}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {scormSidePanel === 'transcript' && (
                    <div className="px-6 py-6">
                      <p className="text-base leading-[26px] text-white">
                        Hi, am here to discuss about a more popular buzzword in the past decade – emotional intelligence. In fact, the concept of emotional intelligence has been around for at least 25 years now. Whether you know it as Emotional Quotient (EQ) or Emotional Intelligence (EI), it&apos;s a hot topic.
                      </p>
                      <p className="mt-6 text-base leading-[26px] text-white">
                        Emotional intelligence is the ability to understand and manage your own emotions, and those of the people around you. People with a high degree of emotional intelligence know what they&apos;re feeling, what their emotions mean, and how these emotions can affect other people.
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            )}

            <section aria-label={currentSlide ? `${slideLabel}: ${currentSlide.title}` : 'Slide'} className="flex min-w-0 flex-1 flex-col justify-center overflow-y-auto bg-[#101828]">
              {currentSlide && <CoursePresentation topic={currentSlide} courseTitle={courseTitle} sectionTitle={sections.find(s => s.topics.some(t => t.id === currentSlide.id))?.title} index={scormSlideIdx} total={totalSlides} settings={presentationSettings} />}
            </section>
          </div>

          {/* PLAYER CONTROLS */}
          <div role="group" aria-label="Player controls" className="flex-shrink-0 space-y-3 border-t border-[#364153] bg-[#1e2939] p-4">
            <div className="flex items-center gap-3">
              <span className="w-8 font-mono text-xs text-white" aria-hidden="true">0:00</span>
              <div role="progressbar" aria-label="Narration progress" aria-valuemin={0} aria-valuemax={180} aria-valuenow={0} aria-valuetext="0:00 of 3:00"
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#4a5565]">
                <div className="h-full w-[2%] rounded-full bg-white" />
              </div>
              <span className="w-8 text-right font-mono text-xs text-[#d1d5dc]" aria-hidden="true">3:00</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" aria-label={scormPlaying ? 'Pause narration' : 'Play narration'} onClick={() => setScormPlaying(v => !v)} className={`${ctrl} w-10`}>
                  {scormPlaying ? <Pause aria-hidden="true" className="h-5 w-5 fill-white" /> : <Play aria-hidden="true" className="h-5 w-5 fill-white" />}
                </button>
                <button type="button" aria-label="Replay narration" className={`${ctrl} w-10`}>
                  <RotateCcw aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Previous slide" disabled={atFirst} onClick={() => goTo(scormSlideIdx - 1)} className={`${ctrl} w-10`}>
                  <SkipBack aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Next slide" disabled={atLast} onClick={() => goTo(scormSlideIdx + 1)} className={`${ctrl} w-10`}>
                  <SkipForward aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Mute narration" aria-pressed={muted} onClick={() => setMuted(v => !v)} className={`${ctrl} w-10 ${muted ? ctrlOn : ''}`}>
                  {muted ? <VolumeX aria-hidden="true" className="h-5 w-5" /> : <Volume2 aria-hidden="true" className="h-5 w-5" />}
                </button>
                <button type="button" aria-label={`Playback speed ${SPEEDS[speed]}`} onClick={() => setSpeed(s => (s + 1) % SPEEDS.length)} className={`${ctrl} px-3 text-sm font-medium`}>
                  {SPEEDS[speed]}
                </button>
                <button type="button" aria-label="Captions" aria-pressed={captions} onClick={() => setCaptions(v => !v)} className={`${ctrl} px-3 text-sm font-medium ${captions ? ctrlOn : ''}`}>
                  CC
                </button>
                <button type="button" aria-label="Transcript" aria-expanded={scormSidePanel === 'transcript'} aria-controls={scormSidePanel === 'transcript' ? panelId : undefined}
                  onClick={() => togglePanel('transcript')} className={`${ctrl} w-10 ${scormSidePanel === 'transcript' ? ctrlOn : ''}`}>
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <nav aria-label="Slide navigation" className="flex h-11 w-[156px] items-center overflow-hidden rounded-xl bg-[#C2410C]">
                  <button type="button" aria-label="Previous slide" disabled={atFirst} onClick={() => goTo(scormSlideIdx - 1)}
                    className={`flex h-full items-center justify-center px-2.5 text-white hover:bg-black/15 disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}>
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-white" aria-live="polite" aria-atomic="true">
                    <span className="sr-only">{slideLabel}</span>
                    <span aria-hidden="true">{scormSlideIdx + 1} / {totalSlides}</span>
                  </span>
                  <button type="button" aria-label="Next slide" disabled={atLast} onClick={() => goTo(scormSlideIdx + 1)}
                    className={`flex h-full items-center justify-center px-2.5 text-white hover:bg-black/15 disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}>
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </button>
                </nav>
                <button type="button" aria-label={fullscreen ? 'Exit full screen' : 'Full screen'} onClick={toggleFullscreen} className={`${ctrl} w-10`}>
                  {fullscreen ? <Minimize aria-hidden="true" className="h-5 w-5" /> : <Maximize aria-hidden="true" className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
