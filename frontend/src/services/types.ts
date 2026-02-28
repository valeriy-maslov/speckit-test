export type AppMode = 'REVIEW' | 'FOCUS';
export type TodoStatus = 'INBOX' | 'DAILY' | 'COMPLETED' | 'TRASH';

export interface InboxPoint {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface TodoItem {
  id: string;
  title: string;
  source_inbox_point_id: string | null;
  status: TodoStatus;
  is_stale: number;
  completed_at: string | null;
}

export interface FocusTodoGroups {
  active: TodoItem[];
  completed: TodoItem[];
}

export interface AppState {
  mode: AppMode;
  inbox: TodoItem[];
  daily: TodoItem[];
  completed: TodoItem[];
  trash: TodoItem[];
}
