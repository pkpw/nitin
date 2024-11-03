export async function getFlashcard(supabase, id) {
	return supabase.from('flashcards').select().eq('id', id);
}

export async function saveFlashcard() {}

export async function createFlashcard(supabase, deck_id) {
	const { count, error } = await supabase
		.from('flashcards')
		.select('*', { count: 'exact', head: true })
		.eq('deck_id', deck_id);
	if (error) {
		return { error };
	}

	return supabase
		.from('flashcards')
		.insert({
			deck_id,
			title: `${count + 1}. `,
			front: {},
			back: {},
			order: count + 1
		})
		.select();
}

export async function deleteFlashcard() {}

export async function renameFlashcard() {}
