# Research: Preserve Completed Todos Until Next Day

## Decision 1: Focus data should come from a dedicated backend read contract
Rationale: The current Focus page loads only `DAILY` todos, which causes completed items to disappear immediately after toggle. A dedicated contract can return both active and completed-today items in one response and centralize day filtering on the server.
Alternatives considered:
- Reuse `GET /api/todos?status=DAILY` only: rejected because it cannot include completed items by definition.
- Load `DAILY` plus all `COMPLETED` and filter in frontend: rejected because it pushes day-boundary logic into UI and risks inconsistent behavior across views.

## Decision 2: "Until next day" uses existing UTC date boundary behavior
Rationale: Current session/day logic uses `dateOnly()` derived from ISO UTC date. Reusing the same boundary avoids mixed interpretations and aligns with existing rollover/session behavior.
Alternatives considered:
- Introduce local-time/dayzone-specific boundaries: rejected because it would create inconsistency with current session/rollover semantics.
- Keep boundary unspecified: rejected because acceptance tests for next-day visibility would be ambiguous.

## Decision 3: Same-day completed visibility is based on completion timestamp
Rationale: The requirement is explicitly tied to when a todo is checked. `completed_at` is the canonical event timestamp and supports deterministic "show today, hide tomorrow" filtering.
Alternatives considered:
- Use `daily_assigned_at`: rejected because assignment date is not always equal to completion date.
- Keep all completed items visible forever in focus: rejected because it violates next-day removal intent.

## Decision 4: Preserve relative order within each section using stable backend ordering
Rationale: Clarified requirement states active first, completed below, with relative order preserved. Backend should return already-grouped, deterministic ordering so reloads preserve visual consistency.
Alternatives considered:
- Sort by `updated_at` only: rejected because checking an item mutates `updated_at`, causing avoidable reorder churn.
- Sort alphabetically: rejected because it discards user-established planning sequence.

## Decision 5: No schema migration in this feature
Rationale: Existing fields (`status`, `daily_assigned_at`, `completed_at`) are sufficient for visibility and ordering rules, reducing rollout risk.
Alternatives considered:
- Add a new display-order column: rejected for now as unnecessary complexity for this bug-fix scope.
