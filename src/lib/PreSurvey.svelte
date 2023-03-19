<script>

    import { enhance } from "$app/forms";
    import ListErrors from '$lib/ListErrors.svelte';
    import Button from "./components/interface/Button.svelte";

    /** @type {import('./$types').ActionData} */
	export let form;

    export let submitted = false;
    let submitButtonPressed = false;
    function handleClick() {
        submitButtonPressed = true;
    }
    
    $: submitted = form?.ok

    
    let sleep = 3;
    let physicalActivity = 3;
    let water = 3;
    let food = 3;
    let sleepUnits = 'hours';
    let physicalActivityUnits = 'mins';
    let waterUnits = 'glasses';
    let mealUnits = 'hours ago'

    let sleepOptions = [
        '<6',
        '6-7',
        '7-8',
        '8-9',
        '>9'
    ];

    let physicalActivityOptions = [
        '0-15',
        '16-30',
        '31-60',
        '61-90',
        '>90'
    ]

    let waterOptions = [
        '0',
        '1-2',
        '3-4',
        '5-6',
        '>6'
    ]

    let mealOptions = [
        '<1',
        '1-2',
        '2-3',
        '3-4',
        '>4'
    ]

</script>

<div class="flex w-full justify-center mt-24">
    <div class="flex flex-col w-full items-center">

        <h1 class="text-2xl">How's it going today?</h1>
        <ListErrors errors={form?.errors} />
        <form method="POST" use:enhance class="flex flex-col items-center w-5/6 md:w-1/2 gap-y-4 mt-8">
            <div class="form-control w-full max-w-md">
                <label class="label">
                  <span class="label-text">How many hours of sleep did you get?</span>
                </label>
                <input name="sleep" type="range" min=1 max=5 class="range" bind:value={sleep}/>
                <div class="w-full flex justify-between text-xs px-2 pt-2">
                    {#each sleepOptions as option }
                        <span>{option}</span>
                    {/each}
                </div>
            </div>
            <div class="form-control w-full max-w-md">
                <label class="label">
                  <span class="label-text">How many minutes of physical activity have you done today?</span>
                </label>
                <input name="physicalActivity" type="range" min=1 max=5 class="range" bind:value={physicalActivity}/>
                <div class="w-full flex justify-between text-xs px-2 pt-2">
                    {#each physicalActivityOptions as option }
                        <span>{option}</span>
                    {/each}
                </div>
            </div>
            <div class="form-control w-full max-w-md">
                <label class="label">
                  <span class="label-text">How many glasses of water did you drink today?</span>
                </label>
                <input name="water" type="range" min=1 max=5 class="range" bind:value={water}/>
                <div class="w-full flex justify-between text-xs px-2 pt-2">
                    {#each waterOptions as option }
                        <span>{option}</span>
                    {/each}
                </div>
            </div>
            <div class="form-control w-full max-w-md">
                <label class="label">
                  <span class="label-text">How many hours ago was your last meal?</span>
                </label>
                <input name="food" type="range" min=1 max=5 class="range" bind:value={food}/>
                <div class="w-full flex justify-between text-xs px-2 pt-2">
                    {#each mealOptions as option }
                        <span>{option} </span>
                    {/each}
                </div>
            </div>
            <button class="btn" on:click={handleClick}>
                {#if submitButtonPressed}
                    <div class="flex items-center space-x-4">
                        <p>Generating lesson</p>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                {:else}
                      Begin session
                {/if}
            </button>
        </form>
    </div>
</div>