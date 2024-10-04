<script>
    import { supabase } from '$lib/db'
  
  
    let flashcards= []
    let flashcardName = ''
    let flashcardRename = []
    let flashcardFront = []
    let flashcardBack = []
  
    const fetchFlashcards = async () =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .select('*')
        if (error) console.error(error)
        else flashcards = flashcard  
    }
    const createFlashcard = async () =>{
      //can add restrictions for specific wants for flashcard
        const { data: flashcard, error } = await supabase 
        .from('flashcard')
        .insert([{name: flashcardName}])
        if (error) console.error(error)
        fetchFlashcards()
      
    }
  
    // onMount(fetchFlashcards)
    const deleteFlashcard = async (flashcardId) =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .delete()
        .eq('id',flashcardId)
        if (error) console.error(error)
        fetchFlashcards()
    }
  
    const updateFlashcardName = async (flashcardId) =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .update([{name:flashcardRename[flashcardId]}])
        .eq('id',flashcardId)
        if (error) console.error(error)
        fetchFlashcards()
      
    }
    const updateFlashcardFront = async (flashcardId) =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .update([{front:flashcardFront[flashcardId]}])
        .eq('id',flashcardId)
        if (error) console.error(error)
        fetchFlashcards()
      
    }
    const updateFlashcardBack = async (flashcardId) =>{
      const { data: flashcard, error } = await supabase
        .from('flashcard')
        .update([{back:flashcardBack[flashcardId]}])
        .eq('id',flashcardId)
        if (error) console.error(error)
        fetchFlashcards()
      
    }
    
  
  fetchFlashcards()
  </script>
  <!-- stolen code ty zach -->
  <div class="mx-auto p-8">
    <h1 class="text-2xl font-bold">Flashcards</h1>
  
    <input 
        type="text" 
        bind:value={flashcardName}
        placeholder="Enter Flashcard Name" 
        class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
    />
  
    <button 
        class="px-4 py-2 bg-stone-500 text-white rounded-md ml-4" 
        on:click={async()=>{
          await createFlashcard()
          flashcardName = ''
          }
        }
    >
        Create Flashcard
    </button>
  
    <ul class="mt-8">
        {#each flashcards as flashcard}
            <li class="border p-4 rounded-md mb-4">
                {flashcard.name} (Created at: {new Date(flashcard.created_at).toLocaleString()})
                <button class="border p-4 rounded-md mb-4" on:click={() => deleteFlashcard(flashcard.id)}>Delete</button>
                <input
                  type="text" 
                  bind:value={flashcardRename[flashcard.id]}
                  placeholder="Enter New Flashcard Name" 
                  class="p-2 border-stone-900 border-2 rounded-md w-1/4 mt-4" 
                />
                <button class="border p-4 rounded-md mb-4" on:click={async() => {
                  await updateFlashcardName(flashcard.id)
                  flashcardRename[flashcard.id] = ''
                  }
                }>Rename</button>
                <input
                type="text" 
                bind:value={flashcardFront[flashcard.id]}
                placeholder="Enter New Question" 
                class="p-2 border-stone-900 border-2 rounded-md w-1/4 mt-4" 
              />
              <button class="border p-4 rounded-md mb-4" on:click={async() => {
                await updateFlashcardName(flashcard.id)
                flashcardRename[flashcard.id] = ''
                }
              }>New Front</button>
              <input
              type="text" 
              bind:value={flashcardBack[flashcard.id]}
              placeholder="Enter New Answer" 
              class="p-2 border-stone-900 border-2 rounded-md w-1/4 mt-4" 
            />
            <button class="border p-4 rounded-md mb-4" on:click={async() => {
              await updateFlashcardName(flashcard.id)
              flashcardRename[flashcard.id] = ''
              }
            }>New Back</button>
  
            </li>
        {/each}
    </ul>
  </div>