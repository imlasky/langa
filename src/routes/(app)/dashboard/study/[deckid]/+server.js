import { json } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';


export async function POST({ request }) {
    const data = await request.json();
    
    const reviewData = {
        difficultyRating: data["difficultyRating"],
        answerTime: data["answerTime"],
        reviewTime: data["reviewTime"],
        card: data["id"],
        survey: data["survey"],
        user: pb.authStore.model.id,
    }
  
    const record = pb.collection('reviews').create(reviewData)
    pb.collection('cards').update(data["id"], {lastReviewed: new Date().toISOString()})
    return json({
      status: 200,
      body: {
        message: 'Data received successfully'
      }
    });
  }