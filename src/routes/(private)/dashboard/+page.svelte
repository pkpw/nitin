<script>
	import { getUserProfile } from '$lib/profile.js';
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	const profile = getUserProfile();

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/auth');
	};
</script>

<svelte:head>
	<title>Nitin | Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>
<h2>Welcome back {$profile.firstName} {$profile.lastName}</h2>
<button on:click={logout}>Logout</button>
