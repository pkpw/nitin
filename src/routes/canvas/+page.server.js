import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
    console.log('Load function called'); 
    // Fetch the user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
        console.error('Error getting user:', userError);
        return fail(401, { error: 'User not authenticated' });
    }

    // Fetch canvas data
    const { data: canvasData, error: canvasError } = await supabase
        .from('canvas')
        .select('canvas_data')
        .eq('id', 1) // Testing ID with one table entry
        .single();

    // Debug
    console.log('Fetched canvas data:', canvasData);

    if (canvasError) {
        console.error('Error fetching canvas data:', canvasError);
        return fail(500, { error: canvasError.message || 'Failed to load canvas data' });
    }

    console.log("Canvas data to be returned:", canvasData);
    
    return {
        
        canvasData: canvasData.canvas_data,
       
    };
    
};


export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const canvasData = formData.get('canvasData');

        if (!canvasData) {
            return fail(400, { error: 'Canvas data is required' });
        }

        let parsedData;
        try {
            parsedData = JSON.parse(canvasData);
        } catch (error) {
            console.error('Error parsing canvas data:', error);
            return fail(400, { error: 'Invalid canvas data format' });
        }

        const { error } = await supabase
            .from('canvas')
            .update({ canvas_data: parsedData })
            .eq('id', 1);

        if (error) {
            console.error('Error saving canvas to database:', error);
            return fail(500, { error: 'Failed to save canvas data' });
        }

        return { success: true };
    }
};
