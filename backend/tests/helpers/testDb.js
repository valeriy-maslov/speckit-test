import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../..');
const workerId = process.env.VITEST_POOL_ID ?? process.env.VITEST_WORKER_ID ?? '0';
const testDbPath = path.join(backendRoot, 'data', `todo.test.${workerId}.db`);
let appInstance = null;
const nowIso = () => new Date().toISOString();
export const getTestDbPath = () => testDbPath;
export const bootstrapTestApp = async () => {
    if (appInstance)
        return appInstance;
    process.env.DB_PATH = testDbPath;
    if (fs.existsSync(testDbPath))
        fs.rmSync(testDbPath, { force: true });
    const { initDb } = await import('../../src/db/initDb.js');
    const { ensureSession } = await import('../../src/services/sessionService.js');
    const { evaluateLifecycleOnOpen } = await import('../../src/services/lifecycleService.js');
    const { app } = await import('../../src/app.js');
    initDb();
    ensureSession();
    evaluateLifecycleOnOpen();
    appInstance = app;
    return appInstance;
};
export const resetTestDb = async () => {
    await bootstrapTestApp();
    const { db } = await import('../../src/db/client.js');
    db.exec('DELETE FROM todo_items; DELETE FROM inbox_points; DELETE FROM daily_sessions;');
    const { ensureSession } = await import('../../src/services/sessionService.js');
    ensureSession();
};
export const seedTodo = async (input) => {
    await bootstrapTestApp();
    const { db } = await import('../../src/db/client.js');
    const createdAt = input.created_at ?? nowIso();
    const updatedAt = input.updated_at ?? createdAt;
    const todo = {
        id: input.id ?? randomUUID(),
        title: input.title.trim(),
        source_inbox_point_id: null,
        status: input.status ?? 'INBOX',
        is_stale: 0,
        created_at: createdAt,
        updated_at: updatedAt,
        daily_assigned_at: input.daily_assigned_at ?? null,
        completed_at: input.completed_at ?? null,
        stale_marked_at: null,
        trashed_at: null,
        last_activity_at: input.last_activity_at ?? updatedAt
    };
    db.prepare(`INSERT INTO todo_items (id,title,source_inbox_point_id,status,is_stale,created_at,updated_at,daily_assigned_at,completed_at,stale_marked_at,trashed_at,last_activity_at)
     VALUES (@id,@title,@source_inbox_point_id,@status,@is_stale,@created_at,@updated_at,@daily_assigned_at,@completed_at,@stale_marked_at,@trashed_at,@last_activity_at)`).run(todo);
    return { id: todo.id };
};
