import React from 'react';
import {
  X, Check, CheckCircle2, Download, Upload, Sparkles, ArrowRight, ChevronDown,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description: string;
  topics: { id: string; title: string; slideType?: string }[];
  expanded: boolean;
}

interface Props {
  courseTitle: string;
  sections: Section[];
  publishLmsDestination: string;
  setPublishLmsDestination: React.Dispatch<React.SetStateAction<string>>;
  publishLmsDropdownOpen: boolean;
  setPublishLmsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publishLmsPushed: boolean;
  setPublishLmsPushed: React.Dispatch<React.SetStateAction<boolean>>;
  publishDone: boolean;
  setPublishDone: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onDashboard: () => void;
  onTranslate: () => void;
}

const LMS_OPTIONS = ['Zell Learning', 'Agums', 'Hotelhub', 'Datafy'];

export default function PublishModal({
  courseTitle, sections,
  publishLmsDestination, setPublishLmsDestination,
  publishLmsDropdownOpen, setPublishLmsDropdownOpen,
  publishLmsPushed, setPublishLmsPushed,
  publishDone, setPublishDone,
  onClose, onDashboard, onTranslate,
}: Props) {
  const scormFilename = `${(courseTitle || 'Course').replace(/\s+/g, '_')}_SCORM.zip`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) { onClose(); setPublishLmsDropdownOpen(false); } }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col" style={{ maxWidth: 640, maxHeight: '90vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f3f4f6]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${publishDone ? 'bg-[#16a34a]' : 'bg-[#f48120]'}`}>
              {publishDone ? <Check className="w-5 h-5 text-white" /> : <CheckCircle2 className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#101828]">{publishDone ? 'Course Published' : 'Publish Course'}</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">
                {publishDone ? 'Your course is published. Download it or open the translation page.' : 'Generate the final SCORM package and publish your course'}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-[#6b7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Phase 1: pre-publish */}
          {!publishDone && (
            <div className="rounded-2xl border border-[#e5e7eb] overflow-hidden">
              <div className="px-6 py-5 bg-[#fafafa] border-b border-[#f3f4f6] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#f48120]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">{courseTitle || 'Untitled Course'}</p>
                    <p className="text-xs text-[#6b7280]">SCORM 1.2 · {sections.reduce((n, s) => n + s.topics.length, 0)} slides</p>
                  </div>
                </div>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  Publishing will generate the final SCORM package from your current course settings and make it available for download and distribution.
                </p>
              </div>
              <div className="px-6 py-4 bg-white flex items-center justify-end">
                <button type="button"
                  onClick={() => setPublishDone(true)}
                  className="flex items-center gap-2 px-7 py-2.5 bg-[#f48120] hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Publish
                </button>
              </div>
            </div>
          )}


          {/* Phase 2: post-publish */}
          {publishDone && (
            <>
              {/* SCORM ready banner */}
              <div className="flex items-center justify-between bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#166534]">
                    SCORM 1.2 package ready — <span className="font-semibold">{scormFilename}</span>
                  </span>
                </div>
                <button type="button"
                  className="flex items-center gap-1.5 px-4 py-1.5 border border-[#d1d5db] bg-white rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors flex-shrink-0 ml-4">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>

              {/* Push to LMS */}
              <div className="border border-[#e5e7eb] rounded-2xl">
                <div className="px-5 py-4 bg-[#fafafa] border-b border-[#f3f4f6] rounded-t-2xl">
                  <p className="text-sm font-bold text-[#101828]">Push to LMS</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#374151]">Destination</span>
                    <button type="button"
                      onClick={() => setPublishLmsDropdownOpen(v => !v)}
                      className="flex items-center gap-2 px-4 py-2 border border-[#d1d5db] rounded-lg bg-white text-sm text-[#101828] hover:border-gray-400 transition-colors min-w-[190px] justify-between">
                      <span>{publishLmsDestination}</span>
                      <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform ${publishLmsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {publishLmsDropdownOpen && (
                    <div className="border border-[#d1d5db] rounded-xl overflow-hidden">
                      {LMS_OPTIONS.map((opt, i) => (
                        <button key={opt} type="button"
                          onClick={() => { setPublishLmsDestination(opt); setPublishLmsDropdownOpen(false); setPublishLmsPushed(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                            ${i > 0 ? 'border-t border-[#f3f4f6]' : ''}
                            ${publishLmsDestination === opt ? 'bg-[#eff6ff] text-[#1d4ed8] font-semibold' : 'bg-white text-[#101828] hover:bg-gray-50'}`}>
                          {opt}
                          {publishLmsDestination === opt && <Check className="w-3.5 h-3.5 text-[#2b7fff]" />}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-[#f3f4f6]" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {publishLmsPushed
                        ? <><div className="w-2 h-2 rounded-full bg-[#16a34a]" /><span className="text-sm text-[#166534] font-medium">Delivered to {publishLmsDestination}</span></>
                        : <><div className="w-2 h-2 rounded-full bg-[#9ca3af]" /><span className="text-sm text-[#6b7280]">Not yet delivered</span></>
                      }
                    </div>
                    <button type="button"
                      onClick={() => setPublishLmsPushed(true)}
                      disabled={publishLmsPushed}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
                      style={{ background: publishLmsPushed ? '#16a34a' : '#b45309' }}>
                      {publishLmsPushed ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                      {publishLmsPushed ? 'Pushed' : 'Push'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-sm font-semibold text-[#134780]">Create a language version</h3>
                <p className="mt-1 text-sm text-gray-600">Translate, preview and approve your course on its dedicated translation page.</p>
                <button type="button" onClick={onTranslate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#134780] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3660]">
                  Translate course <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#f3f4f6] bg-[#fafafa]">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 border border-[#d1d5db] rounded-xl text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors">
            Close
          </button>
          {publishDone && (
            <button type="button" onClick={onDashboard}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#134780] hover:bg-[#0f3660] text-white rounded-xl text-sm font-semibold transition-colors">
              <ArrowRight className="w-4 h-4" />
              Go to Dashboard
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
