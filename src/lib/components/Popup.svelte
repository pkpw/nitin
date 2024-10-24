<script>
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let button;
	export let shown = false;

	$: toggle = () => {
		shown = !shown;
	};

	$: hide = (event) => {
		if (shown && !button.contains(event.target)) {
			shown = false;
		}
	};
</script>

<svelte:window on:click={hide} />

<div class="relative inline-block">
	<div role="button" bind:this={button} on:click={toggle} on:keydown={() => {}} tabindex="-1">
		<slot name="button" />
	</div>
	{#if shown}
		<div in:fade={{ delay: 0, duration: 100 }}>
			<slot name="popup" />
		</div>
	{/if}
</div>
