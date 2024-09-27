<script>
	import { goto } from '$app/navigation';

	export let data;
	$: ({ session, supabase } = data);

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/auth');
		}
	}
</script>

<h1>Dashboard</h1>
<button on:click={signOut}>Sign out</button>
