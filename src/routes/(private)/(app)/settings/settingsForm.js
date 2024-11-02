export const schema = {
	type: 'object',
	properties: {
		first_name: {
			type: 'string',
			maxLength: 32,
			pattern: '^\\S+$'
		},
		last_name: {
			type: 'string',
			maxLength: 32,
			pattern: '^\\S+$'
		},
		theme: { type: 'string', enum: ['light', 'dark', 'system'] }
	},
	required: ['first_name', 'last_name', 'theme'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};
