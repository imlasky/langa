import { pb } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email');
        const password = data.get('password');
       
        
        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
        } catch (error) {
            return fail(401, {errors: [error.response.message]});
        }
        // console.log('here',authData)
        throw redirect(303, '/dashboard')

        // await pb.collection('users').requestVerification(email)
    }
  };