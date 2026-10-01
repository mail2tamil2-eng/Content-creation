import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Step 1
await page.goto('http://127.0.0.1:5191/ai-create-course');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:\\Users\\M1582\\Downloads\\Content Authoring tool\\d1_step1.png' });

// Fill title and generate
await page.locator('label:has-text("Course Title") input').click();
await page.locator('label:has-text("Course Title") input').fill('Customer Service Excellence');
await page.waitForTimeout(400);
await page.screenshot({ path: 'C:\\Users\\M1582\\Downloads\\Content Authoring tool\\d1_step1_filled.png' });
await page.locator('button:has-text("Generate Course")').click();
await page.waitForTimeout(4000);

// Step 2 - default
await page.screenshot({ path: 'C:\\Users\\M1582\\Downloads\\Content Authoring tool\\d1_step2.png' });

// Step 2 - collapse left
await page.locator('button[title="Collapse sidebar"]').click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'C:\\Users\\M1582\\Downloads\\Content Authoring tool\\d1_step2_left_collapsed.png' });

// Step 2 - collapse right too
await page.locator('button[title="Collapse panel"]').click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'C:\\Users\\M1582\\Downloads\\Content Authoring tool\\d1_step2_both_collapsed.png' });

await browser.close();
console.log('done');