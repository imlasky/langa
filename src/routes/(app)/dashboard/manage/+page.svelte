<script>

    let tabs = [
      'Create',
      'Upload',
      'Manage',
    ];
    let selectedTab = 0;

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
</div>