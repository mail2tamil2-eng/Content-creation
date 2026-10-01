import React from 'react';
import CoursePresentation, { type PresentationSettings } from './CoursePresentation';
import type { CourseTopic } from '../courseContent';
import {
  Play, LogOut, Menu as MenuIcon, HelpCircle, X, ChevronLeft, ChevronRight,
  SkipBack, SkipForward, Volume2, RotateCcw, Maximize, FileText, Check, ClipboardList,
} from 'lucide-react';

interface Topic extends CourseTopic {}

interface Section {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  expanded: boolean;
}

interface Props {
  presentationSettings: PresentationSettings;
  courseTitle: string;
  sections: Section[];
  scormPlaying: boolean;
  setScormPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  scormSidePanel: 'none' | 'menu' | 'help' | 'transcript';
  setScormSidePanel: React.Dispatch<React.SetStateAction<'none' | 'menu' | 'help' | 'transcript'>>;
  scormSlideIdx: number;
  setScormSlideIdx: React.Dispatch<React.SetStateAction<number>>;
  scormSelectedAnswer: number | null;
  setScormSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  scormAnswerChecked: boolean;
  setScormAnswerChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export default function ScormPreviewModal({
  courseTitle, sections, presentationSettings,
  scormPlaying, setScormPlaying,
  scormSidePanel, setScormSidePanel,
  scormSlideIdx, setScormSlideIdx,
  scormSelectedAnswer, setScormSelectedAnswer,
  scormAnswerChecked, setScormAnswerChecked,
  onClose,
}: Props) {
  const allTopics: Topic[] = [];
  sections.forEach(sec => sec.topics.forEach(t => allTopics.push(t)));
  const totalSlides = Math.max(allTopics.length, 1);
  const currentSlide = allTopics[scormSlideIdx];
  const isQuizSlide = currentSlide?.slideType === 'quiz' || currentSlide?.slideType === 'knowledge-check';
  const quizOptions = [
    { label: 'A', text: 'Cascade Sheets Style' },
    { label: 'B', text: 'Coded Style Sheet' },
    { label: 'C', text: 'Cascading Style Sheets' },
  ];
  const correctIdx = 2;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative flex flex-col rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] w-full"
        style={{ background: '#101828', maxWidth: 1080, maxHeight: '90vh' }}>

