<script>
    import Button from "$lib/components/interface/Button.svelte";


    export let cards;
    /**
     * @type {HTMLTableRowElement[]}
     */
     export let rows = Array();

    let selectedRow;

    $: console.log(cards)

    function handleAddRow() {
        cards = [...cards, {front: "", back: ""}];
    }

    function handleDeleteRow() {
        cards.splice(selectedRow, 1)
        if (cards.length === 0) {
            cards = [{front: "", back: ""}];
        }
        cards = cards;
        
    }


</script>

<div class="overflow-x-auto w-3/4">
    <table class="table w-full border-4 border-neutral-800">
        <thead>
        <tr>
            <th class="text-center">Front</th>
            <th class="text-center">Back</th>
        </tr>
        </thead>
        <tbody>
            {#each cards as card, i}
                <tr class="hover hover:cursor-pointer" bind:this={rows[i]}>
                    <td class="p-0"><div class="p-4" contenteditable bind:textContent={card.front} on:focus={() => {selectedRow = i}}></div></td>
                    <td class="p-0"><div class="p-4" contenteditable bind:textContent={card.back} on:focus={() => {selectedRow = i}}></div></td>
                </tr>                
            {/each}
        </tbody>
    </table>
    <div class="flex w-full justify-center pt-4 space-x-2">
        <Button buttonSize="md" on:click={handleAddRow}>Add row</Button>
        <Button buttonSize="md" on:click={handleDeleteRow}>Delete row</Button>


    </div>
</div>