export const appNav = (): string => `
<nav class="navbar navbar-expand bg-light mb-3 px-3">
  <span class="navbar-brand mb-0 h1">Daily Focus</span>
  <div class="ms-auto d-flex gap-2">
    <button class="btn btn-outline-secondary btn-sm" data-mode="REVIEW">Daily Review</button>
    <button class="btn btn-outline-secondary btn-sm" data-mode="FOCUS">Focus</button>
    <button class="btn btn-outline-secondary btn-sm" data-view="TRASH">Trash</button>
  </div>
</nav>`;
