import { writable } from 'svelte/store';

// export const ssr = false

export const load = ({ data }) => {
	return {
		...data,
		navigationBar: {
			visible: false,
			pageTitle: writable('')
		}
	};
};
