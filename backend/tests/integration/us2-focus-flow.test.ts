import { beforeEach, describe, expect, it } from 'vitest';
import { bootstrapTestApp, resetTestDb } from '../helpers/testDb.js';

describe('US2 integration', () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it('keeps a completed todo visible in focus results after reload on the same day', async () => {
    await bootstrapTestApp();
    const { createTodo, setDailyAssignment, updateTodo, listFocusTodosForToday } = await import(
      '../../src/services/todoService.js'
    );
    const created = createTodo('integration-task');

    setDailyAssignment(created.id, true);
    updateTodo(created.id, { status: 'COMPLETED' });

    const firstRead = listFocusTodosForToday();
    const secondRead = listFocusTodosForToday();

    expect(firstRead.completed.map((t) => t.id)).toContain(created.id);
    expect(secondRead.completed.map((t) => t.id)).toContain(created.id);
  });

  it('preserves completed status and moves item back to active when unchecked', async () => {
    await bootstrapTestApp();
    const { createTodo, setDailyAssignment, updateTodo, listFocusTodosForToday } = await import(
      '../../src/services/todoService.js'
    );
    const created = createTodo('status-task');

    setDailyAssignment(created.id, true);
    const completed = updateTodo(created.id, { status: 'COMPLETED' });
    expect(completed?.status).toBe('COMPLETED');
    expect(completed?.completed_at).toBeTruthy();

    const focusCompleted = listFocusTodosForToday();
    expect(focusCompleted.completed.map((t) => t.id)).toContain(created.id);

    const daily = updateTodo(created.id, { status: 'DAILY' });
    expect(daily?.status).toBe('DAILY');
    expect(daily?.completed_at).toBeNull();

    const focusActive = listFocusTodosForToday();
    expect(focusActive.active.map((t) => t.id)).toContain(created.id);
  });
});
