import { readFileSync, writeFileSync } from 'fs';
const raw = readFileSync('src/app/pages/AICreateCoursePage.tsx');
let content = raw.toString('utf8');
// Remove all BOM characters (U+FEFF)
content = content.replace(/﻿/g, '');
// Fix double-encoded middle dot: Â· -> ,
content = content.replace(/Â·/g, ',');
writeFileSync('src/app/pages/AICreateCoursePage.tsx', content, { encoding: 'utf8' });
// Verify first bytes
const check = readFileSync('src/app/pages/AICreateCoursePage.tsx');
console.log('First 6 bytes:', [...check.slice(0,6)].map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log('First 20 chars:', check.toString('utf8').slice(0,20));
