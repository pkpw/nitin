import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { getSupabaseClient } from './supabase-client';

const USER_PROFILE_CONTEXT = 'user_profile';

export class Profile {
	constructor(initialData) {
		this.userId = initialData.id;
		this.email = initialData.email;
		this.firstName = initialData.first_name;
		this.lastName = initialData.last_name;
		this.isOnboarded = initialData.is_onboarded;
	}

	static async retrieve(userId) {
		const supabase = getSupabaseClient();
		return await supabase.from('profiles').select().eq('id', userId).single();
	}

	async save() {
		const supabase = getSupabaseClient();
		return await supabase
			.from('profiles')
			.update({
				id: this.id,
				email: this.email,
				first_name: this.firstName,
				last_name: this.lastName,
				is_onboarded: this.isOnboarded
			})
			.eq('id', this.userId);
	}

	async completeOnboarding(firstName, lastName) {
		const supabase = getSupabaseClient();
		this.firstName = firstName;
		this.lastName = lastName;
		this.isOnboarded = true;
		return await this.save(supabase);
	}
}

export function setUserProfile(initialData) {
	const userProfile = writable(initialData ? new Profile(initialData) : undefined);
	setContext(USER_PROFILE_CONTEXT, userProfile);
	return userProfile;
}

export function getUserProfile() {
	return getContext(USER_PROFILE_CONTEXT);
}
