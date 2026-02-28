export type AppMode = 'REVIEW' | 'FOCUS';

export interface DailySession {
  session_date: string;
  active_mode: AppMode;
  rollover_applied: 0 | 1;
  created_at: string;
  updated_at: string;
}
