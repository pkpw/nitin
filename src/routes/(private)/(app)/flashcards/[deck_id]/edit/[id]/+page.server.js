import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as deleteSchema } from '$lib/components/flashcards/deleteForm.js';
import { schema as renameSchema } from '$lib/components/flashcards/renameForm.js';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';

export async function load({ locals: { supabase }, params, parent }) {
	// const { session } = await safeGetSession();
	const { deck } = await parent();
	// console.log(deck);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);

	return {
		deck,
		id: params.id,
		flashcard: db.getFlashcard(supabase, params.id),
		deleteForm,
		renameForm
	};
}

export const actions = {
	save: async ({ locals: { supabase, safeGetSession }, request }) => {},
	create: async ({ locals: { supabase }, params }) => {
		const { error: dbError } = await db.createFlashcard(supabase, params.deck_id);
		if (dbError) {
			// TODO: Replace with toast notification
			console.log(dbError)
			error(500, dbError);
		}

		return {};
	},
	delete: async ({ locals: { supabase }, request, params }) => {
		const adapter = schemasafe(deleteSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.deleteFlashcard(supabase, form.data.id);
		if (error) {
			return fail(400, { form });
		}

		if (form.data.id === params.id) {
			redirect(303, `/flashcards/${params.deck_id}/edit`)
		} else {
			return message(form, 'Deleted!')
		}
	},
	rename: async ({ locals: { supabase }, request }) => {
		const adapter = schemasafe(renameSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await db.renameFlashcard(supabase, form.data.id, form.data.title);
		if (error) {
			return setError(form, 'title', error)
		}

		return message(form, 'Renamed!');
	},
	reorder: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	}
};
