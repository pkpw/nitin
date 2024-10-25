export const FlashcardDeck = {
	retrieve: async (supabase, profile_id, id) => {
		return supabase.from('flashcard_decks').select().eq('owner_id', profile_id).eq('id', id);
	},
	save: async (supabase, data) => {
		return supabase.f;
	},
	create: (supabase) => {},
	delete: (supabase) => {},
	rename: (supabase) => {},
	flashcards: (supabase) => {}
};
