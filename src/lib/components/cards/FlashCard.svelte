<script>
    import { beforeNavigate } from "$app/navigation";
    import DifficultyRating from "./DifficultyRating.svelte";


    export let showAnswer = false;
    export let gaveDifficulty = false;
    export let cardDifficultyRating = 0;
    let deltaT = 10;
    let reviewTime = 0;
    let answerTime = 0;
    let cardData = {}
    let cardFront = "<p>This is the <strong>front</strong> of the card</p>"
    let cardBack = "<p>This is the <strong>back</strong> of the card</p>"


    function calculateNextReview() {

        // TODO: Add calculation logic / model here?

        return new Date(cardData['lastReviewed']).toISOString()
    }

    function updateCardData() {
        if (gaveDifficulty) {

            cardData['difficultyRating'] = cardDifficultyRating;
            cardData['answerTime'] = answerTime/1000;
            cardData['reviewTime'] = reviewTime/1000;
            cardData['lastReviewed'] = new Date().toISOString()
            cardData['nextReview'] = calculateNextReview();

            gaveDifficulty = false;
            showAnswer = false;
            answerTime = 0;
            reviewTime = 0;
            console.log(cardData)

            // TODO: Add POST request to update card
        } 
    }

    function updateTime() {
        if (showAnswer) {
            reviewTime += deltaT;
        } else {
            answerTime += deltaT;
        }
    }

    let timerID = setInterval(updateTime, deltaT)

    $: (gaveDifficulty, updateCardData())

    beforeNavigate(() => {
        clearInterval(timerID);
    })

    



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-col w-5/6 md:w-1/2 h-72 bg-white place-content-around shadow-lg rounded-xl p-2">
    {#if !showAnswer}
        <div class="flex justify-center">
            {@html cardFront}
        </div>
        <button on:click={() => {showAnswer = true}}>Show answer</button>
    {:else}
        <div class="flex justify-center">
            {@html cardBack}
        </div>
        <div class="flex justify-center">

            <DifficultyRating bind:gaveDifficulty bind:cardDifficultyRating/> 
        </div>

    {/if}
</div>
