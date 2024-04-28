import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { users } from "db/schema";
import { eq } from "drizzle-orm";

export const GET = async ({ params, redirect }: APIContext) => {
    const { id } = params

    if (!id) {
        return redirect('/dashboard/workers?error=Worker ID is required')
    }

    // delete worker by id
    await db.delete(users).where(
        eq(users.id, id)
    ).execute()

    return redirect('/dashboard/workers')
}