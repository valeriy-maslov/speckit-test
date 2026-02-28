import { Router } from 'express';
import { listTodos } from '../services/todoService.js';
import { getMode } from '../services/sessionService.js';

export const appStateRouter = Router();

appStateRouter.get('/', (_req, res) => {
  res.json({
    mode: getMode(),
    inbox: listTodos('INBOX'),
    daily: listTodos('DAILY'),
    completed: listTodos('COMPLETED'),
    trash: listTodos('TRASH')
  });
});
