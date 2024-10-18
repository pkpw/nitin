import { getSupabaseClient } from './supabase-client';

export async function getClassroomById(id, supabase) {
  return await supabase
    .from('classrooms')
    .select('*')
    .eq('id', id)
    .single();
}

export async function getAllClassrooms(supabase) {
  return await supabase.from('classrooms').select('*');
}

export async function createClassroom(name, supabase) {
  return await supabase
    .from('classrooms')
    .insert({ name });
}

export async function updateClassroom(id, name, supabase) {
  return await supabase
    .from('classrooms')
    .update({ name })
    .eq('id', id);
}

export async function deleteClassroom(id, supabase) {
  return await supabase
    .from('classrooms')
    .delete()
    .eq('id', id);
}

export async function addUserToClassroom(classroomId, userId, role, supabase) {
    const column = role === 'instructor' ? 'instructors' : 'students';

    const { data: classroom, error: fetchError } = await supabase
        .from('classrooms')
        .select(column)
        .eq('id', classroomId)
        .single();

    if (fetchError || !classroom) {
        return { error: 'Failed to fetch classroom data' };
    }

    const currentArray = classroom[column] || [];
    const updatedArray = [...currentArray, userId]; 

    const { data, error } = await supabase
        .from('classrooms')
        .update({ [column]: updatedArray }) 
        .eq('id', classroomId);

    return { data, error };
}

export async function getAllProfiles(supabase) {
    return await supabase
        .from('profiles')
        .select('id, first_name, last_name');  
}