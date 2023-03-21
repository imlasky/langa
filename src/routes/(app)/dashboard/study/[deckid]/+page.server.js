import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    let deckRecord;
    let cardRecords;
    try {
        deckRecord = await pb.collection('decks').getOne(params['deckid']);
        cardRecords = await pb.collection('cards').getFullList({
            filter: `deck.id="${params['deckid']}"`,
        });
    } catch (error) {
        throw redirect (307, '/dashboard/study')
    }
    const resultList = await pb.collection('surveys').getList(1, 1, {
        sort: '-created',
    });
    
    // Check the latest survey and see if null 
    const latestSurvey = resultList.totalItems > 0 ? resultList.items[0].export() : null;
    if (!latestSurvey) {
        return {
            takeSurvey: true, 
            deck: deckRecord.export(),
            cards: cardRecords.map((card) => {return card.export()})
        }
    }

    // Find how many hours since the last survey. If it has been more than 4 hours, redo the survey
    const lastSurveyTime = new Date(latestSurvey.created);
    const timeSinceSurvey = Math.floor((new Date() - lastSurveyTime)/(1000 * 60 * 60));

    if (timeSinceSurvey > 3) {
        return {
            takeSurvey: true, 
            deck: deckRecord.export(),
            cards: cardRecords.map((card) => {return card.export()})
        }
    } else {
        return {
            takeSurvey: false, 
            survey: latestSurvey,
            deck: deckRecord.export(),
            cards: cardRecords.map((card) => {return card.export()})
        }
    }

}


  

/** @type {import('./$types').Actions} */
export const actions = {
    survey: async ({cookies, request, url}) => {
        const data = await request.formData()
        const food = data.get('food');
        const water = data.get('water');
        const physicalActivity = data.get('physicalActivity');
        const sleep = data.get('sleep')

        const surveyData = {
            "food": food,
            "water": water,
            "physicalActivity": physicalActivity,
            "sleep": sleep,
            "user": pb.authStore.model.id,
        }

        const record = await pb.collection('surveys').create(surveyData);
        
        return {
            ok:true,
            survey:record.export(),
        }

    },
};