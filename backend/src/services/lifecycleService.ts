import { db } from '../db/client.js';
import { nowIso } from '../db/repository.js';
import type { TodoItem } from '../models/todoItem.js';
import { isDailyStale, isInboxStale, shouldAutoTrash } from './lifecycleRules.js';

const markStaleAndTrash = (): void => {
  const todos = db.prepare("SELECT * FROM todo_items WHERE status!='TRASH'").all() as TodoItem[];
  const now = nowIso();
  for (const todo of todos) {
    const stale = isInboxStale(todo) || isDailyStale(todo);
    if (stale && todo.is_stale === 0) {
      db.prepare(
        'UPDATE todo_items SET is_stale=1, stale_marked_at=?, updated_at=? WHERE id=?'
      ).run(now, now, todo.id);
    }
    const refreshed = db.prepare('SELECT * FROM todo_items WHERE id=?').get(todo.id) as TodoItem;
    if (shouldAutoTrash(refreshed)) {
      db.prepare(
        "UPDATE todo_items SET status='TRASH', trashed_at=?, updated_at=? WHERE id=?"
      ).run(now, now, todo.id);
    }
  }
};

export const applyRollover = (): void => {
  const now = nowIso();
  db.prepare(
    "UPDATE todo_items SET status='INBOX', daily_assigned_at=NULL, updated_at=?, last_activity_at=? WHERE status='DAILY'"
  ).run(now, now);
  // Completed items remain completed by design.
  markStaleAndTrash();
};

export const evaluateLifecycleOnOpen = (): void => {
  markStaleAndTrash();
};
