import type { APIContext } from "astro";

export const GET = async ({ cookies, redirect }: APIContext) => {
    cookies.delete('token', {
        path: '/'
    })

    return redirect('/')
}