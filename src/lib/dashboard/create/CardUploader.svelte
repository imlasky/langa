<script>
    import Papa from 'papaparse';
    import {page} from '$app/stores';



    import Button from '$lib/components/interface/Button.svelte';
    import { redirect } from '@sveltejs/kit';

    export let deck;

    let files;
    let parsedData;

    $: files ? Papa.parse(files[0], {
            header: true,
            complete: function(results) {
                parsedData = JSON.stringify(results.data);
            }
        }) : null;


    // async function handleClick() {
    //     Papa.parse(files[0], {
    //         header: true,
    //         complete: function(results) {
    //             fetch(`${$page.data.deck.id}`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(results.data)
    //             })
    //             .then(response => {
    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 redirect(307, `${$page.data.deck.id}`)
    //             })
                
    //         }
    //     });
    // }
</script>

<div class="flex flex-col items-center w-full max-h-screen justify-center pt-4">
    <div class="pb-4">
        <h1 class="text-xl text-center font-bold">Please upload your cards</h1>
        <h2 class="text-md text-center font-light">Currently only have support for CSV files</h2>

    </div>
        <div class="flex flex-col w-full justify-center items-center">
            <label class="label">
                <span class="label-text">Pick a file</span>
            </label>
            <input type="file" class="file-input file-input-bordered w-full max-w-xs" accept=".csv" name="files" bind:files/>
            <form method="post" action="?/upload">
                <input value={parsedData} name="cards" hidden/>
                <div class="flex w-full justify-center p-4">
                    
                    <Button buttonSize="sm">Upload cards</Button>
                </div>
            </form>
        </div>
    
    
</div>