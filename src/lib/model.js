import { pb } from '$lib/pocketbase';
import * as tf from '@tensorflow/tfjs';

export async function calculateNextReview(data) {
    let N = 25; //Number of reviews
   
    const lastNReviews = await pb.collection('reviews').getList(1, N, {
        sort: "-created",
        expand: "survey",
    });

    // if (lastNReviews.totalItems < N) {
    // Add 5 minutes if unknown
    let numMins = 5;
    let nextReview = new Date(new Date(data.lastReviewed).getTime() + numMins*60000);

    // console.log(nextReview)
    return nextReview
    // }


    


    

}