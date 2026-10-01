import { readFileSync } from 'fs';
const content = readFileSync('src/app/pages/AICreateCoursePage.tsx', 'utf8');
const lines = content.split('\n');
// Find lines with non-ASCII
const problematic = lines.map((l, i) => ({i: i+1, l})).filter(({l}) => /[^\x00-\x7F]/.test(l));
console.log('Non-ASCII lines count:', problematic.length);
problematic.slice(0, 20).forEach(({i, l}) => {
  console.log(`Line ${i}: ${l.substring(0, 80)}`);
});
