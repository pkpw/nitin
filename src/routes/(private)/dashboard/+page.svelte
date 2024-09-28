<script>
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

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
<button on:click={logout}>Logout</button>
