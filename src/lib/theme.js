import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = 'theme';

function initialize() {
	if (browser) {
		sessionStorage.setItem('theme', DEFAULT);
		setContext(CONTEXT, themeStore());
	}
}

function get() {
	if (browser) {
		const themeStore = getContext(CONTEXT);

		if (!themeStore) {
			throw new Error('Theme not initialized!');
		}

		return themeStore;
	}
}

function isDarkMode(theme) {
	return (
		theme === Theme.DARK ||
		(theme === Theme.AUTOMATIC && window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
}

function themeStore() {
	const { subscribe, set, update } = writable(DEFAULT);
	return {
		subscribe,
		set: (theme) => {
			if (browser) {
				sessionStorage.setItem('theme', theme);
				set(theme);
			}
		},
		update,
		switch: () => {
			return subscribe((themeStore) => {
				if (isDarkMode(themeStore)) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			});
		}
	};
}

export const Theme = {
	LIGHT: 'light',
	DARK: 'dark',
	AUTOMATIC: 'system',
	initialize,
	get,
	isDarkMode
};

const DEFAULT = Theme.AUTOMATIC;
