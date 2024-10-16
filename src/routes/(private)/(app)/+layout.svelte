<script>
	import NavigationBar from '$lib/components/nav/NavigationBar.svelte';
	import AccountDropdown from '$lib/components/nav/AccountDropdown.svelte';
	import NavigationMenu from '$lib/components/nav/NavigationMenu.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
</script>

<NavigationBar title={navigationBar.pageTitle} shown={navigationBar.shown}>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown {supabase} />
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<NavigationMenu on:linkClick={() => (navigationBar.shown = false)} />
	</svelte:fragment>
</NavigationBar>

<div class="mb-64 mt-8 px-4">
	<div class="container mx-auto">
		<slot />
	</div>
</div>
