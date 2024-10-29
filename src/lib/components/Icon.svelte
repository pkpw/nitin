<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Theme } from '$lib/theme';

	export let icon,
		alt = '',
		width = 32,
		height = 32;

	const theme = Theme.get();
	$: dark_mode = Theme.isDarkMode($theme)

	onMount(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			dark_mode = Theme.isDarkMode($theme);
		});
	});

	export let hover = writable(false);
</script>

<div role="img" on:mouseenter={() => hover.set(true)} on:mouseleave={() => hover.set(false)}>
	<picture class="pointer-events-none object-cover">
		{#if dark_mode}
			<img src={$hover && icon.hover ? icon.hover.dark : icon.dark} {alt} {width} {height} />
		{:else}
			<img src={$hover && icon.hover ? icon.hover.light : icon.light} {alt} {width} {height} />
		{/if}
	</picture>
</div>
