<script>
    import CardEditor from "$lib/components/cards/CardEditor.svelte";


    export let data;

    let deck = data.deck;
    let frontContent;
    let backContent;


</script>

<h1 class="text-2xl font-bold">{deck.name}</h1>

<div class="flex w-full mx-4">

    <CardEditor bind:frontContent bind:backContent/>
</div>