export interface CourseDocument {
  title: string;
  sections: { id: string; title: string; description: string; topics: { id: string; title: string; slideType?: string; [key: string]: unknown }[]; [key: string]: unknown }[];
  settings: Record<string, unknown>;
  [key: string]: unknown;
}
export const LANGUAGES = [
  { code: 'ta', label: 'Tamil', sample: 'பாட உள்ளடக்கம்' },
  { code: 'hi', label: 'Hindi', sample: 'पाठ्यक्रम सामग्री' },
  { code: 'ml', label: 'Malayalam', sample: 'കോഴ്സ് ഉള്ളടക്കം' },
  { code: 'te', label: 'Telugu', sample: 'కోర్సు కంటెంట్' },
  { code: 'fr', label: 'French', sample: 'Contenu du cours' },
];
export type TextField = { path: string[]; key: string; source: string };
export type Translation = { code: string; values: Record<string, string>; revision: number; approvedRevision?: number; approvedAt?: string };
const TEXT_KEYS = new Set(['title', 'description', 'content', 'text', 'remark', 'transcript', 'objective', 'outcomes', 'script', 'audioScript']);
export function textFields(source: CourseDocument): TextField[] {
  const fields: TextField[] = [];
  function walk(value: unknown, path: string[] = []) {
    if (!value || typeof value !== 'object') return;
    Object.entries(value).forEach(([key, child]) => {
      if (path.length === 0 && key === 'settings') return;
      const next = [...path, key];
      if (typeof child === 'string' && (TEXT_KEYS.has(key) || path[path.length - 1] === 'bullets') && child.trim()) fields.push({ path: next, key: next.join('.'), source: child });
      else if (typeof child === 'object') walk(child, next);
    });
  }
  walk(source);
  return fields;
}
export function translateDemo(source: CourseDocument, code: string, revision = 1): Translation {
  const lang = LANGUAGES.find(l => l.code === code);
  if (!lang) throw new Error('Select a supported language.');
  const dictionary: Record<string, string[]> = {
    'Course Overview': ['பாடத்தின் கண்ணோட்டம்','पाठ्यक्रम अवलोकन','കോഴ്സ് അവലോകനം','కోర్సు అవలోకనం','Présentation du cours'],
    'Learning Objectives': ['கற்றல் நோக்கங்கள்','सीखने के उद्देश्य','പഠന ലക്ഷ്യങ്ങൾ','అభ్యాస లక్ష్యాలు','Objectifs pédagogiques'],
    'Final Assessment': ['இறுதி மதிப்பீடு','अंतिम मूल्यांकन','അന്തിമ വിലയിരുത്തൽ','తుది మూల్యాంకనం','Évaluation finale'],
    'Introduction': ['அறிமுகம்','परिचय','ആമുഖം','పరిచయం','Introduction'],
  };
  const idx = LANGUAGES.findIndex(l => l.code === code);
  return { code, revision, values: Object.fromEntries(textFields(source).map(f => [f.key, dictionary[f.source]?.[idx] || lang.sample + ' — ' + f.source])) };
}
export function applyTranslation(source: CourseDocument, translation: Translation): CourseDocument {
  const copy = structuredClone(source);
  for (const field of textFields(source)) {
    let parent: any = copy;
    for (const part of field.path.slice(0, -1)) parent = parent[part];
    parent[field.path[field.path.length - 1]] = translation.values[field.key] ?? field.source;
  }
  return copy;
}
export function isApproved(t?: Translation) {
  return !!t && t.approvedRevision === t.revision && Object.values(t.values).every(v => v.trim().length > 0);
}
export function editTranslation(t: Translation, key: string, value: string): Translation {
  return { ...t, values: { ...t.values, [key]: value }, revision: t.revision + 1, approvedRevision: undefined, approvedAt: undefined };
}
export function demoSource(title: string, modules = 2): CourseDocument {
  return { title, sections: Array.from({length: Math.max(1, modules)}, (_, i) => ({
    id: 'section-' + i, title: i === 0 ? 'Introduction' : 'Final Assessment', description: 'Sample content for reviewing this prototype.',
    topics: i === 0 ? [
      { id: 'overview', title: 'Course Overview', slideType: 'title-text', content: 'Explore the concepts and practical applications in this course.' },
      { id: 'objectives', title: 'Learning Objectives', slideType: 'title-text', content: 'Understand key concepts and apply them in a practical scenario.' },
    ] : [{ id: 'assessment-' + i, title: 'Final Assessment', slideType: 'quiz', text: 'Which action demonstrates learning?', points: 1,
      options: [{ text: 'Apply the concepts in practice', correct: true, remark: 'Correct. Apply your learning.' }, { text: 'Skip the practice activity', correct: false, remark: 'Try again.' }] }],
  })), settings: { primaryColor: '#134780', secondaryColor: '#f48120', themeFont: 'Arial', navigationMode: 'free', bookmarking: true, quizPassPercent: 80, slideViewPercent: 100, transition: 'none' } };
}
const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function playerHtml(doc: CourseDocument, code: string) {
  const slides = doc.sections.flatMap(s => s.topics.map(t => ({ ...t, section: s.title })));
  const color = /^#[0-9a-f]{6}$/i.test(String(doc.settings.primaryColor)) ? String(doc.settings.primaryColor) : '#134780';
  const data = JSON.stringify({slides, settings: doc.settings}).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="${escape(code)}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(doc.title)}</title>
<style>body{margin:0;font:16px Arial,sans-serif;background:#f3f4f6;color:#182230}header{padding:20px;background:${color};color:white}main{max-width:850px;margin:24px auto;padding:28px;background:white;border-radius:16px;min-height:240px}button{padding:12px 20px;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer;background:white;margin:5px}button:disabled{opacity:.4;cursor:default}footer{display:flex;justify-content:space-between;align-items:center}p{line-height:1.7;white-space:pre-wrap}small{opacity:.8}#options{display:grid}#feedback{color:${color}}</style>
<header><small>Translated course · Demo preview</small><h2>${escape(doc.title)}</h2></header><main><small id="section"></small><h1 id="title"></h1><p id="body"></p><div id="options"></div><p id="feedback" role="status"></p><footer><button id="prev">Previous</button><span id="count"></span><button id="next">Next</button></footer></main>
<script>const data=${data};let i=0,api=null;try{let w=window;for(let n=0;n<8;n++){if(w.API){api=w.API;break}if(w.parent===w)break;w=w.parent}if(api){api.LMSInitialize('');api.LMSSetValue('cmi.core.lesson_status','incomplete');if(data.settings.bookmarking){const saved=Number(api.LMSGetValue('cmi.core.lesson_location'));if(Number.isInteger(saved)&&saved>=0&&saved<data.slides.length)i=saved}}}catch(e){}const el=id=>document.getElementById(id);function render(){const s=data.slides[i]||{};el('section').textContent=s.section||'';el('title').textContent=s.title||'No slides';el('body').textContent=s.content||s.text||'';el('count').textContent=(i+1)+' / '+data.slides.length;el('prev').disabled=i===0;el('next').disabled=i>=data.slides.length-1;el('options').replaceChildren();el('feedback').textContent='';(s.options||[]).forEach(o=>{const b=document.createElement('button');b.textContent=o.text;b.onclick=()=>{el('feedback').textContent=o.remark|| (o.correct?'Correct':'Try again')};el('options').append(b)});try{if(api&&data.settings.bookmarking){api.LMSSetValue('cmi.core.lesson_location',String(i));api.LMSCommit('')}}catch(e){}}el('prev').onclick=()=>{if(i>0){i--;render()}};el('next').onclick=()=>{if(i<data.slides.length-1){i++;render()}};window.addEventListener('beforeunload',()=>{try{if(api){api.LMSCommit('');api.LMSFinish('')}}catch(e){}});render();</script></html>`;
}
export async function buildPackage(source: CourseDocument, t: Translation) {
  if (!isApproved(t)) throw new Error('Review and approve this translation before generating SCORM.');
  const { default: JSZip } = await import('jszip');
  const doc = applyTranslation(source, t);
  const zip = new JSZip();
  zip.file('imsmanifest.xml', `<?xml version="1.0" encoding="UTF-8"?><manifest identifier="course-${escape(t.code)}" version="1.0" xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"><metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata><organizations default="org"><organization identifier="org"><title>${escape(doc.title)}</title><item identifier="item" identifierref="resource"><title>${escape(doc.title)}</title></item></organization></organizations><resources><resource identifier="resource" type="webcontent" adlcp:scormtype="sco" href="index.html"><file href="index.html"/><file href="course.json"/></resource></resources></manifest>`);
  zip.file('index.html', playerHtml(doc, t.code));
  zip.file('course.json', JSON.stringify(doc, null, 2));
  zip.file('source.json', JSON.stringify(source, null, 2));
  zip.file('translation.json', JSON.stringify(t, null, 2));
  zip.file('README.txt', 'Clickable prototype package. Demo translations require a production translation provider. The source snapshot and all non-text settings are preserved in course.json. The demo player does not implement all authoring interactions, media or assessment completion rules. Validate production SCORM packages in your LMS.');
  return zip.generateAsync({ type: 'blob' });
}
