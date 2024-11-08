import { getCreatedFlashcards } from "./deck";

export async function getFlashcard(supabase, id) {
	return supabase.from('flashcards').select().eq('id', id).single();
}

export async function saveFlashcard() {}

export async function createFlashcard(supabase, deck_id) {
	const {data: count, error} = await supabase.rpc('increment_created_flashcards', { deck_id })
	if (error) {
		return { error };
	}

	return supabase
		.from('flashcards')
		.insert({
			deck_id,
			title: `${count}.`,
			order: count * 1000
		})
		.select();
}

export async function deleteFlashcard(supabase, id) {
	return supabase.from('flashcards').delete().eq('id', id);
}

export async function renameFlashcard(supabase, id, title) {
	const { error } = await supabase
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

	return {};
}
