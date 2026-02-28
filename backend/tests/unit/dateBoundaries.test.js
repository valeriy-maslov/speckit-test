import { beforeEach, describe, expect, it } from 'vitest';
import { dateOnlyFromIso } from '../../src/services/lifecycleRules.js';
import { bootstrapTestApp, resetTestDb, seedTodo } from '../helpers/testDb.js';
describe('Date boundaries', () => {
    beforeEach(async () => {
        await resetTestDb();
    });
    it('extracts UTC date from ISO timestamps', () => {
        expect(dateOnlyFromIso('2026-02-28T23:59:59.000Z')).toBe('2026-02-28');
        expect(dateOnlyFromIso(null)).toBeNull();
        expect(dateOnlyFromIso('bad-date')).toBeNull();
    });
    it('groups only same-day completed todos and keeps stable group ordering', async () => {
        await bootstrapTestApp();
        const { listFocusTodosForToday } = await import('../../src/services/todoService.js');
        const now = Date.now();
        const yesterday = new Date(now - 24 * 60 * 60 * 1000).toISOString();
        const a1 = new Date(now - 60_000).toISOString();
        const a2 = new Date(now - 50_000).toISOString();
        const c1 = new Date(now - 40_000).toISOString();
        const c2 = new Date(now - 30_000).toISOString();
        await seedTodo({ title: 'active-1', status: 'DAILY', created_at: a1, daily_assigned_at: a1 });
        await seedTodo({ title: 'active-2', status: 'DAILY', created_at: a2, daily_assigned_at: a2 });
        await seedTodo({ title: 'completed-1', status: 'COMPLETED', created_at: c1, completed_at: c1 });
        await seedTodo({ title: 'completed-2', status: 'COMPLETED', created_at: c2, completed_at: c2 });
        await seedTodo({ title: 'completed-old', status: 'COMPLETED', created_at: yesterday, completed_at: yesterday });
        const result = listFocusTodosForToday();
        expect(result.active.map((todo) => todo.title)).toEqual(['active-1', 'active-2']);
        expect(result.completed.map((todo) => todo.title)).toEqual(['completed-1', 'completed-2']);
    });
});
