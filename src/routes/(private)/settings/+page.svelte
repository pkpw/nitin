<script>
	import { getUserProfile } from '$lib/profile.js';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Settings');

	const profile = getUserProfile();
</script>

<svelte:head>
	<title>Nitin | Settings</title>
</svelte:head>

<NavigationBar {supabase} title={navigationBar.pageTitle} />
<div class="container mx-auto px-8 py-8 md:px-12">
	<a
		class="flex h-10 w-10 items-center justify-center rounded-md border border-stone-700 px-8 text-white hover:cursor-pointer hover:border-stone-500"
		href="/dashboard">Back</a
	>
</div>
