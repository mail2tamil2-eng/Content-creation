// Executed in the browser. All rectangles use document CSS pixels at DPR 1.
export function measurePage() {
  const elements = [...document.querySelectorAll('body *')].filter(e =>
    (e instanceof HTMLElement || e instanceof SVGSVGElement) && !['SCRIPT','STYLE','LINK','NOSCRIPT'].includes(e.tagName) &&
    !e.closest('[data-design-review-overlay]') && e.getBoundingClientRect().width > 0 &&
    e.getBoundingClientRect().height > 0 && getComputedStyle(e).visibility !== 'hidden');
  const rect = e => { const r=e.getBoundingClientRect(); return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height}; };
  const styleFields=['color','backgroundColor','backgroundImage','borderRadius','boxShadow','fontSize','fontWeight','overflowX','overflowY','display','position','gap','justifyContent'];
  const data = elements.map((e,i) => {
    e.dataset.reviewId=String(i);
    const s=getComputedStyle(e);
    const ownText=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
    let fiber=e[Object.keys(e).find(k=>k.startsWith('__reactFiber'))];const owners=[];
    for(let n=0;fiber&&n<24;n++,fiber=fiber.return)if(fiber._debugSource?.fileName&&!owners.includes(fiber._debugSource.fileName))owners.push(fiber._debugSource.fileName);
    return {id:i,selector:`[data-review-id="${i}"]`,tag:e.tagName,text:e.innerText?.slice(0,250),ownText,owners,
      className:e.getAttribute('class')||'',rect:rect(e),style:Object.fromEntries(styleFields.map(k=>[k,s[k]])),
      scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,
      parentId:Number(e.parentElement?.dataset.reviewId), disabled:!!e.closest(':disabled,[aria-disabled="true"]')};
  });
  const findings=[]; const gaps=[]; const skipped=[];
  const add=(e,category,description,expected,actual,key,severity='medium',extra={}) => findings.push({
    selector:`[data-review-id="${e.dataset.reviewId}"]`,elementId:Number(e.dataset.reviewId),category,description,expected,actual,key,severity,...extra});
  for(const parent of elements){
    const ps=getComputedStyle(parent);
    const children=[...parent.children].filter(e=>(e instanceof HTMLElement||e instanceof SVGSVGElement) && e.dataset.reviewId && !['absolute','fixed'].includes(getComputedStyle(e).position));
    // Find nearest geometric neighbor on each axis, including the next wrapped row.
    const seen=new Set();
    for(const a of children) for(const axis of ['x','y']) {
      const ar=rect(a), cross=axis==='x'?'y':'x', size=axis==='x'?'width':'height', cs=axis==='x'?'height':'width';
      const candidates=children.filter(b=>b!==a).map(b=>({b,r:rect(b)})).filter(({r})=>
        r[axis]>ar[axis]+0.5 && Math.min(ar[cross]+ar[cs],r[cross]+r[cs])-Math.max(ar[cross],r[cross])>1)
        .sort((a,b)=>a.r[axis]-b.r[axis]);
      if(!candidates.length)continue;
      const {b,r:br}=candidates[0]; const pair=`${a.dataset.reviewId}-${b.dataset.reviewId}-${axis}`;
      if(seen.has(pair))continue; seen.add(pair);
      const gap=br[axis]-(ar[axis]+ar[size]);
      const nearest=Math.round(gap/4)*4;
      let classification=Math.abs(gap-nearest)<0.25?'on-rhythm':'drifting';
      let reason=`${br[axis].toFixed(2)} - (${ar[axis].toFixed(2)} + ${ar[size].toFixed(2)}) = ${gap.toFixed(2)}px; nearest 4px step ${nearest}px; delta ${(gap-nearest).toFixed(2)}px`;
      if(gap<-.5)classification='broken';
      else if(gap<4 && gap>.25)classification='too-tight';
      const inline=['inline','inline-block'].includes(getComputedStyle(a).display) || ps.display.startsWith('table') || ['TH','TD'].includes(a.tagName);
      if(gap>=-.25 && (inline || ['space-between','space-around','space-evenly','center'].includes(ps.justifyContent) || Math.abs(gap-2)<.25 || gap===0)) {
        classification='deliberate'; reason+='; inline/table/distributed/touching or 2px micro-layout';
      }
      const overlapStart=Math.max(ar[cross],br[cross]), overlapEnd=Math.min(ar[cross]+ar[cs],br[cross]+br[cs]);
      const band=axis==='x'?{x:Math.min(ar.x+ar.width,br.x),y:overlapStart,width:Math.max(1,Math.abs(gap)),height:overlapEnd-overlapStart}:
        {x:overlapStart,y:Math.min(ar.y+ar.height,br.y),width:overlapEnd-overlapStart,height:Math.max(1,Math.abs(gap))};
      const measurement={pair,first:`[data-review-id="${a.dataset.reviewId}"]`,second:`[data-review-id="${b.dataset.reviewId}"]`,axis,gap,classification,arithmetic:reason,band,
        rhythm:{name:'Compact 4px rhythm',values:[8,16,24,32],labels:['tight','related','section','region']}};
      gaps.push(measurement);
      if(['drifting','broken','too-tight'].includes(classification))add(b,'spacing',`${classification} ${axis==='x'?'horizontal':'vertical'} gap`,
        'Use a deliberate gap or a named rhythm value',`${gap.toFixed(2)}px`, `spacing:${parent.className}:${a.className}:${b.className}:${axis}`,classification==='broken'?'high':'low',{spacing:measurement});
    }
    if((ps.display==='grid'||ps.display==='flex') && children.length>1){
      const rows=[];
      for(const e of children){const r=rect(e);let row=rows.find(row=>Math.abs(row[0].r.y-r.y)<Math.min(row[0].r.height,r.height)/2);if(!row)rows.push(row=[]);row.push({e,r});}
      for(const row of rows.filter(row=>row.length>1)){
        const tops=row.map(x=>x.r.y);const min=Math.min(...tops);
        // Only review top edges in start-aligned rows, not intentionally centered controls.
        if(!['center','end','flex-end','baseline'].includes(ps.alignItems))for(const {e,r} of row)if(r.y-min>1)
          add(e,'layout-breaking','A row sibling starts below its peers',`Top ${min.toFixed(2)}px`,`Top ${r.y.toFixed(2)}px; offset ${(r.y-min).toFixed(2)}px`,`row-top:${parent.className}`,'high');
        const cards=row.filter(({e})=>{const s=getComputedStyle(e.firstElementChild||e);return parseFloat(s.borderRadius)>0 && rect(e).width>120;});
        if(cards.length>=3){
          const signatures=cards.map(({e})=>{let target=e; if(!parseFloat(getComputedStyle(e).borderRadius)&&e.firstElementChild)target=e.firstElementChild;const s=getComputedStyle(target);return {target,radius:s.borderRadius,shadow:s.boxShadow,height:rect(target).height};});
          for(const field of ['radius','shadow']){const counts=new Map();signatures.forEach(x=>counts.set(x[field],(counts.get(x[field])||0)+1));const baseline=[...counts].sort((a,b)=>b[1]-a[1])[0];if(baseline[1]>=2)for(const x of signatures)if(x[field]!==baseline[0])add(x.target,field,`Repeated card has inconsistent ${field}`,baseline[0],x[field],`peer-${field}:${parent.className}`);}
        }
      }
    }
  }
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d',{willReadFrequently:true});
  const rgb=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data];};
  const luminance=c=>c.slice(0,3).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
  for(const d of data){
    const e=elements[d.id],s=getComputedStyle(e);
    if(d.ownText && !d.disabled){
      let bg=[255,255,255,255], chain=[],uncertain=false;
      for(let p=e;p;p=p.parentElement){const st=getComputedStyle(p);if(st.backgroundImage!=='none'||Number(st.opacity)<1){uncertain=true;break;}const c=rgb(st.backgroundColor);chain.push(c);if(c[3]===255)break;}
      for(const c of chain.reverse()){const alpha=c[3]/255;bg=c.slice(0,3).map((x,i)=>x*alpha+bg[i]*(1-alpha)).concat(255);}
      if(!uncertain){let fg=rgb(s.color);const alpha=fg[3]/255;fg=fg.slice(0,3).map((x,i)=>x*alpha+bg[i]*(1-alpha));const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&Number(s.fontWeight)>=700);const threshold=large?3:4.5;
        if(ratio<threshold)add(e,'contrast','Text contrast below the review threshold',`${threshold}:1 or better`,`${ratio.toFixed(2)}:1`, `contrast:${s.color}:${bg.join(',')}:${threshold}`, 'medium',{contrast:{ratio,threshold,foreground:fg,background:bg}});
      }else skipped.push({selector:d.selector,check:'contrast',reason:'Gradient/image/opacity requires visual judgment'});
    }
    if(d.ownText && d.scrollWidth>d.clientWidth+1 && ['hidden','clip'].includes(s.overflowX))
      add(e,'text-clipping','Text is clipped or ellipsized', 'Readable full label or accessible full-text disclosure',`${d.scrollWidth}px content in ${d.clientWidth}px`, `clip:${e.className}`,'medium');
    if(d.ownText && d.scrollHeight>d.clientHeight+1 && ['hidden','clip'].includes(s.overflowY))
      add(e,'text-clipping','Text is vertically clipped','All lines visible',`${d.scrollHeight}px content in ${d.clientHeight}px`,`vertical-clip:${e.className}`,'high');
    if(d.scrollWidth>d.clientWidth+2 && ['auto','scroll'].includes(s.overflowX))
      add(e,'overflow','Content needs horizontal scrolling at desktop width','Primary content and actions visible at web width',`${d.scrollWidth}px content in ${d.clientWidth}px viewport`, `overflow:${e.className}`,'medium');
    if(/(?:bg|text|border)-\[#[\da-fA-F]{3,8}\]/.test(d.className))add(e,'hardcoded-color','Literal color bypasses the design tokens','Named semantic token',d.className.match(/(?:bg|text|border)-\[#[\da-fA-F]{3,8}\]/g).join(', '),`literal:${d.className}`,'low');
    if(e.dataset.slot && /(?:bg|text|border)-(?:blue|gray|green|amber|pink|orange|red|purple)-\d/.test(e.className))add(e,'component-override','Shared component palette is overridden with raw palette utilities','Documented semantic component variant',e.className,`override:${e.dataset.slot}`,'low');
  }
  return {elements:data,gaps,findings,skipped,document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}};
}
