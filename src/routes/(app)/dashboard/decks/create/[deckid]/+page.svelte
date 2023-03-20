<script>
    import CardEditor from "$lib/dashboard/create/CardEditor.svelte";


    export let data;

    let deck = data.deck;
    let cards = data.cards;
    let frontEditor;
    let backEditor;

    function handleClick(card) {
        frontEditor.commands.setContent(card.front)
        backEditor.commands.setContent(card.back)

    }

</script>

<h1 class="text-2xl font-bold">{deck.name}</h1>

<div class="flex flex-col-reverse md:flex-row w-full px-4 md:space-x-4">

    <div class="flex flex-col w-full md:w-1/3 h-full overflow-scroll"> 
        <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>Front</th>
                  <th>Back</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                {#each cards as card}

                    <tr class="hover hover:cursor-pointer" on:click={() => {handleClick(card)}}>
                        <td>{@html card.front}</td>
                        <td>{@html card.back}</td>
                    </tr>                
                {/each}
              </tbody>
            </table>
          </div>
    </div>
    
    <CardEditor bind:frontEditor bind:backEditor/>

</div>
