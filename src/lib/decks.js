async function retrieve(supabase, id, profile_id) {
	return supabase.from('flashcard_decks').select().eq('id', id).eq('owner_id', profile_id);
}

async function retrieveAll(supabase, profile_id) {
	return supabase.from('flashcard_decks').select().eq('owner_id', profile_id);
}

async function save(supabase, data) {

}

async function create(supabase, profile_id) {

}

async function rename(supabase, id, profile_id, title) {

}

export const Decks = {
	retrieve,
	retrieveAll,
	save,
	create
};

// export const FlashcardDeck = {
// 	retrieve: async (supabase, profile_id, id) => {
// 		return supabase.from('flashcard_decks').select().eq('owner_id', profile_id).eq('id', id);
// 	},
// 	save: async (supabase, data) => {
// 		return supabase.f;
// 	},
// 	create: (supabase, id, name) => {},
// 	delete: (supabase, id) => {},
// 	rename: (supabase, id, name) => {},
// 	flashcards: (supabase, id) => {},
// 	shared_with: (supabase, id) => {},
// 	to_markdown: () => {}
// };
