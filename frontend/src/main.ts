import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/status.css';
import { appLayout } from './components/AppLayout';
import { bindModeToggle } from './components/ModeToggle';
import { renderDailyReview, bindDailyReview } from './pages/DailyReviewPage';
import { renderFocus } from './pages/FocusPage';
import { renderTrash } from './pages/TrashPage';
import { api } from './services/apiClient';
import type { AppMode } from './services/types';

const app = document.getElementById('app');
let mode: AppMode = 'REVIEW';
let view: 'MAIN' | 'TRASH' = 'MAIN';

const paint = async (): Promise<void> => {
  if (!app) return;
  const content =
    view === 'TRASH' ? await renderTrash() : mode === 'FOCUS' ? await renderFocus() : await renderDailyReview();
  app.innerHTML = appLayout(content);
};

const boot = async (): Promise<void> => {
  const state = await api.getAppState();
  mode = state.mode;
  await paint();
  bindModeToggle(async (nextMode) => {
    view = 'MAIN';
    mode = nextMode;
    await paint();
  });

  document.addEventListener('click', async (e) => {
    const el = e.target as HTMLElement;
    if (el.matches('.complete-toggle')) {
      const li = el.closest('li');
      const id = li?.getAttribute('data-id');
      if (!id) return;
      const nextStatus = (el as HTMLInputElement).checked ? 'COMPLETED' : 'DAILY';
      await api.updateTodo(id, { status: nextStatus });
      await paint();
    }
    if (el.matches('[data-view="TRASH"]')) {
      view = 'TRASH';
      await paint();
    }
  });

  bindDailyReview(paint);
};

boot().catch((err) => {
  if (app) app.innerHTML = `<div class="container pt-4"><div class="alert alert-danger">${err.message}</div></div>`;
});
