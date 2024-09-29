import { Profile } from '$lib/profile.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { profile, supabase } = await parent();

	// Redirect onboarded users to dashboard
	if (profile.is_onboarded) {
		redirect(303, '/dashboard');
	}

	return {
		supabase,
		profile
	};
};

export const actions = {
	default: async ({ request, locals: { safeGetSession } }) => {
		const { session } = await safeGetSession();
		const { data, error: profileError } = await Profile.retrieve(session.user.id);
		if (profileError) {
			return { success: false, message: 'Could not retrieve user profile' };
		}

		const profile = new Profile(data);
		const formData = await request.formData();
		const firstName = formData.get('first-name');
		const lastName = formData.get('last-name');

		const { error: onboardingError } = await profile.completeOnboarding(
			firstName,
			lastName
		);
		if (onboardingError) {
			console.error(onboardingError);
			return { success: false, message: 'Could not complete onboarding' };
		}

		redirect(303, '/dashboard');
	}
};
