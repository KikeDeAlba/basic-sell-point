import { clients, products } from "db/schema";
import { db } from "../mysql";

export const getProducts = async () => await db.select().from(products);

export const getClients = async () => await db.select().from(clients);