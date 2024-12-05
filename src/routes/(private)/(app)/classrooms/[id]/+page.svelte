<script>
    import { superForm } from 'sveltekit-superforms';
    export let data;
    let classroom = data.classroom;
    const { form, message, enhance } = superForm(data.renameForm);

    let renameError = '';
    let deleteError = '';

    async function reloadClassroom() {
    classroom=data.classroom;
  }
  $: if ($message) {
    reloadClassroom(); 
  }
   
// Watch for changes to the rename message and clear it after 5 seconds
    $: if ($message) {
        clearRenameMessageAfterTimeout();
        }

        function clearRenameMessageAfterTimeout() {
        setTimeout(() => {
            message.set(null); // Clear the message after 5 seconds
        }, 5000);
    }
</script>

<svelte:head>
    <title>{classroom?.name || 'Classroom Details'}</title>
</svelte:head>

<h1 class="text-4xl font-bold">Classroom: {classroom?.name}</h1>
<p>Created at: {classroom?.created_at ? new Date(classroom.created_at).toLocaleDateString() : 'Invalid Date'}</p>
<p>Description: {classroom?.description || 'No description available'}</p>

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

<a href="/classrooms" class="btn-secondary mt-8">Back to Classrooms</a>