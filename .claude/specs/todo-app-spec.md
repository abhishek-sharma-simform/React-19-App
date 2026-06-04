# Todo Application — Feature Specification

**Document Type:** Spec-Driven Development (SDD)
**Version:** 1.0.1
**Status:** Phase 1 Complete, Phase 2+ In Planning
**Last Updated:** June 2026

---

## 1. Overview

This document specifies the design, architecture, and feature set for a full-featured **Todo Application** to be integrated into an existing ReactJS project as a new top-level navigation route. The goal is to deliver a best-in-class task management experience within the existing app shell.

---

## 1.1 Implementation Status

**Phase 1 — COMPLETED** ✅ (June 2026)

The Phase 1 MVP has been fully implemented with the following enhancements over the original spec:
- **Undo/Restore Feature:** Toast notifications with "Restore" button when tasks are marked complete
- **Completed Smart List:** Dedicated view for all completed tasks with restoration capability
- **Proper Timezone Handling:** Date parsing respects local timezone for accurate "Today" filtering
- **Toast Notification System:** Flexible notification system for user feedback

See [Component Architecture](#10-component-architecture) for actual Phase 1 implementation details.

---

## 2. Scope

| In Scope | Out of Scope |
|---|---|
| New navbar link/route `/todos` | Backend API / database (Phase 1) |
| Full Todo UI with all features | User authentication (Phase 1) |
| Local state + localStorage persistence | Multi-user collaboration (Phase 1) |
| Responsive design (mobile + desktop) | Native mobile app |

---

## 3. Navbar Integration

### 3.1 Requirement

Add a **"Tasks"** (or **"To-Do"**) navigation item to the existing top navbar that routes to the Todo application page.

### 3.2 Acceptance Criteria

- [ ] A new nav link labelled **"Tasks"** (icon: ✅ or checklist icon) appears in the primary navbar.
- [ ] Clicking it navigates to `/todos` without a full page reload (React Router `<Link>`).
- [ ] The nav item is highlighted/active when the user is on the `/todos` route.
- [ ] On mobile, the nav item is accessible via the hamburger/drawer menu.
- [ ] Badge on the nav item shows count of incomplete tasks (e.g., `Tasks 3`).

### 3.3 Implementation Notes

```jsx
// In your router config (e.g., App.jsx or routes.js)
import TodoApp from './pages/TodoApp';

<Route path="/todos" element={<TodoApp />} />

// In Navbar component
<NavLink to="/todos" activeClassName="active">
  <CheckSquareIcon />
  Tasks
  {incompleteTodoCount > 0 && <Badge>{incompleteTodoCount}</Badge>}
</NavLink>
```

---

## 4. Todo Application — Page Layout

### 4.1 Page Structure

```
┌─────────────────────────────────────────────┐
│  NAVBAR  (existing — with new Tasks link)   │
├─────────────────────────────────────────────┤
│  PAGE HEADER                                │
│  "My Tasks"  +  [+ New Task] button         │
├───────────────┬─────────────────────────────┤
│               │                             │
│  SIDEBAR      │   MAIN CONTENT AREA         │
│  - All Tasks  │   Task List / Board / Cal   │
│  - Today      │                             │
│  - Upcoming   │                             │
│  - Projects   │                             │
│  - Labels     │                             │
│  - Completed  │                             │
│               │                             │
└───────────────┴─────────────────────────────┘
```

### 4.2 View Modes

The user can switch between three views via toggle buttons in the toolbar:

| View | Description |
|---|---|
| **List View** | Flat, scrollable list of tasks grouped by date/project |
| **Board View** | Kanban columns: `To Do`, `In Progress`, `Done` |
| **Calendar View** | Monthly calendar with tasks plotted on due dates |

---

## 5. Core Features

### 5.1 Task Creation

**Trigger:** Click `+ New Task` button, or press `N` keyboard shortcut.

**Quick Add Bar** (always visible at top of task list):
- Single-line input: `What needs to be done?`
- Press `Enter` to save.
- Supports **inline shorthand** parsing:
  - `!1` → Priority: Urgent
  - `#ProjectName` → Assign to project
  - `@label` → Add label
  - `due: tomorrow` / `due: friday` → Set due date

**Full Task Modal** (click expand icon or press `Shift+Enter`):

| Field | Type | Notes |
|---|---|---|
| Title | Text (required) | Max 255 chars |
| Description | Rich text (Markdown) | Optional |
| Due Date | Date picker | Optional |
| Due Time | Time picker | Optional |
| Priority | Select | None / Low / Medium / High / Urgent |
| Project | Select | Optional — assign to a project |
| Labels / Tags | Multi-select | Create new inline |
| Sub-tasks | Nested list | Unlimited nesting depth |
| Attachments | File upload | Phase 2 |
| Reminder | Date + Time | Optional |
| Repeat | Recurrence rule | Daily / Weekly / Monthly / Custom |

### 5.2 Task Editing

- Click any task to open the **Task Detail Panel** (slide-in drawer on desktop, full-screen on mobile).
- All fields are inline-editable.
- Changes auto-save with debounce (500ms).
- Edit history / undo with `Cmd+Z`.

### 5.3 Task Completion

- Click the **circle checkbox** to mark complete.
- Completed task gets a strikethrough and moves to "Completed" section.
- **Undo toast** appears for 5 seconds after completion with a "Restore" button.
- User can click "Restore" button or let it auto-dismiss and manually access via "Completed" smart list.
- Clicking checkbox again restores the task (toggle).
- Bulk complete: select multiple tasks → `Mark as Done`.

### 5.4 Task Deletion

- Hover a task → reveal `⋮` menu → **Delete**.
- Soft delete: task moves to **Trash** and is permanently deleted after 30 days.
- **Undo toast** appears for 5 seconds after deletion.
- Bulk delete supported.

---

## 6. Advanced Features

### 6.1 Projects

- Users can create named **Projects** (e.g., "Work", "Personal", "Shopping").
- Each project has a **color** and optional **emoji icon**.
- Tasks can be assigned to one project.
- Projects appear in the left sidebar.
- Project view shows only tasks belonging to that project.
- Project progress bar: `X of Y tasks complete`.

### 6.2 Labels / Tags

- Free-form color-coded labels (e.g., `#urgent`, `#bug`, `#ideas`).
- Tasks can have multiple labels.
- Filter tasks by one or more labels.
- Label management screen (create, rename, delete, recolor).

### 6.3 Priorities

Four priority levels with visual indicators:

| Level | Color | Icon |
|---|---|---|
| Urgent | Red | 🔴 |
| High | Orange | 🟠 |
| Medium | Yellow | 🟡 |
| Low | Blue | 🔵 |
| None | Gray | — |

### 6.4 Due Dates & Reminders

- Date picker with natural language input (`tomorrow`, `next Monday`).
- Overdue tasks highlighted in red.
- **Today** smart list shows all tasks due today.
- **Upcoming** smart list shows tasks due in the next 7 days.
- Browser notification reminder (requires permission).

### 6.5 Sub-tasks

- Any task can contain an ordered list of sub-tasks.
- Sub-tasks have their own completion checkbox.
- Parent task shows sub-task progress: `2/5 subtasks`.
- Sub-tasks can be converted to full tasks.

### 6.6 Recurring Tasks

- Set a recurrence rule: Daily, Weekly (pick days), Monthly, Yearly, Custom (RRULE).
- When a recurring task is completed, the next occurrence is auto-created.
- Edit options: `This task only` / `This and future tasks` / `All tasks`.

### 6.7 Search & Filter

**Global Search Bar** (keyboard shortcut: `Cmd+K` / `Ctrl+K`):
- Full-text search across task titles and descriptions.
- Results shown instantly with highlighted matches.
- Filter chips: `By Project`, `By Label`, `By Priority`, `By Due Date`, `By Status`.
- Saved filters / custom smart lists.

### 6.8 Sorting & Grouping

Users can sort the task list by:
- Due Date (ascending / descending)
- Priority
- Creation Date
- Alphabetical (A–Z / Z–A)
- Manual drag-and-drop order

Users can group by:
- Project
- Priority
- Due Date
- Label

### 6.9 Drag & Drop

- Drag tasks to reorder within a list.
- Drag tasks between projects (in sidebar).
- Drag tasks between Kanban columns (Board View).
- Drag to change due date in Calendar View.

### 6.10 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `N` | New task |
| `Enter` | Save quick-add task |
| `Shift+Enter` | Open full task modal |
| `Cmd/Ctrl+K` | Open search |
| `Cmd/Ctrl+Z` | Undo last action |
| `E` | Edit focused task |
| `Delete` | Delete focused task |
| `Space` | Toggle complete on focused task |
| `1–4` | Set priority (1=Urgent, 4=Low) |
| `?` | Show keyboard shortcut help modal |

### 6.11 Bulk Actions

- Multi-select tasks with `Shift+Click` or checkbox.
- Bulk: Complete, Delete, Change Priority, Move to Project, Add Label.
- "Select All" on current view.

---

## 7. Smart Lists (Left Sidebar)

| Smart List | Logic |
|---|---|
| **All Tasks** | Every incomplete task |
| **Today** | `dueDate == today` |
| **Upcoming** | `dueDate within 7 days` |
| **No Due Date** | Tasks without a due date |
| **High Priority** | Priority is Urgent or High |
| **Completed** | All completed tasks |
| **Trash** | Soft-deleted tasks |

---

## 8. Data Model

### 8.1 Task Object

```typescript
interface Task {
  id: string;                        // UUID
  title: string;                     // required
  description?: string;              // Markdown string
  completed: boolean;                // default: false
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  dueTime?: string;                  // "HH:mm"
  priority: 'none' | 'low' | 'medium' | 'high' | 'urgent';
  projectId?: string;
  labels: string[];                  // array of label IDs
  subTasks: SubTask[];
  recurrence?: RecurrenceRule;
  reminder?: Date;
  order: number;                     // for manual sorting
  status: 'todo' | 'in_progress' | 'done'; // for Kanban
  deletedAt?: Date;                  // soft delete
}
```

### 8.2 Project Object

```typescript
interface Project {
  id: string;
  name: string;
  color: string;      // hex color
  emoji?: string;
  createdAt: Date;
  order: number;
}
```

### 8.3 Label Object

```typescript
interface Label {
  id: string;
  name: string;
  color: string;     // hex color
}
```

---

## 9. State Management

### 9.1 Recommended Approach

| Concern | Solution |
|---|---|
| Global task state | **Zustand** store (or Redux Toolkit) |
| Persistence | `localStorage` via `zustand/middleware/persist` |
| Server sync (Phase 2) | React Query / TanStack Query |
| Form state | React Hook Form |
| Drag & drop | `@dnd-kit/core` |
| Date handling | `date-fns` |

### 9.2 Store Slices

```
store/
├── useTodoStore.ts       # tasks CRUD, filtering, sorting
├── useProjectStore.ts    # projects CRUD
├── useLabelStore.ts      # labels CRUD
├── useUIStore.ts         # view mode, sidebar, selected task, modals
```

---

## 10. Component Architecture

### Phase 1 Implementation

```
Components/
├── TodoApp.tsx                     # Page root, layout shell
├── Navbar.tsx                      # Navigation with Tasks link + badge
└── todo/
    ├── SmartListNav.tsx            # Sidebar with smart lists
    ├── QuickAddBar.tsx             # Task input bar
    ├── TaskList.tsx                # Task list container
    ├── TaskItem.tsx                # Single task row
    ├── TaskDetailPanel.tsx         # Slide-in edit panel
    ├── Toast.tsx                   # Notification toasts
    ├── PriorityBadge.tsx           # Priority indicator
    └── DueDateChip.tsx             # Due date display

styles/
└── tokens.css                      # Design system (colors, spacing, typography)

types/
├── todo.ts                         # Domain types
└── forms.ts                        # Form types

store/
├── taskStore.ts                    # Task state with localStorage persist
└── uiStore.ts                      # UI state (toasts, modals, etc)

hooks/
├── useTasks.ts                     # Task operations facade
├── useSmartList.ts                 # Smart list logic
├── useTaskForm.ts                  # Form integration
└── useKeyboardShortcut.ts          # Keyboard event handling

utils/
├── storage.ts                      # localStorage helpers
├── dateHelpers.ts                  # Date utilities with timezone support
├── taskFilters.ts                  # Smart list filtering logic
└── taskHelpers.ts                  # Task creation/update utilities
```

### Phase 2+ Component Structure (Planned)

```
components/todo/
├── Board/
│   ├── BoardView.tsx
│   ├── DroppableColumn.tsx
│   └── DraggableCard.tsx
├── Calendar/
│   ├── CalendarView.tsx
│   └── DayPopover.tsx
├── SearchBar.tsx                   # Global search
├── ProjectList.tsx                 # Projects section
├── CreateProjectModal.tsx          # Project creation
├── LabelPicker.tsx                 # Label multi-select
├── SubTaskList.tsx                 # Sub-task list
├── RecurrenceEditor.tsx            # Recurrence UI
└── BulkActionBar.tsx               # Bulk action toolbar
```

---

## 11. UX & Interaction Design

### 11.1 Empty States

- New user: illustration + `"You're all caught up! Add your first task."` CTA.
- Empty project: `"No tasks in this project yet."` + `+ Add Task` button.
- Empty search: `"No results for '...'."` with a clear filters option.

### 11.2 Loading States

- Skeleton loaders for task list on initial render.
- Optimistic UI updates — tasks appear instantly, sync in background.

### 11.3 Error States

- Toast notification for save failures with retry option.
- Conflict resolution modal (Phase 2, for multi-user).

### 11.3.1 Toast Notifications

**Undo Toast for Task Completion:**
- Appears at bottom-left when a task is marked complete
- Shows task title: `"Task name" marked as complete`
- Includes a "Restore" button to undo the completion instantly
- Auto-dismisses after 5 seconds
- Can be manually dismissed with X button
- Provides quick recovery for accidental task completion

**Undo Toast for Task Deletion:**
- Appears after task deletion with "Undo" button
- Auto-dismisses after 5 seconds
- Allows recovery of soft-deleted tasks

### 11.4 Animations

- Task completion: checkbox pulse + strikethrough transition.
- New task: slides in from top.
- Delete: collapses with fade.
- Panel open/close: slide-in/out from right.
- Drag & drop: ghost preview, drop-zone highlight.

---

## 12. Responsive Design

| Breakpoint | Behavior |
|---|---|
| `< 640px` (mobile) | Sidebar hidden → accessible via drawer; task detail is full-screen |
| `640–1024px` (tablet) | Sidebar collapsible; detail panel overlays |
| `> 1024px` (desktop) | Full 3-column layout; detail panel side-by-side |

---

## 13. Accessibility (a11y)

- All interactive elements reachable via `Tab` key.
- Checkboxes have proper `aria-label="Mark [task title] as complete"`.
- Drag-and-drop has keyboard alternative (move up/down with arrow keys).
- Color is never the sole indicator (icons + text accompany color).
- `role="list"` and `role="listitem"` on task lists.
- Focus trap in modals.
- WCAG 2.1 AA compliance target.

---

## 14. Performance Requirements

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 2.5s |
| Task list render (1000 tasks) | < 100ms (virtual list) |
| Search results | < 50ms (client-side) |

**Virtualization:** Use `@tanstack/react-virtual` for lists with more than 50 items.

---

## 15. Phased Delivery Plan

### Phase 1 — MVP (Week 1–2)
- [x] Navbar integration + route with incomplete task badge
- [x] Quick add bar with title, priority, and due date
- [x] List View with complete/delete
- [x] Task detail panel for full editing
- [x] Priority & due date fields with proper timezone handling
- [x] localStorage persistence with Date object rehydration
- [x] Smart lists: All Tasks, Today, and Completed with task counters
- [x] Undo toast notifications for task completion with "Restore" button
- [x] Keyboard shortcut: Escape to close detail panel
- [x] Responsive layout (sidebar + main area + detail panel)

### Phase 2 — Core Features (Week 3–4)
- [ ] Projects sidebar
- [ ] Labels
- [ ] Sub-tasks
- [ ] Board (Kanban) View
- [ ] Search & filter
- [ ] Keyboard shortcuts
- [ ] Drag & drop reorder

### Phase 3 — Power Features (Week 5–6)
- [ ] Calendar View
- [ ] Recurring tasks
- [ ] Reminders (browser notifications)
- [ ] Bulk actions
- [ ] Saved filters / custom smart lists

### Phase 4 — Backend Sync (Future)
- [ ] REST / GraphQL API integration
- [ ] User authentication
- [ ] Real-time sync
- [ ] File attachments
- [ ] Multi-user / shared projects

---

## 16. Dependencies

```json
{
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "@dnd-kit/core": "^6.x",
  "@dnd-kit/sortable": "^7.x",
  "date-fns": "^3.x",
  "react-hook-form": "^7.x",
  "@tanstack/react-virtual": "^3.x",
  "lucide-react": "^0.3x"
}
```

---

## 17. File & Folder Structure

```
src/
├── pages/
│   └── TodoApp.tsx
├── components/
│   └── todo/               # All todo-related components (see §10)
├── store/
│   ├── useTodoStore.ts
│   ├── useProjectStore.ts
│   ├── useLabelStore.ts
│   └── useUIStore.ts
├── hooks/
│   ├── useTodos.ts
│   ├── useProjects.ts
│   └── useSearch.ts
├── utils/
│   ├── taskParser.ts       # Inline shorthand parser (#project, !priority)
│   ├── recurrence.ts       # RRULE generation / next-occurrence logic
│   └── dateHelpers.ts
└── types/
    └── todo.types.ts       # All TypeScript interfaces
```

---

## 18. Definition of Done

A feature is considered **done** when:

1. ✅ Acceptance criteria in this spec are met.
2. ✅ Unit tests cover core logic (store, utils).
3. ✅ Component renders without errors in mobile + desktop viewports.
4. ✅ No TypeScript errors (`tsc --noEmit` passes).
5. ✅ Keyboard navigation works end-to-end for the feature.
6. ✅ No regressions in existing routes/navbar.

---

*End of Specification — v1.0.0*
