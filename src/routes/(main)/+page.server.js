import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
	if (locals.user) throw redirect(307, `/dashboard`);
}