import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = 'user_profile_theme';
const theme = writable('system');

export const Theme = {
	get: () => {
		if (browser) {
			return getContext(CONTEXT);
		}
	},
	set: (t) => {
		if (browser) {
			theme.set(t);
			sessionStorage.setItem('theme', t);
			Theme.update();
		}
	},
	set_context: () => {
		if (browser) {
			setContext(CONTEXT, theme);
		}
	},
	is_dark_mode: (theme) => {
		if (browser) {
			return (
				theme === 'dark' ||
				(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
			);
		}
	},
	update: () => {
		if (browser) {
			if (Theme.is_dark_mode(sessionStorage.theme)) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
};
