import type { APIContext } from "astro";
import { WorkerSchema } from "../../workers";
import { users } from "db/schema";
import { db } from "@/services/mysql";
import { z } from "astro/zod";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt'


export const POST = async ({ request, redirect, params }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const { id } = params

    const worker = WorkerSchema.parse(json)

    const password = json.password.toString() ?? ''

    await db.update(users).set(worker).where(
        eq(users.id, id ?? '')
    ).execute()

    if (password !== '') {
        const hashToken = await bcrypt.hash(password, bcrypt.genSaltSync())

        await db.update(users).set({
            token: hashToken
        }).where(
            eq(users.id, id ?? '')
        ).execute()
    }

    return redirect('/dashboard/workers')
}