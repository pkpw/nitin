import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { schema } from './form.js';

export const load = async ({ data, parent, url }) => {
	const { profile } = await parent();

	const next = url.searchParams.get('next') ?? '/dashboard';
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('next');

	if (profile.is_onboarded) {
		redirect(303, redirectTo);
	}

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		...data,
		form
	};
};
