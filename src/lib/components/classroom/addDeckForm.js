export const schema = {
    type: 'object',
    properties: {
        classroom_id: {
            type: 'string',
            format: 'uuid'
        },
        deck_id: {
            type: 'string',
            format: 'uuid'
        }
    },
    required: ['classroom_id', 'deck_id'],
    additionalProperties: false
};