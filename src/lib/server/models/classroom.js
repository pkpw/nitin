/**
 * Fetch all classrooms
 */
export async function getAllClassrooms(supabase) {
	return supabase.from('classrooms').select('*');
}
/**
 * Fetch a single classroom by ID
 */
export async function getClassroomById(supabase, id) {
	return supabase
		.from('classrooms')
		.select('*')
		.eq('id', id)
		.single();
}
/**
 * Create a new classroom
 */
export async function createClassroom(name, supabase) {
	return supabase
		.from('classrooms')
		.insert({
			name
		})
}

/**
 * Rename a classroom
 */
export async function renameClassroom(supabase, id, name) {
  return supabase
      .from('classrooms')
      .update({ name })
      .eq('id', id);
}

/**
* Delete a classroom
*/
export async function deleteClassroom(supabase, id) {
  return supabase
      .from('classrooms')
      .delete()
      .eq('id', id);
}