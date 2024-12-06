<script>
	import { superForm } from 'sveltekit-superforms';
	export let form;
	export let close;

	// Handling form submission
	async function handleSubmit(event) {
		event.preventDefault();
		const response = await form.submit();
		if (response?.success) {
			close(true); // Close the modal on success
		}
	}
</script>

<div
	class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm"
>
	<div class="bg-stone-900 border border-stone-700 p-8 rounded-lg shadow-lg w-full max-w-md">
		<h2 class="text-2xl font-bold mb-4 text-white">Create Classroom</h2>
		<form on:submit={handleSubmit} use:form>
			<label class="block mb-4">
				<span class="text-stone-400">Classroom Name</span>
				<input
					type="text"
					name="name"
					bind:value={$form.name}
					class="mt-2 w-full rounded-md border border-stone-600 bg-stone-800 text-white p-2"
					placeholder="Enter classroom name"
				/>
				{#if $form.errors.name}
					<p class="text-red-500 mt-2">{$form.errors.name}</p>
				{/if}
			</label>

			<button type="submit" class="btn-primary w-full">Create</button>
			<button type="button" class="btn-secondary w-full mt-4" on:click={() => close(false)}>
				Cancel
			</button>
		</form>
	</div>
</div>

