import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
config();

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || ''
  },
  verbose: false
} satisfies Config;