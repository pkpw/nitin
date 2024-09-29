export const load = async ({ parent, cookies }) => {
	const { profile, session, user } = await parent();

	return {
		profile,
		session,
		user,
		cookies: cookies.getAll()
	};
};
