<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase, profile } = data);

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
	<input type="hidden" name="user-id" value={profile.id} />
	<label>
		First Name
		<input name="first-name" type="text" maxlength="32" />
	</label>
	<label>
		Last Name
		<input name="last-name" type="text" maxlength="32" />
	</label>
	<button>Continue</button>
</form>

<p>
	If you don't intend to set up a new account at <b>{profile.email}</b>, you can
	<button class="underline" on:click={logout}>login with another email.</button>
</p>
