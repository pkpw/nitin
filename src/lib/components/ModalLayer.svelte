<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Modals } from '$lib/modals';

	const modals = Modals.get();
	const dispatch = createEventDispatcher();

	let open;
	$: if (modals?.isOpen()) open = $modals[0];

	function close(confirmed) {
		if (confirmed) {
			dispatch('confirmed');
		}

		open.response(confirmed);
		dispatch('close');
		modals.close();
	}
</script>

{#if open}
	<div
		in:fade={{ delay: 0, duration: 150 }}
		out:fade={{ delay: 0, duration: 150 }}
		class="fixed left-0 top-0 z-50 flex h-full w-full flex-row items-center justify-center overflow-hidden bg-stone-950 bg-opacity-80 backdrop-blur-sm"
	>
		<div
			class="m-2 w-full min-w-80 max-w-sm rounded-2xl border border-stone-400 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950"
		>
			<svelte:component this={open.modal} {...open?.props} />
			<div class="flex flex-row items-center justify-end space-x-4 pt-4">
				{#if open.type === Modals.CONTINUE || open.type === Modals.SAVE}
					<button class="btn-secondary rounded-full" on:click={() => close(false)}>Cancel</button>
					<button class="btn-primary rounded-full" on:click={() => close(true)}>{open.type}</button>
				{:else if open.type === Modals.DELETE}
					<button class="btn-secondary rounded-full" on:click={() => close(false)}>Cancel</button>
					<button class="btn-danger rounded-full" on:click={() => close(true)}>Delete</button>
				{:else}
					<button class="btn-seconary rounded-full" on:click={() => close(true)}>Cancel</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
