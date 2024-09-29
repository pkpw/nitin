import { getSupabaseClient } from '$lib/supabaseClient';

export async function fetchProfile(userId) {
	const supabase = getSupabaseClient();
	const { data: profile, error } = await supabase.from('profiles').select().eq('id', userId).single();
	if (error) {
		return { error };
	}

	return { profile };
}

export async function saveProfile(self) {
	const supabase = getSupabaseClient();
	const { data: profile, error } = await supabase
		.from('profiles')
		.update(self)
		.select()
		.eq('id', self.id)
		.single();
	if (error) {
		return { error };
	}

	return { profile };
}

export async function completeOnboarding(userId, firstName, lastName) {
	const supabase = getSupabaseClient();
	const { profile, error } = await saveProfile({
		id: userId,
		first_name: firstName,
		last_name: lastName,
		is_onboarded: true
	});
	if (error) {
		return { error };
	}

	return { profile };
}
