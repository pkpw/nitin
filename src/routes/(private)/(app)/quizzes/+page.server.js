import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as createSchema } from '$lib/components/quizzes/createForm.js';
import { schema as deleteSchema } from '$lib/components/quizzes/deleteForm.js';
import { schema as renameSchema } from '$lib/components/quizzes/renameForm.js';
import { getQuizzes, createQuiz, deleteQuiz, renameQuiz } from '$lib/server/models/quiz.js';


export async function load({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();

	const createAdapter = schemasafe(createSchema);
	const createForm = await superValidate(createAdapter);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);

	return {
		quizzes: getQuizzes(supabase, session.user.id),
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

		const { error } = await createQuiz(supabase, session.user.id, form.data.title);
		if (error) {
			return setError(form, 'title', error);
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

		
		const { error } = await deleteQuiz(supabase, form.data.id, session.user.id);
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

		const { error } = await renameQuiz(supabase, form.data.id, session.user.id, form.data.title);
		if (error) {
			return setError(form, 'title', error);
		}

		return message(form, 'Renamed!');
	}
};
