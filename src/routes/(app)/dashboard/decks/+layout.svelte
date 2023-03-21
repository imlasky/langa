<script>

    import {page} from "$app/stores";
    let tabs = [
      'manage',
      'create',
      'upload',
    ];
    let selectedTab = 0;
    $: currentPage = $page.url.pathname.split('/')[3]
    
</script>

<div class="flex flex-col w-full mt-12 space-y-12 px-4">
    
    <div class="tabs">
        {#each tabs as tab, i }
          {#if currentPage === tab}
            <a class="tab tab-lifted tab-active capitalize" href="/dashboard/decks/{tab}">{tab}</a> 
          {:else}
            <a class="tab tab-lifted capitalize" href="/dashboard/decks/{tab}" >{tab}</a> 
          {/if}
        {/each}
    </div>

    <slot/>
</div>