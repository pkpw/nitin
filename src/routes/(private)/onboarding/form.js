export const schema = {
	type: 'object',
	properties: {
		first_name: { type: 'string', maxLength: 32, pattern: '[^\\s]+' },
		last_name: { type: 'string', maxLength: 32, pattern: '[^\\s]+' }
	},
	required: ['first_name', 'last_name'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};
