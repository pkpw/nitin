<script>
	import { superForm } from 'sveltekit-superforms';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { Profile } from '$lib/profile.js';
	import { Theme } from '$lib/theme.js';

	import { Icons } from '$lib/icons.js';
	import Icon from '$lib/components/Icon.svelte';

	import Spinner from '$lib/components/Spinner.svelte';
	import Modal from '$lib/components/Modal.svelte';

	import Background from '$lib/assets/Background.avif';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: Theme.set('system');

	const profile = Profile.get();

	let is_tainted_modal_visible = false;
	let on_modal_confirm = null;
	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form, {
		resetForm: false,
		clearOnSubmit: 'none',
		taintedMessage: () => {
			return new Promise((resolve) => {
				on_modal_confirm = resolve;
				is_tainted_modal_visible = true;
			});
		}
	});

	function handle_modal_submit(confirmed) {
		if (on_modal_confirm) {
			on_modal_confirm(confirmed);
			on_modal_confirm = null;
		}

		// Hide modal
		is_tainted_modal_visible = false;
	}
</script>

<svelte:head>
	<title>Nitin | Let's get started</title>
</svelte:head>

<div
	class="mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
	style="background-image: url('{Background}');"
>
	<h1 class="pb-16 text-center text-4xl font-bold text-white">Let's Get Started.</h1>
	<form
		class="mx-auto max-w-80 rounded-xl border border-stone-400 bg-stone-50 bg-opacity-90 p-8 backdrop-blur dark:border-stone-700 dark:bg-stone-950"
		method="POST"
		use:enhance
	>
		<div class="mb-4">
			<input
				class="form-input"
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
			<input
				class="form-input"
				name="last_name"
				type="text"
				placeholder="Last name"
				aria-invalid={$errors.last_name ? 'true' : undefined}
				bind:value={$form.last_name}
				{...$constraints.last_name}
			/>
			{#if $errors.last_name}
				<div in:fade class="mt-1 flex items-center justify-start">
					<Icon icon={Icons.Error} alt="Error" width="20" height="20" />
					<span class="ml-2 text-sm font-semibold text-red-500">Last name is not valid.</span>
				</div>
			{/if}
		</div>
		<button class="btn-primary w-full rounded-full">
			{#if $delayed}
				<div in:fade>
					<Spinner />
				</div>
			{:else}
				Continue
			{/if}
		</button>
		<p class="mt-8 text-center text-sm text-stone-400">
			If you don't intend to set up a new account at <span class="font-medium"
				>{$profile?.email}</span
			>, you can
			<button
				class="text-blue-500 hover:text-blue-600 hover:underline"
				on:click={Profile.logout(supabase)}>login with another email.</button
			>
		</p>
	</form>
</div>

<Modal visible={is_tainted_modal_visible}>
	<h1 class="justify-items-start text-xl font-semibold">Unsaved Changes</h1>
	<p class="text-lg">Any changes you have made are unsaved.</p>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		<button on:click={() => handle_modal_submit(false)} class="btn-secondary">Cancel</button>
		<button on:click={() => handle_modal_submit(true)} class="btn-primary">Continue</button>
	</div>
</Modal>
