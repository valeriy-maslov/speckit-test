# Tasks: Daily Focus Todo Manager

**Input**: Design documents from `/specs/001-todo-daily-focus/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for every user story and behavior change.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Tests: `backend/tests/`, `frontend/tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure in `backend/src/api/`, `backend/src/db/`, `backend/src/services/`, `backend/src/models/`, `backend/src/middleware/`, `backend/tests/contract/`, `backend/tests/integration/`, `backend/tests/unit/`, `frontend/src/components/`, `frontend/src/pages/`, `frontend/src/services/`, `frontend/src/styles/`, `frontend/tests/e2e/`, `frontend/tests/unit/`, and `data/.gitkeep`
- [X] T002 Initialize workspace scripts in root `package.json`
- [X] T003 [P] Initialize backend TypeScript package in `backend/package.json` and `backend/tsconfig.json`
- [X] T004 [P] Initialize Vite vanilla TypeScript frontend with Bootstrap in `frontend/package.json`, `frontend/tsconfig.json`, and `frontend/vite.config.ts`
- [X] T005 [P] Configure linting and formatting in `.eslintrc.cjs`, `.eslintignore`, and `.prettierrc`
- [X] T006 [P] Configure environment defaults and DB path in `.env.example` and `backend/src/config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Implement SQLite schema and startup initialization in `backend/src/db/schema.sql` and `backend/src/db/initDb.ts`
- [X] T008 [P] Implement SQLite client and shared repository helpers in `backend/src/db/client.ts` and `backend/src/db/repository.ts`
- [X] T009 [P] Define domain models and shared DTOs in `backend/src/models/inboxPoint.ts`, `backend/src/models/todoItem.ts`, `backend/src/models/dailySession.ts`, and `frontend/src/services/types.ts`
- [X] T010 Implement lifecycle rule utilities in `backend/src/services/lifecycleRules.ts`
- [X] T011 [P] Setup Express app, base routing, and error middleware in `backend/src/app.ts`, `backend/src/server.ts`, `backend/src/api/index.ts`, and `backend/src/middleware/errorHandler.ts`
- [X] T012 [P] Implement app-state endpoint scaffold in `backend/src/api/appState.ts`
- [X] T013 Configure test runners and test DB helpers in `backend/vitest.config.ts`, `frontend/vitest.config.ts`, `frontend/playwright.config.ts`, and `backend/tests/helpers/testDb.ts`
- [X] T014 Create base SPA shell with mode-aware layout in `frontend/src/main.ts`, `frontend/src/components/AppLayout.ts`, and `frontend/src/styles/app.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Daily Review and Planning (Priority: P1) 🎯 MVP

**Goal**: Start in Daily Review mode, create todos from inbox points, and select today’s daily list.

**Independent Test**: Open app, add inbox points, create todos, assign selected items to daily list, and verify daily list contents.

### Tests for User Story 1 (REQUIRED) ✅

- [X] T015 [P] [US1] Add contract tests for `/api/inbox-points`, `/api/todos`, and `/api/daily-list/{todoId}` in `backend/tests/contract/us1-planning.contract.test.ts`
- [X] T016 [P] [US1] Add integration test for inbox-to-todo planning flow in `backend/tests/integration/us1-planning-flow.test.ts`
- [X] T017 [P] [US1] Add e2e Daily Review flow test in `frontend/tests/e2e/us1-daily-review.spec.ts`

### Implementation for User Story 1

- [X] T018 [US1] Implement inbox point API handlers in `backend/src/api/inboxPoints.ts`
- [X] T019 [US1] Implement todo create/list API handlers in `backend/src/api/todos.ts`
- [X] T020 [US1] Implement daily-list assign/unassign API handlers in `backend/src/api/dailyList.ts`
- [X] T021 [P] [US1] Build Daily Review page and point entry UI in `frontend/src/pages/DailyReviewPage.ts`
- [X] T022 [P] [US1] Build inbox point and daily list components in `frontend/src/components/InboxPointCard.ts` and `frontend/src/components/DailyListPanel.ts`
- [X] T023 [US1] Implement review state/API client wiring in `frontend/src/services/apiClient.ts` and `frontend/src/services/reviewStore.ts`
- [X] T024 [US1] Implement empty/error/loading states for review flow in `frontend/src/pages/DailyReviewPage.ts` and `frontend/src/components/InlineError.ts`

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Focus Mode Execution (Priority: P2)

**Goal**: Switch to Focus mode, show only daily-list items, and keep completed items visible with strikethrough.

**Independent Test**: After selecting daily items, enter Focus mode, complete an item, and verify it remains visible with completed styling.

### Tests for User Story 2 (REQUIRED) ✅

- [X] T025 [P] [US2] Add contract tests for `/api/mode` and todo status updates in `backend/tests/contract/us2-focus.contract.test.ts`
- [X] T026 [P] [US2] Add integration test for completion visibility and reopen behavior in `backend/tests/integration/us2-focus-flow.test.ts`
- [X] T027 [P] [US2] Add e2e Focus mode behavior test in `frontend/tests/e2e/us2-focus-mode.spec.ts`

### Implementation for User Story 2

