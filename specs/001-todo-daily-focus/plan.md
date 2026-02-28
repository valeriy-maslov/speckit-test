# Implementation Plan: Daily Focus Todo Manager

**Branch**: `001-todo-daily-focus` | **Date**: 2026-02-28 | **Spec**: [/Users/valeriy/Projects/speckit-test/specs/001-todo-daily-focus/spec.md](/Users/valeriy/Projects/speckit-test/specs/001-todo-daily-focus/spec.md)
**Input**: Feature specification from `/specs/001-todo-daily-focus/spec.md`

## Summary

Build a single-page todo manager that opens in Daily Review mode, supports Focus mode,
automatic day rollover on first app open (plus manual trigger), stale-item handling,
and indefinitely accessible trash. Use minimal architecture: vanilla TypeScript +
Bootstrap frontend (Vite) and a lightweight Node.js API with SQLite in-project.

## Technical Context

**Language/Version**: TypeScript 5.x (frontend and backend), Node.js 22 LTS  
**Primary Dependencies**: Vite, Bootstrap 5, Express, better-sqlite3, Vitest, Playwright, Supertest  
**Storage**: SQLite database file at `./data/todo.db` in repository root  
**Testing**: Vitest (unit/integration), Supertest (API integration), Playwright (end-to-end UI)  
**Target Platform**: Local desktop browser (latest Chrome/Firefox/Safari) with local Node runtime  
**Project Type**: web application (single-page frontend + local API backend)  
**Performance Goals**: Daily Review and Focus views load in <2s for p95 with up to 2,000 items  
**Constraints**: Vanilla TypeScript UI, Bootstrap components, minimum additional libraries, no nested structures  
**Scale/Scope**: Single-user personal usage; thousands of items retained long-term including trash history

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality Gate**: PASS
  - TypeScript strict mode, linting, formatting, and explicit error handling are required.
- **Testing Gate**: PASS WITH EXIT CRITERION
  - Full automated suite (unit/integration/e2e) defined for all lifecycle behavior.
  - CI enforcement is deferred during local iteration but MUST be enabled before merge/release.
- **UX Consistency Gate**: PASS
  - Daily Review and Focus use consistent visual states for normal/completed/stale/trashed items.
- **Performance Gate**: PASS
  - Performance budget set to <2s p95 for core views with 2,000 items; validation steps included.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-daily-focus/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── todo-api.yaml
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/
│   ├── db/
│   ├── services/
│   ├── models/
│   └── middleware/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
└── tests/

data/
└── todo.db
```

**Structure Decision**: Use a split web-app structure (`frontend/` + `backend/`) because browser-only
architecture cannot satisfy project-local SQLite persistence requirements.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Separate backend for SPA | Browser cannot safely own a project-local SQLite file | localStorage/IndexedDB do not meet SQLite requirement |
| Deferred CI enforcement during local phase | User requested no CI enforcement for now while iterating | Enforcing CI immediately would block agreed local workflow |
