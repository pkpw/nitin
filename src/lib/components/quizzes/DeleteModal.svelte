<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { schema } from './deleteForm';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from '$lib/components/Icon.svelte';

	import Spinner from '../Spinner.svelte';

	export let close, data, quiz;
	const { form, errors, constraints, enhance, delayed, submit } = superForm(data);
</script>

<div class="mb-4 flex flex-row items-center space-x-4">
	<Icon icon={Icons.Delete} alt="Delete" width="32" height="32" fill={'#ef4444'} />
	<h1 class="text-xl font-semibold text-red-500">Delete Quiz</h1>
</div>
<form method="POST" action="?/delete" use:enhance>
	<input class="hidden" name="id" type="text" bind:value={quiz.id} />
	<p class="text-lg">
		Are you sure you want to permanently delete <span class="font-semibold">{quiz.title}</span>?
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
