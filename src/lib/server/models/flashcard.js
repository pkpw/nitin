export async function getFlashcard(supabase, id) {
	return supabase.from('flashcards').select().eq('id', id).single();
}

export async function saveFlashcard(supabase, id, front, back) {
	return supabase
		.from('flashcards')
		.update({
			front,
			back,
			updated_at: new Date().toISOString()
		})
		.eq('id', id);
}

// TODO: Add order
export async function createFlashcard(supabase, deck_id, title) {
	const { data, error } = await supabase
		.from('flashcards')
		.insert({
			deck_id,
			title,
			order: 0
		})
		.select()
		.single();

	if (error) {
		return {
			error: error.code === '23505' ? 'Flashcard already exists.' : 'An error occurred.'
		};
	}

	return { data };
}

export async function deleteFlashcard(supabase, id) {
	return supabase.from('flashcards').delete().eq('id', id);
}

export async function renameFlashcard(supabase, id, title) {
	const { data, error } = await supabase
		.from('flashcards')
		.update({
			title
		})
		.eq('id', id);

	if (error) {
		return {
			error: error.code === '23505' ? 'Flashcard already exists.' : 'An error occurred.'
		};
	}

	return { data };
}
