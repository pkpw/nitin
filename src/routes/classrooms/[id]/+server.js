import { json } from '@sveltejs/kit';  // Use the json helper to return a response

export const DELETE = async ({ params, locals: { supabase } }) => {
    const { id } = params;

    const { error } = await supabase
        .from('classrooms')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting classroom:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete classroom' }),
            { status: 500 }
        );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};