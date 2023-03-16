/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	return {
		user: locals.user ? locals.user.export() : null
    }
}