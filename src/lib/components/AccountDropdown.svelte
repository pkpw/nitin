<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { useNavBar } from '$lib/stores/navbar';
	import { useProfile } from '$lib/stores/profile';

	import { Icons } from './icons/icons';
	import Icon from './Icon.svelte';

	// import ArrowDropup from '$lib/assets/icons/arrow_drop_up_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	// import ArrowDropdown from '$lib/assets/icons/arrow_drop_down_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';

	import Avatar from './Avatar.svelte';
	import Popup from './Popup.svelte';

	const profile = useProfile();
	const navBar = useNavBar();

	let visible = writable(false);
</script>

<Popup {visible}>
	<svelte:fragment slot="button">
		<div
			class="flex flex-row items-center rounded-full {$visible
				? 'bg-stone-800 dark:bg-stone-700'
				: 'bg-stone-700 dark:bg-stone-800'} p-0.5 hover:cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-700"
		>
			<Avatar color={$profile?.avatar_color} />
			<div class="px-0.5">
				<Icon
					icon={$visible ? Icons.ArrowDropup : Icons.ArrowDropdown}
					width="32"
					height="32"
					fill={'#fafaf9'}
				/>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="popup">
		<div
			class="absolute right-0 z-40 m-2 mt-2 min-w-32 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
		>
			<a
				class="flex w-full items-center space-x-2 border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
				href="/settings"
				on:click={() => navBar.hide()}
			>
				<Icon icon={Icons.Settings} width="24" height="24" />
				<span>Settings</span>
			</a>
			<a
				class="icon-button-danger flex w-full items-center space-x-2 p-4 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-800"
				href="/auth/logout"
				on:click={() => navBar.hide()}
			>
				<Icon icon={Icons.Logout} width="24" height="24" />
				<span>Logout</span>
			</a>
		</div>
	</svelte:fragment>
</Popup>
