import type { APIContext } from "astro";
import { ProductSchema } from "../create-product";
import { db } from "@/services/mysql";
import { products } from "db/schema";
import { sql } from "drizzle-orm";

export const POST = async ({ params, request, redirect }: APIContext) => {
    const { id } = params

    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const product = ProductSchema.parse(json)

    // Update the product with the given ID in the database
    await db.update(products).set(product).where(sql`id = ${id}`).execute()

    return redirect('/dashboard/inventory')
}