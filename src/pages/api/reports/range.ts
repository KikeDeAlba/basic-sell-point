import { db } from "@/services/mysql";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { sales } from "db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm"; // Importing lte for less than or equal comparison

const dates = z.object({
    startDate: z.coerce.date(), // No need for coerce.date(), as we're expecting date object
    endDate: z.coerce.date()
})

export const POST = async ({ request }: APIContext) => {
    const body = await request.json();

    const { startDate, endDate } = dates.parse(body);

    // Fetch sales data within the specified date range
    const salesData =
        startDate.toISOString() === endDate.toISOString()
            ? await db.select().from(sales).where(
                eq(
                    sql`DATE(${sales.createdDate})`,
                    startDate.toISOString().split('T')[0]
                )
            )
            : await db.select().from(sales).where(
                and(
                    gte(
                        sql`DATE(${sales.createdDate})`,
                        startDate
                    ),
                    lte(
                        sql`DATE(${sales.createdDate})`,
                        endDate
                    )
                )
            );

    return new Response(JSON.stringify(salesData))
}
