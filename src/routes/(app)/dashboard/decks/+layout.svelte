<script>

    let tabs = [
      'create',
      'upload',
      'manage',
    ];
    let selectedTab = 0;



</script>

<div class="flex flex-col w-full mt-12 space-y-12 px-4">
    
    <div class="tabs">
        {#each tabs as tab, i }
          {#if selectedTab === i}
            <a class="tab tab-lifted tab-active capitalize" on:click={() => {selectedTab = i}} href="/dashboard/decks/{tab}">{tab}</a> 
          {:else}
            <a class="tab tab-lifted capitalize"  href="/dashboard/decks/{tab}" on:click={() => {selectedTab = i}}>{tab}</a> 
          {/if}
        {/each}
    </div>

    <slot/>
</div>