        {/* TOP NAV BAR */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-0 border-b border-[#364153]" style={{ background: 'rgba(0,0,0,0.5)', height: 77 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#ff8904 0%,#f54900 100%)' }}>
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight">{courseTitle || 'Information Security Management System'}</p>
              <p className="text-[#99a1af] text-xs mt-0.5">SCORM Player Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setScormSidePanel(v => v === 'menu' ? 'none' : 'menu')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${scormSidePanel === 'menu' ? 'bg-[rgba(255,105,0,0.2)]' : 'hover:bg-white/10'}`}>
              <MenuIcon className="w-5 h-5 text-white" />
            </button>
            <button type="button" onClick={() => setScormSidePanel(v => v === 'help' ? 'none' : 'help')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${scormSidePanel === 'help' ? 'bg-[rgba(255,105,0,0.2)]' : 'hover:bg-white/10'}`}>
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
            <button type="button" onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 500 }}>

          {/* Side panel */}
          {scormSidePanel !== 'none' && (
            <div className="flex-shrink-0 flex flex-col border-r border-[rgba(255,105,0,0.3)]"
              style={{ width: 349, background: 'rgba(30,41,57,0.95)' }}>
              <div className="flex items-center justify-between px-4 border-b border-[rgba(255,105,0,0.3)]" style={{ height: 61 }}>
                <div className="flex items-center gap-2">
                  {scormSidePanel === 'menu' && <MenuIcon className="w-5 h-5 text-[#ff6900]" />}
                  {scormSidePanel === 'help' && <HelpCircle className="w-5 h-5 text-[#ff6900]" />}
                  {scormSidePanel === 'transcript' && <FileText className="w-5 h-5 text-[#ff6900]" />}
                  <p className="text-white font-semibold text-lg capitalize">{scormSidePanel}</p>
                </div>
                <button type="button" onClick={() => setScormSidePanel('none')}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {scormSidePanel === 'menu' && (
                  <div className="p-3 space-y-1.5">
                    {allTopics.map((t, idx) => {
                      const isActive = idx === scormSlideIdx;
                      return (
                        <button key={t.id} type="button"
                          onClick={() => { setScormSlideIdx(idx); setScormSelectedAnswer(null); setScormAnswerChecked(false); setScormSidePanel('none'); }}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left ${isActive ? 'border border-[rgba(255,105,0,0.3)]' : ''}`}
                          style={{ background: isActive ? 'rgba(255,105,0,0.2)' : 'transparent' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                            style={{ background: isActive ? '#ff6900' : '#364153' }}>🔵</div>
                          <span className="text-base font-medium" style={{ color: isActive ? '#ff8904' : '#d1d5dc' }}>{t.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {scormSidePanel === 'help' && (
                  <div className="px-6 pt-6 space-y-6">
                    {[
                      { heading: 'Screen title:', body: "The 'Screen title' is displayed on the top left corner of the screen" },
                      { heading: 'Menu:', body: 'Here you can see all the available topics in this course' },
                      { heading: 'Help:', body: "Here you can see the 'Help' page" },
                      { heading: 'Page no.:', body: 'Here you can see the page that you are in right now' },
                      { heading: 'Previous:', body: 'Course navigation – You can go to the previous screen' },
                      { heading: 'Next:', body: 'Course navigation – You can go to the next screen' },
                      { heading: 'Transcript:', body: 'Here you can see the voice-over transcript' },
                      { heading: 'Exit:', body: "Here you can 'Exit' the course" },
                    ].map(item => (
                      <div key={item.heading}>
                        <p className="text-white font-semibold text-lg leading-tight">{item.heading}</p>
                        <p className="text-[#d1d5dc] text-base mt-1 leading-6">{item.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                {scormSidePanel === 'transcript' && (
                  <div className="px-6 pt-6">
                    <p className="text-white text-base leading-[26px]">
                      Hi, am here to discuss about a more popular buzzword in the past decade – emotional intelligence. In fact, the concept of emotional intelligence has been around for at least 25 years now. Whether you know it as Emotional Quotient (EQ) or Emotional Intelligence (EI), it&apos;s a hot topic.
                    </p>
                    <p className="text-white text-base leading-[26px] mt-6">
                      Emotional intelligence is the ability to understand and manage your own emotions, and those of the people around you. People with a high degree of emotional intelligence know what they&apos;re feeling, what their emotions mean, and how these emotions can affect other people.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0 overflow-y-auto bg-slate-100">
            {currentSlide && <CoursePresentation topic={currentSlide} courseTitle={courseTitle} sectionTitle={sections.find(s => s.topics.some(t => t.id === currentSlide.id))?.title} index={scormSlideIdx} total={totalSlides} settings={presentationSettings} />}
          </div>
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="flex-shrink-0 border-t border-[#364153] px-4 pt-4 pb-4 space-y-3" style={{ background: '#1e2939' }}>
          <div className="flex items-center gap-3">
            <span className="text-white text-xs font-mono w-8">0:00</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#364153' }}>
              <div className="h-full rounded-full w-[2%]" style={{ background: 'linear-gradient(90deg,#2b7fff,#4f39f6)' }} />
            </div>
            <span className="text-[#99a1af] text-xs font-mono w-8 text-right">3:00</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setScormPlaying(v => !v)}
                className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Play className="w-5 h-5 text-white fill-white" />
              </button>
              <button type="button" className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
              <button type="button" onClick={() => { setScormSlideIdx(i => Math.max(0, i - 1)); setScormSelectedAnswer(null); setScormAnswerChecked(false); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              <button type="button" onClick={() => { setScormSlideIdx(i => Math.min(totalSlides - 1, i + 1)); setScormSelectedAnswer(null); setScormAnswerChecked(false); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <SkipForward className="w-5 h-5 text-white" />
              </button>
              <button type="button" className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Volume2 className="w-5 h-5 text-white" />
              </button>
              <button type="button" className="h-10 px-3 rounded-xl text-white text-sm font-medium" style={{ background: 'rgba(255,255,255,0.1)' }}>1x</button>
              <button type="button" className="h-10 px-3 rounded-xl text-white text-sm font-medium" style={{ background: 'rgba(255,255,255,0.1)' }}>CC</button>
              <button type="button" onClick={() => setScormSidePanel(v => v === 'transcript' ? 'none' : 'transcript')}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: scormSidePanel === 'transcript' ? 'rgba(255,105,0,0.2)' : 'rgba(255,255,255,0.1)' }}>
                <FileText className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-xl overflow-hidden h-11" style={{ background: 'linear-gradient(163deg,#ff8904 0%,#f54900 100%)', width: 148 }}>
                <button type="button" onClick={() => { setScormSlideIdx(i => Math.max(0, i - 1)); setScormSelectedAnswer(null); setScormAnswerChecked(false); }}
                  className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity px-2">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="flex-1 text-white text-sm font-bold text-center">
                  {String(scormSlideIdx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
                <button type="button" onClick={() => { setScormSlideIdx(i => Math.min(totalSlides - 1, i + 1)); setScormSelectedAnswer(null); setScormAnswerChecked(false); }}
                  className="flex items-center justify-center hover:opacity-100 transition-opacity px-2">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
              <button type="button" className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
