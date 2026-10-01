import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch({ 
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:5192/ai-create-course', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/s1_clean.png' });

// Scroll to see theme and settings sections
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(400);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/s1_theme.png' });

// Fill title
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
const inputs = await page.locator('input').all();
console.log('Input count:', inputs.length);
if (inputs.length > 0) {
  await inputs[0].fill('Leadership for New Managers');
}
await page.waitForTimeout(500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/s1_filled.png' });

// Click Generate
const genBtn = page.locator('button').filter({ hasText: 'Generate Course' });
await genBtn.click();
await page.waitForTimeout(4000);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/s2_preview.png' });

await browser.close();
console.log('All done');
