export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { profile, session, user } = await safeGetSession();

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};
