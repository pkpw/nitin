<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Theme } from '$lib/theme';

	export let icon,
		alt = '',
		width = 32,
		height = 32;

	let theme = Theme.get();
	$: dark_mode = Theme.is_dark_mode($theme);

	onMount(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			dark_mode = Theme.is_dark_mode($theme);
		});
	});
</script>

<picture class="pointer-events-none object-cover">
	{#if dark_mode}
		<img src={icon.dark} {alt} {width} {height} />
	{:else}
		<img src={icon.light} {alt} {width} {height} />
	{/if}
</picture>
