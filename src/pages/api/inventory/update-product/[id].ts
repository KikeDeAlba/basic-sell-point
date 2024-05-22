import type { APIContext } from "astro";
import { ProductSchema } from "../create-product";
import { db } from "@/services/mysql";
import { products } from "db/schema";
import { eq } from "drizzle-orm";

export const POST = async ({ params, request, redirect }: APIContext) => {
    const { id } = params

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

    // Update the product with the given ID in the database
    await db.update(products).set(product).where(
        eq(products.id, Number(id))
    ).execute()

    return redirect('/dashboard/inventory')
}