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

  // onMount(fetchFlashdecks)
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
  <h1 class="text-2xl font-bold">Flashdecks</h1>

  <input 
      type="text" 
      bind:value={flashdeckName}
      placeholder="Enter Flashdeck Name" 
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
      Create Flashdeck
  </button>

  <ul class="mt-8">
      {#each flashdecks as flashdeck}
          <li class="border p-4 rounded-md mb-4">
              {flashdeck.name} (Created at: {new Date(flashdeck.created_at).toLocaleString()})
              <button class="border p-4 rounded-md mb-4" on:click={() => deleteFlashdeck(flashdeck.id)}>Delete</button>
              <input
                type="text" 
                bind:value={flashdeckRename[flashdeck.id]}
                placeholder="Enter New Flashdeck Name" 
                class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
              />
              <button class="border p-4 rounded-md mb-4" on:click={async() => {
                await updateFlashdeckName(flashdeck.id)
                flashdeckRename[flashdeck.id] = ''
                }
              }>Rename</button>

          </li>
      {/each}
  </ul>
</div>


