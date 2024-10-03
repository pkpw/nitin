<script>
	import { setUserProfile, getUserProfile } from '$lib/profile';

	export let data;
	$: ({ profile, supabase, navigationBar } = data);
	$: setUserProfile(profile);
</script>

<slot />
