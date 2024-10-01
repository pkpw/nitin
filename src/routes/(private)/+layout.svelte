<script>
	import { setUserProfile, getUserProfile } from '$lib/profile';

	export let data;
	$: ({ profile } = data);
	$: setUserProfile(profile);
</script>

<slot />
