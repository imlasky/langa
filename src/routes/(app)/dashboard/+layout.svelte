<script>
    export let data;

</script>

<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center">
        <div class="w-full justify-start pt-2 pl-2">
            <label for="my-drawer-2" class="btn btn-primary btn-sm drawer-button lg:hidden">Menu</label>
        </div>
        
        <slot/>
        
    
    </div> 
    <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        
        <ul class="menu p-4 w-60 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
            <a class="normal-case text-xl font-bold text-start pl-4 pb-4" href="/">Langa</a>
            <!-- <li><a href="/dashboard">Overview</a></li> -->
            <li><a href="/dashboard/study">Study</a></li>
            <li><a href="/dashboard/decks/manage">Manage decks</a></li>
            
            <div class="divider w-5/6 place-self-center"></div>

            <li><a href="/docs">Documentation</a></li>
            <li><a href="https://github.com/imlasky/langa">Github</a></li>

            <div class="divider w-5/6 place-self-center"></div>

            <li><a href="/dashboard/settings">Settings</a></li>
            <li><a href="/dashboard/account">Account</a></li>
        </ul>
    
    </div>
</div>
