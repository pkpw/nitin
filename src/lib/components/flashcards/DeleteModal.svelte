<script>
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '$lib/components/Icon.svelte';

	import Spinner from '../Spinner.svelte';
	import { schemasafe } from 'sveltekit-superforms/adapters';
	import { schema as deleteSchema } from './deleteForm';
	import { get } from 'svelte/store';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let close, data;

	const { enhance, submit, delayed } = superForm(data.deleteForm, {
		invalidateAll: false,
		onUpdated({ form }) {
			if (form.valid) {
				// Remove deleted flashcard from UI
				const index = get(data.foldersquizzes).indexOf(data.quiz);
				data.foldersquizzes.update((f) => {
					f.splice(index, 1);
					return f;
				});

				// Deleted only flashcard.
				// Rerun load function in /flashcards/[deck_id]/+layout.server.js to create default flashcard
				// since saving flashcard contents is no longer a concern.
				if (get(data.foldersquizzes).length == 0) {
					invalidateAll();
				}
			}
		}
	});
</script>

<div class="mb-4 flex flex-row items-center space-x-4">
	<Icon icon={Icons.Delete} width="32" height="32" fill={'#ef4444'} />
	<h1 class="text-xl font-semibold text-red-500">Delete Flashcard</h1>
</div>
<form method="POST" action="?/delete" use:enhance>
	<input class="hidden" name="id" type="text" bind:value={data.quiz.id} />
	<p class="text-lg">
		Are you sure you want to permanently delete <span class="font-semibold"
			>{data.quiz.title}</span
		>?
	</p>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		<button class="btn-secondary rounded-full" on:click|preventDefault={() => close(false)}
			>Cancel</button
		>
		<button class="btn-danger rounded-full" type="submit" on:click={() => close(true)}>
			{#if $delayed}
				<div in:fade>
					<Spinner fill={'#fafaf9'} />
				</div>
			{:else}
				Delete
			{/if}
		</button>
	</div>
</form>
