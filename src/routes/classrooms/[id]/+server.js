import { json, error } from '@sveltejs/kit';

export async function DELETE({ params, locals: { supabase } }) {
    const classroomId = params.id;
    
    const { error: deleteError } = await supabase.from('classrooms').delete().eq('id', classroomId);

    if (deleteError) {
        console.error('Error deleting classroom:', deleteError);
        throw error(500, 'Failed to delete classroom');
    }

    return json({ success: true });
}