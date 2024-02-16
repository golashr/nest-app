export const AjvCatSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    breed: { type: 'string' },
    sex: { type: 'string' },
  },
  required: ['name', 'age', 'breed'],
  additionalProperties: false,
};
