<script>
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import Avatar from './Avatar.svelte';
	import DropdownArrowDown from '$lib/assets/icons/arrow_drop_down_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import DropdownArrowUp from '$lib/assets/icons/arrow_drop_up_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';

	let dropdownButton;
	let enabled = writable(false);
	$: toggle = () => {
		enabled.set(!$enabled);
	};

	$: hide = (event) => {
		if (enabled && !dropdownButton.contains(event.target)) {
			enabled.set(false);
		}
	};
</script>

<svelte:window on:click={hide} />

<div class="relative inline-block">
	<button bind:this={dropdownButton} on:click={toggle}>
		<div
			class="flex flex-row items-center rounded-full {$enabled
				? 'bg-stone-700'
				: 'bg-stone-800'} p-0.5 hover:cursor-pointer hover:bg-stone-700"
		>
			<Avatar color="bg-blue-500" />
			<div class="px-0.5">
				<img
					class="h-8 w-8 object-cover"
					src={$enabled ? DropdownArrowUp : DropdownArrowDown}
					alt="Dropdown arrow"
					width="32"
					height="32"
				/>
			</div>
		</div>
	</button>
	{#if $enabled}
		<div
			in:fade={{ delay: 0, duration: 100 }}
			class="absolute right-0 m-2 mt-2 min-w-32 rounded-md border border-stone-500 bg-stone-950"
		>
			<slot />
		</div>
	{/if}
</div>
