<script>
    export let data;

</script>
<div class="flex flex-col sm:flex-row w-full">
    <div class="flex flex-row sm:flex-col justify-center sm:justify-start w-full sm:w-1/6 sm:h-screen">
        <h1 class="normal-case text-3xl" >Langa</h1>
        <ul class="menu menu-horizontal sm:menu-vertical w-full justify-center menu-compact">
            <li><a href="/dashboard">Overview</a></li>
            <li><a href="/dashboard/study">Study</a></li>
            <li><a href="/dashboard/create">Create/Upload</a></li>
            <li><a href="/dashboard/account">Account</a></li>
          </ul>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="flex flex-row sm:flex-col w-full sm:w-5/6 sm:h-screen bg-red-100">
        <slot/>
    </div>
</div>