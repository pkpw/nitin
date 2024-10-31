<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { Theme } from '$lib/theme';

	export let data;
	$: ({ session, supabase } = data);

	Theme.set('system');
	Theme.set_context();

	onMount(() => {
		// Invalid user session if it expires
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// Add event event listener for device color scheme preferences
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			Theme.update();
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<script isinline>
		const theme = sessionStorage.theme;
		// update_theme has to be duplicated here because it is not yet bundled at this point
		if (
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<slot />
