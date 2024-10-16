import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { onboard_profile } from '$lib/profile.js';
import { schema } from './form.js';

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession }, url }) => {
		const { session } = await safeGetSession();

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { profile, error } = await onboard_profile(
			supabase,
			session.user.id,
			form.data.first_name,
			form.data.last_name
		);
		if (error) {
			return fail(400, { form });
		}

		const next = url.searchParams.get('next') ?? 'dashboard';
		const redirectTo = new URL(url);
		redirectTo.pathname = next;
		redirectTo.searchParams.delete('next');

		redirect(303, redirectTo);
	}
};
