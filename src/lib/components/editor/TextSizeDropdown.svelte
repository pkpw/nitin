<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '../Icon.svelte';

	import Popup from '../Popup.svelte';

	// export let deck, data;
	export let selection = writable(undefined);

	const dispatch = createEventDispatcher();

	let visible = writable(false);
</script>

<Popup {visible}>
	<svelte:fragment slot="button">
		<div
			class="flex flex-row items-center justify-between rounded-md {$visible
				? '!border-stone-700 bg-stone-200 dark:!border-stone-500 dark:bg-stone-700'
				: 'bg-stone-100 dark:bg-stone-800'} min-w-24 select-none border border-stone-400 py-1 pl-2 hover:cursor-pointer hover:border-stone-700 hover:bg-stone-200 dark:border-stone-700 dark:hover:border-stone-500 hover:dark:bg-stone-700"
		>
			<span>{$selection ? $selection.charAt(0).toUpperCase() + $selection.slice(1) : 'Normal'}</span
			>
			<Icon icon={$visible ? Icons.ArrowDropup : Icons.ArrowDropdown} width="32" height="32" />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="popup">
		<div
			class="absolute left-0 top-[calc(100%+0.25rem)] z-30 min-w-44 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<button
				class="flex w-full items-center space-x-2 p-4 {$selection === 'huge'
					? 'bg-stone-200 dark:bg-stone-800'
					: ''} hover:bg-stone-200 dark:hover:bg-stone-800"
				on:click={() => {
					$selection = 'huge';
					dispatch('select');
				}}
			>
				<span class="text-2xl">Huge</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$selection === 'large'
					? 'bg-stone-200 dark:bg-stone-800'
					: ''} hover:bg-stone-200 dark:hover:bg-stone-800"
				on:click={() => {
					$selection = 'large';
					dispatch('select');
				}}
			>
				<span class="text-xl">Large</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$selection === undefined
					? 'bg-stone-200 dark:bg-stone-800'
					: ''} hover:bg-stone-200 dark:hover:bg-stone-800"
				on:click={() => {
					$selection = undefined;
					dispatch('select');
				}}
			>
				<span>Normal</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$selection === 'small'
					? 'bg-stone-100 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {
					$selection = 'small';
					dispatch('select');
				}}
			>
				<span class="text-sm">Small</span>
			</button>
		</div>
	</svelte:fragment>
</Popup>
