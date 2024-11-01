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
</script>

<svelte:head>
	<title>{classroom.name}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col items-center bg-black p-8 text-white">
	<div class="mb-8 flex w-full max-w-4xl items-center justify-center">
		{#if isEditing}
			<input
				type="text"
				bind:value={newClassroomName}
				class="w-1/2 rounded-md border border-blue-500 bg-black p-2 text-white"
			/>
			<button
				class="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
				on:click={updateClassroomName}
			>
				Save
			</button>
			<button
				class="ml-2 rounded-md bg-gray-500 px-4 py-2 text-white"
				on:click={() => (isEditing = false)}
			>
				Cancel
			</button>
		{:else}
			<h1 class="text-center text-5xl font-bold">{classroom.name}</h1>
			<button class="ml-2" on:click={() => (isEditing = true)}>
				<span class="material-symbols-rounded"> edit </span>
			</button>
		{/if}
	</div>

	<div class="w-full max-w-4xl">
		<h3 class="mb-4 block text-left text-lg">Members:</h3>
		<h3 class="mb-4 block text-left text-lg">Flashcard Sets:</h3>
	</div>
</div>

<style>
	.material-symbols-rounded {
		font-size: 32px;
		vertical-align: middle;
		color: #ffffff;
	}

	h1 {
		display: inline;
	}
</style>
