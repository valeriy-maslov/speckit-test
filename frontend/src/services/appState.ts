import { api } from './apiClient';

export const appStateService = {
  async getState() {
    return api.getAppState();
  }
};
