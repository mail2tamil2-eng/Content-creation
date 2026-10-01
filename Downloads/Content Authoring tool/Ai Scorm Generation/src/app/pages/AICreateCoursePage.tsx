import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Check, ChevronDown, ChevronRight, ChevronLeft,
  Sparkles, Save, FileText, Plus, Trash2,
  Upload, Settings, Video, Users,
  ArrowRight, ListChecks, Image as LucideImage, HelpCircle,
  GitBranch, ClipboardList, Bookmark,
  Volume2, Navigation, Captions,
  SkipBack, SkipForward, LogOut, Menu as MenuIcon,
  Maximize, X, MoreHorizontal, Palette,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/Breadcrumb';
import ScormPreviewModal from '../components/ScormPreviewModal';
import { useCourseContext } from '../context/CourseContext';
import PublishModal from '../components/PublishModal';
import { generateSlideContent, type CourseTopic } from '../courseContent';
import CoursePresentation, { type PresentationSettings } from '../components/CoursePresentation';
import { EditorTopToolbar } from '../components/EditorTopToolbar';
import { type ThemeSettings, THEME_OPTIONS } from '../components/ThemePopover';
import { CourseSidebar, type CSSection } from '../components/CourseSidebar';
import { SlideSettingsPanel } from '../components/SlideSettingsPanel';
import { SlideLibraryModal } from '../components/SlideLibraryModal';

// -- Types --
type Complexity = 'basic' | 'intermediate' | 'advanced';
type NavigationMode = 'free' | 'linear';
type SeekBarControl = 'enable' | 'hide';
type CompletionCriteriaSource = 'quiz' | 'slide-view' | 'knowledge-check';
type SeekBarOption = 'drag' | 'drag-after-completion' | 'read-only';
type ThemeBackground = 'light' | 'warm' | 'dark';
type ButtonStyle = 'rounded' | 'pill' | 'square';

interface ThemePreset {
  id: string; name: string; primaryColor: string; secondaryColor: string;
  fontFamily: string; background: ThemeBackground; buttonStyle: ButtonStyle;
  playerStyle: string; tags: string[];
}
interface Topic extends CourseTopic {}
interface Section {
  id: string; title: string; description: string; topics: Topic[]; expanded: boolean;
}

// -- Constants --
const THEME_PRESETS: ThemePreset[] = [
  { id: 'corporate-blue',  name: 'Corporate Blue',  primaryColor: '#134780', secondaryColor: '#F48120', fontFamily: 'Inter',            background: 'light', buttonStyle: 'rounded', playerStyle: 'Standard', tags: ['Professional', 'Corporate'] },
  { id: 'modern-dark',     name: 'Modern Dark',     primaryColor: '#6D28D9', secondaryColor: '#10B981', fontFamily: 'Roboto',           background: 'dark',  buttonStyle: 'pill',    playerStyle: 'Minimal',  tags: ['Dark', 'Modern'] },
  { id: 'warm-earthy',     name: 'Warm Earthy',     primaryColor: '#92400E', secondaryColor: '#D97706', fontFamily: 'Merriweather',     background: 'warm',  buttonStyle: 'rounded', playerStyle: 'Standard', tags: ['Warm', 'Natural'] },
  { id: 'clean-minimal',   name: 'Clean Minimal',   primaryColor: '#111827', secondaryColor: '#3B82F6', fontFamily: 'Open Sans',        background: 'light', buttonStyle: 'square',  playerStyle: 'Minimal',  tags: ['Minimal', 'Clean'] },
  { id: 'vibrant-purple',  name: 'Vibrant Purple',  primaryColor: '#7C3AED', secondaryColor: '#F97316', fontFamily: 'Montserrat',       background: 'light', buttonStyle: 'pill',    playerStyle: 'Full',     tags: ['Vibrant', 'Creative'] },
  { id: 'nature-green',    name: 'Nature Green',    primaryColor: '#166534', secondaryColor: '#CA8A04', fontFamily: 'Lato',             background: 'light', buttonStyle: 'rounded', playerStyle: 'Standard', tags: ['Fresh', 'Nature'] },
  { id: 'ocean-blue',      name: 'Ocean Blue',      primaryColor: '#0369A1', secondaryColor: '#06B6D4', fontFamily: 'IBM Plex Sans',    background: 'light', buttonStyle: 'rounded', playerStyle: 'Minimal',  tags: ['Calm', 'Professional'] },
  { id: 'elegant-dark',    name: 'Elegant Dark',    primaryColor: '#3B1C6A', secondaryColor: '#D4A843', fontFamily: 'Playfair Display', background: 'dark',  buttonStyle: 'square',  playerStyle: 'Full',     tags: ['Elegant', 'Premium'] },
];

const COURSE_DESIGNS = [
  { id: 'corporate', name: 'Corporate',  template: 'vivid-blue',       theme: 'corporate-blue',  description: 'Clear and professional' },
  { id: 'modern',    name: 'Modern',     template: 'rustic-minimalist', theme: 'modern-dark',     description: 'Confident dark styling' },
  { id: 'minimal',   name: 'Minimal',    template: 'elevate-white',    theme: 'clean-minimal',   description: 'Simple and focused' },
  { id: 'bold',      name: 'Bold',       template: 'royal-purple',     theme: 'vibrant-purple',  description: 'Bright and expressive' },
  { id: 'natural',   name: 'Natural',    template: 'green-matrix',     theme: 'nature-green',    description: 'Fresh green accents' },
  { id: 'warm',      name: 'Warm',       template: 'roselle-glow',     theme: 'warm-earthy',     description: 'Soft and welcoming' },
  { id: 'ocean',     name: 'Ocean',      template: 'lavender-delight', theme: 'ocean-blue',      description: 'Calm blue tones' },
  { id: 'elegant',   name: 'Elegant',    template: 'health-harmony',   theme: 'elegant-dark',    description: 'Rich and refined' },
];

const LANGUAGES   = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Portuguese'];
const THEME_FONTS = ['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display', 'Merriweather'];

interface SlideTypeConfig {
  id: string; label: string; description: string;
  Icon: React.ComponentType<{ className?: string }>;
}
const SLIDE_TYPES: SlideTypeConfig[] = [
  { id: 'title-text',       label: 'Title + Text',       description: 'Present explanations or descriptive content',           Icon: FileText },
  { id: 'title-bullets',    label: 'Bullet Points',       description: 'Present key points concisely',                         Icon: ListChecks },
  { id: 'image-visual',     label: 'Image / Visual',      description: 'Explain or reinforce concepts visually',               Icon: LucideImage },
  { id: 'video',            label: 'Video',               description: 'Demonstrations, scenarios, or audiovisual content',    Icon: Video },
  { id: 'audio',            label: 'Audio',               description: 'Narration or voiceover with optional AI generation',  Icon: Volume2 },
  { id: 'spokesperson',     label: 'Spokesperson',        description: 'Present content using an AI/virtual presenter',        Icon: Users },
  { id: 'scenario',         label: 'Scenario / Decision', description: 'A situation requiring a learner decision',             Icon: GitBranch },
  { id: 'knowledge-check',  label: 'Knowledge Check',     description: 'Ungraded comprehension check with instant feedback',  Icon: ClipboardList },
  { id: 'quiz',             label: 'Quiz',                description: 'Graded assessment with scoring and a passing bar',    Icon: HelpCircle },
  { id: 'summary',          label: 'Summary',             description: 'Key learning points and takeaways',                   Icon: Bookmark },
];

const COMPLEXITY_CONFIG: Record<Complexity, {
  label: string; tagline: string; color: string; ring: string; badge: string; dot: string; slideIds: string[];
}> = {
  basic: {
    label: 'Basic', tagline: 'Text, images, knowledge checks, quizzes',
    color: 'bg-emerald-50 border-emerald-200', ring: 'border-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'knowledge-check', 'quiz'],
  },
  intermediate: {
    label: 'Intermediate', tagline: 'Basic + video, audio, spokesperson, scenarios',
    color: 'bg-blue-50 border-blue-200', ring: 'border-blue-500',
    badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'video', 'audio', 'spokesperson', 'scenario', 'knowledge-check', 'quiz'],
  },
  advanced: {
    label: 'Advanced', tagline: 'Intermediate + summaries, branching scenarios',
    color: 'bg-violet-50 border-violet-200', ring: 'border-violet-500',
    badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-400',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'video', 'audio', 'spokesperson', 'scenario', 'knowledge-check', 'quiz', 'summary'],
  },
};

// -- Helpers --
function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button" role="switch" aria-checked={enabled} onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${enabled ? 'bg-[#2D74FA] focus:ring-blue-400' : 'bg-gray-300 focus:ring-gray-400'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function uid() { return Math.random().toString(36).slice(2, 10); }

