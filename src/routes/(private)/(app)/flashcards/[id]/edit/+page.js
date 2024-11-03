import { writable } from 'svelte/store';

export async function load({ data }) {
	return {
		...data,
		navBar: {
			title: null,
			visible: writable(false)
		}
	};
}
