import { db } from '$lib/server/database.js'

export async function POST({ locals: { supabase }, request }) {
  const body = await request.json()
  const { data, error } = await db.saveFlashcard(supabase, body.id, body.front, null)
  console.log(data)
  if (error) {
    console.log(error)
    return new Response({
      error: 'error'
    })
  }

  return new Response()
}