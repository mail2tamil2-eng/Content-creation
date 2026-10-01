import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { verifyServer, freePort } from './identity.mjs';

const root=process.cwd(),out=resolve(root,'design-review');
const run=JSON.parse(readFileSync(resolve(out,'run.json')));
const issues=JSON.parse(readFileSync(resolve(out,'issues.json')));
assert.deepEqual(run.arguments,[],'First proof run must use default scope');
assert.deepEqual(run.pages,['/dashboard']);
assert.equal(run.sourceUnchanged,true);
assert.equal(await verifyServer(root,Number(new URL(run.baseURL).port)),true);
// A server with the correct package name and root string but no proof is rejected.
const fake=createServer((req,res)=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify({root,name:'@figma/my-make-file',proof:'invalid'}));});
await new Promise(r=>fake.listen(0,'127.0.0.1',r));
const recordPath=resolve(out,'.server.json'),recordText=readFileSync(recordPath,'utf8');
try{
  writeFileSync(recordPath,JSON.stringify({...JSON.parse(recordText),port:fake.address().port}));
  assert.equal(await verifyServer(root,fake.address().port),false);
}finally{writeFileSync(recordPath,recordText);}
await assert.rejects(freePort(fake.address().port),{code:'EADDRINUSE'});
await new Promise(r=>fake.close(r));
const occurrences=issues.flatMap(i=>i.occurrences);
for(const o of occurrences){
  if(o.evidence==='annotated-crop'){
    assert.equal(o.annotationCount,1);assert.ok(o.crop.width>=o.annotation.width&&o.crop.height>=o.annotation.height);
    const png=readFileSync(resolve(out,o.screenshot));
    assert.equal(png.readUInt32BE(16),o.crop.width);assert.equal(png.readUInt32BE(20),o.crop.height);
    assert.ok(o.annotation.x>=o.crop.x&&o.annotation.y>=o.crop.y);
    assert.ok(o.annotation.x+o.annotation.width<=o.crop.x+o.crop.width);
    assert.ok(o.annotation.y+o.annotation.height<=o.crop.y+o.crop.height);
  }else assert.ok(o.fallbackReason);
}
const grouped=issues.filter(i=>i.occurrences.length>1);
assert.ok(grouped.length,'Need an actual grouped finding for proof');
for(const group of grouped)assert.equal(new Set(group.occurrences.map(o=>o.sha256)).size,group.occurrences.length,'Occurrences must have distinct image bytes');
let browser;try{browser=await chromium.launch();}catch{browser=await chromium.launch({channel:'chrome'});}
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(run.baseURL+'/design-review/review-report.html',{waitUntil:'networkidle'});
assert.equal(await page.locator('article').count(),issues.filter(i=>i.status!=='dismissed').length);
assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).length),1,'Only unopened modal image should have no source');
await page.locator('.primary').first().click();assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
await page.screenshot({path:resolve(out,'screenshots/report-modal.png')});
await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);
await page.locator('.primary').first().click();await page.getByRole('button',{name:'Close evidence'}).click();assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);
await page.locator('.primary').first().click();await page.locator('dialog').click({position:{x:5,y:5}});assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);
const group=grouped.find(i=>i.category==='component-sizing'&&i.occurrences.length>=4)||grouped[0];const card=page.locator('#'+group.id);await card.scrollIntoViewIfNeeded();
await card.screenshot({path:resolve(out,'screenshots/grouped-card-proof.png')});
const thumbs=await card.locator('.strip img').evaluateAll(imgs=>imgs.map(i=>({natural:i.naturalWidth/i.naturalHeight,display:i.width/i.height,fit:getComputedStyle(i).objectFit})));
for(const t of thumbs){assert.ok(Math.abs(t.natural-t.display)<.02);assert.equal(t.fit,'contain');}
await card.locator('.strip button').last().click();assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);await page.keyboard.press('Escape');
await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:resolve(out,'screenshots/report-proof.png'),fullPage:true});
assert.deepEqual(errors,[]);
await browser.close();
const proof={passed:true,defaultScope:run.pages,identitySpoofRejected:true,occupiedPortRejected:true,occurrences:occurrences.length,annotated:occurrences.filter(o=>o.evidence==='annotated-crop').length,groupedCards:grouped.length,distinctOccurrenceImages:true,cropDimensionsVerified:true,modal:['open','Escape','close button','backdrop','thumbnail'],thumbnailAspectRatiosVerified:true,browserErrors:errors};
writeFileSync(resolve(out,'verification.json'),JSON.stringify(proof,null,2));console.log(JSON.stringify(proof,null,2));
