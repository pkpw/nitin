<script>
	import { setContext } from 'svelte';
	import { Profile } from '$lib/profile.js';
	import { Theme } from '$lib/theme.js';

	export let data;

	let profile = Profile.get();
	$: Profile.set(data.profile);
	$: Theme.set(data.profile.theme);

	Profile.set_context();
</script>

<slot />
