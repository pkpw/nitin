import { updateClassroom, deleteClassroom } from '$lib/classroom';
import { json } from '@sveltejs/kit';

export async function PUT({ request, locals: { supabase }, params }) {
  const { name } = await request.json();

  if (!name || name.length < 3 || name.length > 32) {
    return json({ success: false, message: 'Classroom name must be between 3 and 32 characters' }, { status: 400 });
  }

  const { error } = await updateClassroom(params.id, name, supabase);

  if (error) {
    console.error('Error updating classroom:', error);
    return json({ success: false, message: 'Failed to update classroom' }, { status: 500 });
  }

  return json({ success: true });
}

export async function DELETE({ params, locals: { supabase } }) {
  const { id } = params;

  const { error: deleteError } = await deleteClassroom(id, supabase);

  if (deleteError) {
    console.error('Error deleting classroom:', deleteError);
    return json({ success: false, message: 'Failed to delete classroom' }, { status: 500 });
  }

  return json({ success: true });
}