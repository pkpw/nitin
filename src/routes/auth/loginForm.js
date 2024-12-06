export const loginForm = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' }
	},
	required: ['email'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};
