<script>


</script>


<div class="flex w-full justify-center mt-24">
    <div class="flex flex-col w-full items-center">

        <h1 class="text-2xl">Log in to your account</h1>
        <form method="POST" action="?/login" class="flex flex-col items-center w-1/2 gap-y-2">
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
            <button class="btn">Log in</button>
            <a href="/auth/register" class="underline">Need an account?</a>
        </form>
    </div>
</div>