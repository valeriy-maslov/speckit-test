export type TodoStatus = 'INBOX' | 'DAILY' | 'COMPLETED' | 'TRASH';

export interface TodoItem {
  id: string;
  title: string;
  source_inbox_point_id: string | null;
  status: TodoStatus;
  is_stale: 0 | 1;
  created_at: string;
  updated_at: string;
  daily_assigned_at: string | null;
  completed_at: string | null;
  stale_marked_at: string | null;
  trashed_at: string | null;
  last_activity_at: string;
}
