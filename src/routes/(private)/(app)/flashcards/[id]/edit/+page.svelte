<script>
	import 'quill/dist/quill.snow.css';
	// import 'quill/dist/quill.core.css';

	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import { Icons } from '$lib/components/icons.js';

	import NavBar from '$lib/components/NavBar.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';

	export let data;
	$: ({ supabase, navBar } = data);

	let editor, toolbar;

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			placeholder: 'Test',
			theme: 'snow'
		});
	});
</script>

<svelte:head>
	<title>Nitin | Flashcard Deck</title>
</svelte:head>

<NavBar {...navBar}>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<!-- Replace with Participants dropdown -->
		<AccountDropdown {supabase} />
		<!-- Cloud Connection Indicator -->
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<div class="flex h-[calc(100vh-69px)] flex-col justify-between space-y-4">
			<div class="mt-4 flex h-full flex-col items-center space-y-4">
				<div
					class="flex h-20 w-11/12 flex-row items-center rounded-3xl border border-stone-400 bg-stone-100 px-4 hover:border-stone-700 hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 hover:dark:border-stone-500 hover:dark:bg-stone-700"
				>
					<div class="flex h-full items-center justify-center px-4 hover:cursor-grab">
						<Icon icon={Icons.DragIndicator} alt="Reorder flashcard" width="32" height="32" />
					</div>
					<span class="text-xl">1.</span>
					<div class="flex w-full items-center justify-end">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg hover:cursor-pointer">
							<div>
								<Icon icon={Icons.Delete} alt="Delete" width="32" height="32" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mx-6 flex flex-row items-center justify-between pb-10 pt-4">
				<a href="/flashcards" class="flex flex-row items-center">
					<div class="btn-outline mr-6 h-10 w-10 rounded-md" href="/flashcards">
						<div class="absolute left-[3px] top-[3px] h-8 w-8">
							<Icon icon={Icons.BackArrow} alt="Back" width="32" height="32" />
						</div>
					</div>
					<span class="text-nowrap text-lg font-semibold">All Flashcards</span>
				</a>
				<div class="btn-outline h-16 w-16 rounded-full shadow-md">
					<Icon icon={Icons.Plus} alt="Add Flashcard" width="32" height="32" />
				</div>
			</div>
		</div>
	</svelte:fragment>
</NavBar>

<div class="h-[calc(100vh-69px)] w-full bg-stone-100 dark:bg-stone-900">
	<div class="container mx-auto px-4">
		<div class="pt-3"></div>

		<div
			class="bg-stone-20 sticky left-[100vw] flex w-[80px] flex-row items-center justify-center rounded-md border border-stone-400 dark:border-stone-700 dark:bg-stone-950"
		>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-l-md bg-stone-200 hover:cursor-pointer hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700"
			>
				<div>
					<Icon icon={Icons.FlipToFront} alt="Front" width="32" height="32" />
				</div>
			</div>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-r-md hover:cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-700"
			>
				<div>
					<Icon icon={Icons.FlipToBack} alt="Back" width="32" height="32" />
				</div>
			</div>
		</div>

		<div class="pt-4"></div>

		<div bind:this={editor}></div>
	</div>
</div>
