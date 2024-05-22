import { clients, products } from "db/schema";
import { db } from "../mysql";
import { eq } from "drizzle-orm";

export const getProducts = async () => await db.select().from(products);

export const getClients = async () => await db.select().from(clients).where(eq(clients.status, 'active'));