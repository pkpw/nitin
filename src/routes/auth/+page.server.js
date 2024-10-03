import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';

const schema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' }
	},
	required: ['email'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	if (session) {
		redirect(303, '/dashboard');
	}

	// Artificial delay to test form loading spinner
	// await new Promise((resolve) => setTimeout(resolve, 5000));

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form,
		session,
		user,
		cookies: cookies.getAll()
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { data, error } = await supabase.auth.signInWithOtp({
			email: form.data.email,
			options: {
				shouldCreateUser: true
			}
		});

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		}

		return message(form, 'success');
	}
};
