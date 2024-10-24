import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { id } = params;
	const { data: classroom, error } = await supabase
		.from('classrooms')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error retrieving classroom:', error);
		return fail(404, { error: 'Classroom not found' });
	}

	return {
		classroom
	};
};
