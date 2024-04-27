import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { products, saleItems, sales, users } from "db/schema";
import { eq } from "drizzle-orm";

export const SellSchema = z.object({
    cashback: z.number(),
    clientId: z.number(),
    receivedAmount: z.number(),
    total: z.number(),
    paymentMethod: z.enum(["credit_card", "cash"]),
    status: z.enum(["pending", "completed"])
})

export const ItemSchema = z.object({
    productId: z.number(),
    quantity: z.number()
})

export const POST = async ({ cookies, request }: APIContext) => {
    const json = await request.json()

    const token = cookies.get("token")

    if (token == null || token.value == null) {
        return new Response("Unauthorized", { status: 401 })
    }

    const sell = SellSchema.parse(json.sell)

    const [user] = await db.select({
        id: users.id
    }).from(users).where(
        eq(users.token, token.value)
    )

    const newSell = {
        ...sell,
        userId: user.id
    }

    const [fieldPackage] = await db.insert(sales).values(newSell)

    const items = await Promise.all(
        ItemSchema.array().parse(json.items).map(async item => {
            const [product] = await db.select({
                price: products.price,
                stock: products.stock
            }).from(products).where(
                eq(products.id, item.productId)
            )

            return {
                ...item,
                saleId: fieldPackage.insertId,
                total: product.price * item.quantity,
                stock: product.stock
            }
        })
    )

    await db.insert(saleItems).values(items)

    await Promise.all(
        items.map(async item => {
            await db.update(products).set({
                stock: item.stock - item.quantity
            })
        })
    )

    return new Response("OK", { status: 200 })
}