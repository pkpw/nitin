// src/routes/classrooms/+page.server.js
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { getAllClassrooms, createClassroom, deleteClassroom } from '$lib/classroom';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 32 }
  },
  required: ['name'],
  additionalProperties: false,
  $schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async () => {
  const { data: classrooms, error } = await getAllClassrooms();
  if (error) {
    return fail(500, { error: 'Failed to load classrooms' });
  }

  const form = await superValidate(schemasafe(schema));
  return { form, classrooms };
};

export const actions = {
  createClassroom: async ({ request }) => {
    const form = await superValidate(request, schemasafe(schema));
    if (!form.valid) return fail(400, { form });

    const { data, error } = await createClassroom(form.data.name);
    if (error) {
      console.error('Failed to create classroom:', error);
      return fail(500, { form, error: 'Failed to create classroom' });
    }
    return message(form, 'Classroom created successfully');
  }
};