import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	if (session) {
		redirect(303, '/dashboard');
	}

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true
			}
		});

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		}

		return { success: true };
	}
};
