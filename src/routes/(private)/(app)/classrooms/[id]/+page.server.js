import { db } from '$lib/server/database.js';
import { redirect, error } from '@sveltejs/kit';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema as renameSchema } from '$lib/components/classroom/renameForm.js';


export async function load({ params, locals: { supabase, safeGetSession } }) {
    const { session } = await safeGetSession();
    if (!session?.user) {
        throw error(401, 'Unauthorized');
    }
    const { id } = params;

    const { data: classroom, error: dbError } = await db.getClassroomById(supabase, id);

    if (dbError) {
        console.error('Error fetching classroom:', dbError);
    } 
    if (dbError) {
        throw error(404, 'Classroom not found');
    }
    const renameAdapter = schemasafe(renameSchema);
    const renameForm = await superValidate(renameAdapter);
    return { classroom, renameForm };
}

export const actions = {
    rename: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, schemasafe(renameSchema));

        if (!form.valid) {
            return fail(400, { form }); // Return form with validation errors
        }
        const id = formData.get('id');
        const name = formData.get('name');

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.error('Invalid UUID:', id);
            return fail(400, { error: 'Invalid classroom ID.' });
        }
        // Log the received data
        console.log('Rename Action - Received ID:', id);
        console.log('Rename Action - Received Name:', name);
        // Call the renameClassroom function
        const { error } = await db.renameClassroom(supabase, id, name);

        if (error) {
            console.error('Error renaming classroom:', error);
            return fail(400, { error: 'Failed to rename classroom.' });
        }
        return message(form, 'Classroom renamed successfully!');
    },
    delete: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const { error } = await db.deleteClassroom(supabase, id);
        // Redirect to the main classrooms page after deletion
        throw redirect(303, '/classrooms');
    }
};