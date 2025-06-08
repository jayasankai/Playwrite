import { test, expect } from '@playwright/test';

test.describe('Wikipedia login and search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logged in user should be able to search', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
    await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('NEW ZEALAND');
    await page.getByRole('button', { name: 'Search' }).click();
  });

    test('logged in user should be able to click link', async ({ page }) => {
      await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
      await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('end to end test');
      await page.getByRole('button', { name: 'Search' }).click();
      await page.getByRole('link', { name: 'integration', exact: true }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Personal tools' }).check();
    await page.getByRole('link', { name: 'Log out' }).click();
    await page.getByRole('heading', { name: 'Log out' }).click();
  });
});