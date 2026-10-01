import { test, expect } from '@playwright/test';
test.use({ channel: 'chrome', baseURL: 'http://127.0.0.1:5181', viewport: {width:1440,height:1000} });
test('translation preview keeps published design and renders selected language and edits', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/courses');
  await page.evaluate(() => {
    const courses = JSON.parse(localStorage.getItem('authoring-courses-v1')!);
    courses[0].sourceSnapshot = {
      title: 'Safety essentials',
      sections: [{id:'s1',title:'Introduction',description:'',topics:[
        {id:'t1',title:'Course Overview',slideType:'title-bullets',content:'Welcome',bullets:['Check your equipment','Follow instructions']},
        {id:'t2',title:'Learning Objectives',slideType:'audio',audioScript:'Listen carefully'},
      ]}],
      settings:{presentationSettings:{template:'royal-purple',primary:'#6d28d9',accent:'#d4a843',background:'#111827',font:'Arial',buttonStyle:'pill',layout:'single'}},
    };
    localStorage.setItem('authoring-courses-v1',JSON.stringify(courses));
  });
  await page.goto('/courses/1/translations');
  await page.getByRole('radio',{name:'Tamil',exact:true}).check();
  await page.getByRole('button',{name:'Start translation',exact:true}).click();
  await page.locator('textarea').first().fill('பாதுகாப்பு பயிற்சி');
  await page.getByRole('button',{name:'Preview translated course',exact:true}).click();
  const preview = page.getByTestId('translated-course-preview');
  const slide = preview.getByTestId('course-presentation');
  await expect(preview.locator('[lang="ta"]')).toBeVisible();
  await expect(slide).toHaveAttribute('data-template','royal-purple');
  await expect(slide.locator('.course-slide')).toHaveCSS('background-color','rgb(17, 24, 39)');
  await expect(slide).toContainText('பாதுகாப்பு பயிற்சி');
  await expect(slide.locator('h2')).toHaveText('பாடத்தின் கண்ணோட்டம்');
  await expect(slide.locator('li').first()).toContainText('பாட உள்ளடக்கம்');
  await expect(page.getByRole('button',{name:'Previous translated slide'})).toBeDisabled();
  await preview.screenshot({path:'test-results/translated-tamil-preview.png'});
  await page.getByRole('button',{name:'Next translated slide'}).click();
  await expect(slide).toContainText('Listen carefully');
  await expect(page.getByRole('button',{name:'Next translated slide'})).toBeDisabled();
  await page.getByRole('radio',{name:'French',exact:true}).check();
  await page.getByRole('button',{name:'Start translation',exact:true}).click();
  await page.getByRole('button',{name:'Preview translated course',exact:true}).click();
  await expect(preview.locator('[lang="fr"]')).toBeVisible();
  await expect(slide.locator('h2')).toHaveText('Présentation du cours');
  await expect(slide).not.toContainText('பாதுகாப்பு பயிற்சி');
  await expect(slide).toHaveAttribute('data-template','royal-purple');
  expect(errors).toEqual([]);
});
