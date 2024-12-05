export const schema = {
	type: 'object',
	properties: {
		id: { type: 'integer' },
		name: { type: 'string'}
	},
	required: ['id', 'name'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};