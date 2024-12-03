import { db } from '$lib/server/database.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase }, params, parent }) {
	const { deck } = await parent();

	if (!params.id) {
		if (deck.flashcards.length > 0) {
			redirect(303, `/flashcards/${params.deck_id}/edit/${deck.flashcards[0].id}`);
		} else {
			const { data: flashcard, error: dbError } = await db.createFlashcard(
				supabase,
				params.deck_id,
				'My Flashcard'
			);
			if (dbError) {
				error(500);
			}
			// console.log(flashcard)
			redirect(303, `/flashcards/${params.deck_id}/edit/${flashcard.id}`);
		}
	}

	return {
		deck
	};
}
