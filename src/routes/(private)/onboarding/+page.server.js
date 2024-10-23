import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';
import { Profile } from '$lib/profile.js';

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession }, url }) => {
		const { session } = await safeGetSession();
		if (!session) {
			redirect(303, '/auth');
		}

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await Profile.onboard(
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
