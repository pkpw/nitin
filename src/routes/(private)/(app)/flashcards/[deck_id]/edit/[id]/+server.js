import { db } from '$lib/server/database.js'

export async function POST({ locals: { supabase }, request }) {
  const body = await request.json()
  const { data, error } = await db.saveFlashcard(supabase, body.id, body.front, null)
  if (error) {
    return new Response({
      error
    })
  }

  return new Response()
}