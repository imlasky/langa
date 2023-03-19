import { fail, redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // fetch a paginated records list
    const resultList = await pb.collection('surveys').getList(1, 1, {
        sort: '-created',
    });
    
    // Check the latest survey and see if null 
    const latestSurvey = resultList.totalItems > 0 ? resultList.items[0].export() : null;
    if (!latestSurvey) {
        return {takeSurvey: true}
    }

    // Find how many hours since the last survey. If it has been more than 4 hours, redo the survey
    const lastSurveyTime = new Date(latestSurvey.created);
    const timeSinceSurvey = Math.floor((new Date() - lastSurveyTime)/(1000 * 60 * 60));

    if (timeSinceSurvey > 3) {
        return {takeSurvey: true}
    } else {
        return {takeSurvey:false}
    }

}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, url}) => {
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
        
        return {ok:true}

    }
  };