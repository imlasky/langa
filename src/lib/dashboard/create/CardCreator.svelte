<script>
    import { enhance } from "$app/forms";
    import { beforeNavigate } from "$app/navigation";
    import Button from "$lib/components/interface/Button.svelte";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { pb } from "$lib/pocketbase";
    import { page } from "$app/stores";

    export let cards = [];
    export let totalPages;
    let numPag
    let cardsOld = cards.map((card) => {return {...card}});
    let cardLengthCheck = 0;
    export let form;
    let selectedRow;
    let timeSinceUpdate = 0;
    let numTimesUpdate = 0;
    let showSaving = false;
    let numModified = 0;
    let pageNum = 1;
    let searchTerm;

    /**
     * @type {HTMLFormElement}
     */
    let formObj;


    function getNumModified(cards) {

        return cards.filter(card => card.modified || card.deleted).length
    }

    let updateIntervalID = setInterval(() => {
        if (timeSinceUpdate > 2000 && getNumModified(cards) != numModified) {
            numModified = getNumModified(cards);
            timeSinceUpdate = 0;
            showSaving = true;
            formObj?.submit()
        } else {    
            timeSinceUpdate += 500;
        }
    }, 500)

    let showUpdateIntervalID = setInterval(() => {
        if (numTimesUpdate > 2 && showSaving) {
            numTimesUpdate = 0;
            showSaving = false;
        } else {
            numTimesUpdate += 1;
        }
    }, 1000)

    function handleAddRow() {
        timeSinceUpdate = 0;
        cards = [...cards, {front: "", back: "", modified: true}];
    }

    function handleDeleteRow() {
        timeSinceUpdate = 0;
        if (cards[selectedRow].id) {
            cards[selectedRow].deleted = true;
        } else {
            cards.splice(selectedRow, 1)

        }
        if (cards.filter(card => !card.deleted).length === 0) {
            cards = [...cards, {front: "", back: ""}];
        }
        cards = cards;
    }

    onMount(() => {
        if (cards.length === 0) {
            cards = [{front: "", back: "", modified: true}];
            cardsOld = cards.map((card) => {return {...card}});
        }
    })

    beforeNavigate(() => {
        clearInterval(updateIntervalID);
        clearInterval(showUpdateIntervalID);
    })

    function handleKeyUp(i) {
        cards[i].modified = (cards[i].front !== cardsOld[i]?.front) || (cards[i].back !== cardsOld[i]?.back);
    }

    $: modifiedCards = cards.filter(card => card.modified || card.deleted);

    async function handlePrevPage() {
        pageNum = pageNum === 1? 1: pageNum-1;
        let records =  await pb.collection('cards').getList(pageNum, 50, {
            sort: 'created',
            filter: `deck.id="${$page.params.deckid}"`,
        });
        cards = records.items.map((card) => {return card.export()})
    }

    async function handleNextPage() {
        pageNum = pageNum === totalPages? totalPages: pageNum+1;
        let records =  await pb.collection('cards').getList(pageNum, 50, {
            sort: 'created',
            filter: `deck.id="${$page.params.deckid}"`,
        });
        cards = records.items.map((card) => {return card.export()})
    }

    async function handleSearchPress() {
        let records;
        if (searchTerm != "") {
            records =  await pb.collection('cards').getList(pageNum, 50, {
                sort: 'created',
                filter: `deck.id="${$page.params.deckid}" && (front?~"${searchTerm}" || back?~"${searchTerm}")`,
            });
        } else {
            records =  await pb.collection('cards').getList(pageNum, 50, {
                sort: 'created',
                filter: `deck.id="${$page.params.deckid}"`,
            });
        }
        totalPages = records.totalPages;
        cards = records.items.map((card) => {return card.export()});
    }

</script>

<svelte:window on:keydown={() => {timeSinceUpdate=0}} />

<div class="overflow-x-auto w-3/4">
    <div class="flex h-8">
        {#if showSaving}
            <p>Saving...</p>
        {/if}
    </div>
    <div class="flex h-8 pl-2">
       
        <input class="input input-bordered" bind:value={searchTerm} on:keyup={handleSearchPress} placeholder="Search cards"/>
    </div>
    
    <div class="flex flex-col">

        <div class="flex w-full justify-center pt-4 space-x-2">
            <Button buttonSize="sm" on:click={handlePrevPage}>Prev page</Button>
            <Button buttonSize="sm" on:click={handleNextPage}>Next page</Button>
        </div>
        <div class="flex justify-around">
            <p>Page {pageNum}/{totalPages}</p>
        </div>
    </div>
    <table class="table w-full border-4 border-neutral-800">
        <thead>
        <tr>
            <th class="text-center">Front</th>
            <th class="text-center">Back</th>
        </tr>
        </thead>
        <tbody>
            {#each cards as card, i}
                {#if !card.deleted}
                    <tr class="hover hover:cursor-pointer">
                        <td class="p-0"><div class="p-4" contenteditable bind:textContent={card.front} on:focus={() => {selectedRow = i}} on:keyup={() => {handleKeyUp(i)}}></div></td>
                        <td class="p-0"><div class="p-4" contenteditable bind:textContent={card.back} on:focus={() => {selectedRow = i}} on:keyup={() => {handleKeyUp(i)}}></div></td>
                    </tr>   
                {/if}             
            {/each}
        </tbody>
    </table>
    <div class="flex w-full justify-center pt-4 space-x-2">
        <Button buttonSize="md" on:click={handleAddRow}>Add row</Button>
        <Button buttonSize="md" on:click={handleDeleteRow}>Delete row</Button>
    </div>
    
</div>
<form method="post" action="?/card" use:enhance bind:this={formObj}>
    <input value={JSON.stringify(modifiedCards)} name="cards" hidden>
</form>