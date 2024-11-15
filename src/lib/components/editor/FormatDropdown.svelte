<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '../Icon.svelte';

	import Popup from '../Popup.svelte';

	// export let deck, data;
	export let isBold,
		isItalic,
		isUnderline,
		isStrikethrough,
		isNumberedList,
		isBulletedList = writable(false);

	const activeColor = '#3b82f6';

	const dispatch = createEventDispatcher();

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
				class="flex w-full items-center space-x-2 p-4 {$isBold
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('bold')}
			>
				<Icon icon={Icons.Bold} width="24" height="24" fill={$isBold ? activeColor : null} />
				<span>Bold</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$isItalic
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('italic')}
			>
				<Icon icon={Icons.Italic} width="24" height="24" fill={$isItalic ? activeColor : null} />
				<span>Italic</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$isUnderline
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('underline')}
			>
				<Icon
					icon={Icons.Underline}
					width="24"
					height="24"
					fill={$isUnderline ? activeColor : null}
				/>
				<span>Underline</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$isStrikethrough
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('strikethrough')}
			>
				<Icon
					icon={Icons.Strikethrough}
					width="24"
					height="24"
					fill={$isStrikethrough ? activeColor : null}
				/>
				<span>Strikethrough</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$isNumberedList
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('numberedlist')}
			>
				<Icon
					icon={Icons.NumberedList}
					width="24"
					height="24"
					fill={$isNumberedList ? activeColor : null}
				/>
				<span>Numbered List</span>
			</button>
			<button
				class="flex w-full items-center space-x-2 p-4 {$isBulletedList
					? 'bg-stone-100 text-blue-500 dark:bg-stone-800'
					: ''} hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={() => dispatch('bulletedlist')}
			>
				<Icon
					icon={Icons.BulletedList}
					width="24"
					height="24"
					fill={$isBulletedList ? activeColor : null}
				/>
				<span>Bulleted List</span>
			</button>
		</div>
	</svelte:fragment>
</Popup>
