import { error, fail, json } from '@sveltejs/kit';

export async function PUT({ request, locals: { supabase }, params }) {
	const { name } = await request.json();

	if (!name || name.length < 3 || name.length > 32) {
		return fail(400, { error: 'Classroom name must be between 3 and 32 characters' });
	}

	const { error } = await supabase.from('classrooms').update({ name }).eq('id', params.id);

	if (error) {
		console.error('Error updating classroom:', error);
		return fail(500, { error: 'Failed to update classroom' });
	}

	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
export async function DELETE({ params, locals: { supabase } }) {
	const { id } = params;

	const { error: deleteError } = await supabase.from('classrooms').delete().eq('id', id);

	if (deleteError) {
		console.error('Error deleting classroom:', deleteError);
		throw error(500, 'Failed to delete classroom');
	}

	return json({ success: true });
}
