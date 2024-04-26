import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { clients } from "db/schema";

const client = z.object({
    name: z.string(),
    email: z.string().email().optional()
})

export const POST = async ({ request, redirect }: APIContext) => {
    const data = await request.formData()

    const json = Object.fromEntries(data.entries())

    const { name, email } = client.parse(json)

    await db.insert(clients).values({
        name,
        email
    })

    return redirect('/dashboard/sell-point')
}