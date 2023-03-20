<script>
    import Button from "$lib/components/interface/Button.svelte";


    let cardCode = "<h2><strong>Customize</strong> your cards</h2>"
    let cardMarkdown = "In **markdown** or the WYSIWYG editor"
    let audioCode = '<audio controls><source src="sound/hello.mp3" type="audio/mpeg">Hello</audio>'

</script>

<main class="flex flex-col items-center w-full">
    <section id="hero" class="flex flex-col w-4/5 md:w-7/12 justify-center items-center gap-y-2">
        
        <h1 class="text-3xl md:text-7xl font-bold text-center">
            A learning platform that cares about how you feel
        </h1>
        <h2 class="text-md md:text-2xl text-center w-full">
            How we feel affects how we learn. Langa takes into account things like hunger, thirst, sleep, and physical activity to determine the best lesson for you.
        </h2>
        <div class="pt-8">

            <a href='/dashboard'>
                <Button buttonSize='xl'>
                    Start learning
                </Button>
            </a>
        </div>

    </section>

    <!-- <section class="flex flex-col w-full items-center mt-32">
        <div class="flex md:flex-row w-4/5 md:w-3/4 items-center h-screen align-middle justify-center gap-x-2">
            <h2 class="text-xl text-center md:text-start md:text-5xl font-bold pb-2 md:pb-0">A quick questionnaire about your day is all you need to personalize your lesson</h2>
            <div class="mockup-window border bg-base-300 shadow-xl">
                <img src="image/survey.png" width=800>
              </div>
        </div>

    </section>

    <section class="flex flex-col w-full items-center h-screen align-middle justify-center">
        <h2 class="text-3xl md:text-5xl font-bold pb-12">Customize your cards for what you need</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 w-4/5 md:w-3/4 gap-x-4">
            <div class="mockup-code shadow-xl">
                <div class="flex flex-col justify-center px-4 py-16 gap-y-2">
                    
                    <pre><code>{cardCode}</code></pre> 
                    <pre><code>{cardMarkdown}</code></pre> 
                    <pre><code>{audioCode}</code></pre> 
                </div>
               
            </div>
            <div class="mockup-window border bg-base-300 shadow-xl">
                <div class="flex flex-col items-center px-4 py-16 gap-y-2"> 
                    {@html cardCode}
                    <p>In <strong>markdown</strong> or the WYSIWYG editor</p>
                    {@html audioCode}
                </div>
              </div>
        </div>
        
    </section> -->


</main>

