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
			File
		</div>
	</svelte:fragment>
	<svelte:fragment slot="popup">
		<div
			class="absolute left-0 top-[calc(100%+0.25rem)] min-w-44 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<button
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.NewDeck} width="24" height="24" />
				<span>New</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.CopyAll} width="24" height="24" />
				<span>Make a Copy</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
				on:click={() => {}}
			>
				<Icon icon={Icons.Edit} width="24" height="24" />
				<span>Rename</span>
			</button>
			<a
				class="flex w-full items-center space-x-2 p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				href="/flashcards"
			>
				<Icon icon={Icons.BackArrow} width="24" height="24" />
				<span>All Flashcards</span>
			</a>
		</div>
	</svelte:fragment>
</Popup>
