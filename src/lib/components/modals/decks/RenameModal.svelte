<script>
	import { superForm } from 'sveltekit-superforms';
	import { schemasafe } from 'sveltekit-superforms/adapters';
	import { fade } from 'svelte/transition';
	import { schema } from '../../../../routes/(private)/(app)/flashcards/form';

	import Icon from '$lib/components/Icon.svelte';
	import { Icons } from '$lib/icons';
	import { get } from 'svelte/store';

	export let close, data, deck;
	const { form, errors, constraints, enhance, delayed, submit } = superForm(data, {
		SPA: true,
		validators: schemasafe(schema),
		resetForm: false,
		onUpdate: async ({ form }) => {
			if (form.valid && form.data.title != deck.title) {
				const {data, error} = await fetch(`/api/decks/rename`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: deck.id,
						title: form.data.title
					})
				});
				close(true)
			}
		}
	});

	$: $form.title = deck.title;
</script>

<div class="mb-4 flex w-screen flex-row items-center space-x-4">
	<Icon icon={Icons.Edit} alt="Flashcard deck" width="32" height="32" />
	<h1 class="text-xl font-semibold">Rename</h1>
</div>

<form method="POST" action="?/rename" use:enhance>
	<div class="mb-4">
		<input
			class="form-input"
			name="title"
			type="text"
			placeholder="My Flashcard Deck"
			aria-invalid={$errors.title ? 'true' : undefined}
			bind:value={$form.title}
			{...$constraints.title}
		/>
		{#if $errors.title}
			<div in:fade class="mt-1 flex items-center justify-start">
				<Icon icon={Icons.Error} alt="Error" width="20" height="20" />
				<span class="ml-2 text-sm font-semibold text-red-500">Name is not valid.</span>
			</div>
		{/if}
	</div>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		<button
			class="btn-secondary rounded-full"
			on:click={() => {
				close(false);
			}}>Cancel</button
		>
		<button
			class="btn-primary rounded-full"
			on:click={() => {
				submit();
			}}>Save</button
		>
	</div>
</form>
