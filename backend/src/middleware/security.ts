import type { NextFunction, Request, Response } from 'express';

export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const length = Number(req.headers['content-length'] || 0);
  if (length > 1024 * 1024) {
    res.status(413).json({ error: 'Payload too large' });
    return;
  }
  next();
};
