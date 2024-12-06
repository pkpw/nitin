<script>
	import { fade } from 'svelte/transition';
	import Spinner from '../Spinner.svelte';

	export let close;
	export let classroom;

	let isProcessing = false;

	async function handleDelete() {
		isProcessing = true;
		await close(true);
		isProcessing = false;
	}
</script>

<div class="mb-4 flex flex-row items-center space-x-4">
	<h1 class="text-xl font-semibold text-red-500">Confirm Deletion</h1>
</div>

<p class="text-lg">
	Are you sure you want to permanently delete the classroom <span class="font-semibold">{classroom?.name}</span>?
</p>

<div class="flex flex-row items-center justify-end space-x-4 pt-4">
	<button class="btn-secondary rounded-full" on:click|preventDefault={() => close(false)}>
		Cancel
	</button>
	<button class="btn-danger rounded-full" on:click={handleDelete} disabled={isProcessing}>
		{#if isProcessing}
			<div in:fade>
				<Spinner fill={'#fafaf9'} />
			</div>
		{:else}
			Delete
		{/if}
	</button>
</div>