import { Router } from 'express';
import { listTrash } from '../services/todoService.js';

export const trashRouter = Router();

trashRouter.get('/', (_req, res) => {
  res.json(listTrash());
});
