import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // fetch a paginated records list
    const resultList = await pb.collection('decks').getList(1, 50, {
        sort: '-created',
    });

    const decks = resultList.items.map((deck) => {return deck.export()})
    
    return {decks: decks}
}