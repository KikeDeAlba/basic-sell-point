import type { APIContext } from "astro";
import { z } from "astro/zod";
import { db } from "@/services/mysql";
import { users } from "db/schema";
import bcrypt from 'bcrypt'

export const WorkerSchema = z.object({
    firstName: z.coerce.string(),
    lastName: z.coerce.string(),
    email: z.coerce.string(),
    age: z.coerce.number(),
    role: z.enum(['worker', 'admin']),
    profilePicture: z.coerce.string()
})

export const POST = async ({ request, redirect }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const password = json.password.toString() ?? ''

    if (password === '') {
        return redirect('/dashboard/workers?error=Password is required')
    }

    const hashToken = await bcrypt.hash(password, bcrypt.genSaltSync())

    const worker = WorkerSchema.parse(json)

    await db.insert(users).values({
        ...worker,
        token: hashToken
    }).execute()

    return redirect('/dashboard/workers')
}