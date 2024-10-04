import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

let supabase;

export function getSupabaseClient({ cookies }) {
    if (cookies) {
        supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            cookies: {
                get: (name) => cookies[name]
            }
        });
    }
    return supabase;
}