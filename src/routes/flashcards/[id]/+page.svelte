<script>
  import { supabase } from '$lib/db'
  export let data
  const flashdeck = data.flashdeck
  const fdid = data.fdid
  
  let useCards = false
  let scroll = 0
  let flashcards= []
  let flips= []
  let flashcardFrontName = ''
  let flashcardBackName = ''
  let flashcardOrder = 0
  let flashcardFront = []
  let flashcardBack = []
  //flashcard order is terrible need a better way to do this but I have been up for over a day now and don't wanna
  const fetchFlashcards = async () =>{
    const { data: flashcard, error } = await supabase
      .from('flashcard')
      .select('*')
      .eq("deck_id",fdid)
      if (error) console.error("error loading flashcards",error)
      else flashcards = flashcard  
    //need to add order finding
  }
  const createFlashcard = async () =>{
    //can add restrictions for specific wants for flashcard
      const { data: flashcard, error } = await supabase 
      .from('flashcard')
      .insert([{deck_id:fdid,
        front:flashcardFrontName,
        back:flashcardBackName,
        order: flashcardOrder
      }])
      flashcardOrder += 1
      if (error) console.error(error)
      fetchFlashcards()
    
  }

  
  const deleteFlashcard = async (flashcardId) =>{
    const { data: flashcard, error } = 
    updateOrderOnDelete(flashcardId)
    await supabase
      .from('flashcard')
      .delete()
      .eq('id',flashcardId)
      if (error) console.error(error)
      fetchFlashcards()
  }
  //again order is currently terrible and doesnt work
  const updateOrderOnDelete = async(flashcardId) =>{
    const {data: thisFlashcard, thisError} = await supabase
    .from('flashcard')
    .select('order')
    .eq('id', flashcardId)
    if(thisFlashcard==flashcardOrder){
      flashcardOrder-=1
    }
    else{
      const {data: flashcard,error} = await supabase
      .from('flashcard')
      .update({order: this.order-1})
      .gt(thisFlashcard)
    }
    
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
  <h1 class="text-2xl font-bold text-white">Flashcards</h1>
  <button class="px-4 py-2 bg-stone-500 text-white rounded-md ml-4" 
    on:click={()=>{ useCards = !useCards}}
    >
    Toggle Study</button>
  {#if useCards}
  <ul class="mt-8">
    {#each flashcards as flashcard}
        <li class="border text-white bg-slate-700 p-4 rounded-md mb-4">
          {#if !flips[flashcard.id]}
          {flashcard.front}
          {:else}
          {flashcard.back}
          {/if}
          <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={() => flips[flashcard.id]= !flips[flashcard.id]}>Flip Card</button>
            
        </li>
    {/each}
</ul>
  {:else}
  <input 
      type="text" 
      bind:value={flashcardFrontName}
      placeholder="Enter Flashcard Front" 
      class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
  />
  <input 
      type="text" 
      bind:value={flashcardBackName}
      placeholder="Enter Flashcard Back" 
      class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
  />

  <button 
      class="px-4 py-2 bg-stone-500 text-white rounded-md ml-4" 
      on:click={async()=>{
        await createFlashcard()
        flashcardFrontName = ''
        flashcardBackName = ''
        }
      }
  >
      Create Flashcard
  </button>

  <ul class="mt-8">
      {#each flashcards as flashcard}
          <li class="border text-white bg-slate-700 p-4 rounded-md mb-4">
              <!-- {flashcard.order} (Created at: {new Date(flashcard.created_at).toLocaleString()}) -->
              <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={() => deleteFlashcard(flashcard.id)}>Delete</button>
              {flashcard.front}
              <input
              type="text" 
              bind:value={flashcardFront[flashcard.id]}
              placeholder="Enter New Front" 
              class="p-2 border-stone-900 text-black border-2 rounded-md w-1/4 mt-4" 
            />
            <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={async() => {
              await updateFlashcardFront(flashcard.id)
              flashcardFront[flashcard.id] = ''
              }
            }>New Front</button>
            {flashcard.back}
            <input
            type="text" 
            bind:value={flashcardBack[flashcard.id]}
            placeholder="Enter New Back" 
            class="p-2 border-stone-900 text-black border-2 rounded-md w-1/4 mt-4" 
          />
          <button class="border p-4 bg-stone-500 rounded-md mb-4" on:click={async() => {
            await updateFlashcardBack(flashcard.id)
            flashcardBack[flashcard.id] = ''
            }
          }>New Back</button>

          </li>
      {/each}
  </ul>
  {/if}
</div>