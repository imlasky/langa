

<main class="flex flex-col items-center w-full mt-24 space-y-2">

    <h1 class="text-4xl font-bold py-4">FAQ</h1>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-1/2">
        <div class="collapse-title text-xl font-medium">
            What does Langa do?
        </div>
        <div class="collapse-content"> 
            <p>Langa is a spaced repetition app built around the idea that how you feel can affect how you learn. <br><br>
            When you go to study that day, you fill out a quick survey about your day, like when you last ate and how much water you drank.</p>
        </div>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-1/2">
        <div class="collapse-title text-xl font-medium">
            How does Langa work?
        </div>
        <div class="collapse-content"> 
            <p>Langa uses machine learning to predict how long it should be until you see a card. Things like how you're feeling, what content is on the card, and how long it takes you to answer are all pieces of data that helps inform when you should see that card next.</p>
            
        </div>
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-1/2">
        <div class="collapse-title text-xl font-medium">
            What does Langa track?
        </div>
        <div class="collapse-content"> 
            <p>Here is a list of all the inputs Langa tracks to predict when you'd need to see the card next:</p>
            <ul class="list-disc list-inside">
                <li>Interval since you last reviewed</li>
                <li>Time of day you are reviewing</li>
                <li>How long you took to answer</li>
                <li>How long you took to review the answer</li>
                <li>Your input for how difficult it was to remember</li>
                <li>The content of the card (currently English & Korean - more coming soon!)</li>
                <li>Daily hours of sleep</li>
                <li>Hunger level</li>
                <li>Thirst level</li>
                <li>Minutes of physical activity</li>
            </ul>
        </div>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-1/2">
        <div class="collapse-title text-xl font-medium">
            Is Langa open-source?
        </div>
        <div class="collapse-content"> 
            <p>You betcha! Check out the GitHub repo here: <span class="link">https://github.com/imlasky/langa</span></p>
            
        </div>
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-1/2">
        <div class="collapse-title text-xl font-medium">
            Why doesn't Langa do X?
        </div>
        <div class="collapse-content"> 
            <p>That's a great question and I might have just not programmed it in yet!<br><br> If you have a neat suggestion for a feature or something you want to see, put a feature request here: <span class="link">https://github.com/imlasky/langa/issues</span></p>
            
        </div>
    </div>
</main>