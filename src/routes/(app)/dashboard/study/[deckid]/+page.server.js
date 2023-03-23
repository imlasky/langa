import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import { calculateNext } from '$lib/model';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    let deckRecord;
    let cardRecords;
    let newCardRecords;
    let numNewCards = 20;
    try {
        deckRecord = await pb.collection('decks').getOne(params['deckid']);
        cardRecords = await pb.collection('cards').getFullList({
            filter: `deck.id="${params['deckid']}"&&nextReview<="${new Date().toISOString()}"&&nextReview!=null`,
        });
        newCardRecords = await pb.collection('cards').getList(1, numNewCards,{
            sort: 'created',
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
    let combinedCards = [...cardRecords.map((card) => {return card.export()}), ...newCardRecords.items.map((card) => {return card.export()})];
    console.log(combinedCards)
    if (!latestSurvey) {
        return {
            takeSurvey: true, 
            deck: deckRecord.export(),
            cards: combinedCards,
        }
    }

    // Find how many hours since the last survey. If it has been more than 4 hours, redo the survey
    const lastSurveyTime = new Date(latestSurvey.created);
    const timeSinceSurvey = Math.floor((new Date() - lastSurveyTime)/(1000 * 60 * 60));

    if (timeSinceSurvey > 3) {
        return {
            takeSurvey: true, 
            deck: deckRecord.export(),
            cards: combinedCards,
        }
    } else {
        return {
            takeSurvey: false, 
            survey: latestSurvey,
            deck: deckRecord.export(),
            cards: combinedCards,
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
    answer: async ({cookies, request, url}) => {

        const data = await request.formData()
        const card = JSON.parse(data.get('card'));
        const review = {
            card: card.id,
            answerTime: card.answerTime,
            reviewTime: card.reviewTime,
            difficultyRating: parseInt(data.get('difficulty')),
            survey: card.survey,
            user: card.user,
        }
        card['lastReviewed'] = new Date().toISOString()

        const nextReview = await calculateNext(card)

        card.nextReview = nextReview;
        const updatedCard = await pb.collection('cards').update(card.id, card)
        const newReview = await pb.collection('reviews').create(review)

        return {ok: true}
    },
};