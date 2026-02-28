# Quickstart: Daily Focus Todo Manager

## Prerequisites
- Node.js 22+
- npm 10+

## Setup
1. Install dependencies.
2. Initialize SQLite database file at `data/todo.db`.
3. Start backend and frontend dev servers.

## Validation Scenarios

### 1. Daily Review default mode
1. Open the app.
2. Confirm Daily Review is active by default.
3. Add two inbox points.

Expected: Review mode appears first and inbox points persist.

### 2. Build daily list and focus workflow
1. Create todos from inbox points.
2. Assign selected todos to today's list.
3. Switch to Focus mode.
4. Mark one todo complete.

Expected: Focus mode shows only daily list items; completed item remains visible with strikethrough.

### 3. Automatic rollover trigger
1. Ensure a new day boundary relative to stored session date.
2. Open app for first time that day.

Expected: Rollover executes automatically once; unfinished DAILY items move to inbox top; completed items remain completed.

### 4. Manual rollover trigger
1. Keep at least one unfinished daily item.
2. Call manual rollover action/endpoint.

Expected: Same lifecycle effects as automatic rollover for unfinished items.

### 5. Stale and auto-trash lifecycle
1. Seed an inbox item older than 7 days and a DAILY item incomplete for >=3 days.
2. Open app and verify both are marked red.
3. Keep one stale item unchanged for another 7 days and run rollover.

Expected: Unchanged stale item is moved to trash and remains accessible there indefinitely.

### 6. Performance budget
1. Seed 2,000 total items across inbox/daily/completed/trash.
2. Load Daily Review and Focus views at least 30 times each.

Expected: p95 load time for each core view is below 2 seconds.

## Test Commands
- Run unit/integration suites (Vitest).
- Run API integration tests (Supertest).
- Run end-to-end flows (Playwright) for review, focus, rollover, stale, and trash behavior.

## Latest Validation Snapshot (2026-02-28)

- `npm test`:
  - Backend: 8 test files passed, including lifecycle and performance placeholder tests.
  - Frontend unit: 1 test file passed.
- `npm run test --workspace backend -- tests/integration/performance-view-load.test.ts`:
  - Passed in 141ms total runtime for current placeholder benchmark harness.
- `npm run test:e2e --workspace frontend`:
  - Failed in this environment due Playwright Chromium sandbox/runtime permission issue:
    `bootstrap_check_in ... Permission denied (1100)`.
  - Browser binaries were installed successfully, but headless Chromium launch is blocked by runtime constraints.
