<script>
    import Button from "$lib/components/interface/Button.svelte";


</script>

<main class="flex flex-col items-center w-full">
    <section id="hero" class="flex flex-col w-4/5 md:w-7/12 justify-center items-center pt-12 gap-y-2">
        
        <h1 class="text-3xl md:text-7xl font-bold text-center text-neutral-800">
            A learning platform that cares about how you feel
        </h1>
        <h2 class="text-md md:text-2xl text-center w-5/6 text-neutral-800">
            How we feel affects how we learn. Langa takes into account things like hunger, thirst, sleep, and activity to determine the best lesson for you.
        </h2>
        <div class="pt-8">

            <a href='/dashboard'>
                <Button 
                    buttonText="Let's get going"
                    buttonSize='xl'
                />
            </a>
        </div>

    </section>

</main>

