import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { products } from "db/schema";

export const ProductSchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    price: z.coerce.number(),
    stock: z.coerce.number(),
    discount: z.coerce.number()
})

export const POST = async ({ request, redirect }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const product = ProductSchema.parse(json)

    if (product.price < product.discount) {
        return redirect('/dashboard/inventory?error=The discount cannot be greater than the price')
    }

    if (product.stock < 0) {
        return redirect('/dashboard/inventory?error=The stock cannot be negative')
    }

    if (product.discount < 0) {
        return redirect('/dashboard/inventory?error=The discount cannot be negative')
    }

    if (product.price < 0) {
        return redirect('/dashboard/inventory?error=The price cannot be negative')
    }

    // Insert the new product into the database
    await db.insert(products).values(product).execute()

    return redirect('/dashboard/inventory')
}