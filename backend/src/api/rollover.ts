import { Router } from 'express';
import { applyRollover } from '../services/lifecycleService.js';

export const rolloverRouter = Router();

rolloverRouter.post('/', (_req, res) => {
  applyRollover();
  res.json({ ok: true });
});
