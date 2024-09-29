import { Profile } from '$lib/profile.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, locals: { profile }, cookies, url }) => {
	const { session, user } = await parent();

	// Redirect unauthenticated users to auth
	if (!session) {
		redirect(303, '/auth');
	}

	// Redirect new users to onboarding
	if (!profile) {
		const { data, error } = await Profile.retrieve(user.id);

		if (error) {
			console.error(error);
		}

		profile = data;
	}

	if (!profile.is_onboarded && !url.pathname.startsWith('/onboarding')) {
		redirect(303, '/onboarding');
	}

	return {
		session,
		user,
		profile,
		cookies: cookies.getAll()
	};
};
