import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import { writable, derived } from 'svelte/store';

const CONTEXT = 'theme';

function isDarkMode(theme) {
	if (browser) {
		return (
			theme === Theme.DARK ||
			(theme === Theme.AUTOMATIC && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}
}

function createTheme() {
	const theme = writable(Theme.AUTOMATIC);

	if (browser) {
		sessionStorage.setItem('theme', Theme.AUTOMATIC);
	}

	return {
		subscribe: theme.subscribe,
		set: (t) => {
			if (browser) {
				sessionStorage.setItem('theme', t);
			}
			theme.set(t);
		},
		isDarkMode,
		switch: (t) => {
			if (browser) {
				if (isDarkMode(t)) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			}
		}
	};
}

export function setTheme() {
	return setContext(CONTEXT, createTheme());
}

export function useTheme() {
	const theme = getContext(CONTEXT);
	if (!theme) {
		throw new Error('Theme store is not set!');
	}

	return theme;
}

export const Theme = {
	AUTOMATIC: 'system',
	LIGHT: 'light',
	DARK: 'dark'
};
