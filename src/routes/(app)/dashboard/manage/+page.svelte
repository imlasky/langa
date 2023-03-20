<script>

    let tabs = [
      'Create',
      'Upload',
      'Manage',
    ];
    let selectedTab = 0;
    let selectAll;

    let decks = ['row 1', 'row 2', 'row 3', 'row 4']
    let selectedDecks = [];

    $: selectedDecks = selectAll ? decks : [];



</script>

<div class="flex flex-col w-full mt-12 space-y-12 px-4">
    
    <div class="tabs">
        {#each tabs as tab, i }
          {#if selectedTab === i}
            <a class="tab tab-lifted tab-active" on:click={() => {selectedTab = i}}>{tab}</a> 
          {:else}
            <a class="tab tab-lifted" on:click={() => {selectedTab = i}}>{tab}</a> 
          {/if}
        {/each}
    </div>

    {#if selectedTab === 0}
      create
    {:else if selectedTab === 1}
      upload
    {:else if selectedTab === 2}
    <div class="overflow-x-auto w-full h-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" bind:checked={selectAll}/>
              </label>
            </th>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Reviewed</th>
            <th>
              {#if selectAll || selectedDecks.length > 1}
              <div class="dropdown">
                <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <li><a>Edit cards</a></li>
                  <li><a>Delete deck</a></li>
                </ul>
              </div>
              {/if}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" bind:group={selectedDecks} value={'row 1'}/>
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">Hart Hagerty</div>
                  <div class="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br/>
              <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <div class="dropdown">
                <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <li><a>Edit cards</a></li>
                  <li><a>Delete deck</a></li>
                </ul>
              </div>
            </th>
          </tr>
          <!-- row 2 -->
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" bind:group={selectedDecks}  value={'row 2'}/>
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">Brice Swyre</div>
                  <div class="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br/>
              <span class="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <th>
              <div class="dropdown">
                <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <li><a>Edit cards</a></li>
                  <li><a>Delete deck</a></li>
                </ul>
              </div>
            </th>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" bind:group={selectedDecks} value={'row 3'}/>
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">Marjy Ferencz</div>
                  <div class="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br/>
              <span class="badge badge-ghost badge-sm">Office Assistant I</span>
            </td>
            <td>Crimson</td>
            <th>
              <div class="dropdown">
                <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <li><a>Edit cards</a></li>
                  <li><a>Delete deck</a></li>
                </ul>
              </div>
            </th>
          </tr>
          <!-- row 4 -->
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" bind:group={selectedDecks} value={'row 4'}/>
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">Yancy Tear</div>
                  <div class="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br/>
              <span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
            </td>
            <td>Indigo</td>
            <th>
              <div class="dropdown">
                <label tabindex="0"  class="btn btn-ghost btn-xs">manage</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <li><a>Edit cards</a></li>
                  <li><a>Delete deck</a></li>
                </ul>
              </div>
            </th>
          </tr>
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th># Cards</th>
            <th>Last Reviewed</th>
            <th></th>
          </tr>
        </tfoot>
        
      </table>
    </div>
    {/if}
</div>