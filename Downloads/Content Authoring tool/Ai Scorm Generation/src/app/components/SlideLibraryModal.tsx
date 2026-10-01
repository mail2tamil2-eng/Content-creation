import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Search, Check, Lock, Plus,
  AlignLeft, Image as ImageIcon, Video, Volume2, MousePointer, HelpCircle,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SlideComplexity = 'basic' | 'intermediate' | 'advanced';
type SlideCategoryId = 'text' | 'image' | 'video' | 'audio' | 'interactive' | 'quiz';

export interface SlideTemplate {
  id: string;
  name: string;
  category: SlideCategoryId;
  description: string;
  minComplexity: SlideComplexity;
  slideType: string;
}

export interface SlideLibraryModalProps {
  isOpen: boolean;
  complexity: SlideComplexity;
  onClose: () => void;
  onInsert: (slideType: string, templateId: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const P  = '#1565F0';
const PL = '#EBF3FF';
const BORDER = '#E5E7EB';
const COMPLEXITY_RANK: Record<SlideComplexity, number> = { basic: 0, intermediate: 1, advanced: 2 };

const NAV_CATEGORIES: { id: SlideCategoryId; label: string; icon: React.ReactNode }[] = [
  { id: 'text',        label: 'Text',        icon: <AlignLeft    size={16} /> },
  { id: 'image',       label: 'Image',       icon: <ImageIcon    size={16} /> },
  { id: 'video',       label: 'Video',       icon: <Video        size={16} /> },
  { id: 'audio',       label: 'Audio',       icon: <Volume2      size={16} /> },
  { id: 'interactive', label: 'Interactive', icon: <MousePointer size={16} /> },
  { id: 'quiz',        label: 'Quiz',        icon: <HelpCircle   size={16} /> },
];

export const SLIDE_TEMPLATES: SlideTemplate[] = [
  // TEXT
  { id: 'title-text',         name: 'Title + Text',          category: 'text',        description: 'Present a title with supporting content',                minComplexity: 'basic',        slideType: 'title-text'         },
  { id: 'bulleted-list',      name: 'Bulleted List',          category: 'text',        description: 'Show a list of key points',                              minComplexity: 'basic',        slideType: 'title-bullets'      },
  { id: 'horizontal-series',  name: 'Horizontal Series',      category: 'text',        description: 'Show items in a left-to-right sequence',                 minComplexity: 'basic',        slideType: 'horizontal-series'  },
  { id: 'vertical-series',    name: 'Vertical Series',        category: 'text',        description: 'Show items in a top-to-bottom sequence',                 minComplexity: 'basic',        slideType: 'vertical-series'    },
  { id: 'expandable-list',    name: 'Expandable List',        category: 'text',        description: 'Reveal detailed content on click',                       minComplexity: 'basic',        slideType: 'expandable-list'    },
  { id: 'table',              name: 'Table',                  category: 'text',        description: 'Compare structured information in rows and columns',      minComplexity: 'basic',        slideType: 'table'              },
  // IMAGE
  { id: 'image-horizontal',   name: 'Image – Horizontal',     category: 'image',       description: 'Display images in a horizontal carousel',                minComplexity: 'basic',        slideType: 'image-horizontal'   },
  { id: 'image-vertical',     name: 'Image – Vertical',       category: 'image',       description: 'Stack images with a side-by-side text layout',           minComplexity: 'basic',        slideType: 'image-vertical'     },
  { id: 'media-collection',   name: 'Media Collection',       category: 'image',       description: 'Curated grid of images and media',                       minComplexity: 'intermediate', slideType: 'media-collection'   },
  // VIDEO
  { id: 'video',              name: 'Video',                  category: 'video',       description: 'Full-width video with playback controls',                minComplexity: 'intermediate', slideType: 'video'              },
  { id: 'ai-spokesperson',    name: 'AI Spokesperson',        category: 'video',       description: 'AI-generated video presenter with custom script',         minComplexity: 'intermediate', slideType: 'spokesperson'       },
  // AUDIO
  { id: 'audio',              name: 'Audio',                  category: 'audio',       description: 'Audio narration with optional transcript',               minComplexity: 'intermediate', slideType: 'audio'              },
  // INTERACTIVE
  { id: 'hotspot',            name: 'Hotspot',                category: 'interactive', description: 'Clickable hotspots pinned to an image',                  minComplexity: 'intermediate', slideType: 'hotspot'            },
  { id: 'click-reveal',       name: 'Click-to-Reveal',        category: 'interactive', description: 'Click cards to reveal hidden content',                    minComplexity: 'intermediate', slideType: 'click-reveal'       },
  { id: 'slider',             name: 'Slider',                 category: 'interactive', description: 'Draggable before-and-after image comparison',             minComplexity: 'intermediate', slideType: 'slider'             },
  { id: 'drag-drop',          name: 'Drag & Drop',            category: 'interactive', description: 'Drag items to their correct targets',                    minComplexity: 'intermediate', slideType: 'drag-drop'          },
  { id: 'matching',           name: 'Matching',               category: 'interactive', description: 'Connect related items across two columns',                minComplexity: 'intermediate', slideType: 'matching'           },
  { id: 'sequencing',         name: 'Sequencing',             category: 'interactive', description: 'Arrange items into the correct order',                   minComplexity: 'intermediate', slideType: 'scenario'           },
  { id: 'flash-card',         name: 'Flash Card',             category: 'interactive', description: 'Flip cards for active recall practice',                   minComplexity: 'intermediate', slideType: 'flash-card'         },
  { id: 'branching-scenario', name: 'Branching Scenario',     category: 'interactive', description: 'Decision tree with branching paths and outcomes',         minComplexity: 'advanced',     slideType: 'branching-scenario' },
  { id: 'simulation',         name: 'Simulation',             category: 'interactive', description: 'Interactive step-by-step software simulation',            minComplexity: 'advanced',     slideType: 'simulation'         },
  // QUIZ
  { id: 'kc-mcq',             name: 'KC – Multiple Choice',   category: 'quiz',        description: 'Unscored check with multiple correct answers',            minComplexity: 'basic',        slideType: 'quiz'               },
  { id: 'kc-mcq-single',      name: 'KC – Single Answer',     category: 'quiz',        description: 'Unscored check with one correct answer',                  minComplexity: 'basic',        slideType: 'quiz'               },
  { id: 'kc-tf',              name: 'KC – True / False',      category: 'quiz',        description: 'Unscored true or false knowledge check',                  minComplexity: 'basic',        slideType: 'quiz'               },
  { id: 'quiz-mcq',           name: 'Quiz – Multiple Choice', category: 'quiz',        description: 'Scored quiz with multiple correct answers',               minComplexity: 'basic',        slideType: 'quiz'               },
  { id: 'quiz-mcq-single',    name: 'Quiz – Single Answer',   category: 'quiz',        description: 'Scored quiz with one correct answer',                     minComplexity: 'basic',        slideType: 'quiz'               },
  { id: 'quiz-tf',            name: 'Quiz – True / False',    category: 'quiz',        description: 'Scored true or false quiz question',                      minComplexity: 'basic',        slideType: 'quiz'               },
];

// ── Tiny helpers ───────────────────────────────────────────────────────────────

function Ln({ w = '100%', h = 5, bg = '#E2E8F0', r = 2 }: { w?: string | number; h?: number; bg?: string; r?: number }) {
  return <div style={{ height: h, background: bg, borderRadius: r, width: w, flexShrink: 0 }} />;
}
function Dot({ bg = '#94A3B8', size = 7 }: { bg?: string; size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: bg, flexShrink: 0 }} />;
}

// ── SlidePreview thumbnails ────────────────────────────────────────────────────

function SlidePreview({ id }: { id: string }) {
  const s: React.CSSProperties = { width: '100%', height: '100%', boxSizing: 'border-box', overflow: 'hidden', borderRadius: '8px 8px 0 0' };

  switch (id) {
    case 'title-text':
      return (
        <div style={{ ...s, background: '#EEF2FF', padding: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Ln w="62%" h={14} bg={P} r={3} />
          <Ln w="100%" h={1} bg="#93C5FD" r={0} />
          {[100, 92, 100, 85, 95, 78, 88].map((w, i) => <Ln key={i} w={`${w}%`} h={5} bg="#93C5FD" />)}
        </div>
      );
    case 'bulleted-list':
      return (
        <div style={{ ...s, background: '#F0FDF4', padding: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Ln w="55%" h={14} bg="#16A34A" r={3} />
          <div style={{ height: 8 }} />
          {[75, 88, 68, 82, 70].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Dot bg="#16A34A" size={6} />
              <Ln w={`${w}%`} h={5} bg="#BBF7D0" />
            </div>
          ))}
        </div>
      );
    case 'horizontal-series':
      return (
        <div style={{ ...s, background: '#FFF7ED', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Ln w="55%" h={12} bg="#EA580C" r={3} />
          <div style={{ display: 'flex', gap: 8, flex: 1 }}>
            {['#FED7AA', '#FDBA74', '#FB923C'].map((bg, i) => (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 6, padding: '8px 7px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                <Ln w="80%" h={5} bg="#EA580C" r={2} />
                <Ln w="100%" h={4} bg="#fff" r={2} />
                <Ln w="70%" h={4} bg="#fff" r={2} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'vertical-series':
      return (
        <div style={{ ...s, background: '#FDF4FF', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="50%" h={12} bg="#9333EA" r={3} />
          {[['#E9D5FF', '#7E22CE'], ['#DDD6FE', '#6D28D9'], ['#C4B5FD', '#5B21B6']].map(([bg, ac], i) => (
            <div key={i} style={{ background: bg, borderRadius: 6, padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: ac, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Ln w="75%" h={4} bg={ac} r={2} />
                <Ln w="90%" h={3} bg="#fff" r={2} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'expandable-list':
      return (
        <div style={{ ...s, background: '#F0F9FF', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Ln w="55%" h={12} bg="#0284C7" r={3} />
          <div style={{ height: 4 }} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: i === 2 ? '#BAE6FD' : '#E0F2FE', borderRadius: 5, padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Ln w="65%" h={5} bg={i === 2 ? '#0284C7' : '#7DD3FC'} r={2} />
              <div style={{ width: 8, height: 8, borderTop: '2px solid #0284C7', borderRight: '2px solid #0284C7', transform: i === 2 ? 'rotate(135deg)' : 'rotate(45deg)', marginBottom: i === 2 ? -3 : 3, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div style={{ ...s, background: '#FAFAF9', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="42%" h={12} bg="#78716C" r={3} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ background: i < 3 ? '#D6D3D1' : i % 2 === 0 ? '#F5F5F4' : '#fff', borderRadius: 2, padding: '4px 5px', minHeight: 20 }}>
                <Ln w="80%" h={4} bg={i < 3 ? '#78716C' : '#D6D3D1'} r={1} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'image-horizontal':
      return (
        <div style={{ ...s, background: '#F8FAFC', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="52%" h={11} bg="#475569" r={3} />
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {['#CBD5E1', '#94A3B8', '#CBD5E1'].map((bg, i) => (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={18} color="#64748B" />
              </div>
            ))}
          </div>
          <Ln w="80%" h={4} bg="#CBD5E1" />
        </div>
      );
    case 'image-vertical':
      return (
        <div style={{ ...s, background: '#F8FAFC', padding: '14px 14px 10px', display: 'flex', gap: 8 }}>
          <div style={{ flex: 2, background: '#CBD5E1', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageIcon size={22} color="#64748B" />
          </div>
          <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 2 }}>
            <Ln w="80%" h={11} bg="#475569" r={3} />
            {[100, 90, 80, 95, 70, 85].map((w, i) => <Ln key={i} w={`${w}%`} h={4} bg="#CBD5E1" />)}
          </div>
        </div>
      );
    case 'media-collection':
      return (
        <div style={{ ...s, background: '#F1F5F9', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="55%" h={11} bg="#334155" r={3} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 5 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ background: ['#CBD5E1','#94A3B8','#94A3B8','#CBD5E1'][i], borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={16} color="#475569" />
              </div>
            ))}
          </div>
        </div>
      );
    case 'video':
      return (
        <div style={{ ...s, background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid #fff', marginLeft: 4 }} />
          </div>
          <div style={{ width: 100, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '40%', height: '100%', background: '#38BDF8', borderRadius: 2 }} />
          </div>
        </div>
      );
    case 'audio':
      return (
        <div style={{ ...s, background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
            {[20,35,50,28,45,38,55,32,48,25,42,30].map((h, i) => (
              <div key={i} style={{ width: 5, height: h, background: i < 5 ? '#818CF8' : 'rgba(129,140,248,0.3)', borderRadius: 3 }} />
            ))}
          </div>
          <div style={{ width: 80, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '35%', height: '100%', background: '#818CF8', borderRadius: 2 }} />
          </div>
        </div>
      );
    case 'ai-spokesperson':
      return (
        <div style={{ ...s, background: '#EEF2FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #818CF8' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" fill="#1565F0"/>
              <path d="M3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="#1565F0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '75%', alignItems: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: '4px 10px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <Ln w={80} h={5} bg="#93C5FD" r={2} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dot bg="#1565F0" size={6} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#93C5FD' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#93C5FD' }} />
            </div>
          </div>
        </div>
      );
    case 'hotspot':
      return (
        <div style={{ ...s, background: '#FFF1F2', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="45%" h={11} bg="#EF4444" r={3} />
          <div style={{ flex: 1, background: '#FECDD3', borderRadius: 6, position: 'relative' }}>
            {[{top:'25%',left:'30%'},{top:'55%',left:'65%'},{top:'70%',left:'20%'}].map((pos,i) => (
              <div key={i} style={{ position:'absolute', ...pos, transform:'translate(-50%,-50%)' }}>
                <div style={{ width:18, height:18, borderRadius:'50%', background:'#DC2626', opacity:0.85, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 0 4px rgba(239,68,68,0.2)' }}>
                  <Plus size={10} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'click-reveal':
      return (
        <div style={{ ...s, background: '#FFFBEB', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="55%" h={11} bg="#D97706" r={3} />
          <div style={{ display: 'flex', gap: 7, flex: 1 }}>
            {[{bg:'#FDE68A',flipped:false},{bg:'#F59E0B',flipped:true},{bg:'#FDE68A',flipped:false}].map((c,i) => (
              <div key={i} style={{ flex:1, background:c.bg, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
                {c.flipped ? (
                  <><Ln w="70%" h={4} bg="#fff" r={2} /><Ln w="55%" h={4} bg="rgba(255,255,255,0.6)" r={2} /></>
                ) : (
                  <div style={{ width:20, height:20, borderRadius:'50%', background:'#D97706', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ fontSize:12, color:'#fff', fontWeight:700 }}>?</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    case 'slider':
      return (
        <div style={{ ...s, background: '#F0FDF4', padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Ln w="45%" h={11} bg="#16A34A" r={3} />
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:18 }}>
            <div style={{ position:'relative', height:6, background:'#BBF7D0', borderRadius:3 }}>
              <div style={{ position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'#16A34A', borderRadius:3 }} />
              <div style={{ position:'absolute', left:'55%', top:'50%', transform:'translate(-50%,-50%)', width:16, height:16, borderRadius:'50%', background:'#16A34A', boxShadow:'0 1px 4px rgba(0,0,0,0.15)' }} />
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <div style={{ flex:1, background:'#DCFCE7', borderRadius:5, padding:8, display:'flex', flexDirection:'column', gap:4 }}>
                <Ln w="70%" h={4} bg="#16A34A" r={2} />
                <Ln w="90%" h={3} bg="#BBF7D0" r={2} />
              </div>
              <div style={{ width:2, background:'#BBF7D0', borderRadius:1 }} />
              <div style={{ flex:1, background:'#DCFCE7', borderRadius:5, padding:8, display:'flex', flexDirection:'column', gap:4 }}>
                <Ln w="70%" h={4} bg="#16A34A" r={2} />
                <Ln w="90%" h={3} bg="#BBF7D0" r={2} />
              </div>
            </div>
          </div>
        </div>
      );
    case 'drag-drop':
      return (
        <div style={{ ...s, background: '#EFF6FF', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="50%" h={11} bg="#2563EB" r={3} />
          <div style={{ display:'flex', gap:8, flex:1 }}>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
              {['#BFDBFE','#93C5FD','#BFDBFE'].map((bg,i) => (
                <div key={i} style={{ background:bg, borderRadius:5, padding:'5px 8px', display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                    <Ln w={10} h={2} bg="#2563EB" />
                    <Ln w={10} h={2} bg="#2563EB" />
                  </div>
                  <Ln w="65%" h={4} bg="#2563EB" r={2} />
                </div>
              ))}
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
              {[['#DBEAFE','#93C5FD'],['#BFDBFE','transparent'],['#DBEAFE','transparent']].map(([bg,border],i) => (
                <div key={i} style={{ background:bg, border:`2px dashed ${border||'#93C5FD'}`, borderRadius:5, padding:'5px 8px', minHeight:28, display:'flex', alignItems:'center' }}>
                  {i === 0 && <Ln w="60%" h={4} bg="#2563EB" r={2} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'matching':
      return (
        <div style={{ ...s, background: '#FDF4FF', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="48%" h={11} bg="#9333EA" r={3} />
          <div style={{ flex:1, display:'flex', gap:4 }}>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
              {['#E9D5FF','#DDD6FE','#E9D5FF'].map((bg,i) => (
                <div key={i} style={{ background:bg, borderRadius:4, padding:'5px 7px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <Ln w="65%" h={4} bg="#9333EA" r={2} />
                  <Dot bg="#9333EA" size={7} />
                </div>
              ))}
            </div>
            <svg width="20" height="100%" viewBox="0 0 20 90" style={{ flexShrink:0 }}>
              <line x1="2" y1="15" x2="18" y2="75" stroke="#C084FC" strokeWidth="1.5" />
              <line x1="2" y1="45" x2="18" y2="15" stroke="#C084FC" strokeWidth="1.5" />
              <line x1="2" y1="75" x2="18" y2="45" stroke="#C084FC" strokeWidth="1.5" />
            </svg>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
              {['#E9D5FF','#DDD6FE','#E9D5FF'].map((bg,i) => (
                <div key={i} style={{ background:bg, borderRadius:4, padding:'5px 7px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <Dot bg="#9333EA" size={7} />
                  <Ln w="65%" h={4} bg="#9333EA" r={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'sequencing':
      return (
        <div style={{ ...s, background: '#FEFCE8', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Ln w="50%" h={11} bg="#CA8A04" r={3} />
          <div style={{ height: 5 }} />
          {[1,2,3,4].map(n => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:8, background:'#FEF9C3', borderRadius:5, padding:'5px 8px' }}>
              <div style={{ width:18, height:18, borderRadius:'50%', background:'#CA8A04', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:9, fontWeight:700, color:'#fff' }}>{n}</span>
              </div>
              <Ln w="65%" h={4} bg="#A16207" r={2} />
              <div style={{ marginLeft:'auto', display:'flex', flexDirection:'column', gap:2 }}>
                <Ln w={10} h={2} bg="#CA8A04" r={1} />
                <Ln w={10} h={2} bg="#CA8A04" r={1} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'flash-card':
      return (
        <div style={{ ...s, background: '#F0FDFA', padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="50%" h={11} bg="#0D9488" r={3} />
          <div style={{ flex:1, display:'flex', gap:8, alignItems:'stretch' }}>
            <div style={{ flex:1, background:'#0D9488', borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:10 }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#fff' }}>Q</div>
              <Ln w="75%" h={4} bg="rgba(255,255,255,0.4)" r={2} />
            </div>
            <div style={{ flex:1, background:'#CCFBF1', borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:10, transform:'perspective(200px) rotateY(-8deg)' }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#0D9488' }}>A</div>
              <Ln w="75%" h={4} bg="#5EEAD4" r={2} />
            </div>
          </div>
        </div>
      );
    case 'branching-scenario':
      return (
        <div style={{ ...s, background: '#F5F3FF', padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Ln w="55%" h={11} bg="#6D28D9" r={3} />
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0 }}>
            <div style={{ background:'#6D28D9', borderRadius:5, padding:'4px 14px' }}>
              <Ln w={50} h={4} bg="#fff" r={2} />
            </div>
            <div style={{ display:'flex', gap:24, position:'relative', marginTop:0 }}>
              <svg width="80" height="20" viewBox="0 0 80 20" style={{ position:'absolute', top:0 }}>
                <path d="M40 0 L15 20" stroke="#A78BFA" strokeWidth="1.5" fill="none" />
                <path d="M40 0 L65 20" stroke="#A78BFA" strokeWidth="1.5" fill="none" />
              </svg>
              <div style={{ marginTop:20, display:'flex', gap:6 }}>
                {['#EDE9FE','#DDD6FE'].map((bg,i) => (
                  <div key={i} style={{ background:bg, borderRadius:4, padding:'4px 8px' }}>
                    <Ln w={28} h={4} bg="#6D28D9" r={1} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', gap:4, marginTop:6 }}>
              {['#F5F3FF','#EDE9FE','#F5F3FF','#EDE9FE'].map((bg,i) => (
                <div key={i} style={{ background:bg, borderRadius:3, padding:'3px 6px' }}>
                  <Ln w={18} h={3} bg="#7C3AED" r={1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'simulation':
      return (
        <div style={{ ...s, background: '#0F172A', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background:'#1E293B', borderRadius:6, flex:1, padding:10, display:'flex', flexDirection:'column', gap:6 }}>
            <div style={{ display:'flex', gap:5, alignItems:'center' }}>
              {['#DC2626','#F59E0B','#22C55E'].map((c,i) => <Dot key={i} bg={c} size={7} />)}
              <Ln w="55%" h={6} bg="#334155" r={3} />
            </div>
            <div style={{ flex:1, display:'flex', gap:6 }}>
              <div style={{ width:36, background:'#0F172A', borderRadius:4, padding:'5px 4px', display:'flex', flexDirection:'column', gap:3 }}>
                {[70,80,65,80].map((w,i) => <Ln key={i} w={`${w}%`} h={4} bg="#334155" r={2} />)}
              </div>
              <div style={{ flex:1, background:'#0F172A', borderRadius:4, padding:6, display:'flex', flexDirection:'column', gap:3 }}>
                {[100,85,100,75,90].map((w,i) => <Ln key={i} w={`${w}%`} h={4} bg="#1E3A5F" r={2} />)}
              </div>
            </div>
            <div style={{ height:6, background:'#1E293B', borderRadius:2, position:'relative' }}>
              <div style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', display:'flex', gap:4 }}>
                {[1,2].map(i => <div key={i} style={{ width:16, height:4, background:'#38BDF8', borderRadius:2 }} />)}
              </div>
            </div>
          </div>
        </div>
      );
    case 'kc-mcq':
    case 'kc-mcq-single':
    case 'kc-tf':
      return (
        <div style={{ ...s, background: '#FFF7ED', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:20, height:20, borderRadius:'50%', background:'#F97316', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontSize:10, fontWeight:700, color:'#fff' }}>?</span>
            </div>
            <Ln w="65%" h={10} bg="#EA580C" r={3} />
          </div>
          <Ln w="90%" h={4} bg="#FED7AA" />
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:2 }}>
            {(id === 'kc-tf' ? ['True','False'] : ['A','B','C','D']).map((opt,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:6, background: i===0 ? '#FFEDD5' : '#FFF7ED', borderRadius:4, padding:'4px 7px', border:`1px solid ${i===0 ? '#F97316' : '#FED7AA'}` }}>
                <div style={{ width:10, height:10, borderRadius: id==='kc-mcq-single'||id==='kc-tf' ? '50%' : 2, border:`2px solid ${i===0 ? '#F97316' : '#FED7AA'}`, flexShrink:0, background: i===0 ? '#F97316' : 'transparent' }} />
                <Ln w="55%" h={4} bg="#F97316" r={2} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'quiz-mcq':
    case 'quiz-mcq-single':
    case 'quiz-tf':
      return (
        <div style={{ ...s, background: '#FEF2F2', padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:18, height:18, borderRadius:'50%', background:'#DC2626', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:9, fontWeight:700, color:'#fff' }}>Q</span>
              </div>
              <Ln w={70} h={9} bg="#DC2626" r={3} />
            </div>
            <div style={{ background:'#DC2626', borderRadius:4, padding:'2px 6px' }}>
              <span style={{ fontSize:9, fontWeight:600, color:'#fff' }}>10 pts</span>
            </div>
          </div>
          <Ln w="85%" h={4} bg="#FCA5A5" />
          <div style={{ display:'flex', flexDirection:'column', gap:4, marginTop:2 }}>
            {(id === 'quiz-tf' ? ['True','False'] : ['A','B','C','D']).map((opt,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5, background: i===1 ? '#FEE2E2' : '#fff', borderRadius:4, padding:'3px 6px', border:`1px solid ${i===1 ? '#FCA5A5' : '#FEE2E2'}` }}>
                <div style={{ width:9, height:9, borderRadius: id==='quiz-mcq-single'||id==='quiz-tf' ? '50%' : 2, border:`1.5px solid ${i===1 ? '#DC2626' : '#FCA5A5'}`, flexShrink:0, background: i===1 ? '#DC2626' : 'transparent' }} />
                <Ln w="50%" h={3} bg="#F87171" r={2} />
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div style={{ ...s, background:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center' }}><Ln w="50%" h={8} bg="#D1D5DB" /></div>;
  }
}

// ── Template card ─────────────────────────────────────────────────────────────

function SlideTemplateCard({
  template, isFlashing, isAvailable, onClick,
}: {
  template: SlideTemplate;
  isFlashing: boolean;
  isAvailable: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      role="button"
      tabIndex={isAvailable ? 0 : -1}
      onClick={isAvailable && !isFlashing ? onClick : undefined}
      onKeyDown={e => { if (isAvailable && !isFlashing && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 10,
        border: `2px solid ${isFlashing ? P : hov && isAvailable ? '#93C5FD' : BORDER}`,
        background: '#fff',
        cursor: isAvailable && !isFlashing ? 'pointer' : 'default',
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.1s, box-shadow 0.1s',
        boxShadow: isFlashing
          ? '0 0 0 4px rgba(79,70,229,0.18)'
          : hov && isAvailable
            ? '0 4px 14px rgba(79,70,229,0.1)'
            : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 138, overflow: 'hidden', position: 'relative' }}>
        <SlidePreview id={template.id} />

        {/* Lock overlay */}
        {!isAvailable && (
          <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.82)', backdropFilter:'blur(1px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:5 }}>
            <Lock size={18} color="#6B7280" />
            <span style={{ fontSize:10, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.06em' }}>
              {template.minComplexity}
            </span>
          </div>
        )}

        {/* Flash check badge — visible during the 150ms feedback window */}
        {isFlashing && (
          <div style={{ position:'absolute', top:8, right:8, width:22, height:22, borderRadius:'50%', background:P, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 4px rgba(79,70,229,0.4)' }}>
            <Check size={12} color="#fff" />
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ padding: '10px 12px 11px' }}>
        <p style={{ margin:0, fontSize:13, fontWeight:600, color:'#111827', lineHeight:1.3, marginBottom:3 }}>
          {template.name}
        </p>
        <p style={{ margin:0, fontSize:12, color:'#6B7280', lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const }}>
          {template.description}
        </p>
      </div>
    </div>
  );
}

// ── Main modal ─────────────────────────────────────────────────────────────────

export function SlideLibraryModal({ isOpen, complexity, onClose, onInsert }: SlideLibraryModalProps) {
  const [activeCategory, setActiveCategory] = useState<SlideCategoryId>('text');
  const [search, setSearch]                 = useState('');
  const [alive, setAlive]                   = useState(false);
  const [visible, setVisible]               = useState(false);
  const [flashingCardId, setFlashingCardId] = useState<string | null>(null);

  const searchRef    = useRef<HTMLInputElement>(null);
  const closingRef   = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable refs so triggerClose never goes stale
  const onInsertRef = useRef(onInsert);
  const onCloseRef  = useRef(onClose);
  onInsertRef.current = onInsert;
  onCloseRef.current  = onClose;

  // Enter animation + reset state on open
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
      if (flashTimerRef.current) { clearTimeout(flashTimerRef.current); flashTimerRef.current = null; }
      closingRef.current = false;
      setFlashingCardId(null);
      setActiveCategory('text');
      setSearch('');
      setAlive(true);
      setVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
          setTimeout(() => searchRef.current?.focus(), 80);
        });
      });
    }
  }, [isOpen]);

  const triggerClose = useCallback((action?: { slideType: string; templateId: string }) => {
    if (closingRef.current) return;
    closingRef.current = true;

    // Cancel any pending flash timer (e.g. Escape pressed during flash)
    if (!action && flashTimerRef.current) {
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
      setFlashingCardId(null);
    }

    setVisible(false); // trigger CSS exit transition

    // Insert topic immediately so sidebar row fades in during modal exit
    if (action) {
      onInsertRef.current(action.slideType, action.templateId);
    }

    closeTimerRef.current = setTimeout(() => {
      setAlive(false);
      closingRef.current = false;
      closeTimerRef.current = null;
      if (!action) onCloseRef.current();
    }, 260);
  }, []);

  // Escape key
  useEffect(() => {
    if (!alive) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') triggerClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [alive, triggerClose]);

  const isAvail = (t: SlideTemplate) => COMPLEXITY_RANK[complexity] >= COMPLEXITY_RANK[t.minComplexity];

  const handleCardClick = (template: SlideTemplate) => {
    if (!isAvail(template) || flashingCardId || closingRef.current) return;
    setFlashingCardId(template.id);
    flashTimerRef.current = setTimeout(() => {
      flashTimerRef.current = null;
      triggerClose({ slideType: template.slideType, templateId: template.id });
    }, 150);
  };

  const visibleTemplates = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return SLIDE_TEMPLATES.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return SLIDE_TEMPLATES.filter(t => t.category === activeCategory);
  }, [search, activeCategory]);

  const searchActive = search.trim().length > 0;

  if (!alive) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onClick={e => { if (e.target === e.currentTarget) triggerClose(); }}
    >
      <div
        style={{
          width: 1200, maxWidth: 'calc(100vw - 48px)', height: '88vh', maxHeight: 800,
          background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          fontFamily: 'Nunito Sans, system-ui, sans-serif',
          transform: visible ? 'scale(1)' : 'scale(0.97)',
          transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 24px', borderBottom:`1px solid ${BORDER}`, flexShrink:0 }}>
          <span style={{ fontSize:18, fontWeight:700, color:'#111827', flex:1 }}>Slide library</span>

          {/* Search */}
          <div style={{ position:'relative', width:260 }}>
            <Search size={15} color="#9CA3AF" style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search templates…"
              style={{ width:'100%', padding:'8px 10px 8px 34px', border:`1px solid ${BORDER}`, borderRadius:8, fontSize:13, color:'#111827', background:'#F9FAFB', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.background = '#fff'; }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7280', padding:2 }}>
                <X size={13} />
              </button>
            )}
          </div>

          {/* Close */}
          <button
            onClick={() => triggerClose()}
            style={{ width:32, height:32, borderRadius:8, border:`1px solid ${BORDER}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7280', flexShrink:0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body: left nav + grid ── */}
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

          {/* Left navigation — flat category list */}
          <nav style={{ width:168, flexShrink:0, borderRight:`1px solid ${BORDER}`, background:'#FAFAFA', padding:'12px 8px', display:'flex', flexDirection:'column', gap:2, overflowY:'auto' }}>
            {NAV_CATEGORIES.map(cat => {
              const active = !searchActive && activeCategory === cat.id;
              const count = SLIDE_TEMPLATES.filter(t => t.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearch(''); }}
                  style={{
                    display:'flex', alignItems:'center', gap:10,
                    padding:'10px 12px',
                    borderRadius:8,
                    border:'none',
                    background: active ? PL : 'transparent',
                    color: active ? P : '#4B5563',
                    cursor:'pointer',
                    textAlign:'left',
                    fontSize:13,
                    fontWeight: active ? 600 : 400,
                    transition:'background 0.1s, color 0.1s',
                    width:'100%',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <span style={{ color: active ? P : '#6B7280', display:'flex', flexShrink:0, transition:'color 0.1s' }}>{cat.icon}</span>
                  <span style={{ flex:1 }}>{cat.label}</span>
                  <span style={{ fontSize:11, color: active ? P : '#D1D5DB', fontWeight:500 }}>{count}</span>
                </button>
              );
            })}
          </nav>

          {/* Template grid */}
          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', scrollbarWidth:'thin', scrollbarColor:`${BORDER} transparent` }}>

            <div style={{ marginBottom:16 }}>
              <h3 style={{ margin:0, fontSize:15, fontWeight:700, color:'#111827' }}>
                {searchActive
                  ? `Results for "${search}"`
                  : NAV_CATEGORIES.find(c => c.id === activeCategory)?.label}
              </h3>
              {!searchActive && (
                <p style={{ margin:'3px 0 0', fontSize:12, color:'#6B7280' }}>
                  {visibleTemplates.length} template{visibleTemplates.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {visibleTemplates.length === 0 ? (
              <div style={{ padding:'60px 0', textAlign:'center', color:'#6B7280', fontSize:14 }}>
                No templates found.
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(188px, 1fr))', gap:14 }}>
                {visibleTemplates.map(template => (
                  <SlideTemplateCard
                    key={template.id}
                    template={template}
                    isFlashing={flashingCardId === template.id}
                    isAvailable={isAvail(template)}
                    onClick={() => handleCardClick(template)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Footer removed — card click is the final create action */}
      </div>
    </div>,
    document.body,
  );
}
