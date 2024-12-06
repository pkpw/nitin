import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { loginForm } from './loginForm.js';

export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();
	if (session) {
		redirect(303, '/dashboard');
	}

	// Artificial delay to test form loading spinner
	// await new Promise((resolve) => setTimeout(resolve, 5000));

	const adapter = schemasafe(loginForm);
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
		const adapter = schemasafe(loginForm);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.auth.signInWithOtp({
			email: form.data.email,
			options: {
				shouldCreateUser: true
			}
		});

		if (error) {
			redirect(303, '/auth/error');
		}

		return message(form, 'Magic link sent!');
	}
};
