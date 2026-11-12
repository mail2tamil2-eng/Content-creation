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
  PanelLeftClose, PanelLeftOpen, Monitor,
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
import { SelectInput } from '../components/saas';
import { TemplateGallery } from '../components/templates/TemplateGallery';
import { COURSE_TEMPLATES, DEFAULT_TEMPLATE_ID, getTemplate } from '../components/templates/courseTemplates';

// -- Types --
type Complexity = 'basic' | 'intermediate' | 'advanced';
type NavigationMode = 'free' | 'linear';
type SeekBarControl = 'enable' | 'hide';

interface Topic extends CourseTopic {}
interface Section {
  id: string; title: string; description: string; topics: Topic[]; expanded: boolean;
}

// -- Constants --

// Course designs = the 10 slide templates (see components/templates/courseTemplates.ts)
const COURSE_DESIGNS = COURSE_TEMPLATES.map(t => ({ id: t.id, name: t.name, template: t.id, description: t.description }));

const LANGUAGES   = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Portuguese'];
const THEME_FONTS = ['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Poppins', 'Space Grotesk', 'Playfair Display', 'Merriweather'];

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
  { id: 'simulation',       label: 'Simulation',          description: 'Interactive step-by-step task or process walkthrough',  Icon: Monitor },
];

const COMPLEXITY_CONFIG: Record<Complexity, {
  label: string; tagline: string; color: string; ring: string; badge: string; dot: string; slideIds: string[]; minTopics: number; contentTypes: string;
}> = {
  basic: {
    label: 'Basic', tagline: 'Fundamental concepts with simple explanations',
    color: 'bg-emerald-50 border-emerald-200', ring: 'border-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400',
    minTopics: 3, contentTypes: 'Text & Image',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'knowledge-check', 'quiz'],
  },
  intermediate: {
    label: 'Intermediate', tagline: 'Concepts with additional depth and examples',
    color: 'bg-blue-50 border-blue-200', ring: 'border-blue-500',
    badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400',
    minTopics: 5, contentTypes: 'Text, Media & Interactive',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'video', 'audio', 'spokesperson', 'scenario', 'knowledge-check', 'quiz'],
  },
  advanced: {
    label: 'Advanced', tagline: 'Complex concepts with applications and scenarios',
    color: 'bg-violet-50 border-violet-200', ring: 'border-violet-500',
    badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-400',
    minTopics: 5, contentTypes: 'Text, Media, Interactive & Simulation',
    slideIds: ['title-text', 'title-bullets', 'image-visual', 'video', 'audio', 'spokesperson', 'scenario', 'knowledge-check', 'quiz', 'summary', 'simulation'],
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
  const [designId, setDesignId] = useState(DEFAULT_TEMPLATE_ID);
  const [logoPreview, setLogoPreview] = useState('');

  // Template Selection
  const [templateOpen, setTemplateOpen]   = useState(false);
  const [aiTemplate, setAiTemplate]       = useState(true);
  const [selectedPredefined, setSelectedPredefined] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
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
  const [navMode, setNavMode] = useState<NavigationMode>('free');
  const [bookmarking, setBookmarking] = useState(true);
  const [transcript, setTranscript] = useState(false);
  const [seekBar, setSeekBar] = useState<SeekBarControl>('enable');
  const [slideDuration, setSlideDuration] = useState(5);
  const [slideTransition, setSlideTransition] = useState('none');
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [backgroundMusicFile, setBackgroundMusicFile] = useState('');

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
  const tpl = getTemplate(design.template);
  // The template's own background is used until the user picks a different Background style
  const tplBgStyle = tpl?.mode === 'dark' ? 'dark' : 'light';
  const useTplColours = !!tpl && customBgStyle === tplBgStyle;
  const themeBgColor      = customBgStyle === 'dark' ? '#111827' : customBgStyle === 'warm' ? '#FEF9EE' : '#FFFFFF';
  const autoFontColor     = customBgStyle === 'dark' ? '#FFFFFF' : '#172033';
  const baseSettings: PresentationSettings = aiTemplate
    ? { template: 'vivid-blue', primary: '#134780', accent: '#F48120', background: '#111C2D', foreground: '#FFFFFF', font: 'Inter', buttonStyle: 'rounded', layout: 'single', logo: logoPreview || undefined }
    : selectedPredefined === 'blank'
    ? { template: 'elevate-white', primary: '#111827', accent: '#3B82F6', background: '#FFFFFF', foreground: '#172033', font: customFont, buttonStyle: customButtonStyle, layout: 'single', logo: logoPreview || undefined }
    : { template: design.template, primary: customPrimary, accent: customSecondary,
        background: useTplColours ? tpl!.colors.bg : themeBgColor, foreground: useTplColours ? tpl!.colors.text : autoFontColor,
        font: customFont, headingFont: tpl && customFont === tpl.fonts.body ? tpl.fonts.heading : undefined,
        buttonStyle: customButtonStyle, layout: 'single', logo: logoPreview || undefined };

  /** Apply one of the 10 templates: colours, fonts, background and button style. */
  const applyTemplate = (id: string) => {
    const t = getTemplate(id);
    if (!t) return;
    setDesignId(id);
    setAiTemplate(false);
    setCustomPrimary(t.colors.primary);
    setCustomSecondary(t.colors.accent);
    setCustomFont(t.fonts.body);
    setCustomBgStyle(t.mode === 'dark' ? 'dark' : 'light');
    setCustomButtonStyle(t.buttonStyle);
    setThemeOverride(null);
  };

  const customTemplateOverrides: Partial<PresentationSettings> = {
    showHeader: headerEnabled,
    headerShowLogo: headerIncludeLogo,
    headerShowCourseName: headerIncludeCourseName,
    showFooter: footerEnabled,
    footerShowCourseName: footerIncludeCourseName,
    footerShowPageNum: footerIncludePageNum,
    footerCopyright: footerIncludeCopyright ? copyrightText : undefined,
    footerWatermark: footerIncludeWatermark ? watermarkText : undefined,
  };

  const presentationSettings: PresentationSettings = {
    ...(themeOverride ? { ...baseSettings, ...themeOverride } : baseSettings),
    ...customTemplateOverrides,
  };

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
    content: objective || 'Your course overview will appear here after you enter the course details above.',
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
          description: 'Overview and course objectives', expanded: true,
          topics: [
            { id: 's1-1', title: 'Course Overview',     slideType: 'title-text' },
            { id: 's1-2', title: 'Course Objectives', slideType: 'title-bullets' },
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

        {/* ---- Full-width content area (32px side gutters) ---- */}
        <div style={{ width: 'calc(100% - 64px)', margin: '0 auto', paddingBottom: 32 }}>

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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) clamp(320px, 28vw, 440px)', gap: 24, alignItems: 'start', paddingTop: 28 }}>

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
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Course Objective</label>
                <textarea
                  rows={3}
                  style={{ ...fieldStyle, resize: 'vertical' as const, lineHeight: 1.6 }}
                  placeholder="Describe what this course is about"
                  value={objective}
                  onChange={e => setObjective(e.target.value)}
                  onFocus={focusField} onBlur={blurField}
                />
              </div>
            </div>

            {/* Card: Course Outcome */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
                    Course Outcome
                  </h2>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '3px 0 0' }}>Define the key outcomes learners will achieve by completing this course</p>
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
                      placeholder={`Course outcome ${i + 1}`}
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
                <Plus size={13} /> Add outcome
              </button>
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
                      <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 8px', lineHeight: 1.5 }}>{cc.tagline}</p>
                      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: active ? P : '#6B7280' }}>
                          Min. {cc.minTopics} topics
                        </span>
                        <span style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.4 }}>{cc.contentTypes}</span>
                      </div>
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
                  <label htmlFor="course-duration" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Duration</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      id="course-duration"
                      type="number" min="10" max="60" step="1" placeholder="10"
                      inputMode="numeric" aria-describedby="course-duration-hint"
                      value={duration}
                      onChange={e => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        // Typing can't go above 60; values under 10 are corrected on blur
                        setDuration(raw !== '' && Number(raw) > 60 ? '60' : raw);
                      }}
                      style={{ flex: 1, border: '1px solid #D1D5DB', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                      onFocus={e => { e.currentTarget.style.borderColor = P; }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        if (duration !== '' && Number(duration) < 10) setDuration('10');
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>min</span>
                  </div>
                  <p id="course-duration-hint" style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>10-60 min</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Language</label>
                  <SelectInput
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    options={LANGUAGES}
                  />
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

            {/* Card: Template Selection & Branding */}
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
                    <Palette size={14} style={{ color: '#6B7280' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>Template Selection &amp; Branding</p>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>
                      {aiTemplate ? 'AI will choose design & colours' : selectedPredefined === 'blank' ? 'Blank template' : selectedPredefined ? (COURSE_DESIGNS.find(d => d.id === selectedPredefined)?.name ?? 'Custom') + ' template' : 'Choose a design'}
                    </p>
                  </div>
                </div>
                <ChevronDown size={15} style={{ color: '#6B7280', transform: templateOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              <AnimatePresence initial={false}>
                {templateOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {/* AI toggle */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, border: `1px solid ${aiTemplate ? '#93C5FD' : '#E5E7EB'}`, background: aiTemplate ? PL : '#F9FAFB', transition: 'all 0.15s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Sparkles size={15} style={{ color: aiTemplate ? P : '#6B7280', flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>Let AI choose the best design &amp; colours</span>
                        </div>
                        <ToggleSwitch enabled={aiTemplate} onChange={setAiTemplate} />
                      </div>
                      {/* Design grid — real template thumbnails, hover to preview */}
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px' }}>Choose a Template</p>
                        <p style={{ fontSize: 12, color: '#4B5563', margin: '0 0 12px' }}>Hover a template and select Preview to see every slide layout.</p>
                        <TemplateGallery
                          selectedId={!aiTemplate && selectedPredefined !== 'blank' ? selectedPredefined : null}
                          onSelect={id => { applyTemplate(id); setSelectedPredefined(id); }}
                        >
                          <button
                            type="button"
                            aria-pressed={selectedPredefined === 'blank'}
                            onClick={() => { setSelectedPredefined('blank'); setAiTemplate(false); setCustomBgStyle('light'); }}
                            className={`group flex flex-col rounded-xl border-2 bg-white text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2 ${selectedPredefined === 'blank' ? 'border-[#1565F0] shadow-[0_0_0_3px_#EBF3FF]' : 'border-[#E5E7EB] hover:border-[#6B7280]'}`}
                          >
                            <span className="flex aspect-video w-full flex-col items-center justify-center gap-1 rounded-t-[10px] border-b border-dashed border-[#D1D5DB] bg-[#FAFAFA] text-[#4B5563]">
                              <FileText size={20} aria-hidden="true" />
                              <span className="text-xs">Start from scratch</span>
                            </span>
                            <span className={`px-3 py-2 text-[13px] font-semibold ${selectedPredefined === 'blank' ? 'text-[#1254C7]' : 'text-[#111827]'}`}>Blank</span>
                          </button>
                        </TemplateGallery>
                      </div>
                      {/* Colour & style */}
                      {!aiTemplate && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Colours &amp; Style</p>
                          {([
                            { label: 'Primary colour',   value: customPrimary,   set: setCustomPrimary },
                            { label: 'Secondary colour', value: customSecondary, set: setCustomSecondary },
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
                        </div>
                      )}
                      {/* Logo & Layout */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Logo &amp; Layout</p>
                        <div>
                          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Organization Logo</label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: `2px dashed ${customLogoPreview ? P : '#D1D5DB'}`, borderRadius: 8, cursor: 'pointer', background: customLogoPreview ? PL : '#FAFAFA', transition: 'all 0.13s' }}
                            onMouseEnter={e => { if (!customLogoPreview) { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.background = PL; } }}
                            onMouseLeave={e => { if (!customLogoPreview) { (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; (e.currentTarget as HTMLElement).style.background = '#FAFAFA'; } }}>
                            <input type="file" accept=".png,.jpg,.jpeg,.svg" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f && f.size <= 5 * 1024 * 1024) setCustomLogoPreview(URL.createObjectURL(f)); }} />
                            {customLogoPreview ? <><img src={customLogoPreview} alt="logo" style={{ height: 28, objectFit: 'contain', maxWidth: 80 }} /><span style={{ fontSize: 13, color: P, fontWeight: 500 }}>Logo uploaded</span><button type="button" onClick={e => { e.preventDefault(); setCustomLogoPreview(''); }} style={{ marginLeft: 'auto', fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button></> : <><Upload size={15} color="#6B7280" /><span style={{ fontSize: 13, color: '#6B7280' }}>Upload logo</span></>}
                          </label>
                        </div>
                        {[{ label: 'Header', enabled: headerEnabled, toggle: () => setHeaderEnabled(v => !v), items: [{ label: 'Organization Logo', value: headerIncludeLogo, set: setHeaderIncludeLogo }, { label: 'Course Name', value: headerIncludeCourseName, set: setHeaderIncludeCourseName }] }, { label: 'Footer', enabled: footerEnabled, toggle: () => setFooterEnabled(v => !v), items: [{ label: 'Course Name', value: footerIncludeCourseName, set: setFooterIncludeCourseName }, { label: 'Page / Slide Number', value: footerIncludePageNum, set: setFooterIncludePageNum }] }].map(section => (
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
                                  {footerIncludeCopyright && <input value={copyrightText} onChange={e => setCopyrightText(e.target.value)} placeholder="e.g. 2025 Acme Corp." style={{ border: '1px solid #D1D5DB', borderRadius: 6, padding: '7px 10px', fontSize: 13, outline: 'none', fontFamily: 'inherit', marginLeft: 22 }} onFocus={e => { e.currentTarget.style.borderColor = P; }} onBlur={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }} />}
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---- Action buttons — inside left column, aligns with form cards ---- */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 32 }}>
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
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleRightPanel={() => setRightOpen(v => !v)}
            onOpenCourseSettings={() => setShowCourseSettings(true)}
            onPublish={() => setShowPublish(true)}
            onPreview={() => setShowScorm(true)}
            onSaveDraft={() => { toast.success('Draft saved', { description: `"${title}" saved.` }); }}
            onApplyTheme={handleApplyTheme}
            currentDesignId={designId}
            onApplyTemplate={id => { applyTemplate(id); setSelectedPredefined(id); }}
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

          {/* ==== Right panel: Slide Settings — full height ==== */}
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
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Player Settings</h2>
                </div>
                <button onClick={() => setShowCourseSettings(false)} style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
                  <X size={15} />
                </button>
              </div>

              {/* Drawer body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 0 }}>

                <div style={{ height: 1, background: '#F3F4F6', marginBottom: 24 }} />

                {/* ── Global Settings ── */}
                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>Player Settings</p>
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