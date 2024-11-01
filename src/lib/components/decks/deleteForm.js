export const schema = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			format: 'uuid'
		}
	},
	required: ['id'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
};
