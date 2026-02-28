# Feature Specification: Preserve Completed Todos Until Next Day

**Feature Branch**: `[001-fix-todo-completion-display]`  
**Created**: 2026-02-28  
**Status**: Draft  
**Input**: User description: "There is a bug in the application: when the todos are checked they simply disappear. They should become struck through and sorted below the active uncompleted todos. Struck through means that the text should be formatted so. But the todo itself should not disappear until the next day."

## Clarifications

### Session 2026-02-28

- Q: What ordering rule should apply within active and completed sections? → A: Keep each item's existing relative order; only move completed items below active items.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Keep Completed Items Visible (Priority: P1)

As a user planning my day, I can mark a todo as completed and still see it in today’s list instead of it disappearing immediately.

**Why this priority**: Immediate disappearance removes confidence that the action worked and makes it hard to review completed work for the same day.

**Independent Test**: Can be fully tested by checking one active todo and confirming it remains visible in the list for the current day.

**Acceptance Scenarios**:

1. **Given** an active todo in today’s list, **When** the user marks it completed, **Then** the todo remains visible in today’s list.
2. **Given** a completed todo from today is visible, **When** the user refreshes or reopens the app on the same day, **Then** the completed todo is still visible.

---

### User Story 2 - Clearly Distinguish Completed Items (Priority: P2)

As a user, I can quickly see which todos are done because completed items are shown with strike-through text styling.

**Why this priority**: Visual distinction prevents confusion between completed and active work.

**Independent Test**: Can be tested by marking a todo completed and verifying that only completed items use strike-through text formatting.

**Acceptance Scenarios**:

1. **Given** a todo is marked completed, **When** the list renders, **Then** the todo text is displayed with strike-through formatting.
2. **Given** two todos where one is active and one is completed, **When** both are displayed, **Then** only the completed todo appears struck through.

---

### User Story 3 - Reorder Completed Items Below Active Items (Priority: P3)

As a user, I see incomplete todos first and completed todos below them so unfinished work stays prioritized.

**Why this priority**: Ordering supports focus by keeping actionable work at the top while still retaining completed context.

**Independent Test**: Can be tested by completing a middle item and confirming list order becomes active items first, completed items after.

**Acceptance Scenarios**:

1. **Given** a list containing active and completed todos for today, **When** the list is displayed, **Then** all active todos are shown before any completed todo.
2. **Given** multiple active and completed todos for today, **When** completion state changes, **Then** relative order within the active group and within the completed group is preserved.

### Edge Cases

- If all todos are completed, the list still shows all of today’s completed todos with strike-through formatting.
- If a todo is marked completed close to day rollover, it remains visible for the rest of that day and is no longer shown in the next day’s view.
- If a user marks a todo completed and then uncompleted on the same day, it returns to the active section and strike-through formatting is removed.
- If no todos are completed, list ordering remains unchanged from normal active-item ordering.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST keep a todo visible in the current day’s list after it is marked completed.
- **FR-002**: System MUST visually format completed todo text with strike-through styling while it remains visible.
- **FR-003**: System MUST render all active (uncompleted) todos before completed todos in the current day’s list while preserving each item's existing relative order within its group.
- **FR-004**: System MUST persist completed todos in the current day’s list across reloads and app restarts until the day changes.
- **FR-005**: System MUST exclude a todo completed on a previous day from the new day’s active list.
- **FR-006**: System MUST restore a completed todo to active styling and active ordering when the user marks it uncompleted on the same day.
- **FR-007**: System MUST apply the same visibility, styling, and ordering rules consistently in all list views that show today’s todos.

### Quality & Non-Functional Requirements *(mandatory)*

- **QR-001 (Code Quality)**: Changes MUST pass project linting and review standards.
- **QR-002 (Testing)**: Automated tests MUST cover completed-item visibility, strike-through styling state, ordering behavior, same-day persistence, and next-day removal.
- **QR-003 (UX Consistency)**: Completed and active todo states MUST be visually distinct without reducing readability or accessibility.
- **QR-004 (Performance)**: Updating a todo’s completion state MUST reflect in the displayed order and styling within 1 second for 95% of user actions in normal usage.

### Key Entities *(include if feature involves data)*

- **Todo Item**: A user task with text content, completion status, and day association used to decide visibility, styling, and ordering.
- **Daily Todo List**: The set of todo items relevant to a specific calendar day, containing both active and completed sections.
- **Completion Event**: The user action that marks or unmarks a todo and updates how it appears in the current day.

### Assumptions

- "Next day" means the next calendar day according to the same day boundary used by the app’s daily todo logic.
- Completed todos are hidden from the new day’s default list rather than being permanently deleted.
- Existing behavior for creating, editing, and deleting todos remains unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of todos marked completed remain visible in the same day’s list until day rollover.
- **SC-002**: 100% of visible completed todos are rendered with strike-through text formatting.
- **SC-003**: In mixed lists, active todos appear above completed todos in 100% of render checks.
- **SC-004**: At least 95% of users in acceptance testing correctly identify completed vs active items at a glance.
- **SC-005**: At least 90% reduction in bug reports about todos disappearing immediately after completion within one release cycle.
