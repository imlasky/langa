<script>
	export let errors;
</script>

{#if errors}
	<ul class="error-messages">
		{#each Object.keys(errors) as key}
			<li>{errors[key]}</li>
		{/each}
	</ul>
{/if}