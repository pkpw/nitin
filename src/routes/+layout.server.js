export const load = async ({ locals: { supabase, safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	// Clear cookie when user logs out
	if (!session) {
		cookies.delete(`${supabase.storageKey}-code-verifier`, { path: '/' });
	}

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};
