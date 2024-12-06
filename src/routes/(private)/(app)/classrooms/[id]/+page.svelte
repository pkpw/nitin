<script>
    import { superForm } from 'sveltekit-superforms';
    import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
    export let data;
    let classroom = data.classroom;
    let decks= data.decks;
    let classroomDecks = data.classroomDecks; 
    const { form, message, enhance } = superForm(data.renameForm);

    let renameError = '';
    let deleteError = '';

    async function reloadClassroom() {
    classroom=data.classroom;
    classroomDecks = data.classroomDecks;
    decks=data.decks; 
  }
    
  $: if ($message ) {
    reloadClassroom(); 
  }
    $: if ($message) {
        clearRenameMessageAfterTimeout();
        }
        function clearRenameMessageAfterTimeout() {
        setTimeout(() => {
            message.set(null); 
        }, 5000);
        }
</script>

<svelte:head>
    <title>{classroom?.name || 'Classroom Details'}</title>
</svelte:head>

<h1 class="text-4xl font-bold">Classroom: {classroom?.name}</h1>
<p>Created at: {classroom?.created_at ? new Date(classroom.created_at).toLocaleDateString() : 'Invalid Date'}</p>

<!-- Rename Classroom Form -->
<form method="POST" action="?/rename" use:enhance={(submit) => {
        submit.result.then((response) => {
        });
    }} class="bg-gray-800 p-4 rounded-lg mt-4">
    <input type="hidden" name="id" value={classroom?.id} />
    <label class="block mb-4">
        <span class="text-white">New Classroom Name</span>
        <input
            type="text"
            name="name"
            placeholder="Enter new name"
            bind:value={$form.name}
            class="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
            required
        />
    </label>
    {#if renameError}
        <p>{renameError}</p>
    {/if}
    <button type="submit" class="btn-primary">Rename Classroom</button>
    {#if $message}
        <p class="text-green-500 mt-4">{$message}</p>
    {/if}
</form>

<!-- Delete Classroom Form -->
<form method="POST" action="?/delete" >
    <input type="hidden" name="id" value={classroom?.id} />
    {#if deleteError}
        <p>{deleteError}</p>
    {/if}
    <button type="submit" class="btn-primary w-full rounded-md">Delete Classroom</button>
</form>
<form
    method="POST"
    action="?/addDeck"
    use:enhance={(submit) => {
        submit.result.then((response) => {
        });
    }}
    class="bg-gray-800 p-4 rounded-lg mt-4"
>
    <input type="hidden" name="classroomId" value={classroom?.id} />
    <label class="block mb-4">
        <span class="text-white">Select a Deck to Add</span>
        <select
            name="deckId"
            required
            class="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
        >
            <option value="" disabled selected>Select a Deck</option>
            {#each data.decks as deck}
                <option value={deck.id}>{deck.title}</option>
            {/each}
        </select>
    </label>

    <button
    class="btn-primary"
    type="submit"
>
    Add Deck to Classroom
</button>   
    {#if $message}
    <p class="text-green-500 mt-4">{$message}</p>
    {/if}
</form>
<h2 class="text-xl font-bold mt-6">Decks in this Classroom</h2>
{#if classroomDecks.length > 0}
    <ul class="mt-4">
        {#each classroomDecks as deck}
        <li class="mb-2">
            <a
                href={`/flashcards`}
                class="text-blue-500 hover:underline"
            >
                <span class="font-semibold">{deck.decks.title}</span>
            </a>
            <span class="text-gray-500">({deck.decks.color})</span>
            </li>
        {/each}
    </ul>
{:else}
    <p class="text-gray-500 mt-4">No decks added to this classroom yet.</p>
{/if}
<a href="/classrooms" class="btn-secondary mt-8">Back to Classrooms</a>