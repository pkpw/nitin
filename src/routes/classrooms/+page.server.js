import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';

const schema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 3, maxLength: 32 }
	},
	required: ['name'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async ({ locals: { supabase } }) => {
	const { data: classrooms, error } = await supabase.from('classrooms').select('*');
	if (error) {
		console.error('Error retrieving classrooms:', error);
		return fail(500, { error: 'Failed to load classrooms' });
	}

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form,
		classrooms
	};
};

export const actions = {
	createClassroom: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, schemasafe(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.from('classrooms').insert({ name: form.data.name });
		if (error) {
			console.error('Error creating classroom:', error);
			return fail(500, { error: 'Failed to create classroom' });
		}

		return { success: true, form };
	},

	deleteClassroom: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const classroomId = formData.get('id');

		const { error } = await supabase.from('classrooms').delete().eq('id', classroomId);

		if (error) {
			console.error('Error deleting classroom:', error);
			return fail(500, { error: 'Failed to delete classroom' });
		}

		return { success: true };
	}
};