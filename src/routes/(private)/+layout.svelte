<script>
	import { useTheme } from '$lib/stores/theme.js';
	import { setProfile, useProfile } from '$lib/stores/profile.js';

	export let data;

	setProfile();

	const theme = useTheme();
	const profile = useProfile();

	$: profile?.set(data.profile);
	$: theme?.set(data.profile.theme);
</script>

<slot />
