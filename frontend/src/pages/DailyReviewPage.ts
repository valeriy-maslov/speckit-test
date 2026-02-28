import { api } from '../services/apiClient';
import { reviewStore } from '../services/reviewStore';
import { dailyListPanel } from '../components/DailyListPanel';
import { inboxPointCard } from '../components/InboxPointCard';
import { inlineError } from '../components/InlineError';

export const renderDailyReview = async (): Promise<string> => {
  try {
    const { points, inbox, daily } = await reviewStore.load();
    const pointCards = points.map(inboxPointCard).join('');
    const inboxTodos = inbox
      .map(
        (t) => `<li class="list-group-item d-flex justify-content-between"><span>${t.title}</span><button class="btn btn-sm btn-primary add-daily" data-id="${t.id}">Add to Daily</button></li>`
      )
      .join('');

    return `
<section>
  <div class="row g-3">
    <div class="col-lg-6">
      <div class="card mb-3">
        <div class="card-header">Inbox Points</div>
        <div class="card-body">
          <form id="point-form" class="d-flex gap-2 mb-3">
            <input id="point-input" class="form-control" placeholder="Add inbox point" />
            <button class="btn btn-primary" type="submit">Add</button>
          </form>
          ${pointCards || '<div class="text-muted">No inbox points yet</div>'}
        </div>
      </div>
      <div class="card">
        <div class="card-header">Inbox Todos</div>
        <ul class="list-group list-group-flush">${inboxTodos || '<li class="list-group-item text-muted">No inbox todos</li>'}</ul>
      </div>
    </div>
    <div class="col-lg-6">${dailyListPanel(daily)}</div>
  </div>
</section>`;
  } catch (err) {
    return inlineError(err instanceof Error ? err.message : 'Failed to load review');
  }
};

export const bindDailyReview = (refresh: () => Promise<void>): void => {
  document.addEventListener('submit', async (e) => {
    const form = e.target as HTMLFormElement;
    if (form.id !== 'point-form') return;
    e.preventDefault();
    const input = document.getElementById('point-input') as HTMLInputElement | null;
    const text = input?.value.trim() || '';
    if (!text) return;
    await api.createInboxPoint(text);
    if (input) input.value = '';
    await refresh();
  });

  document.addEventListener('click', async (e) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains('add-daily')) {
      await api.assignDaily(el.getAttribute('data-id') || '');
      await refresh();
    }
    if (el.classList.contains('make-todo')) {
      const card = el.closest('.card');
      const id = card?.getAttribute('data-id') || undefined;
      const title = window.prompt('Todo title');
      if (title?.trim()) {
        await api.createTodo(title.trim(), id);
        await refresh();
      }
    }
  });
};
