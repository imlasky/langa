<script>
    import { beforeNavigate } from "$app/navigation";
    import DifficultyRating from "./DifficultyRating.svelte";
    import {page} from "$app/stores";


    export let showAnswer = false;
    export let gaveDifficulty = false;
    export let cardDifficultyRating = 0;
    let deltaT = 10;
    let reviewTime = 0;
    let answerTime = 0;
    let cardData = {}
    export let currentCard;
    export let survey;
    // let currentCard.front = "This is the front"
    // let currentCard.back = "This is the back"
    export let frontTemplate;
    export let backTemplate;



    function calculateNextReview() {

        // TODO: Add calculation logic / model here?

        return new Date(currentCard['lastReviewed']).toISOString()
    }

    function updateCardData() {
        if (gaveDifficulty) {

            currentCard['difficultyRating'] = cardDifficultyRating;
            currentCard['answerTime'] = answerTime/1000;
            currentCard['reviewTime'] = reviewTime/1000;
            currentCard['lastReviewed'] = new Date().toISOString()
            currentCard['nextReview'] = calculateNextReview();
            currentCard['survey'] = survey.id;

            gaveDifficulty = false;
            showAnswer = false;
            answerTime = 0;
            reviewTime = 0;

            // Send the request
            fetch(`${$page.data.deck.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentCard)
            })
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            
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
            {@html frontTemplate.replace("{frontContent}",currentCard.front)}
        </div>
        <button on:click={() => {showAnswer = true}}>Show answer</button>
    {:else}
        <div class="flex justify-center prose max-w-none">
            {@html backTemplate.replace("{backContent}",currentCard.back)}
        </div>
        <div class="flex justify-center prose max-w-none">
            <DifficultyRating bind:gaveDifficulty bind:cardDifficultyRating/> 
        </div>

    {/if}
</div>
