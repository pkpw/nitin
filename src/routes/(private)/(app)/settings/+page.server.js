import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';
import { Profile } from '$lib/profile.js';

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();
		if (!session) {
			redirect(303, '/auth');
		}

		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}

		const { error } = await Profile.save(supabase, session.user.id, {
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			theme: form.data.theme
		});
		if (error) {
			return fail(400, { form });
		}

		return message(form, 'Saved!');
	}
};
