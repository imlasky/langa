import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    try {
        const record = await pb.collection('decks').getOne(params['deckid']);
        return {deck: record.export()}
    } catch (error) {
        throw redirect (307, '/dashboard/decks/manage')
    }
  
}