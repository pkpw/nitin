/**
 * Fetch all classrooms
 */
export async function getAllClassrooms(supabase, userId) {
	return supabase.from('classrooms').select('*').eq('created_by', userId);
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
export async function createClassroom(name, supabase, createdBy) {

	const { error, data } = await supabase
		.from('classrooms')
		.insert({
			name,
			created_by: createdBy, // Add `created_by` field
		});

	// Log query results for debugging
	if (error) {
		console.error('Error creating classroom:', error);
	}

	return { error, data };
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
  console.log('Attempting to delete classroom with ID:', id);

  const { error, data } = await supabase
      .from('classrooms')
      .delete()
      .eq('id', id);

  if (error) {
      console.error('Supabase delete error:', error);
  } else {
      console.log('Supabase delete success. Deleted data:', data);
  }

  return { error, data };
}
/**
 * Add a deck to a classroom
 */

export async function addDeckToClassroom(supabase, classroomId, deckId) {
  const { data, error } = await supabase
      .from('classroom_decks')
      .insert({
          classroom_id: classroomId,
          deck_id: deckId,
      });

  if (error) {
      console.error('Error adding deck to classroom:', error);
  }

  return { data, error };
}
/**
 * Get decks for a specific classroom
 */
export async function getDecksForClassroom(supabase, classroomId) {
  const { data, error } = await supabase
      .from('classroom_decks')
      .select(`
          deck_id,
          decks (title, color, created_flashcards)
      `)
      .eq('classroom_id', classroomId);

  if (error) {
      console.error('Error fetching decks for classroom:', error);
  } 
  return { data, error };
}