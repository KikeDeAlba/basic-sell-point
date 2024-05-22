import type { APIContext } from "astro"
import { client } from "../clients"
import { eq } from "drizzle-orm"
import { clients } from "db/schema"
import { db } from "@/services/mysql"


export const POST = async ({ request, redirect }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const { id } = json

    if (!id) {
        return redirect('/dashboard/sell-point?error=Missing "id" parameter')
    }

    const { name, email } = client.parse(json)

    try {
        const numberId = Number(id)

        // Update the client with the given ID in the database
        await db.update(clients).set({
            name,
            email
        }).where(
            eq(clients.id, numberId)
        )
    } catch (error) {
        // el error se da cuando el usuario ya ha realizado ventas y esta relacionado con la tabla de ventas
        return redirect('/dashboard/sell-point?error=This client has already made sales and cannot be updated.')
    }

    return redirect('/dashboard/sell-point')
}