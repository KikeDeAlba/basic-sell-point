import type { MiddlewareHandler } from "astro";

/**
 * Middleware function to handle incoming requests.
 * @param {MiddlewareContext} context - The middleware context object containing request information.
 * @param {MiddlewareNextFunction} next - The next function to be called in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the middleware has finished processing.
 */
export const onRequest: MiddlewareHandler = async ({ cookies, redirect, url }, next) => {
    if (url.pathname.startsWith('/api')) {
        return next();
    }

    // Get the value of the 'token' cookie
    const token = cookies.get('token');

    // If a valid token exists and the current URL is '/', redirect to '/dashboard'
    if (token != null && token.value != null && url.pathname === '/') {
        return redirect('/dashboard')
    }

    // If no token or an invalid token exists, redirect to '/?error=unauthorized'
    if ((token == null || token.value == null) && url.pathname !== '/') {
        return redirect('/?error=unauthorized')
    }

    // Call the next middleware function in the chain
    return next();
};