- [X] T028 [US2] Implement mode persistence/update service and endpoint in `backend/src/services/sessionService.ts` and `backend/src/api/mode.ts`
- [X] T029 [US2] Implement todo complete/reopen transitions in `backend/src/services/todoService.ts` and `backend/src/api/todos.ts`
- [X] T030 [P] [US2] Build Focus page daily-list-only rendering in `frontend/src/pages/FocusPage.ts`
- [X] T031 [P] [US2] Implement completed-item strikethrough state in `frontend/src/components/TodoListItem.ts` and `frontend/src/styles/status.css`
- [X] T032 [US2] Wire mode toggle and focus state loading in `frontend/src/components/ModeToggle.ts` and `frontend/src/services/focusStore.ts`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Aging, Requeue, and Trash Lifecycle (Priority: P3)

**Goal**: Execute automatic/manual rollover, requeue unfinished items, keep completed items unchanged on rollover, mark stale items red, and auto-trash unchanged stale items.

**Independent Test**: Simulate day change and aging; verify auto rollover on first open, manual rollover behavior, completed-item preservation, stale marking, and trash retention.

### Tests for User Story 3 (REQUIRED) ✅

- [X] T033 [P] [US3] Add contract tests for `/api/app-state`, `/api/rollover`, and `/api/trash` in `backend/tests/contract/us3-lifecycle.contract.test.ts`
- [X] T034 [P] [US3] Add integration tests for automatic rollover, manual rollover, and stale/auto-trash rules in `backend/tests/integration/us3-lifecycle-rules.test.ts`
- [X] T035 [P] [US3] Add e2e lifecycle and trash flow test in `frontend/tests/e2e/us3-lifecycle-trash.spec.ts`

### Implementation for User Story 3

- [X] T036 [US3] Implement rollover service with completed-item preservation in `backend/src/services/lifecycleService.ts`
- [X] T037 [US3] Implement automatic-first-open rollover trigger in `backend/src/server.ts` and `backend/src/services/sessionService.ts`
- [X] T038 [US3] Implement manual rollover endpoint in `backend/src/api/rollover.ts`
- [X] T039 [US3] Implement stale-marking and auto-trash processing in `backend/src/services/lifecycleService.ts`
- [X] T040 [US3] Implement trash listing endpoint in `backend/src/api/trash.ts`
- [X] T041 [P] [US3] Implement stale visual state and trash navigation UI in `frontend/src/components/TodoListItem.ts`, `frontend/src/components/AppNav.ts`, and `frontend/src/styles/status.css`
- [X] T042 [P] [US3] Build trash page and data loading flow in `frontend/src/pages/TrashPage.ts` and `frontend/src/services/appState.ts`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T043 [P] Update quickstart verification steps to match implementation in `specs/001-todo-daily-focus/quickstart.md`
- [X] T044 Refine validation and error message consistency in `backend/src/middleware/security.ts`, `backend/src/services/todoService.ts`, `frontend/src/pages/DailyReviewPage.ts`, and `frontend/src/pages/FocusPage.ts`
- [X] T045 Validate performance budget with benchmark scenario in `backend/tests/integration/performance-view-load.test.ts` and record results in `specs/001-todo-daily-focus/quickstart.md`
- [X] T046 [P] Add boundary/date transition unit tests in `backend/tests/unit/dateBoundaries.test.ts` and `frontend/tests/unit/modeState.test.ts`
- [X] T047 [P] Add UX consistency checklist for status states and transitions in `specs/001-todo-daily-focus/checklists/ux-consistency.md`
- [X] T048 Run full quickstart validation and capture evidence in `specs/001-todo-daily-focus/quickstart-validation.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and defines MVP
- **User Story 2 (P2)**: Depends on US1 daily-list APIs and shared todo state
- **User Story 3 (P3)**: Depends on US1/US2 status and mode flows

### Within Each User Story

- Tests MUST be written and fail before implementation
- Backend API/domain changes before frontend integration wiring
- State transition correctness before polish
- Story must pass independent test before moving to next story

### Parallel Opportunities

- T003-T006 can run in parallel in Setup
- T008, T009, T011, T012 can run in parallel after T007 as needed
- Per story, contract/integration/e2e tests can run in parallel
- Story UI tasks marked [P] can run in parallel when files do not overlap

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] Contract tests in backend/tests/contract/us1-planning.contract.test.ts"
Task: "T016 [US1] Integration tests in backend/tests/integration/us1-planning-flow.test.ts"
Task: "T017 [US1] E2E tests in frontend/tests/e2e/us1-daily-review.spec.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T030 [US2] Build Focus page in frontend/src/pages/FocusPage.ts"
Task: "T031 [US2] Implement strikethrough state in frontend/src/components/TodoListItem.ts and frontend/src/styles/status.css"
```

## Parallel Example: User Story 3

```bash
Task: "T041 [US3] Implement stale visual state/navigation in frontend/src/components/TodoListItem.ts and frontend/src/components/AppNav.ts"
Task: "T042 [US3] Build trash page and app-state loading in frontend/src/pages/TrashPage.ts and frontend/src/services/appState.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (US1)
3. Validate US1 independent test
4. Demo daily review planning workflow

### Incremental Delivery

1. Deliver US1 (daily review planning)
2. Deliver US2 (focus execution)
3. Deliver US3 (rollover, stale, trash lifecycle)
4. Complete polish and validation tasks

### Parallel Team Strategy

1. Developer A: backend services and lifecycle rules
2. Developer B: frontend pages/components and UX states
3. Developer C: contract/integration/e2e tests
4. Merge at phase checkpoints after required tests pass

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks to user stories for traceability
- Keep SQLite path fixed at `data/todo.db`
- Do not add frameworks beyond planned minimal dependencies
