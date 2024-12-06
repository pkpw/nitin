import { getContext, setContext } from 'svelte';
import { writable, derived } from 'svelte/store';

const CONTEXT = 'modals';

function createModals() {
	const modals = writable([]);
	return {
		subscribe: modals.subscribe,
		trigger: (modal) =>
			modals.update((m) => {
				m.push(modal);
				return m;
			}),
		isOpen: derived(modals, ($modals) => $modals.length > 0),
		close: () =>
			modals.update((m) => {
				if (m.length > 0) {
					m.shift();
				}
				return m;
			}),
		clear: () => modals.set([])
	};
}

export function setModals() {
	return setContext(CONTEXT, createModals());
}

export function useModals() {
	const modals = getContext(CONTEXT);
	if (!modals) {
		throw new Error('Modal store is not set!');
	}

	return modals;
}
