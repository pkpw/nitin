<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';

	export let data;
	$: ({ supabase, navBar } = data);
</script>

<NavBar {...navBar}>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown />
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<NavMenu on:linkClick={() => (navBar.visible = false)} />
	</svelte:fragment>
</NavBar>

<div class="mb-8 mt-8 px-4">
	<div class="container relative mx-auto">
		<slot />
	</div>
</div>
