<script>
	import { get_profile, set_profile } from '$lib/profile.js';
	import { setContext } from 'svelte';
	import { get, writable } from 'svelte/store';

	export let data;
	$: set_profile(data.profile);
</script>

<slot />
