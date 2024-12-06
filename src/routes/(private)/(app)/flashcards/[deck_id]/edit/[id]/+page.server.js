import { error, redirect } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/database.js';
import { schema as saveSchema } from './saveForm.js';
import { schema as createSchema } from './createForm.js';
import { schema as deleteSchema } from '$lib/components/flashcards/deleteForm.js';
import { schema as renameSchema } from '$lib/components/flashcards/renameForm.js';

export async function load({ locals: { supabase }, params, parent }) {
	const { deck } = await parent();
	let flashcard;

	if (params.id) {
		const { data, error: dbError } = await db.getFlashcard(supabase, params.id);
		if (dbError) {
			error(500);
		}
		flashcard = data;
	}

	const createAdapter = schemasafe(createSchema);
	const createForm = await superValidate(createAdapter);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);

	return {
		deck,
		id: params.id,
		flashcard,
		createForm,
		deleteForm,
		renameForm
	};
}

export const actions = {
	save: async ({ locals: { supabase }, request }) => {
		const adapter = schemasafe(saveSchema);
		const form = await superValidate(request, adapter);
		console.log(form);
		console.log(JSON.stringify(form.data.front));
		if (!form.valid) {
			console.log('invalid');
			console.log(JSON.stringify(form.errors));
			return fail(400, { form });
		}

		const { error } = await db.saveFlashcard(
			supabase,
			form.data.id,
			form.data.front,
			form.data.back
		);
		if (error) {
			console.log('fail');
			return fail(400, { form });
		}

		return message(form, 'Saved!');
	},
	create: async ({ locals: { supabase }, request }) => {
		const adapter = schemasafe(createSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data: flashcard, error } = await db.createFlashcard(
			supabase,
			form.data.deck_id,
			form.data.title
		);
		if (error) {
			return setError(form, 'title', error);
		}

		return message(form, flashcard.id);
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

		// If delete current flashcard
		if (form.data.id === params.id) {
			redirect(303, `/flashcards/${params.deck_id}/edit`);
		} else {
			return message(form, 'Deleted!');
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
			return setError(form, 'title', error);
		}

		return message(form, 'Renamed!');
	},
	reorder: async ({ locals: { supabase }, request }) => {}
};
