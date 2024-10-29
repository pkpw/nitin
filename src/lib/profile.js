import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CONTEXT = 'profile';

function initialize() {
	if (browser) {
		setContext(CONTEXT, writable());
	}
}

function get() {
	if (browser) {
		const profileStore = getContext(CONTEXT);
		if (!profileStore) {
			throw new Error('Profile not initialized!');
		}

		return profileStore;
	}
}

async function retrieve(supabase, id) {
	return supabase.from('profiles').select().eq('id', id).single();
}

async function save(supabase, id, data) {
	return supabase
		.from('profiles')
		.update({
			...data,
			updated_at: new Date().toISOString()
		})
		.eq('id', id);
}

async function onboard(supabase, id, first_name, last_name, avatar_color) {
	const date = new Date().toISOString();
	return supabase
		.from('profiles')
		.update({
			first_name,
			last_name,
			avatar_color,
			is_onboarded: true,
			onboarded_at: date,
			updated_at: date
		})
		.eq('id', id);
}

export const Profile = {
	initialize,
	get,
	retrieve,
	save,
	onboard
};
