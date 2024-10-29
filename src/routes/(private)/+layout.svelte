<script>
	import { onMount, setContext } from 'svelte';
	import { Profile } from '$lib/profile.js';
	import { Theme } from '$lib/theme.js';

	export let data;

	Profile.initialize();

	const profile = Profile.get();
	const theme = Theme.get();

	$: profile?.set(data.profile);
	$: theme?.set(data.profile.theme);
</script>

<slot />
