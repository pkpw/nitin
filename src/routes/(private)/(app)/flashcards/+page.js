import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';
import { superValidate } from 'sveltekit-superforms';

export async function load({ data, fetch }) {
	const response = await fetch('/api/decks', {
		method: 'GET'
	});

	const { data: flashcard_decks, error } = await response.json();

	const adapter = schemasafe(schema);
	const createForm = await superValidate(adapter);
	const renameForm = await superValidate(adapter);

	return {
		...data,
		flashcard_decks,
		error,
		createForm,
		renameForm
	};
}
