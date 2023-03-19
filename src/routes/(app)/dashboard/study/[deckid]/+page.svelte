<script>
    import FlashCard from "$lib/components/cards/FlashCard.svelte";
    import Button from "$lib/components/interface/Button.svelte";
    import PreSurvey from "$lib/study/PreSurvey.svelte";

    export let data;
    export let form;


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

    <div class="flex flex-grow w-full justify-center items-center">
        <FlashCard 
            bind:showAnswer 
            bind:cardDifficultyRating
            bind:gaveDifficulty
        />
    </div>
{/if}