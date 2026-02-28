import fs from 'node:fs';
import path from 'node:path';
import { db } from './client.js';

export const initDb = (): void => {
  const schemaPath = path.resolve(process.cwd(), 'src/db/schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(sql);
};
