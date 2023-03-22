<script>
	import { enhance } from '$app/forms';
    import Button from '$lib/components/interface/Button.svelte';
    import ListErrors from '$lib/ListErrors.svelte';
    /** @type {import('./$types').ActionData} */
	export let form;

    let submitted = false;
    function handleClick() {
        submitted = true;
    }
    
    $: submitted = form?.errors.length < 0
    
</script>


<div class="flex w-full justify-center mt-24">
    <div class="flex flex-col w-full items-center">

        <h1 class="text-2xl font-bold">Log in to your account</h1>
        <ListErrors errors={form?.errors} />
        <form method="POST" use:enhance class="flex flex-col items-center w-3/4 md:w-1/2 gap-y-2">
            <div class="form-control w-full max-w-sm">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input name="email" type="email" placeholder="email@domain.com" class="input input-bordered w-full max-w-sm" />
            </div>
            <div class="form-control w-full max-w-sm">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input name="password" type="password" placeholder="Password" class="input input-bordered w-full max-w-sm" />
            </div>
            
            <Button buttonSize="md" on:click={handleClick}>
                {#if submitted}
                    <div class="flex items-center space-x-4">
                        <p>Logging in</p>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 hover:text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                {:else}
                    Log in
                {/if}
            </Button>
            
            <a href="/auth/register" class="underline">Need an account?</a>
        </form>
    </div>
</div>