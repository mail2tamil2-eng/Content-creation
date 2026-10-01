import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch({ 
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:5191/ai-create-course', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/step1.png', fullPage: false });
// Also scroll to see the full form
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/step1_full.png', fullPage: true });
await browser.close();
console.log('Done');
