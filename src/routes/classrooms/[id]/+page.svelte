<script>
    export let data;
    let classroom = data.classroom;

    let isEditing = false;
    let newClassroomName = classroom.name;

    async function updateClassroomName() {
        try {
            const response = await fetch(`/classrooms/${classroom.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newClassroomName })
            });

            if (!response.ok) {
                console.error('Error updating classroom name:', response.statusText);
                return;
            }

            classroom.name = newClassroomName;
            isEditing = false;
        } catch (err) {
            console.error('Error while updating classroom name:', err);
        }
    }

    function goBack() {
        history.back();
    }
</script>

<svelte:head>
    <title>{classroom.name}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<div class="bg-black min-h-screen p-8 text-white flex flex-col items-center">
    <div class="absolute top-4 left-4">
        <button class="text-blue-500" on:click={goBack}>
            ← Back
        </button>
    </div>

    <div class="w-full max-w-4xl mb-8 flex items-center justify-center">
        {#if isEditing}
            <input
                type="text"
                bind:value={newClassroomName}
                class="p-2 border border-blue-500 rounded-md bg-black text-white w-1/2"
            />
            <button
                class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                on:click={updateClassroomName}
            >
                Save
            </button>
            <button
                class="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                on:click={() => isEditing = false}
            >
                Cancel
            </button>
        {:else}
            <h1 class="text-5xl font-bold text-center">{classroom.name}</h1>
            <button class="ml-2" on:click={() => isEditing = true}>
                <span class="material-symbols-rounded">
                    edit
                </span>
            </button>
        {/if}
    </div>

    <div class="w-full max-w-4xl">
        <h3 class="block text-lg mb-4 text-left">Members:</h3>
        <h3 class="block text-lg mb-4 text-left">Flashcard Sets:</h3>
    </div>
</div>

<style>
    .material-symbols-rounded {
        font-size: 32px;
        vertical-align: middle;
        color: #FFFFFF;
    }

    h1 {
        display: inline;
    }

    button {
        font-size: 16px;
    }

    .absolute {
        position: absolute;
    }
</style>