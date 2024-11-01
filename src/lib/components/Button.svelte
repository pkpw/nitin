<script>
	import { Icons } from '$lib/components/icons';
	import Icon from './Icon.svelte';

	export let type;

	let hover = writable(false);
</script>

{#if type == 'outline'}{:else if type == 'dropdown'}{:else if type == 'round'}{:else}{/if}
<button on:mouseenter={() => hover.set(true)} on:mouseleave={() => hover.set(false)}>
	<div class="absolute left-[4px] top-[4px] h-8 w-8">
		<Icon icon={Icons.MoreVert} alt="More" width="32" height="32" {hover} />
	</div>
</button>
