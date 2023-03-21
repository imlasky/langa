<script>
    import FlashCard from "$lib/components/cards/FlashCard.svelte";
    import Button from "$lib/components/interface/Button.svelte";
    import PreSurvey from "$lib/study/PreSurvey.svelte";
    import { destroy_block } from "svelte/internal";

    export let data;
    export let form;

    let deck = data.deck;
    let cards = data.cards;
    let currentCard = cards[0];

    let showAnswer = false;
    let cardDifficultyRating = 0;
    let gaveDifficulty = false;
    let submitted = false;

    $: takeSurvey = data.takeSurvey ? !submitted : data.takeSurvey;

    function handleKeyUp(e) {
        if (e.keyCode === 32) {
            showAnswer = true;
        } 
        if ([1,2,3,4].includes(parseInt(e.key))) {
            cardDifficultyRating = e.key - 1;
            gaveDifficulty = true;
        }
    }
   
</script>

<svelte:window on:keyup={handleKeyUp}/>

{#if takeSurvey}
    <PreSurvey bind:submitted {form}/>
{:else}

    {#if cards.length > 0}
        <div class="flex flex-grow w-full justify-center items-center">
            <FlashCard 
                bind:showAnswer 
                bind:cardDifficultyRating
                bind:gaveDifficulty
                front={currentCard.front}
                back={currentCard.back}
                frontTemplate={deck.frontTemplate}
                backTemplate={deck.backTemplate}
                
            />
        </div>
    {:else}
        <h2>This deck is empty</h2>
    {/if}
    
{/if}