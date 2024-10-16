import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';

export async function load() {
	const schema = {
		type: 'object',
		properties: {
			first_name: {
				type: 'string',
				minLength: 1,
				maxLength: 32,
				pattern: '[^\\s]+'
			},
			last_name: {
				type: 'string',
				minLength: 1,
				maxLength: 32,
				pattern: '[^\\s]+'
			},
			theme: { type: 'string', enum: ['light', 'dark', 'system'] }
		},
		required: ['first_name', 'last_name', 'theme'],
		additionalPropertioes: false,
		$schema: 'http://json-schema.org/draft-07/schema#'
	};

	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	return {
		form
	};
}
