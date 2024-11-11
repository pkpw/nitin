import { Profile } from '$lib/profile.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) {
		return json({ error: 'No user session' });
	}

	const { data, error } = await Profile.retrieve(supabase, session.user.id);
	if (error) {
		return json({ error: 'Could not retrieve profile' });
	}

	return json({ data: data });
};
