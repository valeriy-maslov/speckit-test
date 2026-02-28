import { api } from './apiClient';
import type { InboxPoint, TodoItem } from './types';

export const reviewStore = {
  async load(): Promise<{ points: InboxPoint[]; inbox: TodoItem[]; daily: TodoItem[] }> {
    const [points, inbox, daily] = await Promise.all([
      api.listInboxPoints(),
      api.listTodos('INBOX'),
      api.listTodos('DAILY')
    ]);
    return { points, inbox, daily };
  }
};
