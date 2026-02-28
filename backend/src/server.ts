import { app } from './app.js';
import { config } from './config.js';
import { initDb } from './db/initDb.js';
import { ensureSession } from './services/sessionService.js';
import { evaluateLifecycleOnOpen } from './services/lifecycleService.js';

initDb();
ensureSession();
evaluateLifecycleOnOpen();

app.listen(config.port, () => {
  console.log(`Backend listening on http://localhost:${config.port}`);
});
