# Data Model: Preserve Completed Todos Until Next Day

## Entity: TodoItem
Description: A task persisted in `todo_items` and rendered in planning/focus workflows.

Fields used by this feature:
- `id` (string, unique): Todo identifier.
- `title` (string, required): User-visible task text.
- `status` (enum: `INBOX | DAILY | COMPLETED | TRASH`): Lifecycle state.
- `daily_assigned_at` (ISO timestamp, nullable): When item entered the daily list.
- `completed_at` (ISO timestamp, nullable): When item was marked completed.
- `created_at` (ISO timestamp): Creation time.
- `updated_at` (ISO timestamp): Last mutation time.

Validation rules:
- `title` must be non-empty after trimming.
- `completed_at` must be non-null when `status=COMPLETED`.
- `completed_at` must be reset to `null` when status returns to `DAILY`.
- Focus-visible completed items must satisfy: `status=COMPLETED` and `completed_at` date equals current session day.

State transitions relevant to this feature:
- `DAILY -> COMPLETED`:
  - Set `status=COMPLETED`
  - Set `completed_at=now`
  - Keep item visible in today Focus list under completed section
- `COMPLETED -> DAILY` (same day uncheck):
  - Set `status=DAILY`
  - Set `completed_at=null`
  - Move item back to active section
- Day rollover:
  - Existing rollover resets `DAILY -> INBOX`
  - `COMPLETED` items remain `COMPLETED` in storage but are excluded from next day Focus list by date filter

## View Model: FocusTodoGroups
Description: API response model used by Focus page rendering.

Fields:
- `active` (TodoItem[]): Current-day actionable items.
- `completed` (TodoItem[]): Items completed on current day.

Ordering constraints:
- All `active` items render before all `completed` items.
- Relative order inside `active` is stable and deterministic.
- Relative order inside `completed` is stable and deterministic.

## Relationships
- `FocusTodoGroups.active[*]` and `FocusTodoGroups.completed[*]` are filtered projections of `TodoItem`.
- A `TodoItem` appears in at most one focus group at a time.
