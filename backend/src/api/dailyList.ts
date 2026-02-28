import { Router } from 'express';
import { setDailyAssignment } from '../services/todoService.js';

export const dailyListRouter = Router();

dailyListRouter.put('/:todoId', (req, res) => {
  setDailyAssignment(req.params.todoId, true);
  res.json({ ok: true });
});

dailyListRouter.delete('/:todoId', (req, res) => {
  setDailyAssignment(req.params.todoId, false);
  res.json({ ok: true });
});
