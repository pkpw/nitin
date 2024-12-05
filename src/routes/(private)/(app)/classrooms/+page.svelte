<script>
	import { superForm } from 'sveltekit-superforms';
	export let data;
	$: ({ supabase } = data);
	const { form, errors, constraints, message, enhance } = superForm(data.createForm);
	let classrooms = data.classrooms;
	  
	async function reloadClassrooms() {
    classrooms=data.classrooms;
  }
  $: if ($message) {
    reloadClassrooms(); 
  }
 // Watch for changes to the message and set a timer to clear it
 $: if ($message) {
        clearMessageAfterTimeout();
    }

    function clearMessageAfterTimeout() {
        setTimeout(() => {
            message.set(null); // Clear the message after 5 seconds
        }, 5000);
    }
</script>

<svelte:head>
	<title>My Classrooms</title>
</svelte:head>

<div class="container mx-auto px-8 py-12">
	<h1 class="text-4xl font-bold mb-8">My Classrooms</h1>

	<!-- Form to Create Classroom -->
	<form method="POST" use:enhance class="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
		<h2 class="text-2xl font-semibold mb-4">Create a New Classroom</h2>

		<!-- Input for Classroom Name -->
		<label class="block mb-4">
			<span class="text-white">Classroom Name</span>
			<input
				type="text"
				name="name"
				bind:value={$form.name}
				aria-invalid={$errors.name ? 'true' : undefined}
				{...$constraints.name}
				class="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
				placeholder="Enter classroom name"
				required
			/>
			{#if $errors.name}
				<p class="text-red-500 mt-2">{$errors.name}</p>
			{/if}
		</label>

		<button type="submit" class="btn-primary mt-4">
			Create Classroom
		</button>
		<!-- Display Success Message -->
		{#if $message}
        <p class="text-green-500 mt-4">{$message}</p>
    	{/if}
	</form>

	<!-- Display Existing Classrooms -->
	<h2 class="text-3xl font-semibold mb-6">My Classrooms</h2>
	{#if classrooms.length > 0}
		<div class="grid gap-4">
			{#each classrooms as classroom}
				<a href={`/classrooms/${classroom.id}`} class="block p-4 mb-2 rounded-lg bg-stone-800">
					{classroom.name} - Created at: {new Date(classroom.created_at).toLocaleDateString()}
			 	</a>
			{/each}
		</div>
	{:else}
		<p class="text-gray-500">No classrooms found. Create one to get started!</p>
	{/if}
</div>