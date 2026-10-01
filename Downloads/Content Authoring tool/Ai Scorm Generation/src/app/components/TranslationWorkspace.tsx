import { useEffect, useState } from 'react';
import TranslatedCoursePreview from './TranslatedCoursePreview';
import { Languages, ShieldCheck, Eye, RefreshCw, Download, CheckCircle2, LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';
import { LANGUAGES, textFields, translateDemo, applyTranslation, editTranslation, isApproved, buildPackage, type CourseDocument, type Translation } from '../translation/model';

const buttonBase = 'inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed';
const button = buttonBase + ' enabled:hover:bg-gray-50';
const primary = buttonBase + ' bg-[#134780] text-white enabled:hover:bg-[#0f3660]';
type Saved = { source: string; selected: string[]; translations: Record<string, Translation> };
function load(key: string, fingerprint: string): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved?.source === fingerprint && Array.isArray(saved.selected) && saved.translations && typeof saved.translations === 'object') return { ...saved, selected: saved.selected.filter((code: string) => LANGUAGES.some(l => l.code === code)).slice(0, 1) };
  } catch {}
  return { source: fingerprint, selected: [], translations: {} };
}
export default function TranslationWorkspace({ source, storageId, published = true }: { source: CourseDocument; storageId: string; published?: boolean }) {
  const fingerprint = JSON.stringify(source);
  return <TranslationEditor key={storageId + fingerprint} source={source} storageId={storageId} published={published} fingerprint={fingerprint} />;
}
function TranslationEditor({ source, storageId, published, fingerprint }: { source: CourseDocument; storageId: string; published: boolean; fingerprint: string }) {
  const key = 'authoring-translations-v1:' + storageId;
  const [saved, setSaved] = useState(() => load(key, fingerprint));
  const [active, setActive] = useState(() => saved.selected[0] || '');
  const [mode, setMode] = useState<'edit' | 'preview' | 'review'>('edit');
  const [reviewed, setReviewed] = useState(false);
  const [previewed, setPreviewed] = useState<Record<string, number>>({});
  const [packages, setPackages] = useState<Record<string, { blob: Blob; revision: number }>>({});
  const [busy, setBusy] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const fields = textFields(source);
  const translation = saved.translations[active];
  const language = LANGUAGES.find(l => l.code === active);
  const ready = saved.selected.length === 1 && saved.selected.every(code => isApproved(saved.translations[code]));
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(saved)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [key, saved]);
  function select(code: string) {
    setActive(code); setMode('edit'); setReviewed(false);
    setSaved(prev => ({ ...prev, selected: [code] }));
  }
  function generate() {
    if (!published || !saved.selected.length) return;
    setSaved(prev => ({ ...prev, translations: Object.fromEntries([
      ...Object.entries(prev.translations),
      ...prev.selected.filter(c => !prev.translations[c]).map(c => [c, translateDemo(source, c)]),
    ]) }));
    setActive(saved.selected[0]); setMode('edit'); setReviewed(false);
    toast.success('Demo translations ready for review');
  }
  function regenerate() {
    if (!published || !translation || !window.confirm('Regenerate ' + language?.label + '? This replaces your translated edits and removes approval. The source course stays unchanged.')) return;
    setSaved(prev => ({ ...prev, translations: { ...prev.translations, [active]: translateDemo(source, active, translation.revision + 1) } }));
    setReviewed(false); setMode('edit');
    toast.success('Translation regenerated. Review and approval are required again.');
  }
  function edit(field: string, value: string) {
    if (!published || !translation || busy) return;
    setSaved(prev => ({ ...prev, translations: { ...prev.translations, [active]: editTranslation(prev.translations[active], field, value) } }));
    setReviewed(false);
  }
  function approve() {
    if (!published || !translation || !reviewed || previewed[active] !== translation.revision || !fields.every(f => translation.values[f.key]?.trim())) return;
    setSaved(prev => ({ ...prev, translations: { ...prev.translations, [active]: { ...prev.translations[active], approvedRevision: translation.revision, approvedAt: new Date().toISOString() } } }));
    toast.success(language?.label + ' translation approved');
  }
  async function generatePackages() {
    if (!published || !ready || busy) return;
    setBusy(true);
    try {
      const results = await Promise.all(saved.selected.map(async code => ({ code, blob: await buildPackage(source, saved.translations[code]), revision: saved.translations[code].revision })));
      setPackages(Object.fromEntries(results.map(p => [p.code, { blob: p.blob, revision: p.revision }])));
      toast.success('SCORM package generated for the selected language');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not generate packages. Please retry.'); }
    finally { setBusy(false); }
  }
  function download(code: string) {
    const pkg = packages[code], current = saved.translations[code];
    if (!published || !pkg || !isApproved(current) || pkg.revision !== current.revision) return;
    const url = URL.createObjectURL(pkg.blob), a = document.createElement('a');
    a.href = url; a.download = (source.title.replace(/[^a-z0-9]+/gi, '_') || 'Course') + '_' + code + '_r' + current.revision + '_SCORM12.zip';
    a.click(); setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  if (!published) return <div className="p-5 rounded-xl bg-gray-50 text-gray-500 flex items-center gap-3"><LockKeyhole size={20} />Publish the course to enable translation.</div>;
  return <section className="space-y-5" aria-label="Course translations">
    <div className="flex items-start gap-3"><div className="p-3 bg-blue-50 text-[#134780] rounded-xl"><Languages size={24} /></div><div><h2 className="text-xl font-semibold text-gray-900">Course translations</h2><p className="text-sm text-gray-500 mt-1">Translate → Preview & edit → Review & approve → Generate SCORM</p></div></div>
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-[#134780]"><strong>Source course preserved.</strong> Each language uses a separate text copy. Structure, slide types, assessment answers, interactions and settings remain in the published source snapshot.</div>
    <p className="text-xs text-gray-500">Prototype: sample translations demonstrate the workflow. Custom text is retained alongside a localized sample label. Production translation and full LMS playback require backend integration.</p>
    {storageError && <p role="alert" className="text-sm text-red-700">Browser storage is unavailable. Changes will be lost when this page closes.</p>}
    <fieldset disabled={busy} className="space-y-5 disabled:opacity-70">
      <div className="rounded-xl border border-gray-200 p-5 bg-white">
        <h3 className="font-semibold mb-3">1. Select target language</h3>
        <div role="radiogroup" aria-label="Target language" className="flex flex-wrap gap-3">{LANGUAGES.map(l => <label key={l.code} className={'flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer ' + (saved.selected.includes(l.code) ? 'bg-orange-50 border-orange-400' : 'border-gray-200')}><input type="radio" name="target-language" checked={saved.selected.includes(l.code)} onChange={() => select(l.code)} />{l.label}</label>)}</div>
        <div className="mt-4 flex items-center gap-3"><button className={primary} disabled={!saved.selected.some(c => !saved.translations[c])} onClick={generate}>Start translation</button><span className="text-xs text-gray-500">{saved.selected.length} selected · existing edits are kept</span></div>
      </div>
      {saved.selected.some(c => saved.translations[c]) && <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-gray-100"><h3 className="font-semibold mb-3">2. Preview, edit and approve translation</h3><div className="flex flex-wrap gap-2">{saved.selected.filter(c => saved.translations[c]).map(code => <button key={code} className={button + (active === code ? ' border-blue-500 bg-blue-50 text-[#134780]' : '')} onClick={() => {setActive(code); setReviewed(false); setMode('edit');}}>{LANGUAGES.find(l => l.code === code)?.label}<span className={'text-xs ' + (isApproved(saved.translations[code]) ? 'text-green-700' : 'text-amber-700')}>{isApproved(saved.translations[code]) ? 'Approved' : 'Needs review'}</span></button>)}</div></div>
        {translation && saved.selected.includes(active) && <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h4 className="font-semibold">{language?.label} translation</h4><p className="text-xs text-gray-500">Revision {translation.revision} · {isApproved(translation) ? 'Approved' : 'Awaiting review'}</p></div><button className={button} onClick={regenerate}><RefreshCw size={15} />Regenerate translation</button></div>
          <div className="flex flex-wrap gap-2">
            <button className={button} aria-pressed={mode === 'preview'} onClick={() => {setMode('preview'); setPreviewed(p => ({...p, [active]: translation.revision}));}}><Eye size={16} />Preview translated course</button>
            <button className={button} aria-pressed={mode === 'edit'} onClick={() => setMode('edit')}>Edit translated content</button>
            <button className={button} aria-pressed={mode === 'review'} onClick={() => {setMode('review'); setReviewed(false);}}><ShieldCheck size={16} />Review & approve</button>
          </div>
          {mode === 'preview' ? <TranslatedCoursePreview key={active + ':' + translation.revision} course={applyTranslation(source, translation)} language={active} languageLabel={language?.label || active} /> : <>
            <p className="text-sm text-gray-500">{mode === 'edit' ? 'Edits save automatically. Editing an approved translation removes its approval.' : 'Compare every translated field with its source, then approve this revision.'}</p>
            <div className="max-h-[430px] overflow-auto space-y-4 pr-2">{fields.map((field, index) => <div key={field.key} className="grid md:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50"><div><p className="text-xs text-gray-500 mb-1">Source · {field.key}</p><p className="text-sm whitespace-pre-wrap">{field.source}</p></div><div><label htmlFor={'translation-field-' + index} className="block text-xs text-[#134780] mb-1">{language?.label} · {field.key}</label><textarea id={'translation-field-' + index} value={translation.values[field.key] ?? ''} readOnly={mode === 'review'} onChange={e => edit(field.key, e.target.value)} className="w-full border border-gray-300 rounded-lg bg-white p-3 text-sm min-h-24" /></div></div>)}</div>
          </>}
          {mode === 'review' && <div className="rounded-xl border border-gray-200 p-4 space-y-3">
            {previewed[active] !== translation.revision && <p className="text-sm text-amber-700">Preview this revision before approving it.</p>}
            {!fields.every(f => translation.values[f.key]?.trim()) && <p role="alert" className="text-sm text-red-700">Fill in every translated field before approval.</p>}
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={reviewed} onChange={e => setReviewed(e.target.checked)} />I have reviewed all translated content and approve this language version.</label>
            <button className={primary} disabled={isApproved(translation) || !reviewed || previewed[active] !== translation.revision || !fields.every(f => translation.values[f.key]?.trim())} onClick={approve}><CheckCircle2 size={16} />Approve translation</button>
          </div>}
        </div>}
      </div>}
      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3"><h3 className="font-semibold">3. Generate SCORM for selected language</h3><p className="text-sm text-gray-500">Approve the selected language before generating its SCORM ZIP. Switch languages to work on another translation.</p>
        <button className={primary} disabled={!ready || busy} onClick={generatePackages}><Download size={16} />{busy ? 'Generating package…' : 'Generate SCORM package'}</button>
        <div className="space-y-2">{saved.selected.filter(code => packages[code] && isApproved(saved.translations[code]) && packages[code].revision === saved.translations[code].revision).map(code => <div key={code} className="flex items-center justify-between rounded-lg bg-green-50 p-3"><span className="text-sm text-green-800">{LANGUAGES.find(l => l.code === code)?.label} · SCORM 1.2 · revision {packages[code].revision}</span><button className={button} onClick={() => download(code)}>Download {LANGUAGES.find(l => l.code === code)?.label} SCORM</button></div>)}</div>
      </div>
    </fieldset>
  </section>;
}
