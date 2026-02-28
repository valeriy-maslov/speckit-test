# Feature Specification: Daily Focus Todo Manager

**Feature Branch**: `001-todo-daily-focus`  
**Created**: 2026-02-28  
**Status**: Draft  
**Input**: User description: "Create the application for managing todo lists. It should be simple and straight forward. The app implements this workflow: - when you open it you enter the daily review mode, it displays the inbox area containing points, for each point I need to come up with todo items that I can move into todo list (daily list). - when I finish the daily review I want to enter focus mode when I can only see the todo items I have chosen for today. When I check todo item as completed it does not go away, it becomes stricked through. - in the of the day any unfinished items move back to the top of the inbox. - items that exist in inbox more than 1 week and todos that are not completed for several days (3 days for example) even, if they were added to daily list, should be marked with red, if nothing changes in the next week - items must be moved to the trash (keeping them forever in there), trash should be still accessible"

## Clarifications

### Session 2026-02-28

- Q: What should happen to completed daily items at day rollover? → A: Do nothing; keep them completed and do not move them to inbox.
- Q: What authentication model should the app use? → A: No app login; rely on local device access only.
- Q: How should end-of-day rollover be triggered? → A: Automatic on first app open each new day, with optional manual trigger.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Daily Review and Planning (Priority: P1)

As a user starting the day, I open the app directly in Daily Review mode, review inbox points,
create todo items from those points, and choose which todos are on today's daily list.

**Why this priority**: Daily planning is the core workflow and must work before focus or aging logic
provides value.

**Independent Test**: Open app with existing inbox points, create todos from points, move selected todos
to daily list, and verify the daily list contains exactly those selected items.

**Acceptance Scenarios**:

1. **Given** the user opens the app, **When** no explicit mode is selected, **Then** Daily Review mode is shown by default.
2. **Given** inbox points exist, **When** the user creates todos from a point, **Then** created todos are stored and available for selection into today's daily list.
3. **Given** multiple todos exist, **When** the user marks some for today, **Then** only selected items appear in today's daily list.

---

### User Story 2 - Focus Mode Execution (Priority: P2)

As a user who finished daily review, I switch to Focus mode and see only today's selected todos,
then complete tasks while keeping a visible history of done items.

**Why this priority**: Focus mode enables execution while reducing distraction and is the primary
in-day usage mode.

**Independent Test**: After creating a daily list, enter Focus mode and confirm only today's items are
shown; complete one item and verify it remains visible with strikethrough style.

**Acceptance Scenarios**:

1. **Given** daily list items are selected, **When** user enters Focus mode, **Then** only daily list items are visible.
2. **Given** a visible todo in Focus mode, **When** the user marks it complete, **Then** the todo remains visible and is rendered as struck through.
3. **Given** all daily items are complete, **When** user remains in Focus mode, **Then** completed items remain visible as completed for end-of-day review.

---

### User Story 3 - Aging, Requeue, and Trash Lifecycle (Priority: P3)

As a user at end of day and over multiple days, unfinished daily items return to inbox,
stale items are highlighted in red, and unchanged stale items are auto-moved to trash while
remaining accessible forever.

**Why this priority**: Lifecycle automation keeps inbox actionable and prevents neglected items from
cluttering active views.

**Independent Test**: Simulate day transitions and item aging; verify unfinished daily items return to inbox
top, stale thresholds apply red marking, and after another week of no changes those items move to trash.

**Acceptance Scenarios**:

1. **Given** unfinished items remain on the daily list at day end, **When** day rollover occurs, **Then** those items move to the top of inbox.
2. **Given** an inbox item is older than 7 days or a todo is incomplete for 3+ days, **When** item lists load, **Then** the item is marked red.
3. **Given** an item is already red-marked and unchanged for 7 additional days, **When** day rollover occurs, **Then** the item moves to trash.
4. **Given** items are in trash, **When** user opens trash, **Then** all trashed items remain accessible with no automatic deletion.
5. **Given** a todo is completed before day rollover, **When** rollover occurs, **Then** it remains completed and is not moved to inbox.

