<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Modals } from '$lib/modals';

	const modals = Modals.get();
	const dispatch = createEventDispatcher();

	let open;
	$: if (modals?.isOpen()) {
		open = $modals[0];
	}

	async function close(confirmed) {
		await open?.response(confirmed);

		if (confirmed) {
			dispatch('confirmed');
		}

		modals.close();
		dispatch('close');
	}
</script>

{#if open}
	<div
		in:fade={{ delay: 0, duration: 150 }}
		out:fade={{ delay: 0, duration: 150 }}
		class="fixed left-0 top-0 z-50 flex h-full w-full flex-row items-center justify-center overflow-hidden bg-stone-950/85 backdrop-blur-sm"
	>
		<div
			class="m-2 w-full min-w-80 max-w-sm rounded-2xl border border-stone-400 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950"
		>
			<svelte:component this={open.modal} {...open?.props} {close} />
		</div>
	</div>
{/if}
