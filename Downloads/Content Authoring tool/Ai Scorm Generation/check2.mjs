import { readFileSync } from 'fs';
const content = readFileSync('src/app/pages/AICreateCoursePage.tsx', 'utf8');
const lines = content.split('\n');
// Find non-ASCII that are NOT in JS or JSX comments
const problematic = lines.map((l, i) => ({i: i+1, l})).filter(({l}) => {
  if (/^\s*\/\//.test(l)) return false; // JS comment
  if (/^\s*\{\/\*/.test(l)) return false; // JSX comment  
  if (/\*\/$/.test(l)) return false; // end of JSX comment
  return /[^\x00-\x7F]/.test(l);
});
console.log('Non-comment non-ASCII count:', problematic.length);
problematic.forEach(({i, l}) => {
  console.log(`Line ${i}: ${l}`);
});
