<script>
	import { superForm } from 'sveltekit-superforms';
	export let data;
	const { form, errors, constraints, message, enhance } = superForm(data.form);
	let classrooms = data.classrooms;

	async function deleteClassroom(classroomId) {
		try {
			const response = await fetch(`/classrooms/${classroomId}`, {
				method: 'DELETE'
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
</script>

<svelte:head>
	<title>Classrooms</title>
</svelte:head>

<div class="min-h-screen bg-black p-8 text-white">
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
				class="mt-2 w-full rounded-md border border-blue-500 bg-black p-2 text-white"
				placeholder="Enter classroom name"
			/>
		</label>
		{#if $errors.name}
			<span class="text-red-500">Classroom name must be between 3 and 32 characters.</span>
		{/if}
		<button class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white">Create Classroom</button>
	</form>

	<h2 class="mt-8 text-2xl font-semibold text-white">Existing Classrooms</h2>
	<ul class="mt-4 space-y-4">
		{#each classrooms as classroom}
			<li class="rounded-md border border-white bg-black p-4 text-white">
				<a href={`/classrooms/${classroom.id}`} class="text-blue-500 underline">{classroom.name}</a>
				<span class="text-sm">(Created at: {new Date(classroom.created_at).toLocaleString()})</span>
				<button
					class="ml-4 rounded-md bg-red-500 px-2 py-1 text-white"
					on:click={() => deleteClassroom(classroom.id)}
				>
					Delete
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
