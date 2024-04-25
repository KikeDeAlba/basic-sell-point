import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = await mysql.createPool({
  host: import.meta.env.PUBLIC_DB_HOST || '',
  user: import.meta.env.PUBLIC_DB_USER || '',
  password: import.meta.env.PUBLIC_DB_PASSWORD || '',
  database: import.meta.env.PUBLIC_DB_NAME || ''
})

export const db = drizzle(poolConnection);