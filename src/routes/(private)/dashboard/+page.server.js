export const load = async ({ cookies, locals: { safeGetSession } }) => {
	const { profile, session, user } = await safeGetSession();

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};