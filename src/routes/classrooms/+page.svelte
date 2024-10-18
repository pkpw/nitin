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

<div class="bg-black min-h-screen p-8 text-white">
    <a href="/" class="text-blue-500">Back</a>

    <h1 class="text-3xl font-bold text-white">Create a New Classroom</h1>
    <form method="POST" use:enhance class="mt-6">
      <label class="block text-lg">
        Classroom Name
        <input
          name="name"
          type="text"
          aria-invalid={$errors.name ? 'true' : undefined}
          bind:value={$form.name}
          {...$constraints.name}
          class="mt-2 p-2 border border-blue-500 rounded-md w-full bg-black text-white"
          placeholder="Enter classroom name"
        />
      </label>
      {#if $errors.name}
        <span class="text-red-500">Classroom name must be between 3 and 32 characters.</span>
      {/if}
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Create Classroom</button>
    </form>

    <h2 class="text-2xl mt-8 font-semibold text-white">Existing Classrooms</h2>
    <ul class="mt-4 space-y-4">
      {#each classrooms as classroom}
        <li class="border border-white p-4 rounded-md bg-black text-white">
            <a href={`/classrooms/${classroom.id}`} class="text-blue-500 underline">{classroom.name}</a>
            <span class="text-sm">(Created at: {new Date(classroom.created_at).toLocaleString()})</span>
          <button
            class="ml-4 px-2 py-1 bg-red-500 text-white rounded-md"
            on:click={() => deleteClassroom(classroom.id)}
          >
            Delete
          </button>

          <div class="mt-4">
            <h3 class="text-lg font-semibold">Add User to Classroom</h3>
            <form on:submit|preventDefault={() => addUserToClassroom(classroom.id, userId, role)}>
                <label>
                  User ID:
                  <input type="text" bind:value={userId} required class="mt-1 p-2 border border-white rounded-md w-full bg-black text-white" />
                </label>
                <label class="mt-2">
                  Role:
                  <select bind:value={role} class="mt-1 p-2 border border-white rounded-md w-full bg-black text-white">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </label>
                <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">Add User</button>
            </form>
          </div>
        </li>
      {/each}
    </ul>
</div>

<style>
    .invalid {
      color: red;
    }
</style>