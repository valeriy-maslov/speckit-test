import { describe, expect, it } from 'vitest';
import { todoListItem } from '../../src/components/TodoListItem';

describe('TodoListItem', () => {
  it('applies strike-through classes only for completed todos', () => {
    const completed = todoListItem({
      id: 'c1',
      title: 'Done',
      source_inbox_point_id: null,
      status: 'COMPLETED',
      is_stale: 0,
      completed_at: new Date().toISOString()
    });
    const active = todoListItem({
      id: 'a1',
      title: 'Active',
      source_inbox_point_id: null,
      status: 'DAILY',
      is_stale: 0,
      completed_at: null
    });

    expect(completed).toContain('text-decoration-line-through text-muted');
    expect(active).not.toContain('text-decoration-line-through text-muted');
  });
});
