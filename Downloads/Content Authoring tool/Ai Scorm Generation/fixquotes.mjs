import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/app/pages/AICreateCoursePage.tsx', 'utf8');
// Replace smart single quotes with straight
content = content.replace(/[‘’]/g, "'");
// Replace smart double quotes with straight
content = content.replace(/[“”]/g, '"');
writeFileSync('src/app/pages/AICreateCoursePage.tsx', content, 'utf8');
// Verify
const lines = content.split('\n');
const problems = lines.map((l,i) => ({l,i:i+1})).filter(({l}) => !/^\s*(\/\/|\{\/\*)/.test(l) && /[^\x00-\x7F]/.test(l));
console.log('Non-comment non-ASCII lines:', problems.length);
if (problems.length) problems.forEach(({i,l}) => console.log(i, l.substring(0,80)));
