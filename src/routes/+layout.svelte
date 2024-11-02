<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { setModals } from '$lib/stores/modals';
	import { setTheme, useTheme } from '$lib/stores/theme';
	import Modals from '$lib/components/Modals.svelte';

	export let data;
	$: ({ session, supabase } = data);

	setTheme();
	setModals();

	const theme = useTheme();
	$: theme.switch($theme);

	onMount(() => {
		// Invalid user session if it expires
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// Add event event listener for device color scheme preferences
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			theme.switch($theme);
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Modals />

<slot />
