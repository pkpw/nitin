<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { Theme } from '$lib/theme';
	import { Modals } from '$lib/modals';
	import ModalLayer from '$lib/components/ModalLayer.svelte';

	export let data;
	$: ({ session, supabase } = data);

	Modals.initialize();

	Theme.initialize();
	const theme = Theme.get();
	$: theme?.switch();

	onMount(() => {
		// Invalid user session if it expires
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// Add event event listener for device color scheme preferences
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			theme.switch();
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<script isinline>
		const theme = sessionStorage.theme;
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

<ModalLayer />

<slot />
