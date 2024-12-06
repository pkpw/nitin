export const schema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid', default: '' }, 
        name: { type: 'string', minLength: 3, maxLength: 32, default: '' } 
    },
    required: ['id', 'name'],
    additionalProperties: false
};