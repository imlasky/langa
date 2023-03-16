import { pb } from '$lib/pocketbase'
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // before
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
    if (pb.authStore.isValid) {
    try {
        await pb.collection('users').authRefresh()
    } catch (_) {
        pb.authStore.clear()
    }
    }

    event.locals.pb = pb
    event.locals.user = pb.authStore.model

    const response = await resolve(event)

    // after
    response.headers.set(
        'set-cookie',
        pb.authStore.exportToCookie({ httpOnly: false })
    )

    return response
}