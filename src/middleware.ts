import type { MiddlewareHandler } from "astro";
import { db } from "./services/mysql";
import { users } from "db/schema";
import { eq } from "drizzle-orm";

/**
 * Middleware function to handle incoming requests.
 * @param {MiddlewareContext} context - The middleware context object containing request information.
 * @param {MiddlewareNextFunction} next - The next function to be called in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the middleware has finished processing.
 */
export const onRequest: MiddlewareHandler = async ({ cookies, redirect, url, locals }, next) => {
    if (url.pathname.startsWith('/api')) {
        return next();
    }

    // Get the value of the 'token' cookie
    const token = cookies.get('token');

    const [user] = await db.select().from(users).where(
        eq(users.token, token?.value ?? '')
    )

    // @ts-expect-error - Add the user object to the locals object
    if (user != null) locals.user = user;

    // If a valid token exists and the current URL is '/', redirect to '/dashboard'
    if (user != null && url.pathname === '/') {
        return redirect('/dashboard')
    }

    // If no token or an invalid token exists, redirect to '/?error=unauthorized'
    if (user == null && url.pathname !== '/') {
        return redirect('/?error=unauthorized')
    }

    // Call the next middleware function in the chain
    return next();
};