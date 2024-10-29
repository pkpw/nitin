import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = 'modals';

function initialize() {
	if (browser) {
		setContext(CONTEXT, modalStore());
	}
}

function get() {
	if (browser) {
		const modalStore = getContext(CONTEXT);

		if (!modalStore) {
			throw new Error('Modals not initialized!');
		}

		return modalStore;
	}
}

function modalStore() {
	const { subscribe, set, update } = writable([]);
	return {
		subscribe,
		set,
		update,
		trigger: (modal) => {
			update((modalStore) => {
				modalStore.push(modal);
				return modalStore;
			});
		},
		isOpen: () => {
			return subscribe((modalStore) => modalStore.length > 0);
		},
		close: () => {
			update((modalStore) => {
				if (modalStore.length > 0) {
					modalStore.shift();
				}

				return modalStore;
			});
		},
		clear: () => set([])
	};
}

export const Modals = {
	// Modal types
	CONTINUE: 'Continue',
	SAVE: 'Save',
	DELETE: 'Delete',
	initialize,
	get
};
