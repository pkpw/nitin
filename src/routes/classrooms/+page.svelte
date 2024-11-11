<script>
  import { superForm } from 'sveltekit-superforms';
  import { getAllClassrooms, deleteClassroom } from '$lib/classroom.js';
  import Modal from '$lib/components/Modal.svelte'; 
  export let data;
  
  const { form, errors, message, enhance } = superForm(data.form);
  let classrooms = data.classrooms;
  let showModal = false;
  let modalMessage = "";
  let isConfirmModal = false; // Determines if the modal is confirm/cancel or dismiss
  let classroomToDelete = null; 

  function confirmDelete(classroomId) {
    classroomToDelete = classroomId;
    modalMessage = "Are you sure you want to delete this classroom?";
    isConfirmModal = true;
    showModal = true;
  }

  async function handleDelete() {
    if (!classroomToDelete) return;

    const response = await fetch(`/classrooms/${classroomToDelete}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      classrooms = classrooms.filter((classroom) => classroom.id !== classroomToDelete);
      modalMessage = "Classroom successfully deleted.";
    } else {
      const result = await response.json();
      modalMessage = `Failed to delete classroom: ${result.message}`;
    }

    classroomToDelete = null;
    showModal = false;
  }

  async function reloadClassrooms() {
    classrooms = data.classrooms;
  }

  // Show success message for add classroom with a dismiss-only modal
  $: if ($message) {
    modalMessage = $message;
    isConfirmModal = false;
    showModal = true;
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
        <button class="btn mt-4 px-2 py-1 bg-red-500" on:click={() => confirmDelete(classroom.id)}>
          Delete
        </button>
      </li>
    {/each}
  </ul>

  <!-- Modal Component -->
  {#if showModal}
    <Modal 
      close={(confirm) => {
        if (isConfirmModal) {
          if (confirm) handleDelete();
          showModal = false;
        } else {
          showModal = false;
        }
      }} 
      message={modalMessage} 
      isConfirm={isConfirmModal}
    />
  {/if}
</div>