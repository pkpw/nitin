import { addUserToClassroom } from '$lib/classroom';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase }, params }) => {
    try {
        const { id: classroomId } = params;  // Extract the classroom ID from the URL
        const { userId, role } = await request.json();

        if (!userId) {
            console.error('User ID is missing in the request');
            return json({ error: 'User ID is required' }, { status: 400 });
        }

        // Check if user exists in the profiles table
        const { data: user, error: userError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single();

        if (userError || !user) {
            console.error('Error finding user in profiles:', userError);
            return json({ error: 'User not found in profiles' }, { status: 404 });
        }

        // Add the user to the classroom by appending them to the appropriate array
        const { error } = await addUserToClassroom(classroomId, userId, role, supabase);

        if (error) {
            console.error('Error adding user to classroom:', error);
            return json({ error: 'Failed to add user to classroom' }, { status: 500 });
        }

        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Unexpected error:', err);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export async function GET({ params, locals: { supabase } }) {
    const classroomId = params.id;

    // Fetch the classroom data
    const { data: classroom, error: classroomError } = await supabase
        .from('classrooms')
        .select('instructors, students')
        .eq('id', classroomId)
        .single();

    if (classroomError || !classroom) {
        throw error(404, { message: 'Classroom not found' });
    }

    // Fetch profiles for instructors and students
    const userIds = [...classroom.instructors, ...classroom.students];

    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', userIds);

    if (profilesError) {
        throw error(500, { message: 'Failed to fetch user profiles' });
    }

    // Separate instructors and students
    const instructors = profiles.filter(profile => classroom.instructors.includes(profile.id));
    const students = profiles.filter(profile => classroom.students.includes(profile.id));

    return {
        status: 200,
        body: { instructors, students }
    };
}