import { Router } from 'express';
import { getMode, setMode } from '../services/sessionService.js';

export const modeRouter = Router();

modeRouter.put('/', (req, res) => {
  const mode = req.body?.mode;
  if (mode !== 'REVIEW' && mode !== 'FOCUS') return res.status(400).json({ error: 'invalid mode' });
  res.json({ mode: setMode(mode) });
});

modeRouter.get('/', (_req, res) => {
  res.json({ mode: getMode() });
});
