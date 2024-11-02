import { db } from '../database';

export async function getDecks(supabase, owner_id) {
	return supabase.from('decks').select().eq('owner_id', owner_id);
}

export async function getDeck(supabase, id, owner_id) {
	return supabase.from('decks').select().eq('id', id).eq('owner_id', owner_id);
}

export async function doesDeckExist(supabase, owner_id, title) {
	const { data, error } = await supabase
		.from('decks')
		.select()
		.eq('owner_id', owner_id)
		.eq('title', title);
	if (error) {
		return { error };
	}

	return { exists: data && data.length > 0 };
}

export async function createDeck(supabase, owner_id, title) {
	const colors = [
		'#ef4444', // red-500
		'#f97316', // orange-500
		'#eab308', // yellow-500
		'#22c55e', // green-500
		'#14b8a6', // teal-500
		'#0ea5e9', // sky-500
		'#3b82f6', // blue-500
		'#a855f7', // purple-500
		'#ec4899' // pink-500
	];

	const { data: deck, deckError } = await supabase
		.from('decks')
		.insert({
			owner_id,
			title,
			color: colors[Math.floor(Math.random() * colors.length)]
		})
		.select()
		.single();
	
	if (deckError) {
		return { error: 'An error occurred.' };
	}

	// Unique index constaint in database returns null if there is a duplicate for insertion
	if (!deck) {
		return { error: 'Flashcard deck already exists.' }
	}

	const { flashcardError } = await db.createFlashcard(supabase, deck.id);
	if (flashcardError) {
		return { error: 'An error occurred.' };
	}

	return deck;
}

export async function deleteDeck(supabase, id, owner_id) {
	return supabase.from('decks').delete().eq('id', id).eq('owner_id', owner_id);
}

export async function renameDeck(supabase, id, owner_id, title) {
	const { error } = await supabase
		.from('decks')
		.update({
			title
		})
		.eq('id', id)
		.eq('owner_id', owner_id)
		.single();

	if (error) {
		return { error: error.code === '23505' ? 'Flashcard deck already exists.' : 'An error occurred.' }
	}
}

export async function getFlashcards(supabase, id, owner_id) {
	return supabase
		.from('decks')
		.select(
			`
			*,
			flashcards (*)`
		)
		.eq('id', id)
		.eq('owner_id', owner_id)
		.single();
}
