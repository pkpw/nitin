<script>
	import { setUserProfile, getUserProfile } from '$lib/profile';

	export let data;
	$: ({ profile, supabase } = data);
	$: setUserProfile(profile);
</script>

<slot />
