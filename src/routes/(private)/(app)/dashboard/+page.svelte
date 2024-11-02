<script>
	import { useProfile } from '$lib/stores/profile.js';

	export let data;
	$: ({ supabase, navBar } = data);
	$: navBar.title.set('Dashboard');

	const profile = useProfile();
</script>

<svelte:head>
	<title>Nitin | Dashboard</title>
</svelte:head>

<h1 class="text-4xl font-bold">Dashboard</h1>
<h2 class="flex flex-row items-center text-2xl">
	Welcome back, {$profile.first_name}.
</h2>
