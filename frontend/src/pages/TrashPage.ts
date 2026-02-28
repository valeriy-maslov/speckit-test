import { api } from '../services/apiClient';
import { inlineError } from '../components/InlineError';

export const renderTrash = async (): Promise<string> => {
  try {
    const trash = await api.listTrash();
    return `<section>
      <div class="card">
        <div class="card-header">Trash</div>
        <ul class="list-group list-group-flush">${
          trash.length
            ? trash.map((t) => `<li class="list-group-item text-muted">${t.title}</li>`).join('')
            : '<li class="list-group-item text-muted">Trash is empty</li>'
        }</ul>
      </div>
    </section>`;
  } catch (err) {
    return inlineError(err instanceof Error ? err.message : 'Failed to load trash');
  }
};
