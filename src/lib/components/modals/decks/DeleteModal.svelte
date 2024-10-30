<script>
	import { enhance } from '$app/forms';

	import { Icons } from '$lib/icons';
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';

	export let close, data, deck;
	$: console.log(data)
	// $: if (data?.message) {
	// 	close(true)
	// }
</script>

<div class="mb-4 flex flex-row items-center space-x-4">
	<Icon icon={Icons.Delete.hover} alt="Delete" width="32" height="32" />
	<h1 class="text-xl font-semibold text-red-500">Delete Flashcard Deck</h1>
</div>

	<p class="text-lg">
		Are you sure you want to permanently delete <span class="font-semibold">{deck.title}</span>?
	</p>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		<button
			class="btn-secondary rounded-full"
			on:click={() => {
				close();
			}}>Cancel</button
		>
		<button
			class="btn-danger rounded-full" on:click={()=>{}}>Delete</button
		>
	</div>
