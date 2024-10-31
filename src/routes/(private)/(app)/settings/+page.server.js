import { fail, message, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';
import { db } from '$lib/server/database.js';

export async function load({ parent }) {
	const { profile } = await parent();
	const adapter = schemasafe(schema);
	const form = await superValidate(
		{
			first_name: profile.first_name,
			last_name: profile.last_name,
			theme: profile.theme
		},
		adapter
	);

	return { form };
}

export const actions = {
	default: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.saveProfile(supabase, {
			id: session.user.id,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			theme: form.data.theme
		});
		if (error) {
			// TODO: Trigger toast notification with error message
			return fail(400, { form });
		}

		return message(form, 'Saved!');
	}
};
