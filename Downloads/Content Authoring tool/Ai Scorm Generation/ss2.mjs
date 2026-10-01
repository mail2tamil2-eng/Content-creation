import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:5191/ai-create-course', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1500);

// Click Course Title input (below the "Course Title *" label)
await page.locator('label:has-text("Course Title") + input, label:has-text("Course Title") ~ input').first().fill('Leadership for New Managers').catch(() => {});
// Try direct approach - click the first input that's NOT the search bar
const allInputs = await page.locator('main input, div.cm-body input, .bg-white input[placeholder]').all();
for (const inp of allInputs) {
  const placeholder = await inp.getAttribute('placeholder').catch(() => '');
  console.log('input placeholder:', placeholder);
}

// Use the input with the Machine Learning placeholder
await page.locator('input[placeholder*="Machine"]').fill('Leadership for New Managers');
await page.waitForTimeout(500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/step1_titled.png' });

// Click generate
await page.locator('button').filter({ hasText: 'Generate Course' }).click();
await page.waitForTimeout(4500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/step2_main.png' });

await browser.close();
console.log('Done');
