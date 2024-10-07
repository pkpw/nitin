<script>
	import NavigationBar from '$lib/components/nav/NavigationBar.svelte';
	import AccountDropdown from '$lib/components/nav/AccountDropdown.svelte';
	import NavigationMenu from '$lib/components/nav/NavigationMenu.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
</script>

<NavigationBar title={navigationBar.pageTitle}>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown {supabase} />
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<NavigationMenu />
	</svelte:fragment>
</NavigationBar>

<div class="container mx-auto px-8 py-8 md:px-12">
	<slot />
</div>
