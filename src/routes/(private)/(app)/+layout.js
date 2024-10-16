import { writable } from 'svelte/store';

export const load = ({ data }) => {
	return {
		...data,
		navigationBar: {
			shown: false,
			pageTitle: writable('')
		}
	};
};
