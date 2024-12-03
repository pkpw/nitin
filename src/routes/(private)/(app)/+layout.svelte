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

<div
	class="min-h-[calc(100vh-68px)] cursor-default py-8"
	on:click={() => navBar.hide()}
	on:keydown={() => {}}
	role="button"
	tabindex="-1"
>
	<div class="container relative mx-auto px-4">
		<slot />
	</div>
</div>
