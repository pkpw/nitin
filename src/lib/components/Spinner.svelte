<script>
	import { Icons } from '$lib/components/icons/icons';
	import Icon from './Icon.svelte';

	export let height = '24',
		width = '24',
		fill = null;
</script>

<div class="animate-spin">
	<Icon icon={Icons.Spinner} {width} {height} {fill} />
</div>
