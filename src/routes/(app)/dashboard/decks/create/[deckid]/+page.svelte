<script>
    import CardFormatter from "$lib/dashboard/create/CardFormatter.svelte";
    import CardAdder from "$lib/dashboard/create/CardAdder.svelte";



    export let data;
    export let form;

    let deck = data.deck;
    let cards = data.cards;
    let side = 0;
    let frontEditor;
    let backEditor;


  
</script>

<h1 class="text-2xl font-bold">{deck.name}</h1>

<div class="flex flex-col w-full px-4 md:space-x-4">

  <div>
    <button class="btn btn-ghost animate-none" on:click={() => {side=0}}>Add cards</button>
    <button class="btn btn-ghost animate-none" on:click={() => {side=1}}>Adjust card format</button>

  </div>
    <div class="flex flex-row w-full h-full overflow-scroll justify-center"> 
      {#if side === 0}

        <CardAdder bind:cards/>

        
      {:else}
      <div class="flex w-full justify-center">
        <CardFormatter bind:frontEditor bind:backEditor bind:deck/>
      </div>
        
      {/if}
    </div>
    

</div>
