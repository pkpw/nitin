import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async ({ request, locals: { safeGetSession } }) => {
		const { session } = await safeGetSession();
	}
};
