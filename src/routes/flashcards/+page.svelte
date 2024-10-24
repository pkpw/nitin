<script>
    import { supabase } from '$lib/db'
  
  
    let flashdecks= []
    let flashdeckName = ''
    let flashdeckRename = []
  
    const fetchFlashdecks = async () =>{
      const { data: flashdeck, error } = await supabase
        .from('flashdeck')
        .select('*')
        if (error) console.error(error)
        else flashdecks = flashdeck  
    }
    const createFlashdeck = async () =>{
      //can add restrictions for specific wants for flashdeck
        const { data: flashdeck, error } = await supabase 
        .from('flashdeck')
        .insert([{name: flashdeckName}])
        if (error) console.error(error)
        fetchFlashdecks()
      
    }
  
    // currently can't delete if there are flashcards related to it
    const deleteFlashdeck = async (flashdeckId) =>{
      const { data: flashdeck, error } = await supabase
        .from('flashdeck')
        .delete()
        .eq('id',flashdeckId)
        if (error) console.error(error)
        fetchFlashdecks()
    }
  
    const updateFlashdeckName = async (flashdeckId) =>{
      const { data: flashdeck, error } = await supabase
        .from('flashdeck')
        .update([{name:flashdeckRename[flashdeckId]}])
        .eq('id',flashdeckId)
        if (error) console.error(error)
        fetchFlashdecks()
      
    }
    
  
  fetchFlashdecks()
  </script>
  <!-- stolen code ty zach -->
  <div class="mx-auto p-8">
    <h1 class="text-2xl text-white font-bold">Flashcard Decks</h1>
  
    <input 
        type="text" 
        bind:value={flashdeckName}
        placeholder="Enter Flashcard Deck Name" 
        class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
    />
  
    <button 
        class="px-4 py-2 bg-stone-500 text-white rounded-md ml-4" 
        on:click={async()=>{
          await createFlashdeck()
          flashdeckName = ''
          }
        }
    >
        Create Flashcard Deck
    </button>
  
    <ul class="mt-8">
        {#each flashdecks as flashdeck}
            <li class="border text-white bg-slate-700 p-4 rounded-md mb-4">
                <a href="http://localhost:5173/flashcards/{encodeURIComponent(flashdeck.id)}">{flashdeck.name}</a> (Created at: {new Date(flashdeck.created_at).toLocaleString()})
                <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={() => deleteFlashdeck(flashdeck.id)}>Delete</button>
                <input
                  type="text" 
                  bind:value={flashdeckRename[flashdeck.id]}
                  placeholder="Enter New Flashdeck Name" 
                  class="p-2 border-stone-900 text-black border-2 rounded-md w-1/3 mt-4" 
                />
                <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={async() => {
                  await updateFlashdeckName(flashdeck.id)
                  flashdeckRename[flashdeck.id] = ''
                  }
                }>Rename</button>
  
            </li>
        {/each}
    </ul>
  </div>
  
  
  