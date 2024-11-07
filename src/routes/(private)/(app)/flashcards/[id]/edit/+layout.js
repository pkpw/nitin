import { writable } from 'svelte/store';

export const load = ({ data }) => {
	return {
		...data,
		navBar: {
			title: writable(''),
			visible: false
		}
	};
};
