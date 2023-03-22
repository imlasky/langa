import { pb } from '$lib/pocketbase';

export async function calculateNext(data) {
    let N = 25;
    const lastNReviews = await pb.collection('reviews').getList(1, N, {
        sort: "-created",
        expand: "survey",
    });

    if (lastNReviews.totalItems < N) {
        // Add 5 minutes if unknown
        let nextReview = new Date(new Date(data.lastReviewed).getTime() + 5*60000);

        return nextReview
    }
}