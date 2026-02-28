import { Router } from 'express';
import { createTodo, listTodos, updateTodo } from '../services/todoService.js';

export const todosRouter = Router();

todosRouter.get('/', (req, res) => {
  const status = req.query.status as any;
  res.json(listTodos(status));
});

todosRouter.post('/', (req, res) => {
  const title = String(req.body?.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title is required' });
  const todo = createTodo(title, req.body?.source_inbox_point_id ?? null);
  return res.status(201).json(todo);
});

todosRouter.patch('/:todoId', (req, res) => {
  const todo = updateTodo(req.params.todoId, req.body || {});
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  return res.json(todo);
});
