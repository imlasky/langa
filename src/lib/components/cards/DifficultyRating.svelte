<script>

    export let cardDifficultyRating = 0;  
    export let gaveDifficulty = false;  

    let difficultyLevels = [
        {difficultyString: 'Easy', difficultyRating: 0},
        {difficultyString: 'Okay', difficultyRating: 1},
        {difficultyString: 'Hard', difficultyRating: 2},
        {difficultyString: 'Again', difficultyRating: 3},

    ]

    function handleClick(difficultyRating) {
        cardDifficultyRating = difficultyRating;
        gaveDifficulty = true;
    }



</script>

<div class="btn-group">
    {#each difficultyLevels as {difficultyString, difficultyRating}, i(difficultyRating)}
        <button class="btn btn-outline btn-sm" on:click={() => {handleClick(difficultyRating)}}>{difficultyString} ({i+1})</button>
    {/each}
</div> 
