import { completeOnboarding, fetchProfile } from '$lib/models/profile.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals: { safeGetSession } }) => {
	const { profile, session, user } = await safeGetSession();

	// Redirect onboarded users to dashboard
	if (profile.is_onboarded) {
		redirect(303, '/dashboard')
	}

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('user-id')
		const firstName = formData.get('first-name');
		const lastName = formData.get('last-name');

		const { error } = completeOnboarding(userId, firstName, lastName);
		if (error) {
			error(503, { message: JSON.stringify(error) })
		}

		redirect(303, '/dashboard')
	}
};
