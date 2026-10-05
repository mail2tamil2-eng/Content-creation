import React, { useRef, useState } from 'react';
import {
  Globe, Settings, Pencil,
  Upload, Play, Save, PanelRightOpen, Layout,
} from 'lucide-react';
import { ThemePopover, ThemeSettings } from './ThemePopover';
import { TemplatePopover } from './TemplatePopover';

interface EditorTopToolbarProps {
  courseTitle: string;
  language?: string;
  rightPanelOpen: boolean;
  isSidebarCollapsed?: boolean;
  onToggleRightPanel: () => void;
  onOpenCourseSettings: () => void;
  onPublish: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
  onApplyTheme: (settings: ThemeSettings) => void;
  currentDesignId?: string;
  onApplyTemplate?: (designId: string) => void;
}

export function EditorTopToolbar({
  courseTitle,
  language = 'English',
  rightPanelOpen,
  isSidebarCollapsed = false,
  onToggleRightPanel,
  onOpenCourseSettings,
  onPublish,
  onPreview,
  onSaveDraft,
  onApplyTheme,
  currentDesignId = 'corporate',
  onApplyTemplate,
}: EditorTopToolbarProps) {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const templateButtonRef = useRef<HTMLButtonElement>(null);

  // right: 336 = sidebar width (320) + gap (16). Transitions with sidebar open/close.
  const actionRight = rightPanelOpen ? 336 : 16;

  return (
    <>
      {/*
        Left row — only takes vertical space when the course sidebar is visible.
        When collapsed the canvas fills full height; the floating pill in
        AICreateCoursePage covers the top-left area.
      */}
      {!isSidebarCollapsed && (
        <div
          className="shrink-0 flex items-center"
          style={{ height: '54px', paddingLeft: '14px' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="flex items-center bg-white border border-gray-200 shadow-sm overflow-hidden shrink-0"
              style={{ height: '44px', borderRadius: '10px', padding: '0 14px', maxWidth: '370px' }}
            >
              <span
                className="font-semibold text-gray-900 truncate"
                style={{ fontSize: '14px', maxWidth: '230px' }}
                title={courseTitle}
              >
                {courseTitle || 'Untitled Course'}
              </span>

              <div className="bg-gray-200 shrink-0 mx-3" style={{ width: '1px', height: '22px' }} />

              <div className="flex items-center gap-1.5 shrink-0">
                <Globe size={15} className="text-gray-500" />
                <span className="text-gray-600" style={{ fontSize: '14px' }}>{language}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*
        Right action panel — position: fixed, viewport-relative.
        right transitions between 336px (sidebar open) and 16px (sidebar closed)
        to always sit 16px to the left of the Topic Settings boundary.
        top: 85 = 80px global header + 5px padding, centering in the 54px toolbar row.
      */}
      <div
        className="flex items-center bg-white border border-gray-200 shadow-sm"
        style={{
          position: 'fixed',
          top: 85,
          right: actionRight,
          zIndex: 50,
          height: '44px',
          borderRadius: '10px',
          padding: '0 8px',
          gap: '2px',
          transition: 'right 200ms ease',
        }}
      >
        {/* Settings gear */}
        <button
          onClick={onOpenCourseSettings}
          title="Course settings"
          className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center transition-colors hover:bg-gray-100 text-gray-700"
        >
          <Settings size={18} />
        </button>

        <div className="bg-gray-200 shrink-0 mx-1" style={{ width: '1px', height: '24px' }} />

        {/* ▦ Template */}
        <button
          ref={templateButtonRef}
          onClick={() => { setIsTemplateOpen(v => !v); setIsThemeOpen(false); }}
          aria-expanded={isTemplateOpen}
          aria-haspopup="dialog"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isTemplateOpen ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ fontSize: '14px' }}
        >
          <Layout size={15} />
          <span className="hidden sm:inline">Template</span>
        </button>

        {/* ✏ Theme */}
        <button
          ref={themeButtonRef}
          onClick={() => { setIsThemeOpen(v => !v); setIsTemplateOpen(false); }}
          aria-expanded={isThemeOpen}
          aria-haspopup="dialog"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isThemeOpen ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ fontSize: '14px' }}
        >
          <Pencil size={15} />
          <span className="hidden sm:inline">Theme</span>
        </button>

        {/* Save Draft */}
        <button
          onClick={onSaveDraft}
          title="Save draft"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          style={{ fontSize: '14px' }}
        >
          <Save size={15} />
          <span className="hidden sm:inline">Save Draft</span>
        </button>

        {/* Publish */}
        <button
          onClick={onPublish}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors ml-1"
          style={{ fontSize: '14px' }}
        >
          <Upload size={15} />
          <span className="hidden sm:inline">Publish</span>
        </button>

        <div className="bg-gray-200 shrink-0 mx-1" style={{ width: '1px', height: '24px' }} />

        {/* ▶ Preview */}
        <button
          onClick={onPreview}
          title="Preview course"
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <Play size={16} className="text-gray-700" />
        </button>

        {/* Expand Topic Settings — only when panel is collapsed */}
        {!rightPanelOpen && (
          <>
            <div className="bg-gray-200 shrink-0 mx-1" style={{ width: '1px', height: '24px' }} />
            <div className="cs-tooltip-trigger relative">
              <button
                onClick={onToggleRightPanel}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <PanelRightOpen size={16} className="text-gray-700" />
              </button>
              <span
                className="cs-tooltip"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 6px)',
                  background: '#1F2937',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '4px 8px',
                  borderRadius: 5,
                  whiteSpace: 'nowrap',
                  zIndex: 100,
                }}
              >
                Expand Topic Settings
              </span>
            </div>
          </>
        )}
      </div>

      {/* Theme Popover */}
      <ThemePopover
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        anchorEl={themeButtonRef.current}
        onApply={settings => { onApplyTheme(settings); }}
      />

      {/* Template Popover */}
      <TemplatePopover
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        anchorEl={templateButtonRef.current}
        currentDesignId={currentDesignId}
        onApply={id => { onApplyTemplate?.(id); setIsTemplateOpen(false); }}
      />
    </>
  );
}
