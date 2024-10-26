<script>
  import { superForm } from 'sveltekit-superforms';
  export let data;
  const { form, errors, constraints, message, enhance } = superForm(data.form);
  let classrooms = data.classrooms;
  let userId = '';
  let role = 'student'; // Default role is set to 'student'

  async function deleteClassroom(classroomId) {
      try {
          const response = await fetch(`/classrooms/${classroomId}`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              console.error('Error deleting classroom:', response.statusText);
              return;
          }

          classrooms = classrooms.filter((classroom) => classroom.id !== classroomId);
      } catch (err) {
          console.error('Error while deleting classroom:', err);
      }
  }

  async function addUserToClassroom(classroomId, userId, role) {
      try {
          const response = await fetch(`/classrooms/${classroomId}/addUser`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId, role }),
          });

          if (!response.ok) {
              console.error('Error adding user to classroom:', response.statusText);
              return;
          }

          console.log('User added to classroom successfully!');
      } catch (err) {
          console.error('Error while adding user to classroom:', err);
      }
  }
</script>

<svelte:head>
  <title>Classrooms</title>
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
        aria-invalid={$errors.name ? 'true' : undefined}
        bind:value={$form.name}
        {...$constraints.name}
        class="form-input"
        placeholder="Enter classroom name"
      />
    </label>
    {#if $errors.name}
      <span class="text-red-500">Classroom name must be between 3 and 32 characters.</span>
    {/if}
    <button class="btn mt-4">Create Classroom</button> <!-- Reusing button styles from app.css -->
  </form>

  <h2 class="text-2xl mt-8 font-semibold">Existing Classrooms</h2>
  <ul class="mt-4 space-y-4">
    {#each classrooms as classroom}
      <li class="border border-white p-4 rounded-md bg-stone-950">
          <a href={`/classrooms/${classroom.id}`} class="text-blue-500 underline">{classroom.name}</a>
          <span class="text-sm">(Created at: {new Date(classroom.created_at).toLocaleString()})</span>
        <button
          class="btn mt-4 px-2 py-1 bg-red-500"
          on:click={() => deleteClassroom(classroom.id)}
        >
          Delete
        </button>

        <div class="mt-4">
          <h3 class="text-lg font-semibold">Add User to Classroom</h3>
          <form method="POST" action="?/addUser" on:submit|preventDefault={() => addUserToClassroom(classroom.id, userId, role)}>
              <label class="block">
                User ID:
                <input type="text" bind:value={userId} required class="form-input" />
              </label>
              <label class="mt-2 block">
                Role:
                <select bind:value={role} class="form-input">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </label>
              <button class="btn mt-2">Add User</button>
          </form>
        </div>
      </li>
    {/each}
  </ul>
</div>