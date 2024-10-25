<script>
    export let data;
    let classroom = data.classroom;
    let profiles = data.profiles; // The list of profiles
    let selectedUserId = '';
    let role = 'student'; // Default role is set to 'student'

    async function addUserToClassroom() {
        try {
            const response = await fetch(`/classrooms/${classroom.id}/addUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: selectedUserId, role })
            });

            if (!response.ok) {
                console.error('Error adding user to classroom:', response.statusText);
                return;
            }

            console.log('User added to classroom successfully!');
            selectedUserId = ''; // Clear the selection after adding
        } catch (err) {
            console.error('Error while adding user to classroom:', err);
        }
    }
</script>

<svelte:head>
    <title>{classroom.name}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<div class="bg-black min-h-screen p-8 text-white flex flex-col items-center">
    <div class="w-full max-w-4xl mb-8 flex items-center justify-center">
        <h1 class="text-5xl font-bold text-center">{classroom.name}</h1>
    </div>

    <div class="w-full max-w-4xl mt-8">
        <h3 class="text-2xl font-semibold">Add User to Classroom</h3>
        <form on:submit|preventDefault={addUserToClassroom} class="mt-4">
            <label class="block">
              Select User:
              <select bind:value={selectedUserId} required class="mt-1 p-2 border border-white rounded-md w-full bg-black text-white">
                <option value="" disabled>Select a user</option>
                {#each profiles as profile}
                    <option value={profile.id}>{profile.first_name} {profile.last_name}</option>
                {/each}
              </select>
            </label>
            <label class="mt-2 block">
              Role:
              <select bind:value={role} class="mt-1 p-2 border border-white rounded-md w-full bg-black text-white">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </label>
            <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">Add User</button>
        </form>
    </div>
</div>

<style>
    .invalid {
      color: red;
    }
</style>