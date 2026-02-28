import type { TodoItem } from '../services/types';

export const todoListItem = (todo: TodoItem, showCheckbox = true): string => {
  const staleClass = todo.is_stale ? 'text-danger' : '';
  const doneClass = todo.status === 'COMPLETED' ? 'text-decoration-line-through text-muted' : '';
  return `<li class="list-group-item d-flex justify-content-between align-items-center ${staleClass}" data-id="${todo.id}">
    <span class="${doneClass}">${todo.title}</span>
    ${showCheckbox ? `<input type="checkbox" class="form-check-input complete-toggle" ${todo.status === 'COMPLETED' ? 'checked' : ''}/>` : ''}
  </li>`;
};
