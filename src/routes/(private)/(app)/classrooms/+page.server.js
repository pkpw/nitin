// src/routes/classrooms/+page.server.js
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as createSchema } from '$lib/components/classroom/createForm.js';
import { schema as deleteSchema } from '$lib/components/classroom/deleteForm.js';
import { schema as renameSchema } from '$lib/components/classroom/renameForm.js';
import { db } from '$lib/server/database';


export async function load({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();
	const userId = session.user.id;
	
	const { data: classrooms, error: classroomsError } = await db.getAllClassrooms(supabase, userId);
	
	
	const createAdapter = schemasafe(createSchema);
	const createForm = await superValidate(createAdapter);

	const deleteAdapter = schemasafe(deleteSchema);
	const deleteForm = await superValidate(deleteAdapter);

	const renameAdapter = schemasafe(renameSchema);
	const renameForm = await superValidate(renameAdapter);

	return {
		classrooms: classrooms.data ?? [],
		createForm,
		deleteForm,
		renameForm,
		user: session.user 
	};
}
export const actions = {
	default: async ({ locals: { supabase, safeGetSession }, request }) => {
		
		// Validate form data
		const adapter = schemasafe(createSchema);
		const form = await superValidate(request, adapter);
		if (!form.valid) {
			return fail(400, { form });
		}
			// Get the authenticated user
		const { session } = await safeGetSession();

		const { data: user, error: userError } = await supabase.auth.getUser();
		if (userError || !user) {
			return fail(401, { form, error: 'Unauthorized: No user found' });
		}
		const userId = session.user.id;

		// Create the classroom
		const { error: createError } = await db.createClassroom( form.data.name, supabase, userId);
		if (createError) {
			console.log(form, 'name', 'Failed to create classroom.');
		}

		return message(form, 'Classroom created successfully!');
	}
};