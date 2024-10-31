export const actions = {
	create: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	},
	delete: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	},
	rename: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	},
	reorder: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	}
};
