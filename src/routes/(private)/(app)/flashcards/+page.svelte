<script>
	import { Icons } from '$lib/icons';
	import { FlashcardDeck } from '$lib/flashcard-decks.js';
	import { Profile } from '$lib/profile.js';

	import Icon from '$lib/components/Icon.svelte';
	import Popup from '$lib/components/Popup.svelte';

	import Edit from '$lib/assets/icons/dark/edit_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';
	import Study from '$lib/assets/icons/dark/local_library_24dp_FAFAF9_FILL1_wght400_GRAD0_opsz24.svg';

	export let data;
	$: ({ supabase, navigationBar } = data);
	$: navigationBar.pageTitle.set('Flashcards');

	const profile = Profile.get();
	// const decks = FlashcardDeck.retrieve(supabase, profile.id)
	let visible = false;
</script>

<svelte:head>
	<title>Nitin | My Flashcards</title>
</svelte:head>

<h1 class="text-4xl font-bold">Flashcards</h1>

<div class="container fixed left-[76vw] top-[84vh] z-50">
	<div class="btn-outline h-16 w-16 rounded-full shadow-md">
		<Icon icon={Icons.Plus} alt="Add Flashcard" width="32" height="32" />
	</div>
</div>

<div
	class="my-4 h-96 w-auto min-w-80 max-w-sm overflow-hidden rounded-lg border border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-950"
>
	<div
		class="flex h-48 w-full flex-col justify-between rounded-t-lg border-b border-stone-400 bg-gradient-to-br from-sky-500 to-stone-50 p-4 dark:border-stone-700 dark:to-stone-950"
	>
		<div class="self-end">
			<Popup {visible}>
				<svelte:fragment slot="button">
					<button
						class="relative h-10 w-10 rounded-full {visible
							? 'bg-stone-950/50 dark:bg-stone-50/50'
							: ''} transition-colors duration-150 ease-in-out hover:bg-stone-950/50 dark:hover:bg-stone-50/50"
					>
						<div class="absolute left-[4px] top-[4px] h-8 w-8">
							<Icon icon={Icons.MoreVert} alt="More" width="32" height="32" />
						</div>
					</button>
				</svelte:fragment>
				<svelte:fragment slot="popup">
					<div
						class="absolute right-12 top-0 min-w-32 rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
					>
						<button
							class="flex w-full items-center justify-around rounded-t-md border-b border-b-stone-700 p-4 hover:bg-stone-100 dark:border-b-stone-500 dark:hover:bg-stone-800"
						>
							Rename
						</button>
						<button
							class="flex w-full items-center justify-around rounded-b-md p-4 hover:bg-stone-100 dark:hover:bg-stone-800"
						>
							Delete
						</button>
					</div>
				</svelte:fragment>
			</Popup>
		</div>

		<h1 class="text-2xl font-semibold">Flashcard Deck</h1>
	</div>
	<div class="h-48 p-4">
		<!-- <div>
			<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Mastery</h2>
		</div>
		<div>
			<h2 class="text-xl font-semibold text-stone-400 dark:text-stone-500">Tags</h2>
		</div> -->
		<div class="flex w-full flex-row space-x-4 pt-24">
			<a class="btn-secondary w-full rounded-md" href="#">
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

<div class="h-screen"></div>
