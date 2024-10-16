<script>
	import { get_profile } from '$lib/profile.js';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Dashboard');

	const profile = get_profile();
</script>

<svelte:head>
	<title>Nitin | Dashboard</title>
</svelte:head>

<h1 class="text-4xl font-bold">Dashboard</h1>
<h2 class="text-2xl">
	Welcome back, {#if $profile}{$profile.first_name}{/if}.
</h2>
<div class="h-screen"></div>
