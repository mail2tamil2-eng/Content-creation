import { test, expect } from '@playwright/test';
import JSZip from 'jszip';
import fs from 'node:fs/promises';
test.use({ channel: 'chrome', baseURL: 'http://127.0.0.1:5181', viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' });
test.setTimeout(90000);
test('publication gate, approval revisions, separate packages and source preservation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/courses');
  await expect(page.getByRole('button', { name: 'Translate Technical Business Communication', exact: true })).toBeDisabled();
  await page.goto('/courses/3/translations');
  await expect(page.getByText('Publish the course to enable translation.')).toBeVisible();
  await page.goto('/courses');
  const row = page.getByRole('row').filter({hasText:'Technical Business Communication'});
  await row.locator('button[title="Publish Course"]').click();
  await expect(page.getByRole('button', {name:'Translate Technical Business Communication', exact:true})).toBeEnabled();
  await page.getByRole('button', {name:'Translate Introduction to SCORM', exact:true}).click();
  await page.getByRole('radio', {name:'Tamil', exact:true}).check();

  await page.getByRole('button', {name:'Start translation', exact:true}).click();
  const generate = page.getByRole('button', {name:'Generate SCORM package', exact:true});
  await expect(generate).toBeDisabled();
  async function approve() {
    await page.getByRole('button', {name:'Preview translated course', exact:true}).click();
    await expect(page.getByTestId('translated-course-preview')).toBeVisible();
    await page.getByRole('button', {name:'Review & approve', exact:true}).click();
    await page.getByRole('checkbox', {name:'I have reviewed all translated content and approve this language version.'}).check();
    await page.getByRole('button', {name:'Approve translation', exact:true}).click();
  }

  const outputs = {};
  for (const language of ['Tamil','French']) {
    if (language === 'French') {
      await page.getByRole('radio',{name:'French',exact:true}).check();
      await expect(page.getByRole('radio',{name:'Tamil',exact:true})).not.toBeChecked();
      await expect(page.locator('input[name="target-language"]:checked')).toHaveCount(1);
      await expect(generate).toBeDisabled();
      await page.getByRole('button',{name:'Start translation',exact:true}).click();
      await page.locator('textarea').first().fill('Formation traduite');
    }
    await approve();
    await expect(generate).toBeEnabled();
    await generate.click();
    const wait = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download '+language+' SCORM',exact:true}).click();
    const d = await wait;
    const zip = await JSZip.loadAsync(await fs.readFile(await d.path()));
    expect(Object.keys(zip.files)).toEqual(expect.arrayContaining(['imsmanifest.xml','index.html','course.json','source.json','translation.json']));
    outputs[language] = { filename:d.suggestedFilename(), source:JSON.parse(await zip.file('source.json').async('string')), course:JSON.parse(await zip.file('course.json').async('string')) };
  }
  expect(outputs.Tamil.filename).not.toBe(outputs.French.filename);
  expect(outputs.French.course.title).toBe('Formation traduite');
  expect(outputs.Tamil.source).toEqual(outputs.French.source);
  for(const result of Object.values(outputs)) {
    expect(result.course.settings).toEqual(result.source.settings);
    expect(result.course.sections.map(s=>[s.id,s.topics.map(t=>[t.id,t.slideType,t.points,t.options?.map(o=>o.correct)])])).toEqual(result.source.sections.map(s=>[s.id,s.topics.map(t=>[t.id,t.slideType,t.points,t.options?.map(o=>o.correct)])]));
  }
  await page.getByRole('button',{name:'Edit translated content',exact:true}).click();
  await page.locator('textarea').first().fill('Version révisée');
  await expect(generate).toBeDisabled();
  await expect(page.getByRole('button',{name:'Download French SCORM',exact:true})).toHaveCount(0);
  await approve();
  page.once('dialog', dialog=>dialog.accept());
  await page.getByRole('button',{name:'Regenerate translation',exact:true}).click();
  await expect(generate).toBeDisabled();
  await expect(page.locator('textarea').first()).not.toHaveValue('Version révisée');
  await page.reload();
  await expect(page.getByRole('radio',{name:'French',exact:true})).toBeChecked();
  await expect(page.getByRole('button',{name:'French Needs review',exact:true})).toBeVisible();
  await expect(generate).toBeDisabled();
  await page.getByRole('radio',{name:'Tamil',exact:true}).check();
  await expect(page.getByRole('button',{name:'Tamil Approved',exact:true})).toBeVisible();
  await expect(generate).toBeEnabled();
  expect(errors).toEqual([]);
});

test('authoring publish exposes translation and preserves the published snapshot', async ({page}) => {
  await page.goto('/ai-create-course');
  await page.getByPlaceholder('e.g., Introduction to Machine Learning').fill('Review workflow course');
  await page.getByRole('button',{name:'Course design',exact:true}).click();
  await page.getByRole('button',{name:'Quiz',exact:true}).click();
  await page.getByRole('button',{name:'Micro-Learning',exact:true}).click();
  await page.getByRole('button',{name:'Details',exact:true}).click();
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByRole('button',{name:'Generate Outline',exact:true}).click();
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByRole('button',{name:'Confirm & Generate Content',exact:true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByRole('button',{name:'Publish',exact:true}).click();
  await expect(page.getByRole('button',{name:'Translate course',exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'Publish',exact:true}).last().click();
  await expect(page.getByRole('heading',{name:'Course Published',exact:true})).toBeVisible();
  await expect(page.getByRole('region',{name:'Course translations',exact:true})).toHaveCount(0);
  await page.screenshot({path:'test-results/publish-success.png'});
  await page.getByRole('button',{name:'Translate course',exact:true}).click();
  await expect(page).toHaveURL(/\/courses\/\d+\/translations$/);
  await expect(page.getByRole('heading',{name:'Course Published',exact:true})).toHaveCount(0);
  await page.getByRole('radio',{name:'Tamil',exact:true}).check();
  await page.getByRole('button',{name:'Start translation',exact:true}).click();
  await page.locator('textarea').first().fill('Edited translation');
  await page.getByRole('link',{name:'← Back to My Courses',exact:true}).click();
  await page.getByRole('link',{name:'My Courses',exact:true}).click();
  await page.getByRole('button',{name:'Translate Review workflow course',exact:true}).click();
  await page.getByRole('button',{name:'Tamil Needs review',exact:true}).click();
  await expect(page.locator('textarea').first()).toHaveValue('Edited translation');
  const source = await page.evaluate(() => JSON.parse(localStorage.getItem('authoring-courses-v1')).find(c=>c.name==='Review workflow course').sourceSnapshot);
  expect(source.title).toBe('Review workflow course');
  expect(source.sections).toHaveLength(5);
  expect(source.settings.selectedTemplate).toBe('vivid-blue');
  expect(source.settings.bookmarking).toBe(true);
});
