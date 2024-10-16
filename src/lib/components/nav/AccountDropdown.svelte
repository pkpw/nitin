<script>
	import { goto, invalidate } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import Avatar from '../Avatar.svelte';

	import DropdownArrowDown from '$lib/assets/icons/arrow_drop_down_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import DropdownArrowUp from '$lib/assets/icons/arrow_drop_up_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import Settings from '$lib/assets/icons/settings_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Logout from '$lib/assets/icons/logout_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import { logout } from '$lib/profile';

	export let supabase;

	let dropdownButton;
	let enabled = false;

	$: toggle = () => {
		enabled = !enabled;
	};

	$: hide = (event) => {
		if (enabled && !dropdownButton.contains(event.target)) {
			enabled = false;
		}
	};
</script>

<svelte:window on:click={hide} />

<div class="relative inline-block">
	<button bind:this={dropdownButton} on:click={toggle}>
		<div
			class="flex flex-row items-center rounded-full {enabled
				? 'bg-stone-700'
				: 'bg-stone-800'} p-0.5 hover:cursor-pointer hover:bg-stone-700"
		>
			<Avatar />
			<div class="px-0.5">
				<img
					class="h-8 w-8 object-cover"
					src={enabled ? DropdownArrowUp : DropdownArrowDown}
					alt="Dropdown arrow"
					width="32"
					height="32"
				/>
			</div>
		</div>
	</button>
	{#if enabled}
		<div
			in:fade={{ delay: 0, duration: 100 }}
			class="absolute right-0 m-2 mt-2 min-w-32 rounded-md border border-stone-500 bg-stone-950"
		>
			<a
				class="mx-auto flex w-full items-center justify-around rounded-t-md border-b border-b-stone-500 p-4 hover:bg-stone-800"
				href="/settings"
			>
				<img class="h-6 w-6 object-cover" src={Settings} alt="Settings" width="24" height="24" />
				Settings
			</a>
			<button
				class="flex w-full items-center justify-around rounded-b-md p-4 hover:bg-stone-800"
				on:click={logout(supabase)}
			>
				<img class="h-6 w-6 object-cover" src={Logout} alt="Logout" width="24" height="24" />
				Logout
			</button>
		</div>
	{/if}
</div>
