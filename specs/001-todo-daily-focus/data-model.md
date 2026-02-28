# Data Model: Daily Focus Todo Manager

## InboxPoint
- **Purpose**: Captures raw planning points before conversion into actionable todos.
- **Fields**:
  - `id` (UUID/string)
  - `text` (non-empty string, max 500 chars)
  - `created_at` (datetime)
  - `updated_at` (datetime)
- **Validation**:
  - `text` is required and trimmed.
- **Relationships**:
  - One-to-many to `TodoItem` via `source_inbox_point_id`.

## TodoItem
- **Purpose**: Represents actionable work tracked across inbox, daily list, completion, stale, and trash states.
- **Fields**:
  - `id` (UUID/string)
  - `title` (non-empty string, max 300 chars)
  - `source_inbox_point_id` (nullable foreign key to InboxPoint)
  - `status` (enum: `INBOX`, `DAILY`, `COMPLETED`, `TRASH`)
  - `is_stale` (boolean)
  - `created_at` (datetime)
  - `updated_at` (datetime)
  - `daily_assigned_at` (nullable datetime)
  - `completed_at` (nullable datetime)
  - `stale_marked_at` (nullable datetime)
  - `trashed_at` (nullable datetime)
  - `last_activity_at` (datetime; updates on content/state changes)
- **Validation**:
  - `title` is required and trimmed.
  - Nested relationship fields are disallowed (top-level item model only).
- **Relationships**:
  - Optional many-to-one to `InboxPoint`.

## DailySession
- **Purpose**: Tracks per-day app mode and rollover execution metadata.
- **Fields**:
  - `session_date` (date, primary key)
  - `active_mode` (enum: `REVIEW`, `FOCUS`)
  - `rollover_applied` (boolean)
  - `created_at` (datetime)
  - `updated_at` (datetime)
- **Validation**:
  - Exactly one record per calendar date.

## State Transition Rules
- `INBOX -> DAILY`: user assigns item to today.
- `DAILY -> COMPLETED`: user marks item done.
- `COMPLETED -> DAILY`: user reopens previously completed item.
- `DAILY -> INBOX`: unfinished item moved to inbox top during rollover.
- `INBOX/DAILY/COMPLETED -> TRASH`: stale and unchanged for additional 7 days.
- `COMPLETED` on rollover: remains `COMPLETED` (no automatic move to inbox).
- `TRASH`: terminal retained state; item remains accessible indefinitely.

## Derived Lifecycle Rules
- **Stale by inbox age**: `status = INBOX` and `created_at <= now - 7 days`.
- **Stale by incomplete daily age**: `status = DAILY` and `daily_assigned_at <= now - 3 days`.
- **Auto-trash eligible**: `is_stale = true` and `last_activity_at <= now - 7 days`.
- **Rollover trigger**: run automatically on first app open each new day; manual trigger allowed.
