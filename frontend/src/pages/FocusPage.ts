import { focusStore } from '../services/focusStore';
import { inlineError } from '../components/InlineError';
import { todoListItem } from '../components/TodoListItem';

export const renderFocus = async (): Promise<string> => {
  try {
    const groups = await focusStore.load();
    return `<section>
      <div class="card">
        <div class="card-header">Focus Mode</div>
        ${
          groups.active.length || groups.completed.length
            ? `<ul class="list-group list-group-flush">
                ${groups.active.map((t) => todoListItem(t)).join('')}
                ${
                  groups.completed.length
                    ? `<li class="list-group-item text-muted small" aria-label="Completed todos">Completed</li>${groups.completed
                        .map((t) => todoListItem(t))
                        .join('')}`
                    : ''
                }
              </ul>`
            : '<ul class="list-group list-group-flush"><li class="list-group-item text-muted">No daily items selected</li></ul>'
        }
      </div>
    </section>`;
  } catch (err) {
    return inlineError(err instanceof Error ? err.message : 'Failed to load focus');
  }
};
