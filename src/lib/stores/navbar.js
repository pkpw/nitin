import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = 'nav';

function createNavBar() {
	const nav = writable({
		title: null,
		visible: false
	});

	return {
		subscribe: nav.subscribe,
		setTitle: (title) => {
			nav.update((n) => {
				n.title = title;
				return n;
			});
		},
		toggle: () =>
			nav.update((n) => {
				n.visible = !n.visible;
				return n;
			}),
		hide: () =>
			nav.update((n) => {
				n.visible = false;
				return n;
			}),
		open: () =>
			nav.update((n) => {
				n.visible = true;
				return n;
			})
	};
}

export function setNavBar() {
	return setContext(CONTEXT, createNavBar());
}

export function useNavBar() {
	const navBar = getContext(CONTEXT);
	if (!navBar) {
		throw new Error('NavBar store is not set!');
	}

	return navBar;
}
