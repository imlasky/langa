<script>
    import FutureDuePlot from "$lib/dashboard/FutureDuePlot/FutureDuePlot.svelte";
    import PlotTile from "$lib/dashboard/PlotTile.svelte";


    export let data;

    let user = data.user;

</script>

<div class="flex flex-col w-full mt-12 space-y-12">

    <div class="flex max-w-xs justify-center">
        <h1 class="text-3xl font-bold normal-case text-center">Hey {user ? (user.name ? user.name : "there!"): "there!"}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-x-2 gap-y-2 px-4">
        <PlotTile>
            <FutureDuePlot/>
        </PlotTile>

        <PlotTile>
            <FutureDuePlot/>
        </PlotTile>

        <PlotTile>
            <FutureDuePlot/>
        </PlotTile>

        <PlotTile>
            <FutureDuePlot/>
        </PlotTile>
        
        <PlotTile>
            <FutureDuePlot/>
        </PlotTile>
    </div>

    <!-- <div class="flex flex-col md:flex-row w-full items-center gap-y-2 md:gap-y-0 md:justify-around">
        
        <div class="flex flex-col w-5/6 md:w-2/5 max-h-72 border-4 border-black rounded-md p-6">
            
        </div>
        <div class="flex flex-col w-5/6 md:w-2/5 max-h-72 border-4 border-black rounded-md p-6">
            <FutureDuePlot/>
        </div>
    </div>

    <div class="flex w-full justify-center">
        <div class="flex w-5/6 bg-white h-72 border-2 border-black rounded-md">
            Overall stats
        </div>
    </div> -->
    

</div>