<script>
	import { getUserProfile, setUserProfile } from '$lib/profile.js';
	import { superForm } from 'sveltekit-superforms';
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	const profile = getUserProfile();
	const { form, errors, constraints, message, enhance } = superForm(data.form);

	$: logout = async () => {
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

<h1>Sign up</h1>

<form method="POST" use:enhance>
	<label>
		First Name
		<input
			name="firstName"
			type="text"
			aria-invalid={$errors.firstName ? 'true' : undefined}
			bind:value={$form.firstName}
			{...$constraints.firstName}
		/>
	</label>
	{#if $errors.firstName}<span class="invalid">Please enter your first name</span>{/if}
	<label>
		Last Name
		<input
			name="lastName"
			type="text"
			aria-invalid={$errors.lastName ? 'true' : undefined}
			bind:value={$form.lastName}
			{...$constraints.lastName}
		/>
	</label>
	{#if $errors.lastName}<span class="invalid">Please enter your last name</span>{/if}
	<button>Continue</button>
</form>

<p>
	If you don't intend to set up a new account at <b>{$profile.email}</b>, you can
	<button class="underline" on:click={logout}>login with another email.</button>
</p>

<style>
	.invalid {
		color: red;
	}
</style>
