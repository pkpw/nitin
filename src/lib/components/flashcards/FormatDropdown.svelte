<script>
	import { writable } from 'svelte/store';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '../Icon.svelte';

	import { useModals } from '$lib/stores/modals';

	import Popup from '../Popup.svelte';

	// export let deck, data;

	const modals = useModals();

	let visible = writable(false);
</script>

<Popup {visible}>
	<svelte:fragment slot="button">
		<div
			class="rounded-md px-3 py-0.5 text-center {$visible
				? 'bg-stone-300 dark:bg-stone-700'
				: ''} select-none hover:cursor-pointer hover:bg-stone-300 hover:dark:bg-stone-700"
		>
			Format
		</div>
	</svelte:fragment>
	<svelte:fragment slot="popup">
		<div
			class="absolute left-0 top-[calc(100%+0.25rem)] z-30 min-w-44 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.Bold} width="24" height="24" />
				<span>Bold</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.Italic} width="24" height="24" />
				<span>Italic</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.Underline} width="24" height="24" />
				<span>Underline</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.NumberedList} width="24" height="24" />
				<span>Numbered List</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.BulletedList} width="24" height="24" />
				<span>Bulleted List</span>
			</button>
		</div>
	</svelte:fragment>
</Popup>
