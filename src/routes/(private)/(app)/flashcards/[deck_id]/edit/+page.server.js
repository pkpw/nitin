import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { deck } = await parent();

	if (!params.id) {
		redirect(303, `/flashcards/${params.deck_id}/edit/${deck.flashcards[0].id}`);
	}

	return {
		deck
	};
}
