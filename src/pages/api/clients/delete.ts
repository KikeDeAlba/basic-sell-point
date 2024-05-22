import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { clients } from "db/schema";
import { eq } from "drizzle-orm";

export const POST = async ({ request }: APIContext) => {
    const data = await request.json()

    const { id } = data

    if (!id) {
        return new Response('Missing "id" parameter', { status: 400 })
    }

    try {
        // delete client by id
        await db.update(clients).set({ status: 'inactive' }).where(
            eq(clients.id, id)
        ).execute()
    } catch (error) {
        // el error se da cuando el usuario ya ha realizado ventas y esta relacionado con la tabla de ventas
        return new Response('This client has already made sales and cannot be deleted.', { status: 400 })
    }

    // delete client by id
    return new Response('OK', { status: 200 })
}