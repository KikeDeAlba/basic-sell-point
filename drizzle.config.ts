import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
config();

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.PUBLIC_DB_HOST || '',
    user: process.env.PUBLIC_DB_USER || '',
    password: process.env.PUBLIC_DB_PASSWORD || '',
    database: process.env.PUBLIC_DB_NAME || ''
  }
} satisfies Config;