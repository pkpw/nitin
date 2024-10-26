<script>
    export let data;
    let classroom = data.classroom;
    let profiles = data.profiles; // The list of profiles
    let selectedUserId = '';
    let role = 'student'; // Default role is set to 'student'
    let instructors = profiles.filter(profile => classroom.instructors.includes(profile.id));
    let students = profiles.filter(profile => classroom.students.includes(profile.id));


    async function loadUsers() {
    try {
        const response = await fetch(`/classrooms/${classroom.id}/users`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            console.error('Error fetching users:', response.statusText);
            return;
        }

        const data = await response.json();
        instructorsList = data.instructors;
        studentsList = data.students;
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

loadUsers();

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
            loadUsers(); // Reload users to refresh the list of students/instructors
        } catch (err) {
            console.error('Error while adding user to classroom:', err);
        }
    }
    loadUsers();
</script>

<svelte:head>
    <title>{classroom.name}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<div class="bg-stone-950 min-h-screen p-8 text-white flex flex-col items-center">
    <div class="w-full max-w-4xl mb-8 flex items-center justify-center">
        <h1 class="text-5xl font-bold text-center">{classroom.name}</h1>
    </div>

    <div class="w-full max-w-4xl mt-8">
        <h3 class="text-2xl font-semibold">Add User to Classroom</h3>
        <form on:submit|preventDefault={addUserToClassroom} class="mt-4">
            <label class="block">
              Select User:
              <select bind:value={selectedUserId} required class="form-input">
                <option value="" disabled>Select a user</option>
                {#each profiles as profile}
                    <option value={profile.id}>{profile.first_name} {profile.last_name}</option>
                {/each}
              </select>
            </label>
            <label class="mt-2 block">
              Role:
              <select bind:value={role} class="form-input">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </label>
            <button class="btn" type="submit">Add User</button>
        </form>
    </div>
    <!-- Display Users Section -->
    <div class="mt-8">
        <h3 class="text-2xl font-semibold">Classroom Users</h3>
        <div class="mt-4">
            <h4 class="text-xl font-semibold">Instructors:</h4>
            <ul class="mt-2 space-y-2">
                {#if instructors.length > 0}
                  {#each instructors as instructor}
                    <li class="border border-stone-700 p-4 rounded-md bg-stone-800 text-white">
                        {instructor.first_name} {instructor.last_name}
                    </li>
                  {/each}
                {:else}
                  <p>No instructors assigned yet.</p>
                {/if}
            </ul>
        </div>

        <div class="mt-4">
            <h4 class="text-xl font-semibold">Students:</h4>
            <ul class="mt-2 space-y-2">
                {#if students.length > 0}
                  {#each students as student}
                    <li class="border border-stone-700 p-4 rounded-md bg-stone-800 text-white">
                        {student.first_name} {student.last_name}
                    </li>
                  {/each}
                {:else}
                  <p>No students assigned yet.</p>
                {/if}
            </ul>
        </div>
    </div>
</div>

<style>
    .invalid {
      color: red;
    }
</style>