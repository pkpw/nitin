// src/routes/classrooms/+page.server.js
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as createSchema } from '$lib/components/classroom/createForm.js';
import { schema as deleteSchema } from '$lib/components/classroom/deleteForm.js';
import { schema as renameSchema } from '$lib/components/classroom/renameForm.js';
import { db } from '$lib/server/database';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 32 }
  },
  required: ['name'],
  additionalProperties: false,
};

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();

	const createAdapter = schemasafe(createSchema);
	const createForm = await superValidate(createAdapter);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);
	const classrooms = await db.getAllClassrooms(supabase);

	return {
		classrooms: classrooms.data ?? [],
		createForm,
		deleteForm,
		renameForm
	};
}
export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		
		// Validate form data
		const adapter = schemasafe(createSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}

		// Create the classroom
		const { error: createError } = await db.createClassroom( form.data.name, supabase);
		if (createError) {
			console.log(form, 'name', 'Failed to create classroom.');
		}

		return message(form, 'Classroom created successfully!');
	}
};