import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';
import { writable } from 'svelte/store';

export async function load({ locals: { supabase, safeGetSession }, params }) {
	const { session } = await safeGetSession();

	const { data: deck, error: dbError } = await db.getFlashcards(
		supabase,
		params.id,
		session.user.id
	);
	if (dbError) {
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

export const actions = {
	save: async ({ locals: { supabase, safeGetSession }, request }) => {},
	create: async ({ locals: { supabase, safeGetSession }, request, params }) => {
		const { session } = await safeGetSession();
		const { error: dbError } = await db.createFlashcard(supabase, params.id);
		if (dbError) {
			error(500, dbError);
		}

		return {};
	},
	delete: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	},
	rename: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	},
	reorder: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { session } = await safeGetSession();
	}
};
