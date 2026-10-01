import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch({ 
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const context = await browser.newContext({ 
  viewport: { width: 1440, height: 900 }
});
const page = await context.newPage();
// Log any console errors
page.on('console', msg => {
  if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
});
await page.goto('http://127.0.0.1:5191/ai-create-course');
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3000);

// Debug: get all inputs
const inputs = await page.locator('input').all();
console.log('Input count:', inputs.length);

// Take screenshot regardless
await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/s1_debug.png' });

await browser.close();
console.log('Done');
