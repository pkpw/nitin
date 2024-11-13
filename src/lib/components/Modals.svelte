<script>
	import { useModals } from '$lib/stores/modals';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const modals = useModals();
	const dispatch = createEventDispatcher();

	let current;

	async function close(confirmed) {
		if (current.response) {
			await current.response(confirmed);
		}

		if (confirmed) {
			dispatch('confirmed');
		}

		modals.close();
		dispatch('close');
	}

	onMount(() => {
		modals.isOpen.subscribe((open) => (current = open ? $modals[0] : null));
	});
</script>

{#if current}
	<div
		in:fade={{ delay: 0, duration: 150 }}
		out:fade={{ delay: 0, duration: 150 }}
		class="fixed left-0 top-0 z-50 flex h-full w-full flex-row items-center justify-center overflow-hidden bg-stone-950/85 backdrop-blur-sm"
	>
		<div
			class="m-2 w-full min-w-80 max-w-sm rounded-2xl border border-stone-400 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950"
		>
			<svelte:component this={current.modal} {...current?.props} {close} />
		</div>
	</div>
{/if}
