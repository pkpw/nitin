<script>
	import { goto, invalidate } from '$app/navigation';
	import { get, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { Profile } from '$lib/profile';

	import { Icons } from '$lib/icons';
	import Icon from '../Icon.svelte';

	import Avatar from '../Avatar.svelte';

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
				? 'bg-stone-800 dark:bg-stone-700'
				: 'bg-stone-700 dark:bg-stone-800'} p-0.5 hover:cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-700"
		>
			<Avatar />
			<div class="px-0.5">
				<Icon
					icon={enabled ? Icons.ArrowDropup : Icons.ArrowDropdown}
					alt="Dropdown"
					width="32"
					height="32"
				/>
			</div>
		</div>
	</button>
	{#if enabled}
		<div
			in:fade={{ delay: 0, duration: 100 }}
			class="absolute right-0 m-2 mt-2 min-w-32 rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<a
				class="mx-auto flex w-full items-center justify-around rounded-t-md border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
				href="/settings"
			>
				<Icon icon={Icons.Settings} alt="Settings" width="24" height="24" />
				Settings
			</a>
			<button
				class="flex w-full items-center justify-around rounded-b-md p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
				on:click={Profile.logout(supabase)}
			>
				<Icon icon={Icons.Logout} alt="Logout" width="24" height="24" />
				Logout
			</button>
		</div>
	{/if}
</div>
