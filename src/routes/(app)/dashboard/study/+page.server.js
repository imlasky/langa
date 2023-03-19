import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // fetch a paginated records list
    const records = await pb.collection('decks').getFullList({
        sort: '-created',
    });

    return {decks: records.map((record) => {return record.export()})}
    
}