import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';

export async function load({ parent }) {
	const { profile } = await parent();
	const adapter = schemasafe(schema);
	const form = await superValidate(
		{
			first_name: profile.first_name,
			last_name: profile.last_name,
			theme: profile.theme
		},
		adapter
	);

	return { form };
}
