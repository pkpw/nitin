<script>
  import { superForm } from 'sveltekit-superforms';
  import { getAllClassrooms, deleteClassroom } from '$lib/classroom.js';
  export let data;
  const { form, errors, message, enhance } = superForm(data.form);
  let classrooms = data.classrooms;


  async function handleDelete(classroomId) {
    const response = await fetch(`/classrooms/${classroomId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      window.alert("Successfully deleted classroom");      
      classrooms = classrooms.filter((classroom) => classroom.id !== classroomId);
    } else {
      const result = await response.json();
      alert(`Failed to delete classroom: ${result.message}`);
    }
  }
  
  async function reloadClassrooms() {
    classrooms=data.classrooms;
  }
  // Log the content of $message to see if it contains the success text
  $: console.log("Form Message Content:", $message);
  $: if ($message) {
    window.alert($message);
    reloadClassrooms(); 
  }
</script>

<svelte:head>
  <title>Create Classroom</title>
</svelte:head>

<div class="bg-stone-950 min-h-screen p-8 text-white">
  <a href="/" class="text-blue-500">Back</a>
  <h1 class="text-3xl font-bold">Create a New Classroom</h1>
  <form method="POST" action="?/createClassroom" use:enhance class="mt-6">
    <label class="block text-lg">
      Classroom Name
      <input
        name="name"
        type="text"
        bind:value={$form.name}
        class="form-input"
        placeholder="Enter classroom name"
        required
      />
    </label>
    {#if $errors.name}
      <span class="text-red-500">Classroom name must be between 3 and 32 characters.</span>
    {/if}
    <button class="btn mt-4">Create Classroom</button>
  </form>
  <h2 class="text-2xl mt-8 font-semibold">Existing Classrooms</h2>
  <ul class="mt-4 space-y-4">
    {#each classrooms as classroom}
      <li class="border border-white p-4 rounded-md bg-stone-950">
        <span class="text-blue-500">{classroom.name}</span>
        <span class="text-sm">(Created at: {new Date(classroom.created_at).toLocaleString()})</span>
        <button class="btn mt-4 px-2 py-1 bg-red-500" on:click={() => handleDelete(classroom.id)}>
					Delete
				</button>
      </li>
    {/each}
  </ul>
</div>