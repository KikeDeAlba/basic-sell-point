import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = ({ request, cookies, redirect }, next) => {
    const token = cookies.get('token');

    if (token == null || token.value == null) {
        return redirect('/?error=unauthorized')
    }

    return next();
};