import { api } from './apiClient';
import type { FocusTodoGroups } from './types';

export const focusStore = {
  async load(): Promise<FocusTodoGroups> {
    return api.listFocusTodos();
  }
};
