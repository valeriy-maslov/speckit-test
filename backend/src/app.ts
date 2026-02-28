import cors from 'cors';
import express from 'express';
import { apiRouter } from './api/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { securityMiddleware } from './middleware/security.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(securityMiddleware);
app.use('/api', apiRouter);
app.use(errorHandler);
