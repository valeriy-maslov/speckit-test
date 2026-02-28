import { api } from '../services/apiClient';
import type { AppMode } from '../services/types';

export const bindModeToggle = (onChange: (mode: AppMode) => void): void => {
  document.addEventListener('click', async (e) => {
    const el = e.target as HTMLElement;
    if (el.matches('[data-mode]')) {
      const mode = el.getAttribute('data-mode') as AppMode;
      await api.setMode(mode);
      onChange(mode);
    }
  });
};
