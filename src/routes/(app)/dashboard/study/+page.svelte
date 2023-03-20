<script>
    import Button from '$lib/components/interface/Button.svelte';



    export let data;

    let decks = data.decks;

</script>

{#if decks.length > 0}
    <div class="overflow-x-auto">
        <table class="table w-full">
        <!-- head -->
        <thead>
            <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            </tr>
        </thead>
        <tbody>
            <!-- row 1 -->
            <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
            </tr>
            <!-- row 2 -->
            <tr class="hover hover:cursor-pointer">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
            </tr>
            <!-- row 3 -->
            <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
            </tr>
        </tbody>
        </table>
    </div>

{:else}
    <div class="flex flex-grow flex-col w-full justify-center items-center">
        <h1 class="text-2xl"> No decks yet!</h1>
        <a class="mt-4" href="decks"><Button buttonSize="md">Make one now</Button></a>
    </div>
{/if}
