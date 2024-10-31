<script>
	export let close;
</script>

<div class="text-center">
	<h1 class="text-xl font-semibold">Unsaved Changes</h1>
	<p class="text-lg">Any changes you have made are unsaved.</p>
</div>
<div class="flex flex-row items-center justify-end space-x-4 pt-4">
	<button
		class="btn-secondary rounded-full"
		on:click={() => {
			close(false);
		}}>Cancel</button
	>
	<button
		class="btn-primary rounded-full"
		on:click={() => {
			close(true);
		}}>Continue</button
	>
</div>
