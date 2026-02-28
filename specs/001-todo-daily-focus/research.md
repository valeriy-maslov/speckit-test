# Phase 0 Research: Daily Focus Todo Manager

## Decision 1: Architecture shape
- **Decision**: Build a Vite-powered single-page vanilla TypeScript frontend with a minimal Express backend.
- **Rationale**: Satisfies SPA requirement and keeps persistence logic close to SQLite without heavy frameworks.
- **Alternatives considered**:
  - Frontend-only app with localStorage/IndexedDB: rejected because requirement specifies SQLite in project folder.
  - Frontend-only with SQLite WASM: rejected due to additional runtime complexity and persistence handling overhead.

## Decision 2: SQLite driver and file location
- **Decision**: Use `better-sqlite3` with a single DB file at `data/todo.db`.
- **Rationale**: Minimal dependency overhead, deterministic local behavior, and simple transaction semantics for single-user workload.
- **Alternatives considered**:
  - `sqlite3` driver: rejected due to higher async/boilerplate complexity for this scope.
  - ORM: rejected to keep dependency surface minimal.

## Decision 3: Rollover trigger model
- **Decision**: Execute rollover automatically on first app open each new day, with optional manual trigger endpoint.
- **Rationale**: Aligns clarified spec behavior and avoids requiring user memory for daily housekeeping.
- **Alternatives considered**:
  - Manual-only rollover: rejected due to missed rollover risk.
  - Background midnight jobs: rejected as unnecessary for local single-user app.

## Decision 4: Completed-item rollover behavior
- **Decision**: Completed items remain completed and are not moved back to inbox on rollover.
- **Rationale**: Preserves completion history and prevents accidental reactivation of done work.
- **Alternatives considered**:
  - Move completed items to inbox: rejected due to workflow confusion.
  - Auto-trash completed items daily: rejected because completion history should remain visible.

## Decision 5: Security posture
- **Decision**: No in-app authentication; rely on local device access controls.
- **Rationale**: Explicitly clarified in spec and appropriate for single-user local app.
- **Alternatives considered**:
  - Local PIN gate: rejected as additional UX friction not requested.
  - Full account system: rejected as out of scope.

## Decision 6: Testing strategy
- **Decision**: Use Vitest + Supertest + Playwright to cover domain logic, API contracts, and full user journeys.
- **Rationale**: Meets constitution testing expectations and validates lifecycle correctness end-to-end.
- **Alternatives considered**:
  - Unit tests only: rejected due to lifecycle/API coupling risks.
  - E2E-only: rejected due to lower diagnosability of rule-level regressions.
