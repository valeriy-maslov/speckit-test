import type { AppState, AppMode, InboxPoint, TodoItem, TodoStatus } from './types';

const BASE = 'http://localhost:3000/api';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
};

export const api = {
  getAppState: () => request<AppState>('/app-state'),
  listInboxPoints: () => request<InboxPoint[]>('/inbox-points'),
  createInboxPoint: (text: string) => request<InboxPoint>('/inbox-points', { method: 'POST', body: JSON.stringify({ text }) }),
  createTodo: (title: string, source_inbox_point_id?: string) => request<TodoItem>('/todos', { method: 'POST', body: JSON.stringify({ title, source_inbox_point_id }) }),
  listTodos: (status?: TodoStatus) => request<TodoItem[]>(`/todos${status ? `?status=${status}` : ''}`),
  updateTodo: (id: string, patch: Partial<{ title: string; status: TodoStatus }>) => request<TodoItem>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  assignDaily: (id: string) => request<{ ok: boolean }>(`/daily-list/${id}`, { method: 'PUT' }),
  unassignDaily: (id: string) => request<{ ok: boolean }>(`/daily-list/${id}`, { method: 'DELETE' }),
  setMode: (mode: AppMode) => request<{ mode: AppMode }>('/mode', { method: 'PUT', body: JSON.stringify({ mode }) }),
  rollover: () => request<{ ok: boolean }>('/rollover', { method: 'POST' }),
  listTrash: () => request<TodoItem[]>('/trash')
};
