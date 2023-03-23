import { pb } from '$lib/pocketbase';

export async function calculateNext(data) {
    let N = 25; //Number of reviews
   
    const lastNReviews = await pb.collection('reviews').getList(1, N, {
        sort: "-created",
        expand: "survey",
    });

    if (lastNReviews.totalItems < N) {
        // Add 5 minutes if unknown
        let numMins = 5;
        let nextReview = new Date(new Date(data.lastReviewed).getTime() + numMins*60000);

        return nextReview
    }

    // Find t_crit such that P( easy | inputs ) > 0.95 for t <  t_crit
    // That is, t_crit is the next time to review the card since past that, the probability of remembering would be less than 95%

    

}