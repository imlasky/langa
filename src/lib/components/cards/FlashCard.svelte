<script>
    import { beforeNavigate } from "$app/navigation";
    import DifficultyRating from "./DifficultyRating.svelte";
    import {page} from "$app/stores";
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";


    export let showAnswer = false;
    export let gaveDifficulty = false;
    export let cardDifficultyRating = 0;
    export let form = {};
    export let currentCard;
    export let survey;
    export let frontTemplate;
    export let backTemplate;
    export let blurred = false;
    let deltaT = 10;
    let reviewTime = 0;
    let answerTime = 0;
    let cardData = {}

    $: currentCard['survey'] = survey.id;



    function updateCardData() {
        if (gaveDifficulty && form?.ok) {
            gaveDifficulty = false;
            showAnswer = false;
            answerTime = 0;
            reviewTime = 0;
            form = {};
        } 
    }

    function updateTime() {
        if (!blurred) {
            if (showAnswer) {
                reviewTime += deltaT;
            } else {
                answerTime += deltaT;
            }
            currentCard['answerTime'] = answerTime/1000;
            currentCard['reviewTime'] = reviewTime/1000;
        }
    }

    let timerID = setInterval(updateTime, deltaT)

    $: (gaveDifficulty, updateCardData(), form)

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
            <form method="post" use:enhance action="?/answer">
                <input value={JSON.stringify(currentCard)} name="card" hidden>
                <DifficultyRating bind:gaveDifficulty bind:cardDifficultyRating/> 
            </form>
        </div>

    {/if}
</div>
