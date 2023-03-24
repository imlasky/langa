import { pb } from '$lib/pocketbase';
import * as tf from '@tensorflow/tfjs';

function createModel() {
    // Create a sequential model
    const model = tf.sequential();
  
    // Add a single input layer
    model.add(tf.layers.dense({inputShape: [7], units: 1, useBias: true}));
  
    // Add an output layer
    model.add(tf.layers.dense({units: 1, useBias: true}));
  
    return model;
}

/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
 function convertToTensor(data) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.
  
    return tf.tidy(() => {
      // Step 1. Shuffle the data
      tf.util.shuffle(data);
  
      // Step 2. Convert data to Tensor
      const inputs = data.map(d => [
            d.food,
            d.water,
            d.physicalActivity,
            d.sleep,
            d.answerTime,
            d.reviewTime,
            d.difficultyRating,
      ])
      const labels = data.map(d => d.lastReview);
  
      const inputTensor = tf.tensor2d(inputs, [inputs.length, 7]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
  
      //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();
  
      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
  
      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        // Return the min/max bounds so we can use them later.
        inputMax,
        inputMin,
        labelMax,
        labelMin,
      }
    });
}

async function trainModel(model, inputs, labels) {
    // Prepare the model for training.
    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
      metrics: ['mse'],
    });
  
    const batchSize = 32;
    const epochs = 50;
  
    return await model.fit(inputs, labels, {
      batchSize,
      epochs,
      shuffle: true,
    //   callbacks: tfvis.show.fitCallbacks(
    //     { name: 'Training Performance' },
    //     ['loss', 'mse'],
    //     { height: 200, callbacks: ['onEpochEnd'] }
    //   )
    });
  }

export async function calculateNextReview(card, difficulty) {

    let N = 200; //Number of reviews
   
    const lastNReviews = await pb.collection('reviews').getList(1, N, {
        sort: "-created",
        expand: "survey, card",
    });

    if (lastNReviews.totalItems < 10) {
        // Add 5 minutes if unknown
        let numMins = 5;
        let nextReview = new Date(new Date(card.lastReviewed).getTime() + numMins*60000);

        return nextReview
    } 

    const data = lastNReviews.items.map(review => ({
        food: parseInt(review.expand.survey.food),
        water: parseInt(review.expand.survey.water),
        physicalActivity: parseInt(review.expand.survey.physicalActivity),
        sleep: parseInt(review.expand.survey.sleep),
        answerTime: review.answerTime,
        reviewTime: review.reviewTime,
        difficultyRating: parseInt(review.difficultyRating),
        lastReview: new Date() - new Date(review.lastReview),
    }))

    const model = createModel();
    const tensorData = convertToTensor(data);
    const {inputs, labels, labelMin, labelMax} = tensorData;

    // Train the model
    await trainModel(model, inputs, labels);

    const survey = await pb.collection('surveys').getOne(card.survey);
    const testData = [{
        food: parseInt(survey.food),
        water: parseInt(survey.water),
        physicalActivity: parseInt(survey.physicalActivity),
        sleep: parseInt(survey.sleep),
        answerTime: card.answerTime,
        reviewTime: card.reviewTime,
        difficultyRating: parseInt(difficulty),
    }]


    const testTensorData = convertToTensor(testData);
    const testInputs = testTensorData.inputs;
    const predictions = model.predict(testInputs);
    const unNormPreds = predictions
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    const offset = unNormPreds.dataSync()[0]
    console.log(`${offset/60000} minutes`);
    const layerWeights = model.layers[0].getWeights()

    // # Print the weights of the first layer
    const weights = {
        food: layerWeights[0].dataSync()[0],
        water: layerWeights[0].dataSync()[1],
        physicalActivity: layerWeights[0].dataSync()[2],
        sleep: layerWeights[0].dataSync()[3],
        answerTime: layerWeights[0].dataSync()[4],
        reviewTime: layerWeights[0].dataSync()[5],
        difficultyRating: layerWeights[0].dataSync()[6],
    }
    console.log(weights)


    let nextReview = new Date(new Date(card.lastReviewed).getTime() + offset);

    return nextReview 

}