import { test, expect } from '@playwright/test';

test('US1 daily review flow placeholder', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Daily Focus/);
});
