import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) {
		redirect(303, '/auth');
	}

	const { error } = await supabase.auth.signOut();
	if (error) {
		error(500, 'Unable to sign out of profile.');
	}

	redirect(303, '/auth');
};