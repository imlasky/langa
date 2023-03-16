import { pb } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email');
        const password = data.get('password');
        const passwordConfirm = data.get('passwordConfirm');
        const registerData = {
            "email": email,
            "password": password,
            "passwordConfirm": passwordConfirm
        }
        try {
            const record = await pb.collection('users').create(data)
        } catch (error) {
            return fail(401, {errors: [error.response.message]});
        }
        throw redirect(307, '/auth/login')
    }
  };