# Implementation Plan: Preserve Completed Todos Until Next Day

**Branch**: `[001-fix-todo-completion-display]` | **Date**: 2026-02-28 | **Spec**: [/Users/valeriy/Projects/speckit-test/specs/001-fix-todo-completion-display/spec.md](/Users/valeriy/Projects/speckit-test/specs/001-fix-todo-completion-display/spec.md)
**Input**: Feature specification from `/specs/001-fix-todo-completion-display/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Fix Focus-mode todo completion behavior so checked items do not disappear immediately. Completed items remain visible with strike-through styling, are rendered below active items, and are excluded after day rollover. The approach adds a focused backend read contract for "today in focus", updates frontend data loading/render ordering logic, and verifies behavior with unit/integration/contract/e2e coverage.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 22 LTS  
**Primary Dependencies**: Express 4, better-sqlite3, Vite, Bootstrap 5  
**Storage**: SQLite (`backend/data/todo.db`)  
**Testing**: Vitest (backend/frontend), Playwright (frontend e2e), Supertest-style backend API tests  
**Target Platform**: Web app (modern desktop/mobile browsers) + Node backend service  
**Project Type**: Monorepo web application (`backend` + `frontend`)  
**Performance Goals**: Todo completion state change reflected in UI ordering/styling within 1 second for at least 95% of actions  
**Constraints**: Preserve existing UX patterns, keep day-boundary behavior aligned with current session/day logic, avoid regressions in existing todo lifecycle flows  
**Scale/Scope**: Single-user daily workflow; expected active/completed list sizes in tens to low hundreds of items per day

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality Gate**: Define linting/static analysis and review criteria for touched code paths.
- **Testing Gate**: Define required unit/integration/contract/e2e coverage and CI pass criteria.
- **UX Consistency Gate**: Define how UI/interaction/content patterns remain consistent or document approved deviations.
- **Performance Gate**: Define measurable budgets for critical journeys and how they will be validated.

**Pre-Phase-0 Gate Assessment**
- **Code Quality Gate**: PASS. `npm run lint` must pass in root workspace. Touchpoints: backend todo query/service and frontend focus rendering/data loading.
- **Testing Gate**: PASS. Required: backend unit/integration/contract tests for focus data contract + frontend unit/e2e tests for strike-through and ordering behavior.
- **UX Consistency Gate**: PASS. Reuse existing checkbox toggle and Bootstrap list styling; only behavior change is visibility/order of completed items.
- **Performance Gate**: PASS. Preserve lightweight SQL/read model and verify completion-to-render path remains within QR-004 budget.

## Project Structure

### Documentation (this feature)

```text
specs/001-fix-todo-completion-display/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
├── tests/
│   ├── contract/
│   ├── integration/
│   └── unit/
└── data/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
    ├── e2e/
    └── unit/
```

**Structure Decision**: Use the existing web application split (`backend` + `frontend`). This feature touches `backend/src/services`, `backend/src/api`, `frontend/src/services`, `frontend/src/pages`, and corresponding backend/frontend tests.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|

## Phase 0: Research Plan

- Confirm day-boundary rule for "until next day" using existing session/date behavior.
- Choose focus-data contract that returns active and completed-today items without leaking older completed items.
- Define ordering approach that preserves relative order inside active/completed sections while keeping active items first.
- Define minimal-risk migration path with no schema change unless required by validation.

## Phase 1: Design Plan

- Produce `data-model.md` with lifecycle/visibility rules for todo state in Focus mode.
- Produce `contracts/focus-todos.openapi.yaml` describing backend response contract for focus data retrieval.
- Produce `quickstart.md` covering implementation, validation, and regression checks.
- Update agent context via `.specify/scripts/bash/update-agent-context.sh codex`.

## Post-Design Constitution Check

- **Code Quality Gate**: PASS. Planned changes are bounded to focused modules with no architectural sprawl.
- **Testing Gate**: PASS. Plan includes contract, integration, unit, and e2e checks for modified behavior and edge cases.
- **UX Consistency Gate**: PASS. Uses existing list item/checkbox interaction and existing strike-through styling token.
- **Performance Gate**: PASS. Read path remains index-friendly and response payload is bounded to current-day focus list.
