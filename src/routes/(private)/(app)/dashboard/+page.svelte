<script>
	import { getUserProfile } from '$lib/profile.js';
	import { goto } from '$app/navigation';
	import NavigationBar from '$lib/components/nav/NavigationBar.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { writable } from 'svelte/store';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Dashboard');

	const profile = getUserProfile();
</script>

<svelte:head>
	<title>Nitin | Dashboard</title>
</svelte:head>

<h1 class="text-4xl font-bold">Dashboard</h1>
<h2 class="text-2xl">Welcome back, {$profile.firstName}.</h2>
<div class="h-screen"></div>
