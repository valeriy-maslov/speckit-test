CREATE TABLE IF NOT EXISTS inbox_points (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todo_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source_inbox_point_id TEXT,
  status TEXT NOT NULL CHECK(status IN ('INBOX','DAILY','COMPLETED','TRASH')),
  is_stale INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  daily_assigned_at TEXT,
  completed_at TEXT,
  stale_marked_at TEXT,
  trashed_at TEXT,
  last_activity_at TEXT NOT NULL,
  FOREIGN KEY(source_inbox_point_id) REFERENCES inbox_points(id)
);

CREATE TABLE IF NOT EXISTS daily_sessions (
  session_date TEXT PRIMARY KEY,
  active_mode TEXT NOT NULL CHECK(active_mode IN ('REVIEW','FOCUS')),
  rollover_applied INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
