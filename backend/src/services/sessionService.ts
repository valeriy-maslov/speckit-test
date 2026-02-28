import { db } from '../db/client.js';
import { nowIso } from '../db/repository.js';
import { dateOnly } from './lifecycleRules.js';
import type { AppMode } from '../models/dailySession.js';

export const ensureSession = (): void => {
  const day = dateOnly();
  const row = db.prepare('SELECT session_date FROM daily_sessions WHERE session_date = ?').get(day);
  if (!row) {
    const now = nowIso();
    db.prepare(
      'INSERT INTO daily_sessions(session_date, active_mode, rollover_applied, created_at, updated_at) VALUES (?, ?, 0, ?, ?)'
    ).run(day, 'REVIEW', now, now);
  }
};

export const getMode = (): AppMode => {
  ensureSession();
  const day = dateOnly();
  const row = db.prepare('SELECT active_mode FROM daily_sessions WHERE session_date = ?').get(day) as
    | { active_mode: AppMode }
    | undefined;
  return row?.active_mode || 'REVIEW';
};

export const setMode = (mode: AppMode): AppMode => {
  ensureSession();
  const day = dateOnly();
  db.prepare('UPDATE daily_sessions SET active_mode = ?, updated_at = ? WHERE session_date = ?').run(
    mode,
    nowIso(),
    day
  );
  return mode;
};
