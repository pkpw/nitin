import { Profile } from '$lib/models/profile.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, parent }) => {
	const { profile, session, user } = await parent();

	// Redirect onboarded users to dashboard
	if (profile.is_onboarded) {
		redirect(303, '/dashboard');
	}

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};

export const actions = {
	default: async ({ request, locals: { safeGetSession } }) => {
		let { profile } = await safeGetSession();
		profile = Profile.fromJSON(profile);

		const formData = await request.formData();
		const firstName = formData.get('first-name');
		const lastName = formData.get('last-name');

		const { error } = await profile.completeOnboarding(firstName, lastName);
		if (error) {
			error(503, { message: JSON.stringify(error) });
		}

		redirect(303, '/dashboard');
	}
};
