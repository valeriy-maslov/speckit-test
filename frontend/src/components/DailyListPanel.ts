import { todoListItem } from './TodoListItem';
import type { TodoItem } from '../services/types';

export const dailyListPanel = (todos: TodoItem[]): string => `
<div class="card">
  <div class="card-header">Today's Daily List</div>
  <ul class="list-group list-group-flush">
    ${todos.length ? todos.map((t) => todoListItem(t, true)).join('') : '<li class="list-group-item text-muted">No items selected</li>'}
  </ul>
</div>`;
