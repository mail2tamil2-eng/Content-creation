import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:5191/ai-create-course', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/ss1.png' });

// Scroll to see theme + settings
await page.evaluate(() => window.scrollTo(0, 550));
await page.waitForTimeout(400);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/ss1b.png' });

// Fill title
await page.evaluate(() => window.scrollTo(0, 0));
const inputs = await page.locator('input').all();
console.log('inputs found:', inputs.length);
if (inputs.length > 0) await inputs[0].fill('Leadership for New Managers');
await page.waitForTimeout(500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/ss1c.png' });

// Click Intermediate complexity
await page.locator('button').filter({ hasText: 'Intermediate' }).click();
await page.waitForTimeout(300);

// Click generate
await page.locator('button').filter({ hasText: 'Generate' }).first().click();
await page.waitForTimeout(4500);
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/ss2.png' });

// Click a slide in the list
const slideButtons = await page.locator('aside').first().locator('button').all();
console.log('slide buttons:', slideButtons.length);
if (slideButtons.length > 2) {
  await slideButtons[2].click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/ss2b.png' });
}

await browser.close();
console.log('Done');
