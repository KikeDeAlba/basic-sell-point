import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'sell_point'
  },
  verbose: false
} satisfies Config;