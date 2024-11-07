import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

export async function load({ locals: { supabase, safeGetSession }, url }) {
	const { session } = await safeGetSession();
	if (!session) {
		redirect(303, '/auth');
	}

	const { data: profile, error: dbError } = await db.getProfile(supabase, session.user.id);
	if (dbError) {
		error(500, 'Unable to retrieve profile.');
	}

	if (!profile.is_onboarded && !url.pathname.startsWith('/onboarding')) {
		redirect(303, `/onboarding?next=${url.pathname}`);
	}

	return {
		profile
	};
}
