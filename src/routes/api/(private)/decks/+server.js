import { Decks } from '$lib/decks.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();
	if (!session) {
		return json({ error: 'No user session' });
	}

	const { data, error } = await Decks.retrieveAll(supabase, session.user.id);
	if (error) {
		return json({ error: 'Could not retrieve profile' });
	}

	return json({ data });
};
