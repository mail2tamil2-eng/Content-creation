import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, realpathSync, openSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { verifyServer, freePort } from './identity.mjs';
import { measurePage } from './measure.mjs';
import { renderReport } from './report.mjs';

const root=realpathSync(resolve(dirname(fileURLToPath(import.meta.url)),'../..'));
process.chdir(root);
const out=resolve(root,'design-review');mkdirSync(resolve(out,'screenshots'),{recursive:true});
const args=process.argv.slice(2);
if(args.some(a=>!/^--(?:page=.+|pages=all)$/.test(a))||args.length>1)throw Error('Use no arguments (home), --page=<name-or-route>, or explicitly --pages=all');
const viewport={width:1440,height:1000};
const readJSON=(file,fallback)=>existsSync(file)?JSON.parse(readFileSync(file,'utf8')):fallback;
const save=(file,value)=>writeFileSync(resolve(out,file),JSON.stringify(value,null,2));
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(resolve(dir,e.name)):[resolve(dir,e.name)]);
const sourceFiles=walk(resolve(root,'src')).filter(f=>/\.(tsx?|css)$/.test(f));
const sourceHashes=()=>Object.fromEntries(sourceFiles.map(f=>[relative(root,f),createHash('sha256').update(readFileSync(f)).digest('hex')]));
const before=sourceHashes();
const sources=sourceFiles.map(file=>({file:relative(root,file).replaceAll('\\','/'),lines:readFileSync(file,'utf8').split(/\r?\n/)}));
function sourceFor(element,category){
  let classes=String(element?.className||'').split(/\s+/).filter(x=>x.length>2);
  if(category==='component-override')classes=classes.filter(x=>/(?:bg|text|border)-(?:blue|gray|green|amber|pink|orange|red|purple)-\d/.test(x));
  let best={file:null,line:null,score:0};
  const owners=(element?.owners||[]).map(f=>relative(root,f).replaceAll('\\','/'));
  const scoped=sources.filter(s=>s.file.endsWith('.tsx')&&owners.includes(s.file));
  for(const source of scoped.length?scoped:sources.filter(s=>s.file.endsWith('.tsx')))source.lines.forEach((line,i)=>{
    const hits=classes.filter(c=>line.includes(c));let score=hits.length;
    if(category!=='component-override'&&element?.ownText && element.ownText.length>4&&line.includes(element.ownText))score+=5;
    if(score>best.score)best={file:source.file,line:i+1,score};
  });
  return best;
}
// Browser availability is resolved before starting any capture, never mid-build.
let browser, browserKind='bundled Chromium';
try{browser=await chromium.launch({headless:true});}
catch(error){try{browser=await chromium.launch({channel:'chrome',headless:true});browserKind='installed Google Chrome (Chromium; bundled download unavailable)';}catch{throw new Error(`Install Chromium first: npx playwright install chromium\n${error.message}`);}}
let port=readJSON(resolve(out,'.server.json'),{}).port||5181;
let reused=await verifyServer(root,port);
if(!reused){
  try{port=await freePort(port);}catch{port=await freePort(0);}
  const log=openSync(resolve(out,'server.log'),'a');
  // strictPort prevents the listen/probe race from silently switching identity.
  for(let attempt=0;attempt<3;attempt++){
    const child=spawn(process.execPath,[resolve(root,'scripts/design-review/server.mjs'),String(port)],{cwd:root,detached:true,windowsHide:true,stdio:['ignore',log,log]});child.unref();
    let ready=false;
    for(let i=0;i<100;i++){if(await verifyServer(root,port)){ready=true;break;}await new Promise(r=>setTimeout(r,200));}
    if(ready)break;
    if(attempt===2)throw Error('Review server failed; see design-review/server.log');
    port=await freePort(0);
  }
}
if(!await verifyServer(root,port))throw Error('Checkout identity verification failed');
const baseURL=`http://127.0.0.1:${port}`;
const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
const page=await context.newPage();const browserErrors=[];page.on('pageerror',e=>browserErrors.push(e.message));
await page.goto(baseURL,{waitUntil:'networkidle'});
const routes=await page.evaluate(async()=>{
  const {router}=await import('/src/app/routes.tsx');
  const found=[];function visit(routes,parent=''){for(const r of routes){const path=r.path?.startsWith('/')?r.path:[parent,r.path].filter(Boolean).join('/').replace(/\/+/g,'/');
    if(r.element&&!r.children&&!r.index)found.push({path:'/'+path.replace(/^\//,''),name:r.element.type?.name||r.element.type?.displayName||r.id,id:r.id,gallery:r.handle?.designReviewBaseline===true||/gallery/i.test(path+' '+(r.element.type?.name||''))});if(r.children)visit(r.children,path);}}visit(router.routes);return found;
});
const homePath=new URL(page.url()).pathname;
const gallery=routes.filter(r=>r.gallery);
const candidates=routes.filter(r=>!r.gallery);
let selected=args[0]==='--pages=all'?candidates:args[0]?.startsWith('--page=')?candidates.filter(r=>[r.path,r.path.slice(1),r.name].some(x=>x?.toLowerCase()===args[0].slice(7).toLowerCase())):candidates.filter(r=>r.path===homePath);
if(!selected.length)throw Error(`No unique router target matches. Available: ${candidates.map(r=>r.path).join(', ')}`);
if(args[0]?.startsWith('--page=')&&selected.length!==1)throw Error('Page name is ambiguous; use its full route');
const skippedRoutes=[];
const links=await page.locator('a[href]').evaluateAll(els=>els.map(e=>new URL(e.href).pathname));
selected=selected.flatMap(route=>{if(!/[:*]/.test(route.path))return [route];const pattern=new RegExp('^'+route.path.replace(/:[^/]+/g,'[^/]+').replace(/\*/g,'.*')+'$');const matches=[...new Set(links)].filter(x=>pattern.test(x));if(!matches.length)skippedRoutes.push({path:route.path,reason:'No real rendered link resolves route parameters'});return matches.map(path=>({...route,path}));});
const baseline=readFileSync(resolve(root,'DESIGN_SYSTEM.md'),'utf8');
const baselineNote=gallery.length?'Compared to DESIGN_SYSTEM.md; gallery screenshot supplied for agent visual comparison.':'PROVISIONAL BASELINE: DESIGN_SYSTEM.md was extracted from existing theme/shared components. No gallery route exists; gallery comparison is unavailable.';
const galleryEvidence=[];
for(const g of gallery){await page.goto(baseURL+g.path,{waitUntil:'networkidle'});await page.screenshot({path:resolve(out,'screenshots',`baseline-${g.id}.png`),fullPage:true});galleryEvidence.push(g.path);}
const manual=readJSON(resolve(out,'manual-findings.json'),[]);
const adjudications=readJSON(resolve(out,'adjudications.json'),{});
const allIssues=[],measurements=[];let issueNumber=0;
for(const route of selected){
  if(!await verifyServer(root,port))throw Error('Server identity changed');
  await page.goto(baseURL+route.path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1300);
  const slug=route.path.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'');
  await page.screenshot({path:resolve(out,'screenshots',`${slug}-page.png`),fullPage:true});
  const measured=await page.evaluate(measurePage);measurements.push({page:route.path,...measured});
  const findings=[...measured.findings,...manual.filter(f=>f.page===route.path)];
  const groups=new Map();
  for(const finding of findings){
    const element=measured.elements.find(e=>e.id===finding.elementId);
    const source=finding.file?{file:finding.file,line:finding.line}:sourceFor(element,finding.category);
    const key=`${route.path}:${finding.key||finding.category+':'+source.file+':'+source.line}`;
    if(adjudications[key]?.status==='dismissed')continue;
    let issue=groups.get(key);
    if(!issue){issue={id:`DR-${String(++issueNumber).padStart(3,'0')}`,page:route.path,viewport,category:finding.category,severity:finding.severity,description:finding.description,expected:finding.expected,actual:finding.actual,file:source.file,line:source.line,screenshot:null,status:adjudications[key]?.status||'open',key,spacing:finding.spacing,occurrences:[]};groups.set(key,issue);}
    const index=issue.occurrences.length+1;const id=`${issue.id}-${index}`;const screenshot=`screenshots/${slug}-${id}.png`;
    const locator=page.locator(finding.selector||'[data-unlocatable-review-target]');
    const count=await locator.count();let annotation=null,crop=null,fallbackReason=null,label=element?.text?.slice(0,75)||finding.description;
    await page.evaluate(()=>document.querySelectorAll('[data-design-review-overlay]').forEach(e=>e.remove()));
    if(count===1){
      await locator.scrollIntoViewIfNeeded();
      const current=await locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};});
      annotation=finding.spacing?.band||current;
      // Recompute spacing at capture time, including nested scrolling.
      if(finding.spacing)annotation=await page.evaluate(s=>{
        const a=document.querySelector(s.first).getBoundingClientRect(),b=document.querySelector(s.second).getBoundingClientRect();
        return s.axis==='x'?{x:Math.min(a.right,b.left)+scrollX,y:Math.max(a.top,b.top)+scrollY,width:Math.max(1,Math.abs(b.left-a.right)),height:Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)}:
          {x:Math.max(a.left,b.left)+scrollX,y:Math.min(a.bottom,b.top)+scrollY,width:Math.min(a.right,b.right)-Math.max(a.left,b.left),height:Math.max(1,Math.abs(b.top-a.bottom))};
      },finding.spacing);
      await page.evaluate(({r,band,index})=>{const overlay=document.createElement('div');overlay.dataset.designReviewOverlay='true';Object.assign(overlay.style,{position:'absolute',left:`${r.x}px`,top:`${r.y}px`,width:`${r.width}px`,height:`${r.height}px`,boxSizing:'border-box',border:'2px solid #ef174c',background:band?'rgba(239,23,76,.28)':'transparent',zIndex:'2147483647',pointerEvents:'none'});const caption=document.createElement('span');caption.textContent=`#${index} y=${r.y.toFixed(1)}`;Object.assign(caption.style,{position:'absolute',left:'-2px',top:'-15px',font:'9px/12px monospace',color:'#a50029',background:'#fff',whiteSpace:'nowrap'});overlay.append(caption);document.body.append(overlay);},{r:annotation,band:!!finding.spacing,index});
      const dimensions=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
      const x=Math.max(0,Math.floor(annotation.x-18)),y=Math.max(0,Math.floor(annotation.y-18));
      crop={x,y,width:Math.min(dimensions.width-x,Math.ceil(annotation.x+annotation.width+18)-x),height:Math.min(dimensions.height-y,Math.ceil(annotation.y+annotation.height+18)-y)};
      if(crop.width>0&&crop.height>0){await page.screenshot({path:resolve(out,screenshot),fullPage:true,clip:crop});}
      else{annotation=null;fallbackReason='Target is outside the document capture area';}
    }else fallbackReason=count>1?`Ambiguous selector (${count} elements); refine target`:'No rendered element for this finding';
    if(!annotation){await page.screenshot({path:resolve(out,screenshot),fullPage:true});crop=null;}
    const sha256=createHash('sha256').update(readFileSync(resolve(out,screenshot))).digest('hex');
    const occurrence={id,selector:finding.selector,file:source.file,line:source.line,screenshot,label,actual:finding.actual,annotation,crop,evidence:annotation?'annotated-crop':'full-page-fallback',annotationCount:annotation?1:0,fallbackReason,sha256};
    issue.occurrences.push(occurrence);issue.screenshot??=screenshot;
    await page.evaluate(()=>document.querySelectorAll('[data-design-review-overlay]').forEach(e=>e.remove()));
  }
  allIssues.push(...groups.values());
  // Correct gaps also receive live measured-band evidence, without becoming issues.
  for(const [index,gap] of measured.gaps.entries()){
    await page.evaluate(()=>scrollTo(0,0));
    const r=gap.band;
    await page.evaluate(({r,gap})=>{const band=document.createElement('div');band.dataset.designReviewOverlay='true';Object.assign(band.style,{position:'absolute',left:`${r.x}px`,top:`${r.y}px`,width:`${r.width}px`,height:`${r.height}px`,boxSizing:'border-box',border:'1px solid #006e65',background:'rgba(0,155,139,.25)',zIndex:'2147483647',pointerEvents:'none'});const label=document.createElement('span');label.textContent=`${gap.gap.toFixed(2)}px`;Object.assign(label.style,{position:'absolute',left:'0',top:'-14px',font:'9px/12px monospace',whiteSpace:'nowrap',background:'#fff',color:'#005e55'});band.append(label);document.body.append(band);},{r,gap});
    const width=await page.evaluate(()=>document.documentElement.scrollWidth),height=await page.evaluate(()=>document.documentElement.scrollHeight);
    const x=Math.max(0,Math.floor(r.x-18)),y=Math.max(0,Math.floor(r.y-18));
    const crop={x,y,width:Math.min(width-x,Math.ceil(r.x+Math.max(r.width,48)+18)-x),height:Math.min(height-y,Math.ceil(r.y+r.height+18)-y)};
    gap.screenshot=`screenshots/${slug}-gap-${index+1}.png`;gap.crop=crop;gap.annotationCount=1;
    await page.screenshot({path:resolve(out,gap.screenshot),fullPage:true,clip:crop});
    await page.evaluate(()=>document.querySelectorAll('[data-design-review-overlay]').forEach(e=>e.remove()));
  }
}
save('issues.json',allIssues);save('measurements.json',measurements);
const unchanged=JSON.stringify(before)===JSON.stringify(sourceHashes());
save('run.json',{createdAt:new Date().toISOString(),root,baseURL,serverIdentityVerified:true,reused,browser:browserKind,arguments:args,pages:selected.map(r=>r.path),discoveredRoutes:routes,skippedRoutes,galleryEvidence,baselineNote,baselineHash:createHash('sha256').update(baseline).digest('hex'),viewport,browserErrors,sourceUnchanged:unchanged,sourceHashes:before});
const summary=renderReport(out);
await browser.close();
if(!unchanged)throw Error('Application source changed during review');
console.log(JSON.stringify({baseURL,report:baseURL+'/design-review/review-report.html',pages:selected.map(r=>r.path),...summary,sourceUnchanged:unchanged},null,2));
