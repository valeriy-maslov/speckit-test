import { db } from '../db/client.js';
import { genId, nowIso } from '../db/repository.js';
import type { TodoItem, TodoStatus } from '../models/todoItem.js';
import { dateOnly, dateOnlyFromIso } from './lifecycleRules.js';

export interface FocusTodoGroups {
  active: TodoItem[];
  completed: TodoItem[];
}

export const listTodos = (status?: TodoStatus): TodoItem[] => {
  if (status) {
    return db
      .prepare('SELECT * FROM todo_items WHERE status = ? ORDER BY updated_at DESC')
      .all(status) as TodoItem[];
  }
  return db.prepare('SELECT * FROM todo_items ORDER BY updated_at DESC').all() as TodoItem[];
};

export const createTodo = (title: string, sourceId?: string | null): TodoItem => {
  const now = nowIso();
  const todo: TodoItem = {
    id: genId(),
    title: title.trim(),
    source_inbox_point_id: sourceId ?? null,
    status: 'INBOX',
    is_stale: 0,
    created_at: now,
    updated_at: now,
    daily_assigned_at: null,
    completed_at: null,
    stale_marked_at: null,
    trashed_at: null,
    last_activity_at: now
  };
  db.prepare(
    `INSERT INTO todo_items (id,title,source_inbox_point_id,status,is_stale,created_at,updated_at,daily_assigned_at,completed_at,stale_marked_at,trashed_at,last_activity_at)
     VALUES (@id,@title,@source_inbox_point_id,@status,@is_stale,@created_at,@updated_at,@daily_assigned_at,@completed_at,@stale_marked_at,@trashed_at,@last_activity_at)`
  ).run(todo);
  return todo;
};

export const setDailyAssignment = (id: string, assigned: boolean): void => {
  const now = nowIso();
  if (assigned) {
    db.prepare(
      "UPDATE todo_items SET status='DAILY', daily_assigned_at=?, updated_at=?, last_activity_at=? WHERE id=? AND status!='TRASH'"
    ).run(now, now, now, id);
  } else {
    db.prepare(
      "UPDATE todo_items SET status='INBOX', daily_assigned_at=NULL, updated_at=?, last_activity_at=? WHERE id=? AND status!='TRASH'"
    ).run(now, now, id);
  }
};

export const updateTodo = (id: string, patch: Partial<{ title: string; status: TodoStatus }>): TodoItem | null => {
  const existing = db.prepare('SELECT * FROM todo_items WHERE id=?').get(id) as TodoItem | undefined;
  if (!existing) return null;
  const now = nowIso();
  const title = patch.title?.trim() ?? existing.title;
  const status = patch.status ?? existing.status;
  const completedAt = status === 'COMPLETED' ? now : status === 'DAILY' ? null : existing.completed_at;
  db.prepare(
    'UPDATE todo_items SET title=?, status=?, completed_at=?, updated_at=?, last_activity_at=? WHERE id=?'
  ).run(title, status, completedAt, now, now, id);
  return db.prepare('SELECT * FROM todo_items WHERE id=?').get(id) as TodoItem;
};

export const listTrash = (): TodoItem[] =>
  db.prepare("SELECT * FROM todo_items WHERE status='TRASH' ORDER BY trashed_at DESC").all() as TodoItem[];

export const listFocusTodosForToday = (): FocusTodoGroups => {
  const today = dateOnly();
  const active = db
    .prepare("SELECT * FROM todo_items WHERE status='DAILY' ORDER BY created_at ASC, id ASC")
    .all() as TodoItem[];
  const completed = db
    .prepare("SELECT * FROM todo_items WHERE status='COMPLETED' ORDER BY created_at ASC, id ASC")
    .all() as TodoItem[];
  return {
    active,
    completed: completed.filter((todo) => dateOnlyFromIso(todo.completed_at) === today)
  };
};
