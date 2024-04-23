import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = await mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "sell_point",
  password: "123456"
})

export const db = drizzle(poolConnection);