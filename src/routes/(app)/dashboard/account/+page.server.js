import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ locals }) => {
        locals.pb.authStore.clear()
        locals.user = null
        throw redirect(303, '/')
  },
}