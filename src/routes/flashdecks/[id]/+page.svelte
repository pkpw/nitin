<script>
    import {supabase} from '$lib/db'
    export let data
    const flashcardIn = data.connected
    const flashcardOut = data.notConnected
    
    
    
    let flashcardsIn = []
    let flashcardsOut = []

    const fetchFlashcardsInDeck = async () =>{
      const { data: flashcard, error } = await supabase
        .from('flashcards')
        .select('*')
        .in('id',flashcardIn)
        if (error) console.error(error)
        else flashcardsIn = flashcard  
    }
    const fetchFlashcardsOutDeck = async () =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .select('*')
        .in('id',flashcardOut)
        if (error) console.error(error)
        else flashcardsOut = flashcard  
    }
    // const addFlashcard = async (flashcardId) =>{
    //   const { data: flashcard, error } = await supabase
    //     .from('flashcard_to_deck')
    //     .insert('flashcard')
    //     .eq('flashdeck', id)
    //     if (error) console.error(error)
        
    // }
    // const removeFlashcard = async (flashcardId) =>{
    //   const { data: flashcard, error } = await supabase
    //     .from('flashcard_to_deck')
    //     .delete()
    //     .eq('flashdeck', flashdeckId)
    //     .eq('flashcard',flashcardId)
    //     if (error) console.error(error)     
    // }
    
</script>
