<script>


    export let data;


    let decks = data.decks;
    let deletedDeck;

    

</script>


   
<div class="flex flex-col w-full mt-12 space-y-12 items-center">
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
            <div class="dropdown">
              <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                <li><a href="/dashboard/decks/create/{deck.id}">Edit cards</a></li>
                <li><label for="deleteModal" on:click={() => {deletedDeck=deck}}>Delete</label></li>

              </ul>
            </div>
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
<input type="checkbox" id="deleteModal" class="modal-toggle" />
<label for="deleteModal" class="modal bg-opacity-0 bg-primary cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold text-center pb-4">Confirm delete</h3>
    <form method="post" action="?/delete" class="flex justify-center">
      <input name="deckId" value={deletedDeck?.id} hidden>
      <button class="btn">Confirm</button>
    </form>
  </label>
</label>

