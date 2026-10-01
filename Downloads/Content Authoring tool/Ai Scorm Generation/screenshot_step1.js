const { chromium } = require('./node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5191/ai-create-course', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/M1582/AppData/Local/Temp/step1.png', fullPage: false });
  await browser.close();
  console.log('Done');
})();
