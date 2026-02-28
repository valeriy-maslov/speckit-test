<!--
Sync Impact Report
- Version change: unversioned template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Code Quality Is Non-Negotiable
  - Template Principle 2 -> II. Tests Prove Behavior Before Merge
  - Template Principle 3 -> III. User Experience Must Stay Consistent
  - Template Principle 4 -> IV. Performance Budgets Are Required
- Added sections:
  - None
- Removed sections:
  - Placeholder Principle 5 section from template (unused to keep principles focused)
- Templates requiring updates:
  - ✅ updated: /Users/valeriy/Projects/speckit-test/.specify/templates/plan-template.md
  - ✅ updated: /Users/valeriy/Projects/speckit-test/.specify/templates/spec-template.md
  - ✅ updated: /Users/valeriy/Projects/speckit-test/.specify/templates/tasks-template.md
  - ✅ updated: /Users/valeriy/Projects/speckit-test/.codex/prompts/speckit.tasks.md
  - ✅ updated: /Users/valeriy/Projects/speckit-test/.codex/prompts/speckit.implement.md
  - ⚠ pending: /Users/valeriy/Projects/speckit-test/.specify/templates/commands/*.md
    (directory does not exist in this repository)
- Follow-up TODOs:
  - None
-->
# Speckit Test Constitution

## Core Principles

### I. Code Quality Is Non-Negotiable
All production code MUST be readable, maintainable, and reviewable before merge.
Every change MUST pass formatting and static analysis checks and MUST include
clear naming, bounded function/class responsibilities, and explicit error handling.
Rationale: maintainability and defect prevention depend on enforceable quality gates,
not style preferences.

### II. Tests Prove Behavior Before Merge
Every change MUST include automated tests that validate happy path, failure path,
and critical edge cases for the behavior introduced or modified. Test execution
MUST be part of CI and MUST pass before merge; failing tests are a merge blocker.
Rationale: behavior is only trusted when verified continuously and repeatably.

### III. User Experience Must Stay Consistent
User-facing changes MUST follow established interaction, visual, and content
patterns for the product. Any intentional deviation MUST be documented in the
spec and approved during review. Accessibility and predictable behavior across
equivalent workflows are mandatory acceptance criteria.
Rationale: consistency lowers cognitive load, improves trust, and reduces support cost.

### IV. Performance Budgets Are Required
Every feature MUST define measurable performance budgets for core user journeys
(latency, throughput, memory, or startup/render time as applicable). Changes MUST
include validation evidence that budgets are met, and regressions beyond approved
thresholds MUST be blocked until mitigated.
Rationale: performance is a product requirement and must be treated as a release gate.

## Delivery Standards
Every specification MUST include explicit quality constraints, testing scope,
UX consistency expectations, and performance budgets before implementation starts.
Plans and tasks MUST map each principle to concrete gates and executable work items.
A feature cannot be marked complete unless all principle-aligned gates are satisfied.

## Review Workflow
Each pull request MUST include: scope summary, principle compliance notes, test
evidence, and performance evidence for affected flows. Reviews MUST reject changes
that lower code quality, reduce UX consistency, or introduce unapproved performance
regressions. Exceptions MUST include documented rationale, owner approval, and an
expiration date with follow-up remediation tasks.

## Governance
This constitution supersedes conflicting local practices. Amendments require:
(1) a documented proposal, (2) impacted template and guidance updates, and
(3) explicit team approval in the same change. Versioning policy follows SemVer:
MAJOR for incompatible principle/governance changes, MINOR for added principles
or materially expanded guidance, PATCH for non-semantic clarifications. Compliance
review is required in planning, specification, task generation, and pull request
review; violations must be resolved or explicitly waived under the exception policy.

**Version**: 1.0.0 | **Ratified**: 2026-02-28 | **Last Amended**: 2026-02-28
