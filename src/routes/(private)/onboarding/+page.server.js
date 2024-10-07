import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { Profile } from '$lib/profile.js';

const schema = {
	type: 'object',
	properties: {
		firstName: { type: 'string', maxLength: 32, pattern: '[^\\s]+' },
		lastName: { type: 'string', maxLength: 32, pattern: '[^\\s]+' }
	},
	required: ['firstName', 'lastName'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async ({ parent, url }) => {
	const { profile } = await parent();

	const next = url.searchParams.get('next') ?? '/dashboard';
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('next');

	// Redirect onboarded users to dashboard
	if (profile.is_onboarded) {
		redirect(303, redirectTo);
	}

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form,
		profile
	};
};

export const actions = {
	default: async ({ request, locals: { safeGetSession }, url }) => {
		const { session } = await safeGetSession();
		const { data, error: profileError } = await Profile.retrieve(session.user.id);
		if (profileError) {
			return fail(400);
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
			return fail(400);
		}

		const next = url.searchParams.get('next') ?? '/dashboard';
		const redirectTo = new URL(url);
		redirectTo.pathname = next;
		redirectTo.searchParams.delete('next');

		redirect(303, redirectTo);
	}
};
