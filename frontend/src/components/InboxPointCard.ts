import type { InboxPoint } from '../services/types';

export const inboxPointCard = (point: InboxPoint): string => `
<div class="card mb-2" data-id="${point.id}">
  <div class="card-body py-2">
    <div class="d-flex justify-content-between align-items-center">
      <span>${point.text}</span>
      <button class="btn btn-sm btn-outline-primary make-todo">Create Todo</button>
    </div>
  </div>
</div>`;
