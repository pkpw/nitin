import { json } from '@sveltejs/kit';
import { validator } from '@exodus/schemasafe';
import { schema } from '../../../../(private)/(app)/flashcards/form.js';

export async function POST({ locals: { supabase, safeGetSession }, request }) {
    const { session } = await safeGetSession();
    if (!session) {
        return json({ error: 'No user session' });
    }

    const body = await request.json();

    const validate = validator(schema)
    if (!validate({ title: body.title.trim() })) {
        return json({ error: 'Name is not valid' })
    }

    console.log('create ' + body.title)

    // const { error } = FlashcardDeck.create(supabase, params.id, params.title)
    // if (error) {
    //     return json({ error })
    // }

    return json({data: undefined})
}