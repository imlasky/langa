<script>
    let selectAll;

    export let data;


    let decks = data.decks;
    let selectedDecks = [];

    

</script>


   
<div class="flex overflow-x-scroll w-full max-h-screen justify-center">
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
                <li><a href="#">Delete deck</a></li>
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
