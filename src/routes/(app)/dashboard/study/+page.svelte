<script>
    import FlashCard from "$lib/components/cards/FlashCard.svelte";

    let showAnswer = false;
    let cardDifficultyRating = 0;
    let gaveDifficulty = false;

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
<div class="flex flex-grow w-full justify-center items-center">

    <FlashCard 
        bind:showAnswer 
        bind:cardDifficultyRating
        bind:gaveDifficulty
    />
</div>