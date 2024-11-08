<script>
	import { writable } from 'svelte/store';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '../Icon.svelte';

	import { useModals } from '$lib/stores/modals';
	import DeleteModal from './DeleteModal.svelte';
	import RenameModal from './RenameModal.svelte';

	import Popup from '../Popup.svelte';

	export let deck, data;

	const modals = useModals();

	let visible = writable(false);
</script>

<Popup {visible}>
	<svelte:fragment slot="button">
		<button
			class="relative h-10 w-10 rounded-full {$visible
				? 'bg-stone-50/50'
				: ''} transition-colors duration-150 ease-in-out hover:bg-stone-50/50"
		>
			<div class="absolute left-[4px] top-[4px] h-8 w-8">
				<Icon icon={Icons.MoreVert} width="32" height="32" />
			</div>
		</button>
	</svelte:fragment>
	<svelte:fragment slot="popup">
		<div
			class="absolute right-12 top-0 min-w-32 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<button
				class="flex w-full items-center space-x-2 border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
				on:click={() =>
					modals.trigger({
						modal: RenameModal,
						props: { data: data.renameForm, deck },
						response: async (confirmed) => {}
					})}
			>
				<Icon icon={Icons.Edit} width="24" height="24" />
				<span>Rename</span>
			</button>
			<button
				class="icon-button-danger flex w-full items-center space-x-2 p-4 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-800"
				on:click={() =>
					modals.trigger({
						modal: DeleteModal,
						props: { data: data.deleteForm, deck },
						response: async (confirmed) => {}
					})}
			>
				<Icon icon={Icons.Delete} width="24" height="24" />
				<span>Delete</span>
			</button>
		</div>
	</svelte:fragment>
</Popup>
