import { getSupabaseClient } from './supabase-client';

// Function to get all classrooms from Supabase
export async function getAllClassrooms() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('classrooms').select('*');
  return { data, error };
}

// Function to create a new classroom in Supabase
export async function createClassroom(name) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('classrooms').insert({ name });
  return { data, error };
}

// Delete a classroom
export async function deleteClassroom(classroomId) {
  const supabase = getSupabaseClient(); // Retrieve the client here
  const { error } = await supabase.from('classrooms').delete().eq('id', classroomId);
  return { error };
}