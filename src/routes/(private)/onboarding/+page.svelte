<script>
	import { superForm } from 'sveltekit-superforms';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { Profile } from '$lib/profile.js';
	import { Theme } from '$lib/theme.js';

	import { Icons } from '$lib/icons.js';
	import Icon from '$lib/components/Icon.svelte';

	import { Modals } from '$lib/modals.js';
	import TaintedModal from '$lib/components/modals/TaintedModal.svelte';

	import Spinner from '$lib/components/Spinner.svelte';

	import Background from '$lib/assets/Background.avif';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);

	const profile = Profile.get();
	const modals = Modals.get();
	const theme = Theme.get();

	const { form, errors, constraints, message, enhance, delayed, isTainted } = superForm(data.form, {
		resetForm: false,
		clearOnSubmit: 'none',
		taintedMessage: () => {
			return new Promise((resolve) => {
				modals.trigger({
					type: Modals.CONTINUE,
					modal: TaintedModal,
					response: resolve
				});
			});
		}
	});

	onMount(() => {
		theme.set(Theme.AUTOMATIC)
	})
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
			<a class="text-blue-500 hover:text-blue-600 hover:underline" href="/logout"
				>login with another email.</a
			>
		</p>
	</form>
</div>
