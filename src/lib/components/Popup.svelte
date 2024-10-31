<script>
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let button;
	export let visible = false;

	$: toggle = () => {
		visible = !visible;
	};

	$: hide = (event) => {
		if (visible && !button.contains(event.target)) {
			visible = false;
		}
	};
</script>

<svelte:window on:click={hide} />

<div class="relative inline-block">
	<div role="button" bind:this={button} on:click={toggle} on:keydown={() => {}} tabindex="-1">
		<slot name="button" />
	</div>
	{#if visible}
		<div in:fade={{ delay: 0, duration: 100 }}>
			<slot name="popup" />
		</div>
	{/if}
</div>
