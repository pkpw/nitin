import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	// Redirect signed out users to auth
	if (!session) {
		redirect(303, '/auth');
	}

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};
