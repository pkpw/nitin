<script>
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<svelte:head>
	<title>Nitin | Study smarter today</title>
</svelte:head>

<NavBar>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<a class="btn-primary w-20 rounded-full" href="/auth">Login</a>
	</svelte:fragment>
	<svelte:fragment slot="menu"></svelte:fragment>
</NavBar>

<div class="container mx-auto my-4 text-center">
	<h1 class="my-12 text-8xl font-bold">Nitin</h1>
	<p class="text-xl">Under construction.</p>
</div>
<style>
    /* Style the dropdown to make numbers black */
    .dropdown {
        color: black; /* Sets the font color inside the dropdown to black */
        background-color: white; /* Optional: Set background to white */
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }
</style>