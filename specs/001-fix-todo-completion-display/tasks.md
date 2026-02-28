# Tasks: Preserve Completed Todos Until Next Day

**Input**: Design documents from `/specs/001-fix-todo-completion-display/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/focus-todos.openapi.yaml, quickstart.md

**Tests**: Tests are REQUIRED for every user story and behavior change in this feature.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared test and documentation scaffolding for feature work.

- [X] T001 Align feature verification steps with this branch scope in specs/001-fix-todo-completion-display/quickstart.md
- [X] T002 Create Focus-mode backend test fixtures for same-day and prior-day completion timestamps in backend/tests/helpers/testDb.ts
- [X] T003 [P] Create frontend Focus-page unit test file scaffold in frontend/tests/unit/focusPage.test.ts
- [X] T004 [P] Add feature-specific contract examples section in specs/001-fix-todo-completion-display/contracts/focus-todos.openapi.yaml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared interfaces and backend/frontend plumbing required by all user stories.

**⚠️ CRITICAL**: No user story work should start before this phase is complete.

- [X] T005 Add reusable UTC day extraction helper for completion-date filtering in backend/src/services/lifecycleRules.ts
- [X] T006 [P] Add `FocusTodoGroups` response types in frontend/src/services/types.ts
- [X] T007 [P] Add `listFocusTodos()` API client method in frontend/src/services/apiClient.ts
- [X] T008 Implement `listFocusTodosForToday()` grouped read service in backend/src/services/todoService.ts
- [X] T009 Implement `GET /api/todos/focus` endpoint in backend/src/api/todos.ts
- [X] T010 Wire Focus store to consume grouped focus response shape in frontend/src/services/focusStore.ts

**Checkpoint**: Foundation complete; user stories can now be implemented and tested independently.

---

## Phase 3: User Story 1 - Keep Completed Items Visible (Priority: P1) 🎯 MVP

**Goal**: Completed todos remain visible for the current day instead of disappearing.

**Independent Test**: Mark a daily todo as completed in Focus mode, refresh the page, and verify the completed todo is still visible on the same day.

### Tests for User Story 1 (REQUIRED) ✅

- [X] T011 [P] [US1] Add contract coverage for same-day completed visibility in backend/tests/contract/us2-focus.contract.test.ts
- [X] T012 [P] [US1] Add backend integration flow for complete-and-reload visibility in backend/tests/integration/us2-focus-flow.test.ts
- [X] T013 [P] [US1] Add e2e scenario for same-day completed persistence in frontend/tests/e2e/us2-focus-mode.spec.ts

### Implementation for User Story 1

- [X] T014 [US1] Filter completed focus items by current day using `completed_at` in backend/src/services/todoService.ts
- [X] T015 [US1] Update Focus store load path to return active and completed groups in frontend/src/services/focusStore.ts
- [X] T016 [US1] Render both active and completed groups in Focus view in frontend/src/pages/FocusPage.ts
- [X] T017 [US1] Ensure completion toggle repaint keeps same-day completed items visible in frontend/src/main.ts

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Clearly Distinguish Completed Items (Priority: P2)

**Goal**: Completed todos are visually distinct with strike-through formatting.

**Independent Test**: Complete one todo and confirm only completed items display strike-through styling while active items do not.

### Tests for User Story 2 (REQUIRED) ✅

- [X] T018 [P] [US2] Add unit test for completed styling class behavior in frontend/tests/unit/todoListItem.test.ts
- [X] T019 [P] [US2] Extend Focus e2e test for strike-through assertions in frontend/tests/e2e/us2-focus-mode.spec.ts
- [X] T020 [P] [US2] Add integration assertion that completed status is preserved for styled rendering in backend/tests/integration/us2-focus-flow.test.ts

### Implementation for User Story 2

- [X] T021 [US2] Ensure completed-only strike-through styling is applied in frontend/src/components/TodoListItem.ts
- [X] T022 [US2] Add completed section labeling/accessibility text in frontend/src/pages/FocusPage.ts
- [X] T023 [US2] Keep contract examples consistent with styled completed-state semantics in specs/001-fix-todo-completion-display/contracts/focus-todos.openapi.yaml

**Checkpoint**: User Stories 1 and 2 are independently functional and testable.

---

## Phase 5: User Story 3 - Reorder Completed Items Below Active Items (Priority: P3)

**Goal**: Active todos render first; completed todos render below while preserving relative order within each group.

**Independent Test**: Complete a middle active todo and verify it moves below active items; uncheck it and verify it returns to active order.

### Tests for User Story 3 (REQUIRED) ✅

- [X] T024 [P] [US3] Add contract test for active-first grouped ordering in backend/tests/contract/us2-focus.contract.test.ts
- [X] T025 [P] [US3] Add backend unit test for same-day grouping and order stability in backend/tests/unit/dateBoundaries.test.ts
- [X] T026 [P] [US3] Extend e2e ordering assertions for complete/uncomplete transitions in frontend/tests/e2e/us2-focus-mode.spec.ts

### Implementation for User Story 3

- [X] T027 [US3] Implement stable ordering rules for active/completed groups in backend/src/services/todoService.ts
- [X] T028 [US3] Render active list before completed list with stable ordering in frontend/src/pages/FocusPage.ts
- [X] T029 [US3] Ensure uncheck transition moves item back to active group without ordering drift in frontend/src/main.ts

**Checkpoint**: All three user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates, documentation alignment, and release readiness.

- [X] T030 [P] Update final validation checklist and evidence capture steps in specs/001-fix-todo-completion-display/quickstart.md
- [X] T031 Run full backend and frontend test suites and record outcomes in specs/001-fix-todo-completion-display/quickstart.md
- [X] T032 [P] Run lint fixes for touched files in backend/src/services/todoService.ts and frontend/src/pages/FocusPage.ts
- [X] T033 [P] Record performance spot-check results against QR-004 in specs/001-fix-todo-completion-display/plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): No dependencies.
- Phase 2 (Foundational): Depends on Phase 1; blocks all user stories.
- Phase 3 (US1): Depends on Phase 2.
- Phase 4 (US2): Depends on Phase 2; can proceed after US1 baseline is available for UI behavior validation.
- Phase 5 (US3): Depends on Phase 2; recommended after US1 due to shared focus-group read path.
- Phase 6 (Polish): Depends on completion of selected user stories.

### User Story Dependency Graph

- US1 (P1) -> US2 (P2)
- US1 (P1) -> US3 (P3)

### Within Each User Story

- Tests must be authored first and fail before implementation.
- Backend ordering/filter behavior before frontend rendering assertions.
- Implementation complete before story-level regression run.

---

## Parallel Opportunities

- Setup: T003 and T004 can run in parallel.
- Foundational: T006 and T007 can run in parallel; T008 and T010 can proceed in parallel after T006/T007.
- US1: T011, T012, T013 can run in parallel.
- US2: T018, T019, T020 can run in parallel.
- US3: T024, T025, T026 can run in parallel.
- Polish: T030, T032, T033 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Run US1 tests in parallel
Task: "T011 [US1] backend/tests/contract/us2-focus.contract.test.ts"
Task: "T012 [US1] backend/tests/integration/us2-focus-flow.test.ts"
Task: "T013 [US1] frontend/tests/e2e/us2-focus-mode.spec.ts"
```

## Parallel Example: User Story 2

```bash
# Run US2 tests in parallel
Task: "T018 [US2] frontend/tests/unit/todoListItem.test.ts"
Task: "T019 [US2] frontend/tests/e2e/us2-focus-mode.spec.ts"
Task: "T020 [US2] backend/tests/integration/us2-focus-flow.test.ts"
```

## Parallel Example: User Story 3

```bash
# Run US3 tests in parallel
Task: "T024 [US3] backend/tests/contract/us2-focus.contract.test.ts"
Task: "T025 [US3] backend/tests/unit/dateBoundaries.test.ts"
Task: "T026 [US3] frontend/tests/e2e/us2-focus-mode.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate independent US1 test criteria and regressions.
4. Demo/deploy MVP behavior fix.

### Incremental Delivery

1. Deliver US1 (visibility/persistence), validate.
2. Deliver US2 (strike-through distinction), validate.
3. Deliver US3 (ordering/stability), validate.
4. Run Phase 6 polish and quality gates before final merge.

### Parallel Team Strategy

1. One developer finalizes backend service/contract tasks.
2. One developer handles frontend rendering/styling tasks.
3. One developer executes and stabilizes contract/integration/e2e coverage.

