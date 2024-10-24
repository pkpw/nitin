<script>
	import { Profile } from '$lib/profile.js';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Dashboard');

	const profile = Profile.get();
</script>

<svelte:head>
	<title>Nitin | Dashboard</title>
</svelte:head>

<h1 class="text-4xl font-bold">Dashboard</h1>
<h2 class="flex flex-row items-center text-2xl">
	Welcome back, {#if $profile}{$profile.first_name}{:else}<div
			class="mx-2 h-6 w-24 animate-pulse rounded-2xl bg-stone-400 dark:bg-stone-700"
		></div>{/if}.
</h2>
