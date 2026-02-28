import { focusStore } from '../services/focusStore';
import { inlineError } from '../components/InlineError';
import { todoListItem } from '../components/TodoListItem';

export const renderFocus = async (): Promise<string> => {
  try {
    const todos = await focusStore.load();
    return `<section>
      <div class="card">
        <div class="card-header">Focus Mode</div>
        <ul class="list-group list-group-flush">${
          todos.length
            ? todos.map((t) => todoListItem(t)).join('')
            : '<li class="list-group-item text-muted">No daily items selected</li>'
        }</ul>
      </div>
    </section>`;
  } catch (err) {
    return inlineError(err instanceof Error ? err.message : 'Failed to load focus');
  }
};
