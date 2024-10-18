import { getClassroomById, getAllProfiles } from '$lib/classroom';
import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
    const { id } = params;
    const { data: classroom, error: classroomError } = await getClassroomById(id, supabase);
    const { data: profiles, error: profilesError } = await getAllProfiles(supabase);  

    if (classroomError || !classroom) {
        console.error('Error retrieving classroom:', classroomError);
        return fail(404, { error: 'Classroom not found' });
    }

    if (profilesError || !profiles) {
        console.error('Error retrieving profiles:', profilesError);
        return fail(500, { error: 'Failed to load profiles' });
    }

    return {
        classroom,
        profiles 
    };
};