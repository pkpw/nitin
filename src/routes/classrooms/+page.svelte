<script>
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const { form, errors, constraints, message, enhance } = superForm(data.form);
	let classrooms = data.classrooms;
</script>

<svelte:head>
	<title>Create Classroom</title>
</svelte:head>

<a href="/">Back</a>

<form method="POST" action="?/createClassroom" use:enhance>
	<label>
		Classroom Name
		<input
			name="name"
			type="text"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
	</label>
	{#if $errors.name}<span class="invalid">Classroom name must be between 3 and 32 characters.</span>{/if}
	<button>Create Classroom</button>
</form>

<h2>Existing Classrooms</h2>
<ul>
	{#each classrooms as classroom}
		<li>
			{classroom.name}
			<form method="POST" action="?/deleteClassroom">
				<input type="hidden" name="id" value={classroom.id} />
				<button type="submit">Delete</button>
			</form>
		</li>
	{/each}
</ul>

<style>
	.invalid {
		color: red;
	}
</style>