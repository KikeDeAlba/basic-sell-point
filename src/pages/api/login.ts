import { db } from "../../services/mysql";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";
import {compare} from 'bcrypt'
import { type APIContext } from "astro";

export const GET = async ({url, redirect, cookies}: APIContext) => {
    const {email, password} = Object.fromEntries(url.searchParams)

    const [user] = await db.select({
        token: users.token
    }).from(users).where(eq(users.email, email))


    if (user == null || user.token == null) {
        return redirect('/?error=invalid-email')
    }

    const isValid = await compare(password, user.token)


    if (!isValid) {
        return redirect('/?error=invalid-password')
    }

    cookies.set('token', user.token, {
        path: '/'
    })

    return redirect('/dashboard')
}