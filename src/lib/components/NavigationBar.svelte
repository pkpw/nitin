<script>
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { fade, slide } from 'svelte/transition';
	import Dropdown from './Dropdown.svelte';
	import Menu from '$lib/assets/icons/menu_32dp_FAFAF9_FILL0_wght400_GRAD0_opsz40.svg';
	import Close from '$lib/assets/icons/close_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import Settings from '$lib/assets/icons/settings_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Logout from '$lib/assets/icons/logout_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Dashboard from '$lib/assets/icons/dashboard_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import NoteStack from '$lib/assets/icons/note_stack_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import School from '$lib/assets/icons/school_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';

	export let supabase;
	export let title;
	let menuButton;
	let navMenu;
	let enabled = writable(false);

	$: toggle = () => {
		enabled.set(!$enabled);
	};

	$: hide = (event) => {
		if (
			navMenu &&
			menuButton &&
			!navMenu.contains(event.target) &&
			!menuButton.contains(event.target)
		) {
			enabled.set(false);
		}
	};

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/auth');
	};
</script>

<svelte:window on:click={hide} />

<nav class="mb-2 w-full border-b border-b-stone-700 px-4 py-3">
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex flex-row items-center">
			<button
				class="flex h-10 w-10 items-center justify-center rounded-md border border-stone-700 hover:cursor-pointer hover:border-stone-500"
				bind:this={menuButton}
				on:click={toggle}
			>
				<img class="h-8 w-8 object-cover" src={Menu} alt="Menu" width="32" height="32" />
			</button>
			<h1 class="pl-8 text-xl font-bold text-white">{$title}</h1>
		</div>
		<Dropdown>
			<a
				class="mx-auto flex w-full items-center justify-around rounded-t-md border-b border-b-stone-500 p-4 text-white hover:bg-stone-800"
				href="/settings"
			>
				<img class="h-6 w-6 object-cover" src={Settings} alt="Settings" width="24" height="24" />
				Settings
			</a>
			<button
				class="flex w-full items-center justify-around rounded-b-md p-4 text-white hover:bg-stone-800"
				on:click={logout}
			>
				<img class="h-6 w-6 object-cover" src={Logout} alt="Logout" width="24" height="24" />
				Logout
			</button>
		</Dropdown>
	</div>
	{#if $enabled}
		<div
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			bind:this={navMenu}
			class="absolute left-0 top-0 h-screen w-full border-r border-r-stone-800 bg-stone-900 md:w-1/4"
		>
			<div in:fade out:fade class="">
				<button
					class="ml-4 mt-3 flex h-10 w-10 items-center justify-center rounded-md border border-stone-700 hover:cursor-pointer hover:border-stone-500"
					on:click={toggle}
				>
					<img class="h-8 w-8 object-cover" src={Close} alt="Menu" width="32" height="32" />
				</button>
				<div class="mt-20 flex flex-col items-center justify-center text-center md:text-left">
					<div class="flex w-full flex-row items-center px-12 py-8 text-white hover:bg-stone-800">
						<img class="mr-4" src={Dashboard} alt="Dashboard" width="32" height="32" />
						<a href="/dashboard">Dashboard</a>
					</div>
					<div class="flex w-full flex-row items-center px-12 py-8 text-white hover:bg-stone-800">
						<img class="mr-4" src={NoteStack} alt="Flashcards" width="32" height="32" />
						<a href="/flashcards">Flashcards</a>
					</div>
					<div class="flex w-full flex-row items-center px-12 py-8 text-white hover:bg-stone-800">
						<img class="mr-4" src={School} alt="Classrooms" width="32" height="32" />
						<a href="/dashboard">Classrooms</a>
					</div>
					<div class="flex w-full flex-row items-center px-12 py-8 text-white hover:bg-stone-800">
						<a href="/dashboard">Canvas</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</nav>
