<script>
    import Button from '$lib/components/interface/Button.svelte';



    export let data;

    let decks = data.decks;

</script>

{#if decks.length > 0}

<div class="flex flex-col w-full mt-12 space-y-12 items-center">

    <h1 class="text-2xl font-bold">Your decks</h1>

    <table class="table w-3/4 mb-20">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Reviewed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each decks as deck (deck.id) }
          
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">{deck.name}</div>
                </div>
              </div>
            </td>
            <td>{new Date(deck.updated).toLocaleDateString()}</td>
            <th>
                <a class="btn btn-ghost btn-sm" href="/dashboard/study/{deck.id}">Study cards</a>
              
            </th>
          </tr>
        {/each}
        
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Last Reviewed</th>
          <th></th>
        </tr>
      </tfoot>
      
    </table>
  </div>

{:else}
    <div class="flex flex-grow flex-col w-full justify-center items-center">
        <h1 class="text-2xl"> No decks yet!</h1>
        <a class="mt-4" href="decks"><Button buttonSize="md">Make one now</Button></a>
    </div>
{/if}
