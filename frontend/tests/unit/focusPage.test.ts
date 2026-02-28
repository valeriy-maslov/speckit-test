import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('../../src/services/focusStore', () => ({
  focusStore: {
    load: vi.fn()
  }
}));

import { focusStore } from '../../src/services/focusStore';
import { renderFocus } from '../../src/pages/FocusPage';

const mockedLoad = vi.mocked(focusStore.load);

describe('Focus page rendering', () => {
  beforeEach(() => {
    mockedLoad.mockReset();
  });

  it('shows empty-state when there are no active or completed todos', async () => {
    mockedLoad.mockResolvedValue({ active: [], completed: [] });
    const html = await renderFocus();
    expect(html).toContain('No daily items selected');
  });

  it('renders active items before completed items with completed section marker', async () => {
    mockedLoad.mockResolvedValue({
      active: [
        { id: 'a1', title: 'Active 1', source_inbox_point_id: null, status: 'DAILY', is_stale: 0, completed_at: null }
      ],
      completed: [
        { id: 'c1', title: 'Done 1', source_inbox_point_id: null, status: 'COMPLETED', is_stale: 0, completed_at: new Date().toISOString() }
      ]
    });

    const html = await renderFocus();
    const activePos = html.indexOf('Active 1');
    const markerPos = html.indexOf('Completed');
    const donePos = html.indexOf('Done 1');
    expect(activePos).toBeGreaterThan(-1);
    expect(markerPos).toBeGreaterThan(activePos);
    expect(donePos).toBeGreaterThan(markerPos);
  });
});
