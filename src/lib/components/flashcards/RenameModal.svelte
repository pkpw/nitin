<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { schemasafe } from 'sveltekit-superforms/adapters';
	import { schema } from './renameForm';

	import Icon from '$lib/components/Icon.svelte';
	import { Icons } from '$lib/components/icons/icons';
	import Spinner from '../Spinner.svelte';

	export let close, data, flashcard;
	const { form, errors, constraints, enhance, delayed, submit } = superForm(data, {
		validators: schemasafe(schema),
		onUpdate: ({ form }) => {
			if (form.valid) {
				close(true);
			}
		}
	});

	onMount(() => {
		$form.title = flashcard.title;
	});

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			submit();
		}
	}
</script>

<div class="mb-4 flex w-screen flex-row items-center space-x-4">
	<Icon icon={Icons.Edit} width="32" height="32" />
	<h1 class="text-xl font-semibold">Rename</h1>
</div>

<form method="POST" action="?/rename" use:enhance novalidate>
	<input class="hidden" name="id" type="text" bind:value={flashcard.id} />
	<div class="mb-4">
		<input
			class="form-input"
			name="title"
			type="text"
			placeholder="My Flashcard Deck"
			aria-invalid={$errors.title ? 'true' : undefined}
			bind:value={$form.title}
			on:keydown={handleKeyDown}
			{...$constraints.title}
		/>
		{#if $errors.title}
			<div in:fade class="mt-1 flex items-center justify-start">
				<Icon icon={Icons.Error} width="20" height="20" fill={'#ef4444'} />
				<span class="ml-2 text-sm font-semibold text-red-500">
					{#if $errors.title != '#/properties/title/pattern'}
						{$errors.title}
					{:else}
						Name is not valid.
					{/if}
				</span>
			</div>
		{/if}
	</div>
	<div class="flex flex-row items-center justify-end space-x-4 pt-4">
		<button class="btn-secondary rounded-full" on:click|preventDefault={() => close(false)}
			>Cancel</button
		>
		<button class="btn-primary rounded-full" type="submit">
			{#if $delayed}
				<div in:fade>
					<Spinner fill={'#fafaf9'} />
				</div>
			{:else}
				Save
			{/if}
		</button>
	</div>
</form>
