import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const USER_PROFILE_CONTEXT = 'user_profile';
const profile = writable();

export const retrieve_profile = async (supabase, id) => {
	return supabase.from('profiles').select().eq('id', id).single();
};

export const save_profile = async (supabase, data) => {
	return supabase
		.from('profiles')
		.update(...data)
		.eq('id', data.id);
};

export const onboard_profile = async (supabase, id, firstName, lastName) => {
	return supabase
		.from('profiles')
		.update({
			first_name: firstName,
			last_name: lastName,
			is_onboarded: true,
			onboarded_at: new Date().toISOString()
		})
		.eq('id', id);
};

export const get_profile = () => {
	if (browser) {
		return getContext(USER_PROFILE_CONTEXT);
	}
};

export const set_profile = (data) => {
	if (browser) {
		profile.set(data);
		setContext(USER_PROFILE_CONTEXT, profile);
	}
};

export const logout = async (supabase) => {
	if (!browser) {
		return;
	}

	const { data, error } = await supabase.auth.signOut();
	if (error) {
		error(500, { message: 'Unable to logout' });
	}

	goto('/auth');
};
