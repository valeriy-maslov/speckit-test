import { api } from './apiClient';
import type { TodoItem } from './types';

export const focusStore = {
  async load(): Promise<TodoItem[]> {
    return api.listTodos('DAILY');
  }
};
