import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';
import { db } from '$lib/server/database.js';

export async function load({ parent, url }) {
	const { profile } = await parent();

	const next = url.searchParams.get('next') ?? '/dashboard';
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('next');

	if (profile.is_onboarded) {
		redirect(303, redirectTo);
	}

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form
	};
}

export const actions = {
	default: async ({ locals: { supabase, safeGetSession }, request, url }) => {
		const { session } = await safeGetSession();

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.onboardProfile(
			supabase,
			session.user.id,
			form.data.first_name,
			form.data.last_name
		);
		if (error) {
			// TODO: Trigger toast notification with error message
			return fail(400, { form });
		}

		const next = url.searchParams.get('next') ?? 'dashboard';
		const redirectTo = new URL(url);
		redirectTo.pathname = next;
		redirectTo.searchParams.delete('next');

		redirect(303, redirectTo);
	}
};
