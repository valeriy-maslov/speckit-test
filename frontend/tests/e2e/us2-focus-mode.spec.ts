import { test, expect } from '@playwright/test';

test('US2 focus mode placeholder', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
