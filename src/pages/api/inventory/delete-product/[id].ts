import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { products } from "db/schema";
import { sql } from "drizzle-orm";

export const POST = async ({ params, redirect }: APIContext) => {
    const { id } = params

    // Delete the product with the given ID from the database
    await db.delete(products).where(sql`id = ${id}`).execute()

    return redirect('/dashboard/inventory')
}