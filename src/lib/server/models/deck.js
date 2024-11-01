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

	const { exists, error } = await doesDeckExist(supabase, owner_id, title);
	if (error) {
		return { error };
	} else if (exists) {
		return { error: 'Flashcard deck already exists!' };
	}

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
		return { error: deckError };
	}

	const { flashcardError } = await db.createFlashcard(supabase, deck.id);
	if (flashcardError) {
		return { error: flashcardError };
	}

	return deck;
}

export async function deleteDeck(supabase, id, owner_id) {
	return supabase.from('decks').delete().eq('id', id).eq('owner_id', owner_id);
}

export async function renameDeck(supabase, id, owner_id, title) {
	const { exists, error } = await doesDeckExist(supabase, owner_id, title);
	if (error) {
		return { error };
	} else if (exists) {
		return { error: 'Flashcard deck already exists!' };
	}

	return supabase
		.from('decks')
		.update({
			title
		})
		.eq('id', id)
		.eq('owner_id', owner_id);
}

export async function getFlashcards(supabase, id, owner_id) {
	return supabase
		.from('decks')
		.select(
			`
        id,
        owner_id
        flashcards ( id, deck_id )`
		)
		.eq('id', id)
		.eq('owner_id', owner_id);
}
