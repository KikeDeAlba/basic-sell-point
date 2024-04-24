import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { products } from "db/schema";

export const ProductSchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    price: z.coerce.number(),
    stock: z.coerce.number()
})

export const POST = async ({ request, redirect }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const product = ProductSchema.parse(json)

    await db.insert(products).values(product).execute()

    return redirect('/dashboard/inventory')
}