import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { Profile } from '$lib/profile.js';

const schema = {
	type: 'object',
	properties: {
		firstName: { type: 'string', maxLength: 32 },
		lastName: { type: 'string', maxLength: 32 }
	},
	required: ['firstName', 'lastName'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async ({ parent }) => {
	const { profile, supabase } = await parent();

	// Redirect onboarded users to dashboard
	if (profile.is_onboarded) {
		redirect(303, '/dashboard');
	}

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form,
		profile,
		supabase
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

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: onboardingError } = await profile.completeOnboarding(
			form.data.firstName,
			form.data.lastName
		);
		if (onboardingError) {
			console.error(onboardingError);
			return { success: false, message: 'Could not complete onboarding' };
		}

		redirect(303, '/dashboard');
	}
};
