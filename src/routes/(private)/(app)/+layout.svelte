<script>
	import { useNavBar } from '$lib/stores/navbar.js';

	import NavBar from '$lib/components/NavBar.svelte';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';

	const navBar = useNavBar();
</script>

<NavBar>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown />
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<NavMenu />
	</svelte:fragment>
</NavBar>

<div class="mb-8 mt-8">
	<div class="container relative mx-auto px-4">
		<slot />
	</div>
</div>