// -- Main component --
export function AICreateCoursePage() {
  const navigate = useNavigate();
  const { createDraft } = useCourseContext();

  const [step, setStep] = useState<1 | 2>(1);

  // Step 1
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState<Complexity>('basic');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState<'hours' | 'minutes'>('hours');
  const [language, setLanguage] = useState('English');
  const [audience, setAudience] = useState('');
  const [objective, setObjective] = useState('');
  const [objectives, setObjectives] = useState<string[]>(['']);
  const [generatingObj, setGeneratingObj] = useState(false);

  // Assessment Settings
  const [addQuiz, setAddQuiz] = useState(false);
  const [addQuizQuestions, setAddQuizQuestions] = useState(10);
  const [knowledgeCheck, setKnowledgeCheck] = useState(false);
  const [knowledgeCheckQuestions, setKnowledgeCheckQuestions] = useState(5);

  // Theme
  const [aiTheme, setAiTheme] = useState(true);
  const [themeOpen, setThemeOpen] = useState(false);
  const [designId, setDesignId] = useState('corporate');
  const [logoPreview, setLogoPreview] = useState('');

  // Template Selection
  const [templateOpen, setTemplateOpen]   = useState(false);
  const [aiTemplate, setAiTemplate]       = useState(true);
  const [templateType, setTemplateType] = useState<'predefined' | 'custom' | 'blank'>('predefined');
  const [selectedPredefined, setSelectedPredefined] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('gold');
  // Theme customisation
  const [customPrimary, setCustomPrimary]           = useState('#A8842E');
  const [customSecondary, setCustomSecondary]       = useState('#D4A843');
  const [customFont, setCustomFont]                 = useState('Inter');
  const [customBgStyle, setCustomBgStyle]           = useState<'light' | 'warm' | 'dark'>('light');
  const [customButtonStyle, setCustomButtonStyle]   = useState<'rounded' | 'pill' | 'square'>('rounded');
  // Custom template
  const [customLogoPreview, setCustomLogoPreview] = useState('');
  const [headerEnabled, setHeaderEnabled] = useState(false);
  const [headerIncludeLogo, setHeaderIncludeLogo] = useState(true);
  const [headerIncludeCourseName, setHeaderIncludeCourseName] = useState(true);
  const [footerEnabled, setFooterEnabled] = useState(false);
  const [footerIncludeOrgName, setFooterIncludeOrgName] = useState(false);
  const [footerIncludeCourseName, setFooterIncludeCourseName] = useState(false);
  const [footerIncludeCopyright, setFooterIncludeCopyright] = useState(false);
  const [copyrightText, setCopyrightText] = useState('');
  const [footerIncludePageNum, setFooterIncludePageNum] = useState(false);
  const [footerIncludeWatermark, setFooterIncludeWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState('');

  // Global Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [navMode, setNavMode] = useState<NavigationMode>('free');
  const [completionSrcs, setCompletionSrcs] = useState<CompletionCriteriaSource[]>([]);
  const [bookmarking, setBookmarking] = useState(true);
  const [transcript, setTranscript] = useState(false);
  const [seekBar, setSeekBar] = useState<SeekBarControl>('enable');
  const [slideDuration, setSlideDuration] = useState(5);
  const [slideTransition, setSlideTransition] = useState('none');
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [backgroundMusicFile, setBackgroundMusicFile] = useState('');
  const [bgMusicAi, setBgMusicAi] = useState(true);
  const [seekBarOption, setSeekBarOption] = useState<SeekBarOption>('drag');

  // Step 2
  const [sections, setSections] = useState<Section[]>([]);
  const [generating, setGenerating] = useState(false);
  const generationLock = useRef(false);
  const [selSection, setSelSection] = useState(0);
  const [selTopic, setSelTopic] = useState(0);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [enhancing, setEnhancing] = useState(false);

  // Step 2 panel collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [rightOpen, setRightOpen] = useState(true);
  const [showCourseSettings, setShowCourseSettings] = useState(false);
  const [changeTypeOpen, setChangeTypeOpen] = useState(false);

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Theme popover overrides (applied on top of base presentationSettings)
  const [themeOverride, setThemeOverride] = useState<Partial<PresentationSettings> | null>(null);

  // Publish / Preview
  const [showPublish, setShowPublish] = useState(false);
  const [showScorm, setShowScorm] = useState(false);
  const [publishDest, setPublishDest] = useState('Zell Learning');
  const [publishDropOpen, setPublishDropOpen] = useState(false);
  const [publishPushed, setPublishPushed] = useState(false);
  const [publishDone, setPublishDone] = useState(false);
  const [scormPlaying, setScormPlaying] = useState(false);
  const [scormPanel, setScormPanel] = useState<'none' | 'menu' | 'help' | 'transcript'>('none');
  const [scormIdx, setScormIdx] = useState(0);
  const [scormAnswer, setScormAnswer] = useState<number | null>(null);
  const [scormChecked, setScormChecked] = useState(false);

  // CSS animations for canvas/panel enter transitions
  useEffect(() => {
    const id = 'ai-course-anim-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = `
        @keyframes canvasFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .slide-canvas-enter { animation: canvasFadeIn 0.2s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes panelFadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .slide-panel-enter { animation: panelFadeIn 0.18s cubic-bezier(0.4,0,0.2,1) both; }
      `;
      document.head.appendChild(el);
    }
  }, []);

  // Computed
  const cfg = COMPLEXITY_CONFIG[complexity];
  const allowedSlideTypes = SLIDE_TYPES.filter(s => cfg.slideIds.includes(s.id));
  const design = COURSE_DESIGNS.find(d => d.id === designId) || COURSE_DESIGNS[0];
  const preset = THEME_PRESETS.find(p => p.id === design.theme) || THEME_PRESETS[0];
  const isDark = preset.background === 'dark';
  const themeBgColor   = customBgStyle === 'dark' ? '#111827' : customBgStyle === 'warm' ? '#FEF9EE' : '#FFFFFF';
  const themeFontColor = customBgStyle === 'dark' ? '#FFFFFF' : '#172033';
  const baseSettings: PresentationSettings = aiTheme
    ? { template: 'vivid-blue', primary: '#134780', accent: '#F48120', background: '#111C2D', foreground: '#FFFFFF', font: 'Inter', buttonStyle: 'rounded', layout: 'single', logo: logoPreview || undefined }
    : { template: design.template, primary: customPrimary, accent: customSecondary, background: themeBgColor, foreground: themeFontColor, font: customFont, buttonStyle: customButtonStyle, layout: 'single', logo: logoPreview || undefined };

  const presentationSettings: PresentationSettings = themeOverride
    ? { ...baseSettings, ...themeOverride }
    : baseSettings;

  const handleApplyTheme = (ts: ThemeSettings) => {
    const bg = ts.backgroundStyle === 'dark' ? '#0F172A'
      : ts.backgroundStyle === 'warm' ? '#FFF9E8'
      : ts.themeBackground;
    setThemeOverride({
      primary: ts.primaryColor,
      accent: ts.secondaryColor,
      background: bg,
      font: ts.font,
      buttonStyle: ts.buttonStyle,
    });
  };

  const allSlides = sections.flatMap((sec, si) => sec.topics.map((t, ti) => ({ sec, si, t, ti })));
  const currentTopic = sections[selSection]?.topics[selTopic];
  const currentSection = sections[selSection];
  const globalIdx = allSlides.findIndex(s => s.si === selSection && s.ti === selTopic);

  const previewTopic: CourseTopic = {
    id: 'preview', title: title || 'Your Course Title',
    slideType: 'title-text', contentReady: true,
    content: objectives[0] || objective || 'Your course overview will appear here after you enter the course details above.',
  };

  // Actions
  const selectSlide = (si: number, ti: number) => {
    setSelSection(si);
    setSelTopic(ti);
    const t = sections[si]?.topics[ti];
    if (t) {
      setEditingTitle(t.title);
      setEditingContent(
        (t.slideType === 'title-bullets' || t.slideType === 'summary')
          ? (t.bullets?.join('\n') || '')
          : (t.content || '')
      );
    }
  };

  const goToSlide = (idx: number) => {
    const s = allSlides[Math.max(0, Math.min(idx, allSlides.length - 1))];
    if (s) selectSlide(s.si, s.ti);
  };

  const generateObjective = () => {
    if (!title.trim()) { toast.error('Enter a course title first'); return; }
    setGeneratingObj(true);
    setTimeout(() => {
      setObjectives([
        `Understand the core principles and foundations of ${title}.`,
        `Apply practical techniques related to ${title} in real-world scenarios.`,
        `Evaluate and improve their approach to ${title} through reflection and practice.`,
      ]);
      setGeneratingObj(false);
    }, 1200);
  };

  const generateCourse = async () => {
    if (!title.trim()) { toast.error('Please enter a course title'); return; }
    if (generationLock.current) return;
    generationLock.current = true;
    setGenerating(true);
    try {
      await new Promise(r => setTimeout(r, 1600));
      const ids = cfg.slideIds;
      const pick = (preferred: string, fallback: string) => ids.includes(preferred) ? preferred : fallback;

      const rawSections: Section[] = [
        {
          id: 's1', title: `Introduction to ${title}`,
          description: 'Overview and learning objectives', expanded: true,
          topics: [
            { id: 's1-1', title: 'Course Overview',     slideType: 'title-text' },
            { id: 's1-2', title: 'Learning Objectives', slideType: 'title-bullets' },
            ...(ids.includes('spokesperson') ? [{ id: 's1-3', title: 'Meet the Instructor', slideType: 'spokesperson' }] : []),
          ],
        },
        {
          id: 's2', title: 'Core Concepts',
          description: 'Fundamentals and key principles', expanded: true,
          topics: [
            { id: 's2-1', title: 'Fundamentals',    slideType: 'title-text' },
            { id: 's2-2', title: 'Key Principles',  slideType: 'title-bullets' },
            { id: 's2-3', title: 'Visual Overview', slideType: pick('video', 'image-visual') },
          ],
        },
        {
          id: 's3', title: 'Practice and Application',
          description: 'Apply what you have learned', expanded: true,
          topics: [
            { id: 's3-1', title: 'Real-World Examples', slideType: pick('scenario', 'image-visual') },
            { id: 's3-2', title: 'Best Practices',      slideType: 'title-bullets' },
            ...(ids.includes('audio') ? [{ id: 's3-3', title: 'Audio Narration', slideType: 'audio' }] : []),
          ],
        },
        {
          id: 's4', title: 'Summary and Assessment',
          description: 'Review and final assessment', expanded: true,
          topics: [
            { id: 's4-1', title: 'Key Takeaways', slideType: pick('summary', 'title-bullets') },
          ],
        },
      ];

      // Add knowledge check and/or quiz into the Summary and Assessment section (s4)
      const processedSections = rawSections.map(sec => {
        if (sec.id !== 's4') return sec;
        const extra: typeof sec.topics = [];
        if (knowledgeCheck && ids.includes('knowledge-check')) {
          extra.push({ id: 's4-kc', title: 'Knowledge Check', slideType: 'knowledge-check' });
        }
        if (addQuiz && ids.includes('quiz')) {
          extra.push({ id: 's4-quiz', title: 'Final Assessment', slideType: 'quiz' });
        }
        return { ...sec, topics: [...sec.topics, ...extra] };
      });

      const generated = processedSections.map(sec => ({
        ...sec,
        topics: sec.topics.map(t => {
          const qCount = t.slideType === 'quiz' ? addQuizQuestions
            : t.slideType === 'knowledge-check' ? knowledgeCheckQuestions
            : 1;
          return generateSlideContent(t as CourseTopic, title, qCount);
        }),
      }));

      setSections(generated);
      setSelSection(0);
      setSelTopic(0);
      const first = generated[0]?.topics[0];
      if (first) { setEditingTitle(first.title); setEditingContent(first.content || ''); }
      setStep(2);
      const total = generated.reduce((n, s) => n + s.topics.length, 0);
      toast.success('Course generated!', { description: `${total} slides ready - review and edit each one.` });
    } catch {
      toast.error('Generation failed. Please try again.');
    } finally {
      setGenerating(false);
      generationLock.current = false;
    }
  };

  const updateSlideType = (newType: string) => {
    setSections(prev => prev.map((sec, si) => si !== selSection ? sec : {
      ...sec,
      topics: sec.topics.map((t, ti) => ti !== selTopic ? t
        : generateSlideContent({ ...t, slideType: newType, contentReady: false } as CourseTopic, title)),
    }));
    const t = sections[selSection]?.topics[selTopic];
    if (t) {
      const updated = generateSlideContent({ ...t, slideType: newType, contentReady: false } as CourseTopic, title);
      setEditingTitle(updated.title);
      setEditingContent((newType === 'title-bullets' || newType === 'summary') ? (updated.bullets?.join('\n') || '') : (updated.content || ''));
    }
  };

  const saveSlideEdits = () => {
    setSections(prev => prev.map((sec, si) => si !== selSection ? sec : {
      ...sec,
      topics: sec.topics.map((t, ti) => {
        if (ti !== selTopic) return t;
        const updated = { ...t, title: editingTitle };
        if (t.slideType === 'title-bullets' || t.slideType === 'summary') {
          (updated as Topic).bullets = editingContent.split('\n').filter(Boolean);
        } else {
          (updated as Topic).content = editingContent;
        }
        return updated;
      }),
    }));
  };

  const handleTopicUpdate = (updates: Partial<CSSection['topics'][number]>) => {
    setSections(prev => prev.map((sec, si) => si !== selSection ? sec : {
      ...sec,
      topics: sec.topics.map((t, ti) => ti !== selTopic ? t : { ...t, ...updates }),
    }));
  };

  const enhanceWithAI = () => {
    if (!currentTopic) return;
    setEnhancing(true);
    setTimeout(() => {
      const enhanced = generateSlideContent(
        { ...currentTopic, contentReady: false } as CourseTopic, title,
      );
      setSections(prev => prev.map((sec, si) => si !== selSection ? sec : {
        ...sec,
        topics: sec.topics.map((t, ti) => ti !== selTopic ? t : { ...t, ...enhanced }),
      }));
      setEnhancing(false);
      toast.success('Content enhanced with AI');
    }, 1400);
  };

  const regenerateSlide = () => {
    if (!currentTopic) return;
    setEnhancing(true);
    setTimeout(() => {
      const regenerated = generateSlideContent(
        { ...currentTopic, contentReady: false } as CourseTopic, title,
      );
      setSections(prev => prev.map((sec, si) => si !== selSection ? sec : {
        ...sec,
        topics: sec.topics.map((t, ti) => ti !== selTopic ? t : { ...t, ...regenerated }),
      }));
      setEnhancing(false);
      toast.success('Slide regenerated');
    }, 1200);
  };

  const addSlide = (slideTypeId?: string) => {
    const newTopic: Topic = generateSlideContent(
      { id: uid(), title: 'New Slide', slideType: slideTypeId || cfg.slideIds[0] }, title,
    );
    setSections(prev => {
      const next = prev.map((sec, si) => {
        if (si !== selSection) return sec;
        const topics = [...sec.topics];
        topics.splice(selTopic + 1, 0, newTopic);
        return { ...sec, topics };
      });
      return next;
    });
    setSelTopic(selTopic + 1);
    setEditingTitle(newTopic.title);
    setEditingContent(newTopic.content || '');
  };

  const deleteSlide = () => {
    if (allSlides.length <= 1) { toast.error('A course must have at least one slide'); return; }
    setSections(prev => {
      const next = prev.map((sec, si) => si !== selSection ? sec : {
        ...sec, topics: sec.topics.filter((_, ti) => ti !== selTopic),
      }).filter(sec => sec.topics.length > 0);
      const newAll = next.flatMap((sec, si) => sec.topics.map((_, ti) => ({ si, ti })));
      const newIdx = Math.max(0, globalIdx - 1);
      const pick = newAll[newIdx] || newAll[0];
      if (pick) { setSelSection(pick.si); setSelTopic(pick.ti); }
      return next;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ================================================================
  // STEP 1 — Course Details (2-column with live preview)
  // ================================================================
  if (step === 1) {
    const canGenerate = title.trim().length > 0;
    const P = '#1565F0';
    const PH = '#1A63E8';
    const PL = '#EBF3FF';

    const fieldStyle: React.CSSProperties = {
      width: '100%', border: '1px solid #D1D5DB', borderRadius: 8,
      padding: '9px 12px', fontSize: 13, outline: 'none',
      boxSizing: 'border-box', fontFamily: 'inherit',
    };
    const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = P;
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)';
    };
    const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = '#D1D5DB';
      e.currentTarget.style.boxShadow = 'none';
    };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F9FAFB', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>

        {/* Scrollable content — fills all space above the bottom action bar */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>

        {/* 24px gap below the fixed app header */}
        <div aria-hidden="true" style={{ height: 24 }} />

        {/* ---- Centered content area ---- */}
        <div style={{ width: 'min(1120px, calc(100% - 64px))', margin: '0 auto', paddingBottom: 32 }}>

          {/* Page heading */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer', color: '#6B7280', flexShrink: 0, transition: 'all 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.color = P; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
              >
                <ArrowLeft size={15} />
              </button>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>Create Course</h1>
              <span style={{ fontSize: 13, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: '#EBF3FF', color: P, border: `1px solid #93C5FD`, whiteSpace: 'nowrap' as const }}>
                Step 1 of 2 · Course Details
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', paddingLeft: 40 }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Home</span>
              <span>/</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>My Courses</span>
              <span>/</span>
              <span style={{ color: '#374151', fontWeight: 500 }}>Create Course</span>
            </div>
          </div>

          {/* ---- 2-column body (28px below breadcrumb) ---- */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 760px) 320px', gap: 24, alignItems: 'start', paddingTop: 28 }}>

          {/* ==== LEFT: Form ==== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Card: Course Information */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>Course Information</h2>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  Course Title <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  style={fieldStyle}
                  placeholder="e.g. Introduction to Machine Learning"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onFocus={focusField} onBlur={blurField}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Course Description</label>
                <textarea
                  rows={3}
                  style={{ ...fieldStyle, resize: 'vertical' as const, lineHeight: 1.6 }}
                  placeholder="Describe what this course is about and what learners will gain..."
                  value={objective}
                  onChange={e => setObjective(e.target.value)}
                  onFocus={focusField} onBlur={blurField}
                />
              </div>
            </div>

            {/* Card: Course Complexity */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Course Complexity</h2>
                <span style={{ fontSize: 13, color: '#6B7280' }}>Sets available slide types</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {(['basic', 'intermediate', 'advanced'] as Complexity[]).map(c => {
                  const cc = COMPLEXITY_CONFIG[c];
                  const active = complexity === c;
                  const dotColor = c === 'basic' ? '#10B981' : c === 'intermediate' ? '#3B82F6' : '#8B5CF6';
                  return (
                    <button
                      key={c} type="button" onClick={() => setComplexity(c)}
                      style={{ borderRadius: 10, border: `2px solid ${active ? P : '#E5E7EB'}`, background: active ? PL : '#fff', padding: '12px 14px', textAlign: 'left', cursor: 'pointer', outline: 'none', transition: 'all 0.15s' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{cc.label}</span>
                        {active && <Check size={12} style={{ marginLeft: 'auto', color: P }} />}
                      </div>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{cc.tagline}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card: Duration & Language */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>Duration &amp; Language</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Duration</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="number" min="1" placeholder="30"
                      value={duration} onChange={e => setDuration(e.target.value)}
                      style={{ flex: 1, border: '1px solid #D1D5DB', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                      onFocus={e => { e.currentTarget.style.borderColor = P; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                    />
                    <select
                      value={durationUnit} onChange={e => setDurationUnit(e.target.value as 'hours' | 'minutes')}
                      style={{ border: '1px solid #D1D5DB', borderRadius: 8, padding: '9px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}
                    >
                      <option value="minutes">min</option>
                      <option value="hours">hrs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Language</label>
                  <select
                    value={language} onChange={e => setLanguage(e.target.value)}
                    style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}
                  >
                    {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Card: Target Audience */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>
                Target Audience
              </h2>
              <input
                style={fieldStyle}
                placeholder="e.g. Marketing professionals, entry-level managers"
                value={audience}
                onChange={e => setAudience(e.target.value)}
                onFocus={focusField} onBlur={blurField}
              />
            </div>

            {/* Card: Learning Objectives */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
                    Learning Objectives
                  </h2>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '3px 0 0' }}>What learners will be able to do after this course</p>
                </div>
                <button
                  type="button" onClick={generateObjective} disabled={generatingObj}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, color: P, background: PL, border: 'none', borderRadius: 7, padding: '6px 12px', cursor: 'pointer', opacity: generatingObj ? 0.6 : 1, whiteSpace: 'nowrap' as const, flexShrink: 0, transition: 'background 0.12s' }}
                  onMouseEnter={e => { if (!generatingObj) (e.currentTarget as HTMLElement).style.background = '#E0E7FF'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PL; }}
                >
                  <Sparkles size={12} /> {generatingObj ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {objectives.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: PL, color: P, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <input
                      value={obj}
                      onChange={e => { const n = [...objectives]; n[i] = e.target.value; setObjectives(n); }}
                      placeholder={`Learning objective ${i + 1}`}
                      style={{ flex: 1, border: '1px solid #D1D5DB', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                      onFocus={e => { e.currentTarget.style.borderColor = P; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                    {objectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setObjectives(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ width: 30, height: 30, border: 'none', background: 'none', cursor: 'pointer', color: '#D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, flexShrink: 0, transition: 'all 0.12s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#DC2626'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                      ><X size={14} /></button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setObjectives(prev => [...prev, ''])}
                style={{ marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: P, background: 'none', border: '1px dashed #93C5FD', borderRadius: 8, padding: '9px 0', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = PL; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <Plus size={13} /> Add objective
              </button>
            </div>

            {/* Card: Assessment Settings */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '16px 24px' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>Assessment Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#111827', flex: 1 }}>Add Quiz</span>
                  {addQuiz && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>Questions</span>
                      <input type="number" min="1" max="50" value={addQuizQuestions}
                        onChange={e => setAddQuizQuestions(Math.max(1, Math.min(50, Number(e.target.value))))}
                        style={{ width: 52, border: '1px solid #D1D5DB', borderRadius: 6, padding: '4px 8px', fontSize: 13, outline: 'none', fontFamily: 'inherit', textAlign: 'center' }}
                        onFocus={e => { e.currentTarget.style.borderColor = P; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }} />
                    </div>
                  )}
                  <ToggleSwitch enabled={addQuiz} onChange={setAddQuiz} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#111827', flex: 1 }}>Knowledge Check per Topic</span>
                  {knowledgeCheck && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>Questions</span>
                      <input type="number" min="1" max="20" value={knowledgeCheckQuestions}
                        onChange={e => setKnowledgeCheckQuestions(Math.max(1, Math.min(20, Number(e.target.value))))}
                        style={{ width: 52, border: '1px solid #D1D5DB', borderRadius: 6, padding: '4px 8px', fontSize: 13, outline: 'none', fontFamily: 'inherit', textAlign: 'center' }}
                        onFocus={e => { e.currentTarget.style.borderColor = P; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }} />
                    </div>
                  )}
                  <ToggleSwitch enabled={knowledgeCheck} onChange={setKnowledgeCheck} />
                </div>
              </div>
            </div>

            {/* ── Card: Template Selection — accordion ── */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setTemplateOpen(v => !v)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={14} style={{ color: '#6B7280' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Template Selection</p>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>
                      {aiTemplate ? 'AI will choose template' : templateType === 'blank' ? 'Blank template' : templateType === 'custom' ? 'Custom template' : selectedPredefined ? (COURSE_DESIGNS.find(d => d.id === selectedPredefined)?.name ?? 'Predefined') + ' template' : 'Choose a design'}
                    </p>
                  </div>
                </div>
                <ChevronDown size={15} style={{ color: '#6B7280', transform: templateOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              <AnimatePresence initial={false}>
                {templateOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, border: `1px solid ${aiTemplate ? '#93C5FD' : '#E5E7EB'}`, background: aiTemplate ? PL : '#F9FAFB', transition: 'all 0.15s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Sparkles size={15} style={{ color: aiTemplate ? P : '#6B7280', flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>Let AI choose the best template</span>
                        </div>
                        <ToggleSwitch enabled={aiTemplate} onChange={setAiTemplate} />
                      </div>
                      {!aiTemplate && (<>
                        <div style={{ display: 'flex', gap: 3, background: '#F3F4F6', borderRadius: 9, padding: 3 }}>
                          {(['predefined', 'custom', 'blank'] as const).map(t => {
                            const labels = { predefined: 'Predefined Template', custom: 'Custom Template', blank: 'Blank Template' };
                            const active = templateType === t;
                            return <button key={t} onClick={() => setTemplateType(t)} style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: 'none', background: active ? '#fff' : 'transparent', color: active ? '#111827' : '#6B7280', fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer', boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>{labels[t]}</button>;
                          })}
                        </div>
                        {templateType === 'predefined' && (
                          <div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 12px' }}>Choose a Design</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                              {COURSE_DESIGNS.map(d => {
                                const preset = THEME_PRESETS.find(tp => tp.id === d.theme)!;
                                const dk = preset.background === 'dark';
                                const bg = dk ? '#111827' : preset.background === 'warm' ? '#FEF9EE' : '#FFFFFF';
                                const isSelected = selectedPredefined === d.id;
                                return (
                                  <button key={d.id} type="button" onClick={() => { setSelectedPredefined(d.id); setDesignId(d.id); }}
                                    style={{ position: 'relative', borderRadius: 10, border: `2px solid ${isSelected ? P : '#E5E7EB'}`, background: isSelected ? PL : '#fff', padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', outline: 'none', transition: 'all 0.13s' }}>
                                    <span style={{ width: '100%', height: 44, borderRadius: 6, border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '0 8px', background: bg, flexShrink: 0 }}>
                                      <span style={{ height: 6, width: 22, borderRadius: 3, background: preset.primaryColor }} />
                                      <span style={{ height: 3, width: 12, borderRadius: 3, opacity: 0.4, background: dk ? '#fff' : '#64748B' }} />
                                      <span style={{ height: 8, width: 8, borderRadius: 2, background: preset.secondaryColor }} />
                                    </span>
                                    <span style={{ fontSize: 13, fontWeight: 500, color: isSelected ? P : '#374151', textAlign: 'center', lineHeight: 1.2 }}>{d.name}</span>
                                    {isSelected && <Check size={11} color={P} style={{ position: 'absolute', top: 5, right: 6 }} />}
                                  </button>
                                );
                              })}
                            </div>
                            {selectedPredefined && (
                              <div style={{ marginTop: 14, padding: '10px 14px', background: PL, borderRadius: 8, border: `1px solid #93C5FD`, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Check size={14} color={P} />
                                <span style={{ fontSize: 13, color: P, fontWeight: 500 }}>{COURSE_DESIGNS.find(d => d.id === selectedPredefined)?.name} template selected</span>
                              </div>
                            )}
                          </div>
                        )}
                        {templateType === 'custom' && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Organization Logo</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: `2px dashed ${customLogoPreview ? P : '#D1D5DB'}`, borderRadius: 8, cursor: 'pointer', background: customLogoPreview ? PL : '#FAFAFA', transition: 'all 0.13s' }}
                                  onMouseEnter={e => { if (!customLogoPreview) { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.background = PL; } }}
                                  onMouseLeave={e => { if (!customLogoPreview) { (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; (e.currentTarget as HTMLElement).style.background = '#FAFAFA'; } }}>
                                  <input type="file" accept=".png,.jpg,.jpeg,.svg" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f && f.size <= 5 * 1024 * 1024) setCustomLogoPreview(URL.createObjectURL(f)); }} />
                                  {customLogoPreview ? <><img src={customLogoPreview} alt="logo" style={{ height: 28, objectFit: 'contain', maxWidth: 80 }} /><span style={{ fontSize: 13, color: P, fontWeight: 500 }}>Logo uploaded</span><button type="button" onClick={e => { e.preventDefault(); setCustomLogoPreview(''); }} style={{ marginLeft: 'auto', fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button></> : <><Upload size={15} color="#6B7280" /><span style={{ fontSize: 13, color: '#6B7280' }}>Upload logo — PNG, JPG, JPEG, SVG · max 5 MB</span></>}
                                </label>
                              </div>
                              {[{ label: 'Header', enabled: headerEnabled, toggle: () => setHeaderEnabled(v => !v), items: [{ label: 'Organization Logo', value: headerIncludeLogo, set: setHeaderIncludeLogo }, { label: 'Course Name', value: headerIncludeCourseName, set: setHeaderIncludeCourseName }] }, { label: 'Footer', enabled: footerEnabled, toggle: () => setFooterEnabled(v => !v), items: [{ label: 'Organization Name', value: footerIncludeOrgName, set: setFooterIncludeOrgName }, { label: 'Course Name', value: footerIncludeCourseName, set: setFooterIncludeCourseName }, { label: 'Page / Slide Number', value: footerIncludePageNum, set: setFooterIncludePageNum }] }].map(section => (
                                <div key={section.label} style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAFB' }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{section.label}</span>
                                    <button type="button" onClick={section.toggle} style={{ width: 36, height: 20, borderRadius: 10, background: section.enabled ? P : '#D1D5DB', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.15s', flexShrink: 0 }}>
                                      <span style={{ position: 'absolute', top: 2, left: section.enabled ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                                    </button>
                                  </div>
                                  {section.enabled && (
                                    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      {section.items.map(({ label, value, set }) => (
                                        <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                          <input type="checkbox" checked={value} onChange={e => set(e.target.checked)} style={{ width: 15, height: 15, accentColor: P, cursor: 'pointer' }} />
                                          <span style={{ fontSize: 13, color: '#374151' }}>{label}</span>
                                        </label>
                                      ))}
                                      {section.label === 'Footer' && <>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                          <input type="checkbox" checked={footerIncludeCopyright} onChange={e => setFooterIncludeCopyright(e.target.checked)} style={{ width: 15, height: 15, accentColor: P, cursor: 'pointer' }} />
                                          <span style={{ fontSize: 13, color: '#374151' }}>Copyright Information</span>
                                        </label>
                                        {footerIncludeCopyright && <input value={copyrightText} onChange={e => setCopyrightText(e.target.value)} placeholder="e.g. © 2025 Acme Corp." style={{ border: '1px solid #D1D5DB', borderRadius: 6, padding: '7px 10px', fontSize: 13, outline: 'none', fontFamily: 'inherit', marginLeft: 22 }} onFocus={e => { e.currentTarget.style.borderColor = P; }} onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }} />}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                          <input type="checkbox" checked={footerIncludeWatermark} onChange={e => setFooterIncludeWatermark(e.target.checked)} style={{ width: 15, height: 15, accentColor: P, cursor: 'pointer' }} />
                                          <span style={{ fontSize: 13, color: '#374151' }}>Watermark</span>
                                        </label>
                                        {footerIncludeWatermark && <input value={watermarkText} onChange={e => setWatermarkText(e.target.value)} placeholder="e.g. CONFIDENTIAL" style={{ border: '1px solid #D1D5DB', borderRadius: 6, padding: '7px 10px', fontSize: 13, outline: 'none', fontFamily: 'inherit', marginLeft: 22 }} onFocus={e => { e.currentTarget.style.borderColor = P; }} onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }} />}
                                      </>}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div style={{ position: 'sticky', top: 0 }}>
                              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Live Preview</p>
                              <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                                {headerEnabled ? <div style={{ background: '#1F2937', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 36 }}>{headerIncludeLogo && (customLogoPreview ? <img src={customLogoPreview} alt="logo" style={{ height: 18, objectFit: 'contain', maxWidth: 50 }} /> : <div style={{ width: 28, height: 14, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />)}{headerIncludeCourseName && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 600, flex: 1 }}>{title || 'Course Name'}</span>}</div> : <div style={{ background: '#F3F4F6', padding: '8px 12px' }}><span style={{ fontSize: 11, color: '#9CA3AF' }}>Header disabled</span></div>}
                                <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 5, minHeight: 80 }}>
                                  <div style={{ height: 8, borderRadius: 3, background: '#E5E7EB', width: '55%' }} />
                                  <div style={{ height: 5, borderRadius: 3, background: '#F3F4F6', width: '80%' }} />
                                  <div style={{ height: 5, borderRadius: 3, background: '#F3F4F6', width: '65%' }} />
                                  <div style={{ height: 5, borderRadius: 3, background: '#F3F4F6', width: '72%' }} />
                                </div>
                                {footerEnabled ? <div style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 28, flexWrap: 'wrap', gap: 4 }}><div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{footerIncludeOrgName && <span style={{ fontSize: 10, color: '#374151', fontWeight: 600 }}>Org Name</span>}{footerIncludeCourseName && <span style={{ fontSize: 10, color: '#6B7280' }}>{title || 'Course Name'}</span>}{footerIncludeCopyright && copyrightText && <span style={{ fontSize: 10, color: '#6B7280' }}>{copyrightText}</span>}{footerIncludeWatermark && watermarkText && <span style={{ fontSize: 10, color: '#DC2626', opacity: 0.4, fontWeight: 700 }}>{watermarkText}</span>}</div>{footerIncludePageNum && <span style={{ fontSize: 10, color: '#6B7280' }}>1 / 12</span>}</div> : <div style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '6px 12px' }}><span style={{ fontSize: 11, color: '#9CA3AF' }}>Footer disabled</span></div>}
                              </div>
                              <p style={{ margin: '6px 0 0', fontSize: 12, color: '#6B7280' }}>Updates in real time as you configure</p>
                            </div>
                          </div>
                        )}
                        {templateType === 'blank' && (
                          <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                              <FileText size={22} color="#6B7280" />
                            </div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>Start from Scratch</p>
                            <p style={{ fontSize: 13, color: '#6B7280', margin: '0 auto', maxWidth: 380, lineHeight: 1.6 }}>No predefined structure. You'll begin with an empty course and build the sections and topics using AI-assisted generation or manually.</p>
                            <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: PL, border: `1px solid #93C5FD` }}>
                              <Check size={14} color={P} /><span style={{ fontSize: 13, color: P, fontWeight: 500 }}>Blank template selected</span>
                            </div>
                          </div>
                        )}
                      </>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card: Theme & Branding — accordion */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>

              {/* ── Header ── */}
              <button
                type="button"
                onClick={() => setThemeOpen(v => !v)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Palette size={14} style={{ color: '#6B7280' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Theme &amp; Branding</p>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>
                      {aiTheme ? 'AI will choose theme' : (THEME_OPTIONS.find(t => t.id === selectedTheme)?.name ?? 'Gold')}
                    </p>
                  </div>
                </div>
                <ChevronDown size={15} style={{ color: '#6B7280', transform: themeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>

              <AnimatePresence initial={false}>
                {themeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                      {/* ── AI toggle ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, border: `1px solid ${aiTheme ? '#93C5FD' : '#E5E7EB'}`, background: aiTheme ? PL : '#F9FAFB', transition: 'all 0.15s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Sparkles size={15} style={{ color: aiTheme ? P : '#6B7280', flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>Let AI choose the best theme</span>
                        </div>
                        <ToggleSwitch enabled={aiTheme} onChange={setAiTheme} />
                      </div>

                      {/* ── Preset grid (hidden when AI on) ── */}
                      {!aiTheme && (
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 8px' }}>Preset Themes</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7 }}>
                            {THEME_OPTIONS.map(theme => {
                              const isSel = selectedTheme === theme.id;
                              return (
                                <button
                                  key={theme.id} type="button"
                                  onClick={() => {
                                    setSelectedTheme(theme.id);
                                    setCustomPrimary(theme.primary);
                                    setCustomSecondary(theme.accent);
                                    const warmBgs = ['#FFF9E8', '#FFFBF2'];
                                    setCustomBgStyle(warmBgs.includes(theme.background) ? 'warm' : 'light');
                                  }}
                                  style={{ position: 'relative', borderRadius: 9, border: `2px solid ${isSel ? theme.primary : '#E5E7EB'}`, background: '#fff', padding: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', outline: 'none', transition: 'all 0.13s' }}
                                  onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; }}
                                  onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
                                >
                                  <span style={{ width: '100%', height: 32, borderRadius: 6, background: theme.background, border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0 }}>
                                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: theme.primary, border: '1.5px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: theme.accent,  border: '1.5px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                                  </span>
                                  <span style={{ fontSize: 10, fontWeight: isSel ? 700 : 400, color: isSel ? theme.primary : '#374151', textAlign: 'center', lineHeight: 1.2, wordBreak: 'break-word' }}>{theme.name}</span>
                                  {theme.isNew && <span style={{ fontSize: 8, fontWeight: 700, color: '#6B7280', background: '#F3F4F6', borderRadius: 3, padding: '1px 4px' }}>NEW</span>}
                                  {isSel && <Check size={9} color={theme.primary} style={{ position: 'absolute', top: 3, right: 3 }} />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* ── Customise ── */}
                      {!aiTheme && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Customise</p>

                          {([
                            { label: 'Primary color',   value: customPrimary,   set: setCustomPrimary },
                            { label: 'Secondary color', value: customSecondary, set: setCustomSecondary },
                          ] as const).map(row => (
                            <div key={row.label} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                              <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>{row.label}</span>
                              <span style={{ fontSize: 12, color: '#6B7280', marginRight: 8, fontFamily: 'monospace' }}>{row.value.toUpperCase()}</span>
                              <label style={{ width: 24, height: 24, borderRadius: '50%', cursor: 'pointer', position: 'relative', display: 'block', flexShrink: 0 }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: row.value, border: '2px solid rgba(0,0,0,0.12)' }} />
                                <input type="color" value={row.value} onChange={e => row.set(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 'none', padding: 0 }} />
                              </label>
                            </div>
                          ))}

                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8, gap: 10 }}>
                            <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>Font</span>
                            <div style={{ position: 'relative' }}>
                              <select value={customFont} onChange={e => setCustomFont(e.target.value)}
                                style={{ border: '1px solid #E5E7EB', borderRadius: 7, padding: '5px 28px 5px 10px', fontSize: 13, color: '#111827', background: '#fff', appearance: 'none', cursor: 'pointer', outline: 'none' }}>
                                {THEME_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                              </select>
                              <ChevronDown size={13} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }} />
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8, gap: 10 }}>
                            <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>Background</span>
                            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 7, padding: 2, gap: 2 }}>
                              {(['light', 'warm', 'dark'] as const).map(opt => (
                                <button key={opt} type="button" onClick={() => setCustomBgStyle(opt)}
                                  style={{ padding: '4px 10px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: customBgStyle === opt ? 600 : 400, background: customBgStyle === opt ? '#1E293B' : 'transparent', color: customBgStyle === opt ? '#fff' : '#6B7280', transition: 'all 0.13s', textTransform: 'capitalize' }}>
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8, gap: 10 }}>
                            <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>Button Style</span>
                            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 7, padding: 2, gap: 2 }}>
                              {(['rounded', 'pill', 'square'] as const).map(opt => (
                                <button key={opt} type="button" onClick={() => setCustomButtonStyle(opt)}
                                  style={{ padding: '4px 10px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: customButtonStyle === opt ? 600 : 400, background: customButtonStyle === opt ? '#1E293B' : 'transparent', color: customButtonStyle === opt ? '#fff' : '#6B7280', transition: 'all 0.13s', textTransform: 'capitalize' }}>
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                            <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>Font Color</span>
                            <span style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', borderRadius: 4, padding: '2px 7px', marginRight: 8 }}>Auto</span>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: themeFontColor, border: '2px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card: Player Settings */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
              <button
                type="button" onClick={() => setSettingsOpen(!settingsOpen)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Settings size={14} style={{ color: '#6B7280' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Player Settings</p>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Navigation, seek bar, completion &amp; accessibility</p>
                  </div>
                </div>
                <ChevronDown size={15} style={{ color: '#6B7280', transform: settingsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence initial={false}>
                {settingsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>

                      {/* ── Background Music ── */}
                      <div style={{ padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Background Music</p>
                            <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Play ambient audio throughout the course</p>
                          </div>
                          <ToggleSwitch enabled={backgroundMusic} onChange={v => { setBackgroundMusic(v); if (!v) setBackgroundMusicFile(''); }} />
                        </div>
                        {backgroundMusic && (
                          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              {([
                                { val: true,  label: 'AI Generate',  sub: 'AI creates suitable background music' },
                                { val: false, label: 'Upload Audio',  sub: 'Upload your own MP3 / WAV file' },
                              ] as { val: boolean; label: string; sub: string }[]).map(opt => (
                                <button key={String(opt.val)} type="button" onClick={() => setBgMusicAi(opt.val)}
                                  style={{ flex: 1, padding: '10px 12px', borderRadius: 9, border: `1.5px solid ${bgMusicAi === opt.val ? P : '#E5E7EB'}`, background: bgMusicAi === opt.val ? PL : '#F9FAFB', cursor: 'pointer', textAlign: 'left', transition: 'all 0.13s' }}>
                                  <p style={{ fontSize: 13, fontWeight: 600, color: bgMusicAi === opt.val ? P : '#111827', margin: 0 }}>{opt.label}</p>
                                  <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{opt.sub}</p>
                                </button>
                              ))}
                            </div>
                            {bgMusicAi ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: PL, borderRadius: 8, border: '1px solid #93C5FD' }}>
                                <Sparkles size={13} color={P} />
                                <span style={{ fontSize: 13, color: P }}>AI will generate suitable background music based on course content</span>
                              </div>
                            ) : (
                              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: `2px dashed ${backgroundMusicFile ? '#93C5FD' : '#D1D5DB'}`, borderRadius: 10, cursor: 'pointer', background: backgroundMusicFile ? '#EBF3FF' : 'transparent', transition: 'all 0.13s' }}
                                onMouseEnter={e => { if (!backgroundMusicFile) { (e.currentTarget as HTMLElement).style.borderColor = '#1565F0'; (e.currentTarget as HTMLElement).style.background = '#EBF3FF'; } }}
                                onMouseLeave={e => { if (!backgroundMusicFile) { (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}>
                                <div style={{ width: 32, height: 32, borderRadius: 7, background: backgroundMusicFile ? '#E0E7FF' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Volume2 size={14} style={{ color: backgroundMusicFile ? '#1565F0' : '#9CA3AF' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ fontSize: 13, fontWeight: 500, color: '#374151', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {backgroundMusicFile || 'Upload audio file'}
                                  </p>
                                  <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>MP3 or WAV · max 10 MB</p>
                                </div>
                                {backgroundMusicFile && (
                                  <button type="button" onClick={e => { e.preventDefault(); setBackgroundMusicFile(''); }}
                                    style={{ width: 24, height: 24, borderRadius: 5, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <X size={13} style={{ color: '#6B7280' }} />
                                  </button>
                                )}
                                <input type="file" accept="audio/mp3,audio/wav,audio/*" style={{ display: 'none' }}
                                  onChange={e => { const f = e.target.files?.[0]; if (f && f.size <= 10 * 1024 * 1024) setBackgroundMusicFile(f.name); }} />
                              </label>
                            )}
                          </div>
                        )}
                      </div>

                      {/* ── Navigation Mode ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Navigation Mode</p>
                          <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>How learners move through slides</p>
                        </div>
                        <select value={navMode} onChange={e => setNavMode(e.target.value as NavigationMode)}
                          style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                          <option value="free">Free Navigation</option>
                          <option value="linear">Linear</option>
                        </select>
                      </div>

                      {/* ── Seek Bar Control ── */}
                      <div style={{ padding: '14px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Seek Bar Control</p>
                            <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Control seek bar visibility and behaviour</p>
                          </div>
                          <select value={seekBar} onChange={e => setSeekBar(e.target.value as SeekBarControl)}
                            style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                            <option value="enable">Enable Seek Bar</option>
                            <option value="hide">Hide Seek Bar Completely</option>
                          </select>
                        </div>
                        {seekBar === 'enable' && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingLeft: 14 }}>
                            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Seek bar behaviour</p>
                            <select value={seekBarOption} onChange={e => setSeekBarOption(e.target.value as SeekBarOption)}
                              style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                              <option value="drag">Allow user to drag Seek Bar</option>
                              <option value="drag-after-completion">Allow drag after completion</option>
                              <option value="read-only">Seek bar is read only</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* ── Bookmarking ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Bookmarking</p>
                          <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>
                            {bookmarking ? 'Saves last position; learner prompted to resume on relaunch' : 'Course starts from first slide on each launch'}
                          </p>
                        </div>
                        <ToggleSwitch enabled={bookmarking} onChange={setBookmarking} />
                      </div>

                      {/* ── Transition ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Transition</p>
                          <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Animation applied between slides</p>
                        </div>
                        <select value={slideTransition} onChange={e => setSlideTransition(e.target.value)}
                          style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                          <option value="none">None</option>
                          <option value="fade">Fade</option>
                          <option value="push-up">Push Up</option>
                          <option value="push-down">Push Down</option>
                          <option value="push-left">Push Left</option>
                          <option value="push-right">Push Right</option>
                          <option value="wipe-left">Wipe Left</option>
                          <option value="wipe-right">Wipe Right</option>
                          <option value="split">Split</option>
                          <option value="reveal">Reveal</option>
                          <option value="cover-left">Cover Left</option>
                          <option value="cover-right">Cover Right</option>
                        </select>
                      </div>

                      {/* ── Slide Duration ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Slide Duration</p>
                          <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Time before auto-advancing to next slide (0 = manual)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <input type="number" min="0" max="300" value={slideDuration}
                            onChange={e => setSlideDuration(Math.max(0, Math.min(300, Number(e.target.value))))}
                            style={{ width: 64, border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', textAlign: 'center', fontFamily: 'inherit' }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#1565F0'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                          />
                          <span style={{ fontSize: 13, color: '#6B7280' }}>sec</span>
                        </div>
                      </div>

                      {/* ── Transcript ── */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Transcript</p>
                          <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>AI generates an editable transcript available to learners</p>
                        </div>
                        <ToggleSwitch enabled={transcript} onChange={setTranscript} />
                      </div>

                      {/* ── Completion Criteria ── */}
                      <div style={{ padding: '14px 0' }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>Completion Criteria</p>
                        <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 10px' }}>When is the course marked complete? Select all that apply</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {([
                            { value: 'quiz',            label: 'Quiz Percentage Completion' },
                            { value: 'slide-view',      label: 'Slide View Percentage' },
                            { value: 'knowledge-check', label: 'Knowledge Check Completion' },
                          ] as { value: CompletionCriteriaSource; label: string }[]).map(opt => {
                            const checked = completionSrcs.includes(opt.value);
                            return (
                              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 10px', borderRadius: 8, background: checked ? PL : '#F9FAFB', border: `1px solid ${checked ? '#93C5FD' : '#E5E7EB'}`, transition: 'all 0.12s', userSelect: 'none' }}
                                onClick={() => setCompletionSrcs(prev => checked ? prev.filter(v => v !== opt.value) : [...prev, opt.value])}>
                                <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? P : '#D1D5DB'}`, background: checked ? P : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                                  {checked && <Check size={10} style={{ color: '#fff', strokeWidth: 3 }} />}
                                </span>
                                <span style={{ fontSize: 13, color: checked ? P : '#374151', fontWeight: checked ? 500 : 400 }}>{opt.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* ==== RIGHT: Sticky preview ==== */}
          <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Live Preview</p>
              <div style={{ aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <CoursePresentation
                  topic={previewTopic}
                  courseTitle={title || 'Your Course Title'}
                  index={0} total={1}
                  settings={presentationSettings}
                />
              </div>
              <p style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', margin: '8px 0 0' }}>Updates as you fill in the details</p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Slide types included</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {allowedSlideTypes.map(t => (
                  <span key={t.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F3F4F6', borderRadius: 20, padding: '4px 10px', fontSize: 13, color: '#374151' }}>
                    <t.Icon className="w-3 h-3" />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

          </div>
          </div>
        </div>

        </div>{/* end scrollable area */}

        {/* ---- Bottom action bar — pinned to bottom of flex column ---- */}
        <div style={{ flexShrink: 0, background: '#fff', borderTop: '1px solid #E5E7EB', padding: '14px 28px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ padding: '9px 20px', fontSize: 13, fontWeight: 500, color: '#374151', border: '1px solid #E5E7EB', borderRadius: 9, background: '#fff', cursor: 'pointer', transition: 'background 0.12s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
            >
              Cancel
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!canGenerate && (
                <span style={{ fontSize: 13, color: '#6B7280' }}>
                  Add a course title to continue
                </span>
              )}
              <button
                onClick={generateCourse} disabled={generating || !canGenerate}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', fontSize: 13, fontWeight: 600, color: '#fff', background: canGenerate && !generating ? P : '#C4C4C4', borderRadius: 9, border: 'none', cursor: canGenerate && !generating ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (canGenerate && !generating) (e.currentTarget as HTMLElement).style.background = PH; }}
                onMouseLeave={e => { if (canGenerate && !generating) (e.currentTarget as HTMLElement).style.background = P; }}
              >
                {generating ? (
                  <>
                    <svg style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Generating your course...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Generate Course
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // STEP 2 — Editor (Mindsmith-style)
  // ================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F5F4' }}>

      {/* ---- Body: sidebar + right column (toolbar + canvas + panel) ---- */}
      <div className="flex-1 flex overflow-hidden">

        {/* ==== Left sidebar — collapsible (fully hidden when collapsed) ==== */}
        <aside style={{ width: isSidebarCollapsed ? 0 : 300, transition: 'width 200ms ease-in-out', overflow: 'hidden', flexShrink: 0 }}>
          <CourseSidebar
            courseTitle={title}
            sections={sections as unknown as CSSection[]}
            selectedSection={selSection}
            selectedTopic={selTopic}
            complexity={complexity}
            onSelectTopic={(si, ti) => selectSlide(si, ti)}
            onSectionsChange={(updater) => setSections(prev => updater(prev as unknown as CSSection[]) as unknown as Section[])}
            onCollapse={() => setIsSidebarCollapsed(true)}
            onBack={() => setStep(1)}
            backLabel="Back to course details"
            onTopicInserted={() => setRightOpen(true)}
            onOpenCourseSettings={() => setShowCourseSettings(true)}
          />
        </aside>

        {/* ==== Right column ==== */}
        <div className="flex-1 flex overflow-hidden min-w-0">

        {/* Left: toolbar + canvas */}
        <div className="flex-1 flex flex-col overflow-hidden relative">

          {/* Compact floating course header — visible only when sidebar is collapsed */}
          {isSidebarCollapsed && (
            <div
              style={{
                position: 'absolute', top: 4, left: 4, zIndex: 50,
                height: 44,
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                padding: '0 12px',
                fontFamily: 'Nunito Sans, system-ui, sans-serif',
              }}
            >
              {/* Course title */}
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                {title || 'Untitled Course'}
              </span>

              <div style={{ width: 1, height: 20, background: '#E5E7EB', flexShrink: 0 }} />

              {/* Add section button */}
              <div className="cs-tooltip-trigger" style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setSections(prev => [
                    ...prev,
                    { id: `id_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, title: 'New Section', description: '', expanded: true, topics: [] },
                  ])}
                  aria-label="Add section"
                  style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
                >
                  <Plus size={14} color="#2D74FA" />
                </button>
                <span className="cs-tooltip" style={{ position: 'absolute', left: '50%', top: 'calc(100% + 6px)', transform: 'translateX(-50%)', background: '#1F2937', color: '#fff', fontSize: 13, fontWeight: 500, padding: '4px 8px', borderRadius: 5, whiteSpace: 'nowrap', zIndex: 100 }}>
                  Add section
                </span>
              </div>

              <div style={{ width: 1, height: 20, background: '#E5E7EB', flexShrink: 0 }} />

              {/* Expand sidebar button */}
              <div className="cs-tooltip-trigger" style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  aria-label="Expand sidebar"
                  style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <PanelLeftOpen size={18} style={{ color: '#374151' }} />
                </button>
                <span className="cs-tooltip" style={{ position: 'absolute', left: '50%', top: 'calc(100% + 6px)', transform: 'translateX(-50%)', background: '#1F2937', color: '#fff', fontSize: 13, fontWeight: 500, padding: '4px 8px', borderRadius: 5, whiteSpace: 'nowrap', zIndex: 100 }}>
                  Expand sidebar
                </span>
              </div>
            </div>
          )}

          {/* Editor top toolbar */}
          <EditorTopToolbar
            courseTitle={title}
            language={language}
            rightPanelOpen={rightOpen}
            showMoreMenu={showMoreMenu}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleRightPanel={() => setRightOpen(v => !v)}
            onToggleMoreMenu={() => setShowMoreMenu(v => !v)}
            onOpenCourseSettings={() => setShowCourseSettings(true)}
            onPublish={() => setShowPublish(true)}
            onPreview={() => setShowScorm(true)}
            onSaveDraft={() => { toast.success('Draft saved', { description: `"${title}" saved.` }); setShowMoreMenu(false); }}
            onDuplicate={() => { toast.info('Duplicate coming soon'); setShowMoreMenu(false); }}
            onDelete={() => { navigate('/courses'); setShowMoreMenu(false); }}
            onApplyTheme={handleApplyTheme}
          />

          {/* Canvas */}
          <div className="flex-1 flex overflow-hidden">

            {/* ==== Center: slide canvas ==== */}
            <main
              style={{
                flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                padding: `${isSidebarCollapsed ? 56 : 20}px 32px 20px`,
                transition: 'padding-top 200ms ease-in-out',
                background: '#F5F5F4',
              }}
            >
              {currentTopic ? (
                <div
                  key={currentTopic.id}
                  className="slide-canvas-enter"
                  style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
                >
                  {/* Canvas + nav — vertically centered in remaining space */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 0, gap: 20 }}>

                    {/* Slide preview */}
                    <div
                      style={{
                        width: 'min(100%, 1040px)',
                        aspectRatio: '16 / 9',
                        maxHeight: 'calc(100dvh - 210px)',
                        borderRadius: 14,
                        overflow: 'hidden',
                        boxShadow: '0 20px 56px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.06)',
                        flexShrink: 0,
                      }}
                    >
                      <CoursePresentation
                        topic={currentTopic}
                        courseTitle={title}
                        sectionTitle={currentSection?.title}
                        index={globalIdx}
                        total={allSlides.length}
                        settings={presentationSettings}
                      />
                    </div>

                    {/* Slide navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <button
                        onClick={() => goToSlide(globalIdx - 1)} disabled={globalIdx === 0}
                        className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-500 min-w-[4rem] text-center">
                        {globalIdx + 1} / {allSlides.length}
                      </span>
                      <button
                        onClick={() => goToSlide(globalIdx + 1)} disabled={globalIdx === allSlides.length - 1}
                        className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="text-sm text-gray-400">No slides yet.</p>
                </div>
              )}
            </main>
          </div>{/* end canvas row */}
        </div>{/* end left column */}

          {/* ==== Right panel: Topic Settings — full height ==== */}
          <aside style={{
            width: rightOpen ? 320 : 0,
            flexShrink: 0,
            background: '#fff',
            borderLeft: rightOpen ? '1px solid #E5E7EB' : 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'width 200ms ease-in-out',
          }}>
            {/* Inner wrapper keeps content at full 320px during the width animation */}
            <div style={{ width: 320, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              {currentTopic ? (
                <div
                  key={currentTopic.id}
                  className="slide-panel-enter"
                  style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
                >
                  <SlideSettingsPanel
                    topic={currentTopic as unknown as import('../components/CourseSidebar').CSTopic}
                    sectionTitle={currentSection?.title}
                    complexity={complexity}
                    onUpdate={handleTopicUpdate as (u: Partial<import('../components/CourseSidebar').CSTopic>) => void}
                    onClose={() => setRightOpen(false)}
                    onChangeSlideType={() => setChangeTypeOpen(true)}
                    onDelete={deleteSlide}
                    onEnhanceWithAI={enhanceWithAI}
                    enhancing={enhancing}
                    onRegenerateSlide={regenerateSlide}
                  />
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', padding: '0 16px' }}>Select a topic to edit its settings</p>
                </div>
              )}
            </div>
          </aside>
        </div>{/* end right column */}
      </div>


      {/* Change slide type modal */}
      <SlideLibraryModal
        isOpen={changeTypeOpen}
        complexity={complexity}
        onClose={() => setChangeTypeOpen(false)}
        onInsert={(slideType, templateId) => {
          handleTopicUpdate({ slideType, templateId } as Partial<import('../components/CourseSidebar').CSTopic>);
          setChangeTypeOpen(false);
        }}
      />

      {/* Course Settings Drawer */}
      <AnimatePresence>
        {showCourseSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCourseSettings(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.18)', zIndex: 60, backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              initial={{ x: 340 }} animate={{ x: 0 }} exit={{ x: 340 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 340, background: '#fff', zIndex: 61, boxShadow: '-6px 0 32px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
            >
              {/* Drawer header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Settings size={14} style={{ color: '#1565F0' }} />
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Course Settings</h2>
                </div>
                <button onClick={() => setShowCourseSettings(false)} style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
                  <X size={15} />
                </button>
              </div>

              {/* Drawer body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 0 }}>

                {/* ── Language ── */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Language</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Course Language</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Language used for this course</p>
                    </div>
                    <select value={language} onChange={e => setLanguage(e.target.value)}
                      style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ height: 1, background: '#F3F4F6', marginBottom: 24 }} />

                {/* ── Global Settings ── */}
                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>Global Settings</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* Navigation Mode */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Navigation Mode</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>How learners move through slides</p>
                    </div>
                    <select value={navMode} onChange={e => setNavMode(e.target.value as NavigationMode)}
                      style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                      <option value="free">Free navigation</option>
                      <option value="linear">Linear</option>
                    </select>
                  </div>

                  {/* Completion Criteria */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Completion Criteria</p>
                        <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Select all that apply</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', marginTop: 8 }}>
                      {([
                        { value: 'quiz' as CompletionCriteriaSource, label: 'Quiz score' },
                        { value: 'slide-view' as CompletionCriteriaSource, label: 'Slide view %' },
                        { value: 'knowledge-check' as CompletionCriteriaSource, label: 'Knowledge check' },
                        { value: 'final-assessment' as CompletionCriteriaSource, label: 'Final assessment' },
                      ]).map(opt => {
                        const checked = completionSrcs.includes(opt.value);
                        return (
                          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none' }}
                            onClick={() => setCompletionSrcs(prev => checked ? prev.filter(v => v !== opt.value) : [...prev, opt.value])}>
                            <span style={{ width: 15, height: 15, borderRadius: 4, border: `2px solid ${checked ? '#1565F0' : '#D1D5DB'}`, background: checked ? '#1565F0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                              {checked && <Check size={9} style={{ color: '#fff', strokeWidth: 3 }} />}
                            </span>
                            <span style={{ fontSize: 13, color: '#374151' }}>{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Slide Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Slide Duration</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Auto-advance (0 = manual)</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input type="number" min="0" max="300" value={slideDuration}
                        onChange={e => setSlideDuration(Math.max(0, Math.min(300, Number(e.target.value))))}
                        style={{ width: 60, border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', textAlign: 'center', fontFamily: 'inherit' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#1565F0'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                      />
                      <span style={{ fontSize: 13, color: '#6B7280' }}>sec</span>
                    </div>
                  </div>

                  {/* Transition */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Slide Transition</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Animation between slides</p>
                    </div>
                    <select value={slideTransition} onChange={e => setSlideTransition(e.target.value)}
                      style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                      <option value="none">None</option>
                      <option value="fade">Fade</option>
                      <option value="slide">Slide</option>
                      <option value="push">Push</option>
                      <option value="wipe">Wipe</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>

                  {/* Transcript */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Transcript</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Show text transcript alongside slides</p>
                    </div>
                    <ToggleSwitch enabled={transcript} onChange={setTranscript} />
                  </div>

                  {/* Bookmarking */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Bookmarking</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Resume from last viewed slide</p>
                    </div>
                    <ToggleSwitch enabled={bookmarking} onChange={setBookmarking} />
                  </div>

                  {/* Seek Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Seek Bar</p>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Learner can scrub through slide media</p>
                    </div>
                    <select value={seekBar} onChange={e => setSeekBar(e.target.value as SeekBarControl)}
                      style={{ border: '1px solid #D1D5DB', borderRadius: 7, padding: '7px 10px', fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                      <option value="enable">Enabled</option>
                      <option value="hide">Hidden</option>
                    </select>
                  </div>

                  {/* Background Music */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Background Music</p>
                        <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>Play ambient audio throughout the course</p>
                      </div>
                      <ToggleSwitch enabled={backgroundMusic} onChange={v => { setBackgroundMusic(v); if (!v) setBackgroundMusicFile(''); }} />
                    </div>
                    <AnimatePresence initial={false}>
                      {backgroundMusic && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, padding: '10px 12px', border: `2px dashed ${backgroundMusicFile ? '#93C5FD' : '#D1D5DB'}`, borderRadius: 10, cursor: 'pointer', background: backgroundMusicFile ? '#EBF3FF' : 'transparent', transition: 'all 0.13s' }}
                            onMouseEnter={e => { if (!backgroundMusicFile) { (e.currentTarget as HTMLElement).style.borderColor = '#1565F0'; (e.currentTarget as HTMLElement).style.background = '#EBF3FF'; } }}
                            onMouseLeave={e => { if (!backgroundMusicFile) { (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: backgroundMusicFile ? '#E0E7FF' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Volume2 size={13} style={{ color: backgroundMusicFile ? '#1565F0' : '#9CA3AF' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 13, fontWeight: 500, color: '#374151', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{backgroundMusicFile || 'Upload audio file'}</p>
                              <p style={{ fontSize: 13, color: '#6B7280', margin: '1px 0 0' }}>MP3 or WAV, max 10 MB</p>
                            </div>
                            {backgroundMusicFile && (
                              <button type="button" onClick={e => { e.preventDefault(); setBackgroundMusicFile(''); }}
                                style={{ width: 22, height: 22, borderRadius: 5, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <X size={12} style={{ color: '#6B7280' }} />
                              </button>
                            )}
                            <input type="file" accept="audio/mp3,audio/wav,audio/*" style={{ display: 'none' }}
                              onChange={e => { const f = e.target.files?.[0]; if (f) setBackgroundMusicFile(f.name); }} />
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      {showPublish && (
        <PublishModal
          courseTitle={title}
          sections={sections}
          publishLmsDestination={publishDest}
          setPublishLmsDestination={setPublishDest}
          publishLmsDropdownOpen={publishDropOpen}
          setPublishLmsDropdownOpen={setPublishDropOpen}
          publishLmsPushed={publishPushed}
          setPublishLmsPushed={setPublishPushed}
          publishDone={publishDone}
          setPublishDone={setPublishDone}
          onClose={() => { setShowPublish(false); setPublishPushed(false); setPublishDone(false); }}
          onDashboard={() => navigate('/courses')}
          onTranslate={() => navigate('/courses')}
        />
      )}
      {showScorm && (
        <ScormPreviewModal
          courseTitle={title}
          sections={sections}
          presentationSettings={presentationSettings}
          scormPlaying={scormPlaying}
          setScormPlaying={setScormPlaying}
          scormSidePanel={scormPanel}
          setScormSidePanel={setScormPanel}
          scormSlideIdx={scormIdx}
          setScormSlideIdx={setScormIdx}
          scormSelectedAnswer={scormAnswer}
          setScormSelectedAnswer={setScormAnswer}
          scormAnswerChecked={scormChecked}
          setScormAnswerChecked={setScormChecked}
          onClose={() => { setShowScorm(false); setScormPlaying(false); setScormPanel('none'); setScormIdx(0); }}
        />
      )}
    </div>
  );
}