---

### Edge Cases

- User opens app with an empty inbox and no daily list items.
- User creates multiple todos from one inbox point and selects only some for today.
- User unchecks a completed item in Focus mode before day end.
- Day rollover occurs while app is open; views refresh without duplicate items.
- An item meets multiple stale criteria at once; red state is applied once without conflicting labels.
- Trash view contains a very large history; retrieval remains reliable and ordered.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST open in Daily Review mode by default.
- **FR-002**: System MUST provide an inbox area for user-managed points.
- **FR-003**: System MUST allow users to create one or more todo items from an inbox point.
- **FR-004**: System MUST allow users to assign and unassign todos to today's daily list.
- **FR-005**: System MUST provide a Focus mode that displays only todos assigned to today's daily list.
- **FR-006**: System MUST keep completed todos visible in Focus mode and render them as struck through.
- **FR-007**: System MUST move unfinished daily-list todos back to the top of inbox at end-of-day rollover.
- **FR-008**: System MUST mark an item red when it is either in inbox for more than 7 days or incomplete for 3 or more days after being added to a daily list.
- **FR-009**: System MUST move red-marked items to trash if they remain unchanged for an additional 7 days.
- **FR-010**: System MUST keep trashed items indefinitely and provide an accessible trash view.
- **FR-011**: System MUST prevent nested structures; inbox points and todos MUST remain top-level items only.
- **FR-012**: System MUST preserve item state transitions (inbox, daily list, completed, stale, trash) across sessions.
- **FR-013**: System MUST leave completed items unchanged during end-of-day rollover (no automatic move to inbox).
- **FR-014**: System MUST execute rollover automatically on first app open each new day and also allow manual rollover trigger.

### Quality & Non-Functional Requirements *(mandatory)*

- **QR-001 (Code Quality)**: Changes MUST satisfy project linting, static analysis, and code review gates.
- **QR-002 (Testing)**: Automated tests MUST cover mode transitions, item lifecycle transitions, day rollover behavior, and stale/trash rules.
- **QR-003 (UX Consistency)**: The app MUST keep a simple, low-friction interaction model with consistent visual treatment for inbox, focus, completed, stale, and trash states.
- **QR-004 (Performance)**: The system MUST load Daily Review and Focus views for a typical personal dataset within 2 seconds for at least 95% of interactions.

### Key Entities *(include if feature involves data)*

- **InboxPoint**: A raw planning point entered by the user; can produce one or more TodoItems.
- **TodoItem**: Actionable task with fields for title, status, source point, created date, last changed date, daily-list assignment date, completion state, stale marker, and trash timestamp.
- **DailyList**: Logical collection of TodoItems selected for the current day.
- **TrashEntry**: Archived TodoItem state retained indefinitely and accessible in trash view.

### Assumptions

- The application is single-user and local account management is out of scope for this feature.
- No in-app authentication is required; access control is delegated to local device/user access.
- End-of-day rollover runs once per calendar day using the user's local date.
- Automatic rollover executes at first app open each new day; users may also run it manually.
- "Unchanged" means no status change, no reassignment, and no content edit.
- Red marking is visual only and does not block editing or completion.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of app launches start in Daily Review mode.
- **SC-002**: In user testing, at least 90% of participants can create todos from inbox points and select today's list in under 3 minutes.
- **SC-003**: In Focus mode, 100% of completed items remain visible and struck through until day rollover.
- **SC-004**: In lifecycle validation, 100% of unfinished daily-list items move to inbox top at day rollover.
- **SC-005**: In automated policy tests, at least 99% of stale and auto-trash decisions match defined thresholds.
- **SC-006**: For datasets up to 2,000 items across inbox, daily list, and trash, view load time is under 2 seconds in 95% of interactions.
