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

	let hovering = false;
	$: console.log(hovering ? 'hover enter' : 'hover leave')

	onMount(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			dark_mode = Theme.is_dark_mode($theme);
		});
	});
</script>

<div role="img" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
	<picture class="pointer-events-none object-cover">
		{#if dark_mode}
			<img src={hovering && icon.hover ? icon.hover.dark : icon.dark} {alt} {width} {height} />
		{:else}
			<img src={hovering && icon.hover ? icon.hover.light : icon.light} {alt} {width} {height} />
		{/if}
	</picture>
</div>
