const { test, expect } = require('@playwright/test');
const GoldBarPage = require('../src/pageObjects/goldBarPage');

test('should find the fake gold bar', async ({ page }) => {
  const goldBarPage = new GoldBarPage(page);
  await page.goto('/');

  const result = await goldBarPage.findFakeGoldBar();
  console.log('Fake gold bar found:', result);
});