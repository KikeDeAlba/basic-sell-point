import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { products } from "db/schema";
import { sql } from "drizzle-orm";

export const POST = async ({ params, redirect }: APIContext) => {
    const { id } = params

    try {
        // Delete the product with the given ID from the database
        await db.delete(products).where(sql`id = ${id}`).execute()
    } catch (error) {
        return redirect('/dashboard/inventory?error=This product has already been sold and cannot be deleted.')
    }

    return redirect('/dashboard/inventory')
}