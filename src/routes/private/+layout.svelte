<script>
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	};
</script>

<header class="bg-sky-500 p-4">
	<nav class="container mx-auto flex justify-between">
		<div>
			<button on:click={logout} class="text-white text-lg font-semibold hover:underline"
				>Dashboard</button
			>
		</div>
		<button on:click={logout} class="text-white text-lg font-semibold hover:underline"
			>Logout</button
		>
	</nav>
</header>
<main>
	<slot />
</main>
