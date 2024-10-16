<script>
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let dialog;
	export let shown = writable(false);

	$: hide = (event) => {
		if (shown && !dialog.contains(event.target)) {
			shown.set(false);
		}
	};
</script>

{#if $shown}
	<button
		in:fade={{ delay: 0, duration: 150 }}
		out:fade={{ delay: 0, duration: 150 }}
		class="fixed left-0 top-0 flex h-screen w-screen cursor-default flex-col items-center justify-center overflow-clip bg-stone-950 bg-opacity-80 backdrop-blur-sm"
		on:click={hide}
	>
		<div bind:this={dialog} class="m-1 rounded-md border border-stone-700 bg-stone-950 p-8">
			<slot />
		</div>
	</button>
{/if}
