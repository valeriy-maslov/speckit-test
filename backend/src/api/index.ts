import { Router } from 'express';
import { appStateRouter } from './appState.js';
import { inboxPointsRouter } from './inboxPoints.js';
import { todosRouter } from './todos.js';
import { dailyListRouter } from './dailyList.js';
import { modeRouter } from './mode.js';
import { rolloverRouter } from './rollover.js';
import { trashRouter } from './trash.js';

export const apiRouter = Router();

apiRouter.use('/app-state', appStateRouter);
apiRouter.use('/inbox-points', inboxPointsRouter);
apiRouter.use('/todos', todosRouter);
apiRouter.use('/daily-list', dailyListRouter);
apiRouter.use('/mode', modeRouter);
apiRouter.use('/rollover', rolloverRouter);
apiRouter.use('/trash', trashRouter);
