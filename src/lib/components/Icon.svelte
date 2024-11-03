<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { useTheme } from '$lib/stores/theme';

	export let icon,
		width = 32,
		height = 32,
		fill = null;

	const theme = useTheme();
	let darkMode,
		loaded = false;

	onMount(() => {
		theme.isDarkMode.subscribe((value) => (darkMode = value));
		loaded = true;
	});

	// export let hover = writable(false);
</script>

<div class="pointer-events-none object-cover">
	{#if fill}
		<svelte:component this={icon} {width} {height} {fill} />
	{:else if loaded}
		{#if darkMode}
			<svelte:component this={icon} {width} {height} fill={'#fafaf9'} />
		{:else}
			<svelte:component this={icon} {width} {height} fill={'#0c0a09'} />
		{/if}
	{:else}
		<svelte:component this={icon} {width} {height} fill={'#78716c'} />
	{/if}
</div>
