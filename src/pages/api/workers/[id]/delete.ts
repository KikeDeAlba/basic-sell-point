import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { users } from "db/schema";
import { eq } from "drizzle-orm";

export const GET = async ({ params, redirect }: APIContext) => {
    const { id } = params

    if (!id) {
        return redirect('/dashboard/workers?error=Worker ID is required')
    }

    try {
        // delete worker by id
        await db.delete(users).where(
            eq(users.id, id)
        ).execute()
    } catch (error) {
        // el error se da cuando el usuario ya ha realizado ventas y esta relacionado con la tabla de ventas
        return redirect('/dashboard/workers?error=This worker has already made sales and cannot be deleted.')
    }

    // delete worker by id


    return redirect('/dashboard/workers')
}