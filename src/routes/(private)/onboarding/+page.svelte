<script>
	import { getUserProfile } from '$lib/profile.js';
	import { superForm } from 'sveltekit-superforms';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Error from '$lib/assets/icons/error_20dp_EF4444_FILL1_wght400_GRAD0_opsz20.svg';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);

	const profile = getUserProfile();
	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form);

	$: logout = async (event) => {
		event.preventDefault();
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/auth');
	};
</script>

<svelte:head>
	<title>Nitin | Let's get started</title>
</svelte:head>

<div class="mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden">
	<h1 class="pb-16 text-center text-4xl font-bold text-white">Let's Get Started.</h1>
	<form class="mx-auto max-w-sm rounded-md border border-stone-700 p-8" method="POST" use:enhance>
		<div class="mb-4">
			<input
				class="form-input"
				name="firstName"
				type="text"
				placeholder="First name"
				aria-invalid={$errors.firstName ? 'true' : undefined}
				bind:value={$form.firstName}
				{...$constraints.firstName}
			/>
			{#if $errors.firstName}
				<div in:fade class="mt-1 flex items-center justify-start">
					<img src={Error} alt="Error" />
					<span class="ml-2 text-sm font-semibold text-red-500">First name is not valid.</span>
				</div>
			{/if}
		</div>
		<div class="mb-4">
			<input
				class="form-input"
				name="lastName"
				type="text"
				placeholder="Last name"
				aria-invalid={$errors.lastName ? 'true' : undefined}
				bind:value={$form.lastName}
				{...$constraints.lastName}
			/>
			{#if $errors.lastName}
				<div in:fade class="mt-1 flex items-center justify-start">
					<img src={Error} alt="Error" />
					<span class="ml-2 text-sm font-semibold text-red-500">Last name is not valid.</span>
				</div>
			{/if}
		</div>
		<button class="btn">
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
				>{$profile.email}</span
			>, you can
			<button class="text-blue-500 hover:text-blue-600 hover:underline" on:click={logout}
				>login with another email.</button
			>
		</p>
	</form>
</div>
