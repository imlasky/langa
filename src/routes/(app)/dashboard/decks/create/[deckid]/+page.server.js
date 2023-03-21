import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    let cardRecords;
    try {
        const record = await pb.collection('decks').getOne(params['deckid']);
        cardRecords = await pb.collection('cards').getFullList({
            sort: 'created',
            filter: `deck.id="${params['deckid']}"`,
        });
        return {
            deck: record.export(),
            cards: cardRecords.map((card) => {return card.export()})
        }
    } catch (error) {
        throw redirect (307, '/dashboard/decks/manage')
    }
  
}

/** @type {import('./$types').Actions} */
export const actions = {
    // default: async ({cookies, request, url, params}) => {
    //     const data = await request.formData()
    //     const front = data.get('front');
    //     const back = data.get('back')
        
    //     const cardData = {
    //         "front": front,
    //         "back": back,
    //         "deck": params['deckid'],
    //         "owner": pb.authStore.model.id,
    //     };

    //     const record = await pb.collection('cards').create(cardData);

    //     throw redirect (307, `/dashboard/decks/create/${params['deckid']}`)

    // },
    updateFormat: async ({cookies, request, url, params}) => {

        const data = await request.formData();
        const frontTemplate = data.get('frontTemplate');
        const backTemplate = data.get('backTemplate');

        const updateData = {
            frontTemplate: frontTemplate,
            backTemplate: backTemplate,
        }

        const record = await pb.collection('decks').update(params['deckid'], updateData);

        console.log(record);

    },
    
    card: async ({cookies, request, url, params}) => {

        const data = await request.formData();
        const cards = JSON.parse(data.get('cards'));
        const cardData = {
            deck: params['deckid'],
            owner: pb.authStore.model.id,
        }
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            if (card.modified) {

                cardData.front = card.front;
                cardData.back = card.back;
                let record;
                if (card.id) {
                    record = await pb.collection('cards').update(card.id, cardData);
                } else {
                    record = await pb.collection('cards').create(cardData);
                }
            } else if (card.deleted) {
                if (card.id) {
                    await pb.collection('cards').delete(card.id);
                }
                
            }
        }
        

        return {ok: true}
    },

  };