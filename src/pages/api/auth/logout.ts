import type { APIContext } from "astro";

export const GET = async ({ cookies, redirect }: APIContext) => {
    cookies.delete('token')
    
    return redirect('/')
}