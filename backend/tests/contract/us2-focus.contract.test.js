import { beforeEach, describe, expect, it } from 'vitest';
import { bootstrapTestApp, resetTestDb, seedTodo } from '../helpers/testDb.js';
describe('US2 contract', () => {
    beforeEach(async () => {
        await resetTestDb();
    });
    it('returns active todos and only same-day completed todos', async () => {
        await bootstrapTestApp();
        const { listFocusTodosForToday } = await import('../../src/services/todoService.js');
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        await seedTodo({
            title: 'active-daily',
            status: 'DAILY',
            created_at: today.toISOString(),
            daily_assigned_at: today.toISOString()
        });
        await seedTodo({
            title: 'completed-today',
            status: 'COMPLETED',
            created_at: today.toISOString(),
            completed_at: today.toISOString()
        });
        await seedTodo({
            title: 'completed-yesterday',
            status: 'COMPLETED',
            created_at: yesterday.toISOString(),
            completed_at: yesterday.toISOString()
        });
        const res = listFocusTodosForToday();
        expect(Array.isArray(res.active)).toBe(true);
        expect(Array.isArray(res.completed)).toBe(true);
        expect(res.active.map((t) => t.title)).toContain('active-daily');
        expect(res.completed.map((t) => t.title)).toContain('completed-today');
        expect(res.completed.map((t) => t.title)).not.toContain('completed-yesterday');
    });
    it('returns deterministic ordering inside active and completed groups', async () => {
        await bootstrapTestApp();
        const { listFocusTodosForToday } = await import('../../src/services/todoService.js');
        const now = Date.now();
        const t1 = new Date(now - 60_000).toISOString();
        const t2 = new Date(now - 30_000).toISOString();
        const t3 = new Date(now - 20_000).toISOString();
        const t4 = new Date(now - 10_000).toISOString();
        await seedTodo({ title: 'a-first', status: 'DAILY', created_at: t1, daily_assigned_at: t1 });
        await seedTodo({ title: 'a-second', status: 'DAILY', created_at: t2, daily_assigned_at: t2 });
        await seedTodo({ title: 'c-first', status: 'COMPLETED', created_at: t3, completed_at: t3 });
        await seedTodo({ title: 'c-second', status: 'COMPLETED', created_at: t4, completed_at: t4 });
        const res = listFocusTodosForToday();
        expect(res.active.map((t) => t.title)).toEqual(['a-first', 'a-second']);
        expect(res.completed.map((t) => t.title)).toEqual(['c-first', 'c-second']);
    });
});
