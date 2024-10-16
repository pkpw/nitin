<script>
	import { superForm } from 'sveltekit-superforms';
	import { get_profile } from '$lib/profile.js';
	import NavigationBar from '$lib/components/nav/NavigationBar.svelte';
	import BackArrow from '$lib/assets/icons/arrow_back_32dp_FAFAF9_FILL0_wght400_GRAD0_opsz40.svg';
	import Profile from '$lib/assets/icons/account_circle_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Appearance from '$lib/assets/icons/palette_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Notifications from '$lib/assets/icons/circle_notifications_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import { getContext } from 'svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Settings');

	const profile = get_profile();
	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form);
</script>

<svelte:head>
	<title>Nitin | Settings</title>
</svelte:head>

<div class="mb-8 flex flex-row items-center">
	<a class="btn-outline mr-8 h-10 w-10" href="/dashboard"
		><img class="icon absolute h-8 w-8" src={BackArrow} alt="Back" width="32" height="32" /></a
	>
	Back
</div>
<form method="POST" class="mx-auto max-w-sm px-2" use:enhance>
	<div class="flex flex-row items-center justify-start space-x-4 pb-4">
		<img class="icon h-6 w-6" src={Profile} alt="Profile" width="24" height="24" />
		<h1 class="text-lg font-semibold">Profile</h1>
	</div>
	<div class="mb-4">
		<label for="first-name" class="form-label">First name</label>
		<input
			class="form-input"
			id="first-name"
			name="first-name"
			type="text"
			placeholder="First name"
			bind:value={$form.first_name}
		/>
	</div>
	<div class="mb-4">
		<label for="last-name" class="form-label">Last name</label>
		<input
			class="form-input"
			id="last-name"
			name="last-name"
			type="text"
			placeholder="Last name"
			bind:value={$form.last_name}
		/>
	</div>
	<div class="flex flex-row items-center justify-start space-x-4 py-4">
		<img class="icon h-6 w-6" src={Appearance} alt="Appearance" width="24" height="24" />
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
	<button class="btn-primary float-right">Save</button>
</form>
