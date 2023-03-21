<script>
    import { enhance } from "$app/forms";
    import Button from "$lib/components/interface/Button.svelte";

    export let form;
    let deckName;

</script>

<div class="flex w-full h-full justify-center">

    <form method="POST" use:enhance class="flex flex-col w-full items-center gap-y-2">
        <div class="flex flex-col items-start w-4/5 md:w-1/2">

            <div class="flex form-control w-full justify-center">
                <label class="label">
                  <span class="label-text">Deck name</span>
                </label>
                <input name="name" type="text" maxlength="100" placeholder="Wow such deck" class="input input-bordered w-full " bind:value={deckName}/>
                
            </div>
            <div class="form-control">
                <label class="label cursor-pointer space-x-2">
                  <span class="label-text">Make private?</span> 
                  <input type="checkbox" class="toggle" name="privateDeck"/>
                </label>
              </div>
        </div>
        <div class="flex justify-center">
            {#if deckName?.length > 0}
            <Button buttonSize="md">
                Create deck
            </Button>
            {/if}
        </div>
        

    </form>
    
</div>