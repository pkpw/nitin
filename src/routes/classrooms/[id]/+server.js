import { error } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { supabase } }) => {
	const classroomId = params.id;

	const { error: deleteError } = await supabase
		.from('classrooms')
		.delete()
		.eq('id', classroomId);

	if (deleteError) {
		console.error('Error deleting classroom:', deleteError);
		throw error(500, 'Failed to delete classroom');
	}

	return new Response(null, { status: 204 }); 
};