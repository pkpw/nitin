import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession }, cookies, url }) => {
	const { profile, session, user } = await safeGetSession();

	// Redirect unauthenticated users to auth
	if (!session) {
		redirect(303, '/auth');
	}

	// Redirect new users to onboarding
	if (!profile.is_onboarded && !url.pathname.startsWith('/onboarding')) {
		redirect(303, '/onboarding');
	}

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};
