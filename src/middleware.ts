import type { MiddlewareHandler } from "astro";

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