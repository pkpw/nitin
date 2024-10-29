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
		class="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center overflow-clip bg-stone-950 bg-opacity-80 backdrop-blur-sm p-4"
	>
		<div
			class="w-full md:max-w-sm rounded-2xl border border-stone-400 bg-stone-50 p-8 dark:border-stone-700 dark:bg-stone-950"
		>
			<svelte:component this={open.modal} />
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

		<!-- <div
		bind:this={dialog}
		class="m-1 rounded-md border border-stone-400 bg-stone-50 p-8 dark:border-stone-700 dark:bg-stone-950"
	>
		<slot />
	</div>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		{#if type == Modal.CONTINUE}
			<button on:click={on_close()} class="btn-secondary">Cancel</button>
			<button on:click={on_close(true)} class="btn-primary">Continue</button>
		{:else if type == Modal.DELETE}
			<button on:click={() => on_close()} class="btn-secondary">Cancel</button>
			<button on:click={() => on_close(true)} class="btn-danger">Delete</button>
		{:else if type == Modal.SAVE}
			<button on:click={() => on_close()} class="btn-secondary">Cancel</button>
			<button on:click={() => on_close(true)} class="btn-primary">Save</button>
		{:else}
			<button on:click={() => on_close(true)} class="btn-primary">Ok</button>
		{/if}
	</div> -->
	</div>
{/if}
