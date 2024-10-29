<script>
	import { Icons } from '$lib/icons';
	import { FlashcardDeck } from '$lib/flashcard-decks.js';
	import { Profile } from '$lib/profile.js';

	import Icon from '$lib/components/Icon.svelte';
	import Popup from '$lib/components/Popup.svelte';

	import Edit from '$lib/assets/icons/dark/edit_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Study from '$lib/assets/icons/dark/local_library_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import { writable } from 'svelte/store';
	import FlashcardDropdown from '$lib/components/flashcard-decks/FlashcardDropdown.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Flashcards');

	const profile = Profile.get();
	// const decks = FlashcardDeck.retrieve(supabase, profile.id)

	let flashcards = [
		{
			title: 'My Flashcard Deck'
		},
		{
			title: 'Getting Started'
		},
		{
			title: 'My Flashcard Deck (1)'
		},
		{
			title: 'Data Structures'
		},
		{
			title: 'Parallelism'
		},
		{
			title: 'CUDA'
		},
		{
			title: 'Data Structures'
		},
		{
			title: 'Linear Algebra'
		},
		{
			title: 'Category Theory'
		}
	];
</script>

<svelte:head>
	<title>Nitin | My Flashcards</title>
</svelte:head>

<div class="sticky top-[82vh] z-40 float-right pr-4 md:pr-10">
	<div class="btn-outline h-16 w-16 rounded-full shadow-md">
		<Icon icon={Icons.Plus} alt="Create" width="32" height="32" />
	</div>
</div>

<h1 class="pb-8 text-4xl font-bold">Flashcards</h1>

<div class="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#each flashcards as flashcard}
		<div
			class="h-[450px] w-full min-w-80 max-w-sm overflow-hidden rounded-lg border border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-950"
		>
			<div
				class="flex h-48 w-full flex-col justify-between border-b border-stone-400 bg-gradient-to-br from-sky-500 to-stone-50 p-4 dark:border-stone-700 dark:to-stone-950"
			>
				<div class="self-end">
					<FlashcardDropdown />
				</div>

				<h1 class="text-2xl font-semibold">{flashcard.title}</h1>
			</div>
			<div class="h-48 p-4">
				<!-- <div>
				<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Mastery</h2>
			</div>
			<div>
				<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Tags</h2>
			</div> -->
				<div class="flex w-full flex-row space-x-4 pt-24">
					<a class="btn-secondary w-full rounded-md" href="/flashcards/0/study">
						<div class="mr-4">
							<img src={Study} alt="Study" width="32" height="32" />
						</div>
						Study
					</a>
					<a class="btn-primary w-full rounded-md" href="/flashcards/0/edit">
						<div class="mr-4">
							<img src={Edit} alt="Edit" width="32" height="32" />
						</div>
						Edit
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
