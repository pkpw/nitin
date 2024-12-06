export async function getQuizzes(supabase, owner_id) {
    return supabase.from('quizzes').select().eq('owner_id', owner_id);
}

export async function createQuiz(supabase, owner_id, title) {
    const colors = [
        '#ef4444', // red-500
        '#f97316', // orange-500
        '#eab308', // yellow-500
        '#22c55e', // green-500
        '#14b8a6', // teal-500
        '#0ea5e9', // sky-500
        '#3b82f6', // blue-500
        '#a855f7', // purple-500
        '#ec4899'  // pink-500
    ];

    const { data: quiz, error } = await supabase
        .from('quizzes')
        .insert({
            owner_id,
            title,
            color: colors[Math.floor(Math.random() * colors.length)]
        })
        .select()
        .single();

    if (error) {
        return { error: 'Quiz already exists.' };
    }

    if (!quiz) {
        return { error: 'Quiz already exists.' };
    }

    return quiz;
}

export async function deleteQuiz(supabase, id, owner_id) {
    return supabase.from('quizzes').delete().eq('id', id).eq('owner_id', owner_id);
}

export async function renameQuiz(supabase, id, owner_id, title) {
    const { error } = await supabase
        .from('quizzes')
        .update({ title })
        .eq('id', id)
        .eq('owner_id', owner_id);

    if (error) {
        return {
            error: error.code === '23505' ? 'Quiz already exists.' : 'An error occurred.'
        };
    }

    return {};
}