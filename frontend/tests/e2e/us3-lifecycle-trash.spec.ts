import { test, expect } from '@playwright/test';

test('US3 lifecycle trash placeholder', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
