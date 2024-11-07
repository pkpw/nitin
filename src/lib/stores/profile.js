import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = 'profile';

function createProfile() {
	const { subscribe, set, update } = writable(null);
	return {
		subscribe,
		set,
		setFirstName: (first_name) => update((profile) => (profile.first_name = first_name)),
		setLastName: (last_name) => update((profile) => (profile.last_name = last_name)),
		setTheme: (theme) => update((profile) => (profile.theme = theme)),
		setAvatarColor: (color) => update((profile) => (profile.avatar_color = color)),
		setUpdatedAt: () => update((profile) => (profile.updated_at = new Date().toISOString())),
		setIsOnboarded: (onboarded) => update((profile) => (profile.is_onboarded = onboarded)),
		setOnboardedAt: () => update((profile) => (profile.onboarded_at = new Date().toISOString()))
	};
}

export function setProfile() {
	return setContext(CONTEXT, createProfile());
}

export function useProfile() {
	const profile = getContext(CONTEXT);
	if (!profile) {
		throw new Error('Profile store is not set!');
	}

	return profile;
}
