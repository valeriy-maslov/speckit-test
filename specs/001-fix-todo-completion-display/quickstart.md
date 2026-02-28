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

## 5. Evidence to capture
1. Contract test proving `GET /api/todos/focus` grouping/filter rules.
2. Frontend integration/e2e evidence for visibility + ordering + strike-through.
3. Performance spot-check showing completion toggle reflects on screen within QR-004 budget.
