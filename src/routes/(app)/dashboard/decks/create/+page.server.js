import { pb } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, url}) => {
        const data = await request.formData()
        const name = data.get('name');
        const privateDeck = data.get('privateDeck');

        const deckData = {
            name: name,
            private: privateDeck === 'on',
            user: pb.authStore.model.id,
            frontTemplate: '<p style="text-align: center">{frontContent}<p>',
            backTemplate: '<p style="text-align: center">{backContent}<p>',
        }

        const record = await pb.collection('decks').create(deckData);
        const deckid = record.export().id
        
        throw redirect(307, `/dashboard/decks/create/${deckid}`)

    }
  };