<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { goto, afterNavigate } from '$app/navigation';
	import { useTheme } from '$lib/stores/theme.js';
	import { useProfile } from '$lib/stores/profile.js';

	import { Icons } from '$lib/components/icons.js';
	import Icon from '$lib/components/Icon.svelte';

	import { useModals } from '$lib/stores/modals.js';
	import TaintedModal from '$lib/components/TaintedModal.svelte';

	import NavigationBar from '$lib/components/NavBar.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;
	$: ({ supabase, navBar } = data);

	const profile = useProfile();
	const theme = useTheme();
	const modals = useModals();

	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form, {
		resetForm: false,
		taintedMessage: () => {
			return new Promise((resolve) => {
				modals.trigger({
					modal: TaintedModal,
					response: async (confirmed) => {
						if (confirmed) {
							$form.theme = $profile.theme;
						}

						resolve(confirmed);
					}
				});
			});
		}
	});

	// When theme dropdown updates:
	// 1. Update value in form
	// 2. Update value in store
	// Using the writable itself causes the form to become tainted even though it was unchanged
	$: theme?.set($form.theme);

	// Get previous page for back button
	let previous_page;
	afterNavigate(({ from }) => {
		previous_page = from?.url.pathname;
	});

	onMount(() => {
		navBar.title.set('Settings');
	});
</script>

<svelte:head>
	<title>Nitin | Settings</title>
</svelte:head>

<div class="mb-8 flex flex-row items-center">
	<a class="btn-outline mr-8 h-10 w-10 rounded-md" href={previous_page ?? '/dashboard'}>
		<div class="absolute left-[3px] top-[3px] h-8 w-8">
			<Icon icon={Icons.BackArrow} alt="Back" width="32" height="32" />
		</div>
	</a>
	Back
</div>
<form method="POST" class="mx-auto max-w-sm px-2" use:enhance>
	<div class="flex flex-row items-center justify-start space-x-4 pb-4">
		<Icon icon={Icons.Profile} alt="Profile" width="24" height="24" />
		<h1 class="text-lg font-semibold">Profile</h1>
	</div>
	<div class="mb-4">
		<label for="first-name" class="form-label">First name</label>
		<input
			class="form-input"
			id="first-name"
			name="first_name"
			type="text"
			placeholder="First name"
			aria-invalid={$errors.first_name ? 'true' : undefined}
			bind:value={$form.first_name}
			{...$constraints.first_name}
		/>
		{#if $errors.first_name}
			<div in:fade class="mt-1 flex items-center justify-start">
				<Icon icon={Icons.Error} alt="Error" width="20" height="20" />
				<span class="ml-2 text-sm font-semibold text-red-500">First name is not valid.</span>
			</div>
		{/if}
	</div>
	<div class="mb-4">
		<label for="last-name" class="form-label">Last name</label>
		<input
			class="form-input"
			id="last-name"
			name="last_name"
			type="text"
			placeholder="Last name"
			bind:value={$form.last_name}
		/>
		{#if $errors.last_name}
			<div in:fade class="mt-1 flex items-center justify-start">
				<Icon icon={Icons.Error} alt="Error" width="20" height="20" />
				<span class="ml-2 text-sm font-semibold text-red-500">Last name is not valid.</span>
			</div>
		{/if}
	</div>
	<div class="flex flex-row items-center justify-start space-x-4 py-4">
		<Icon icon={Icons.Palette} alt="Appearance" width="24" height="24" />
		<h1 class="text-lg font-semibold">Appearance</h1>
	</div>
	<div class="mb-4 flex items-center justify-between">
		<label for="theme" class="form-label">Theme</label>
		<select class="form-dropdown" id="theme" name="theme" bind:value={$form.theme}>
			<option value="system">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</div>
	<!-- <div class="flex flex-row items-center justify-start space-x-4 py-4">
		<img class="icon h-6 w-6" src={Notifications} alt="Appearance" width="24" height="24" />
		<h1 class="text-lg font-semibold">Notifications</h1>
	</div>
	<div class="mb-4 grid grid-cols-4">
		<div></div>
		<div class="pb-4 text-center font-semibold text-stone-400">None</div>
		<div class="pb-4 text-center font-semibold text-stone-400">In-App</div>
		<div class="pb-4 text-center font-semibold text-stone-400">Email</div>
		<div>Test</div>
		<div class="mx-auto">
			<input type="checkbox" class="checkbox" name="test-none" />
		</div>
		<div class="mx-auto">
			<input type="checkbox" class="checkbox" name="test-in-app" />
		</div>
		<div class="mx-auto">
			<input type="checkbox" class="checkbox" name="test-email" />
		</div>
	</div> -->
	<div class="float-right flex flex-col items-center justify-end">
		<button class="btn-primary rounded-full" type="submit"
			>{#if $delayed}
				<div in:fade>
					<Spinner />
				</div>
			{:else}
				Save
			{/if}</button
		>
		{#if $message}
			<span>{$message}</span>
		{/if}
	</div>
</form>
