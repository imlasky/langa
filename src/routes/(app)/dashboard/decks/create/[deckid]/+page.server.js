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

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, url, params}) => {
        const data = await request.formData()
        const front = data.get('front');
        const back = data.get('back')
        
        const cardData = {
            "front": front,
            "back": back,
            "deck": params['deckid'],
            "owner": pb.authStore.model.id,
        };

        const record = await pb.collection('cards').create(cardData);

        return {ok: true}

    }
  };