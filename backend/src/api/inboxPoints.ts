import { Router } from 'express';
import { db } from '../db/client.js';
import { genId, nowIso } from '../db/repository.js';

export const inboxPointsRouter = Router();

inboxPointsRouter.get('/', (_req, res) => {
  const points = db.prepare('SELECT * FROM inbox_points ORDER BY updated_at DESC').all();
  res.json(points);
});

inboxPointsRouter.post('/', (req, res) => {
  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text is required' });
  const now = nowIso();
  const point = { id: genId(), text, created_at: now, updated_at: now };
  db.prepare('INSERT INTO inbox_points(id,text,created_at,updated_at) VALUES (@id,@text,@created_at,@updated_at)').run(point);
  return res.status(201).json(point);
});
