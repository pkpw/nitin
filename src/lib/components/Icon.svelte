<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { useTheme } from '$lib/stores/theme';

	export let icon,
		alt = '',
		width = 32,
		height = 32;

	const theme = useTheme();
	let darkMode,
		loaded = false;

	onMount(() => {
		theme.isDarkMode.subscribe((value) => (darkMode = value));
		loaded = true;
	});

	export let hover = writable(false);
</script>

<div role="img" on:mouseenter={() => hover.set(true)} on:mouseleave={() => hover.set(false)}>
	<picture class="pointer-events-none object-cover">
		{#if loaded}
			{#if darkMode}
				<img src={$hover && icon.hover ? icon.hover.dark : icon.dark} {alt} {width} {height} />
			{:else}
				<img src={$hover && icon.hover ? icon.hover.light : icon.light} {alt} {width} {height} />
			{/if}
		{/if}
	</picture>
</div>
