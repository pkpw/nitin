import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as createSchema } from '$lib/components/decks/createForm.js';
import { schema as deleteSchema } from '$lib/components/decks/deleteForm.js';
import { schema as renameSchema } from '$lib/components/decks/renameForm.js';
import { db } from '$lib/server/database.js';

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();

	const { data: decks, error } = await db.getDecks(supabase, session.user.id);
	if (error) {
		// TODO: Trigger toast notification with error message
		return {};
	}

	const createAdapter = schemasafe(createSchema);
	const createForm = await superValidate(createAdapter);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);

	return {
		decks,
		createForm,
		deleteForm,
		renameForm
	};
}

export const actions = {
	create: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
		const adapter = schemasafe(createSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.createDeck(supabase, session.user.id, form.data.title);
		if (error) {
			if (error == 'Flashcard deck already exists!') {
				return setError(form, 'title', error);
			} else {
				return fail(400, { form });
			}
		}

		return message(form, 'Created!');
	},
	delete: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
		const adapter = schemasafe(deleteSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.deleteDeck(supabase, form.data.id, session.user.id);
		if (error) {
			return fail(400, { form });
		}

		return message(form, 'Deleted!');
	},
	rename: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
		const adapter = schemasafe(renameSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.renameDeck(supabase, form.data.id, session.user.id, form.data.title);
		if (error) {
			if (error == 'Flashcard deck already exists!') {
				return setError(form, 'title', error);
			} else {
				return fail(400, { form });
			}
		}

		return message(form, 'Renamed!');
	}
};
