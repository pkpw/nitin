import { supabase } from '$lib/db';
export async function load({ params }) {
	const { id } = params;

	//fetchFlashcardIDs
	const { flashcards, flasherror } = await supabase.from('flashcards').select('id');
	if (flasherror) console.error(flasherror);

	const { connected, connerror } = await supabase
		.from('flashcard_to_deck')
		.select('flashcard')
		.eq('flashdeck', id);
	if (connerror) console.error(connerror);

	const notConnected = flashcards.filter((value) => connected.includes(value));
	return {
		notConnected,
		connected
	};
}
