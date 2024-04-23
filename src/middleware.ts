import type { MiddlewareHandler } from "astro";

/**
 * Middleware function to handle incoming requests.
 * @param {MiddlewareContext} context - The middleware context object containing request information.
 * @param {MiddlewareNextFunction} next - The next function to be called in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the middleware has finished processing.
 */
export const onRequest: MiddlewareHandler = async ({ request, cookies, redirect, url }, next) => {
    const token = cookies.get('token');

    console.log('token', token)

    if (token != null && token.value != null && url.pathname === '/') {
        return redirect('/dashboard')
    }

    if (token == null || token.value == null) {
        return redirect('/?error=unauthorized')
    }

    return next();
};