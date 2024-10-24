import { writable } from 'svelte/store';

export const load = ({ data }) => {
	return {
		...data,
		navigationBar: {
			visible: false,
			pageTitle: writable('')
		}
	};
};
