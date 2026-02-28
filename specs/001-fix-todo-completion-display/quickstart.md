# Quickstart: Preserve Completed Todos Until Next Day

## 1. Implement backend focus read contract
1. Add service logic to return current-day focus groups:
   - `active`: todos in `DAILY`
   - `completed`: todos in `COMPLETED` where `completed_at` is on current session day
2. Add `GET /api/todos/focus` endpoint and wire it in API router.
3. Ensure deterministic stable ordering in each returned group.

## 2. Implement frontend focus rendering update
1. Add API client method for `GET /api/todos/focus`.
2. Update Focus store/page to load grouped response.
3. Render active items first, then completed items.
4. Keep existing checkbox behavior and strike-through styling for completed items.

## 3. Validate behavior
1. Mark a daily todo completed in Focus mode.
2. Confirm it remains visible with strike-through and is listed below active todos.
3. Refresh page; confirm same-day completed item still visible.
4. Switch completed item back to active; confirm it returns to active section without strike-through.
5. Simulate next day/rollover; confirm prior-day completed items do not show in Focus list.

## 4. Run quality gates
1. `npm run lint`
2. `npm test`

## 5. Validation checklist
1. Confirm contract test coverage for grouped focus read behavior:
   - `backend/tests/contract/us2-focus.contract.test.ts`
2. Confirm backend integration flow coverage for complete/uncomplete focus transitions:
   - `backend/tests/integration/us2-focus-flow.test.ts`
3. Confirm frontend rendering coverage for grouping and strike-through:
   - `frontend/tests/unit/focusPage.test.ts`
   - `frontend/tests/unit/todoListItem.test.ts`
   - `frontend/tests/e2e/us2-focus-mode.spec.ts`

## 6. Latest execution evidence (2026-02-28)
1. `npm test` at repo root: PASS (backend 11/11 tests, frontend 4/4 tests).
2. `npm run lint` at repo root: PASS after enabling legacy ESLint config mode for workspace lint scripts.
3. Focus behavior verification covered by automated tests for:
   - Same-day completed visibility
   - Completed strike-through rendering
   - Active-first + stable group ordering

## 7. Evidence to capture
1. Contract test proving `GET /api/todos/focus` grouping/filter rules.
2. Frontend integration/e2e evidence for visibility + ordering + strike-through.
3. Performance spot-check showing completion toggle reflects on screen within QR-004 budget.
