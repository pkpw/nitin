// src/routes/classrooms/[id]/+server.js
import { json } from '@sveltejs/kit';
import { deleteClassroom } from '$lib/classroom';

export async function DELETE({ params }) {
  const { id } = params;

  const { error: deleteError } = await deleteClassroom(id);

  if (deleteError) {
    console.error('Error deleting classroom:', deleteError);
    return json({ success: false, message: 'Failed to delete classroom' }, { status: 500 });
  }

  return json({ success: true });
}