import { test, expect } from '@playwright/test';

const apiBase = 'http://localhost:3000/api';

test('completed todo remains visible, struck through, and below active todos in Focus mode', async ({ page, request }) => {
  const seed = Date.now();
  const activeTitle = `active-${seed}`;
  const completedTitle = `completed-${seed}`;

  const createActive = await request.post(`${apiBase}/todos`, { data: { title: activeTitle } });
  expect(createActive.ok()).toBeTruthy();
  const activeId = (await createActive.json()).id as string;

  const createCompleted = await request.post(`${apiBase}/todos`, { data: { title: completedTitle } });
  expect(createCompleted.ok()).toBeTruthy();
  const completedId = (await createCompleted.json()).id as string;

  await request.put(`${apiBase}/daily-list/${activeId}`);
  await request.put(`${apiBase}/daily-list/${completedId}`);
  await request.patch(`${apiBase}/todos/${completedId}`, { data: { status: 'COMPLETED' } });

  await page.goto('/');
  await page.click('[data-mode="FOCUS"]');

  const activeRow = page.locator('li', { hasText: activeTitle });
  const completedRow = page.locator('li', { hasText: completedTitle });
  await expect(activeRow).toBeVisible();
  await expect(completedRow).toBeVisible();
  await expect(completedRow.locator('span')).toHaveClass(/text-decoration-line-through/);

  const texts = await page.locator('.card ul li span').allTextContents();
  const activeIdx = texts.findIndex((t) => t.includes(activeTitle));
  const completedIdx = texts.findIndex((t) => t.includes(completedTitle));
  expect(activeIdx).toBeGreaterThan(-1);
  expect(completedIdx).toBeGreaterThan(activeIdx);

  await completedRow.locator('input.complete-toggle').uncheck();
  await expect(page.locator('li', { hasText: completedTitle }).locator('span')).not.toHaveClass(/text-decoration-line-through/);
});
