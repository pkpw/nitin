import { writable } from 'svelte/store';

export function load({ data }) {
	return {
		...data,
		navigationBar: {
			pageTitle: writable('')
		}
	};
}
