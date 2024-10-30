<script>
	import { Profile } from '$lib/profile.js';

	import { Icons } from '$lib/icons';
	import Icon from '$lib/components/Icon.svelte';

	import { Modals } from '$lib/modals';
	import CreateModal from '$lib/components/modals/decks/CreateModal.svelte';

	import FlashcardDropdown from '$lib/components/decks/FlashcardDropdown.svelte';
	import Edit from '$lib/assets/icons/dark/edit_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Study from '$lib/assets/icons/dark/local_library_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import { superForm } from 'sveltekit-superforms';

	export let data, form;
	$: ({ supabase, navigationBar, flashcard_decks, error } = data);
	$: if (form) {
		data.deleteForm = form
	}
	$: navigationBar.pageTitle.set('Flashcards');

	const modals = Modals.get();
	const profile = Profile.get();
</script>

<svelte:head>
	<title>Nitin | My Flashcards</title>
</svelte:head>

<div class="container pointer-events-none fixed left-auto top-0 z-30 h-screen">
	<div class="pointer-events-auto sticky top-[82vh] float-right mr-6">
		<button
			on:click={() =>
				modals.trigger({
					modal: CreateModal,
					props: { data: data.createForm },
					response: async (confirmed) => {}
				})}
		>
			<div class="btn-outline h-16 w-16 rounded-full shadow-md">
				<Icon icon={Icons.Plus} alt="Create" width="32" height="32" />
			</div>
		</button>
	</div>
</div>

<h1 class="pb-8 text-4xl font-bold">My Flashcards</h1>

<div class="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#if flashcard_decks}
		{#each flashcard_decks as deck}
			<div
				class="h-[450px] w-full min-w-80 max-w-sm overflow-hidden rounded-lg border border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-950"
			>
				<div
					class="flex h-48 w-full flex-col justify-between border-b border-stone-400 bg-gradient-to-br to-stone-50 p-4 dark:border-stone-700 dark:to-stone-950"
					style="--tw-gradient-from: {deck.color} var(--tw-gradient-from-position);
    	--tw-gradient-to: rgb(14 165 233 / 0) var(--tw-gradient-to-position);
    	--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);"
				>
					<div class="self-end">
						<FlashcardDropdown {deck} {data} />
					</div>

					<h1 class="text-2xl font-semibold">{deck.title}</h1>
				</div>
				<div class="h-48 p-4">
					<!-- <div>
				<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Mastery</h2>
			</div>
			<div>
				<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Tags</h2>
			</div> -->
					<div class="flex w-full flex-row space-x-4 pt-24">
						<a class="btn-secondary w-full rounded-md" href="/flashcards/{deck.id}/study">
							<div class="mr-4">
								<img src={Study} alt="Study" width="32" height="32" />
							</div>
							Study
						</a>
						<a class="btn-primary w-full rounded-md" href="/flashcards/{deck.id}/edit">
							<div class="mr-4">
								<img src={Edit} alt="Edit" width="32" height="32" />
							</div>
							Edit
						</a>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
