import { db } from '$lib/server/database.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase, safeGetSession }, params }) {
	const { session } = await safeGetSession();

	const { data: deck, error: dbError } = await db.getFlashcards(
		supabase,
		params.deck_id,
		session.user.id
	);
	if (dbError) {
		// User does not own flashcard deck
		if (dbError.code === 'PGRST116') {
			redirect(303, '/flashcards');
		} else {
			error(500);
		}
	}

	return {
		deck
	};
}
