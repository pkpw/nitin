import { getAllClassrooms, createClassroom, addUserToClassroom } from '$lib/classroom';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 32 }
  },
  required: ['name'],
  additionalProperties: false,
  $schema: 'http://json-schema.org/draft-07/schema#'
};

export const load = async ({ locals: { supabase } }) => {
  const { data: classrooms, error } = await getAllClassrooms(supabase);
  
  if (error) {
    console.error('Error retrieving classrooms:', error);
    return fail(500, { error: 'Failed to load classrooms' });
  }

  const adapter = schemasafe(schema);
  const form = await superValidate(adapter);

  return {
    form,
    classrooms
  };
};

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, schemasafe(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await createClassroom(form.data.name, supabase);

    if (error) {
      console.error('Error creating classroom:', error);
      return fail(500, { error: 'Failed to create classroom' });
    }

    return { success: true, form };
  },

  addUser: async ({ request, locals: { supabase }, params }) => {
    const formData = await request.formData();
    const userId = formData.get('userId');
    const role = formData.get('role') || 'student';

    if (!userId) {
      return fail(400, { error: 'User ID is required' });
    }

    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return fail(404, { error: 'User not found in profiles' });
    }

    const { error } = await addUserToClassroom(params.id, userId, role, supabase);

    if (error) {
      return fail(500, { error: 'Failed to add user to classroom' });
    }

    return { success: true };
  }
};