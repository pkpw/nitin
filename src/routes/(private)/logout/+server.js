import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) {
		redirect(303, '/auth');
	}

	const { error } = await supabase.auth.signOut();
	if (error) {
		return json({ error: 'Could not sign out of profile' });
	}

	redirect(303, '/auth');
};
