import type { TodoItem } from '../models/todoItem.js';

const DAY_MS = 24 * 60 * 60 * 1000;

export const dateOnly = (d = new Date()): string => d.toISOString().slice(0, 10);

const olderThanDays = (iso: string | null, days: number): boolean => {
  if (!iso) return false;
  return Date.now() - new Date(iso).getTime() >= days * DAY_MS;
};

export const isInboxStale = (todo: TodoItem): boolean =>
  todo.status === 'INBOX' && olderThanDays(todo.created_at, 7);

export const isDailyStale = (todo: TodoItem): boolean =>
  todo.status === 'DAILY' && olderThanDays(todo.daily_assigned_at, 3);

export const shouldAutoTrash = (todo: TodoItem): boolean =>
  todo.is_stale === 1 && olderThanDays(todo.last_activity_at, 7);
