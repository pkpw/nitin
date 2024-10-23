import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { Theme } from './theme';

const CONTEXT = 'user_profile';
const profile = writable({});

export const Profile = {
	retrieve: async (supabase, id) => {
		return supabase.from('profiles').select().eq('id', id).single();
	},
	save: async (supabase, id, data) => {
		return supabase
			.from('profiles')
			.update({
				...data,
				updated_at: new Date().toISOString()
			})
			.eq('id', id);
	},
	onboard: async (supabase, id, firstName, lastName) => {
		return supabase
			.from('profiles')
			.update({
				first_name: firstName,
				last_name: lastName,
				is_onboarded: true,
				onboarded_at: new Date().toISOString()
			})
			.eq('id', id);
	},
	get: () => {
		if (browser) {
			return getContext(CONTEXT);
		}
	},
	set: (data) => {
		if (browser) {
			profile.set(data);
		}
	},
	set_context: () => {
		if (browser) {
			setContext(CONTEXT, profile);
		}
	},
	logout: async (supabase) => {
		if (!browser) {
			return;
		}

		const { error } = await supabase.auth.signOut();
		if (error) {
			error(500, { message: 'Unable to logout' });
		}

		Theme.set('system');
		goto('/auth');
	}
};
