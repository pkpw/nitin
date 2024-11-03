<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	import Icon from '$lib/components/Icon.svelte';
	import { Icons } from '$lib/components/icons/icons.js';

	import { useModals } from '$lib/stores/modals.js';
	import DeleteModal from '$lib/components/flashcards/DeleteModal.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';

	import 'quill/dist/quill.snow.css';
	import Popup from '$lib/components/Popup.svelte';
	// import 'quill/dist/quill.core.css';

	export let data;
	$: ({ supabase, navBar, deck } = data);
	$: navBar.visible.set(isDesktop);

	let isDesktop;

	let modals = useModals();

	let editor, toolbar;

	onMount(async () => {
		isDesktop = window.innerWidth >= 1536;
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			placeholder: 'Test',
			modules: {
				toolbar: false
			},
			theme: 'snow'
		});
	});
</script>

<svelte:head>
	<title>Nitin | {deck.title}</title>
</svelte:head>

<NavBar {...navBar}>
	<svelte:fragment slot="left">
		<!-- <div class="py-1.5 ml-4 max-w-36 overflow-hidden"> -->
		<h1
			class="ml-4 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap py-1.5 text-xl font-semibold sm:max-w-full"
		>
			{deck.title}
		</h1>
		<!-- </div> -->
	</svelte:fragment>
	<svelte:fragment slot="right">
		<!-- Replace with Participants dropdown -->
		<AccountDropdown />
		<!-- Cloud Connection Indicator -->
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<div
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			class="absolute left-0 top-[69px] h-[calc(100vh-69px)] w-full border-r-stone-400 bg-stone-50 bg-opacity-[0.98] backdrop-blur dark:border-r-stone-700 dark:bg-stone-950 dark:bg-opacity-95 md:top-[152px] md:h-[calc(100vh-152px)] md:w-1/2 md:border-r xl:w-1/3 xl:max-w-[472px]"
		>
			<div class="flex w-full min-w-80 flex-col justify-between space-y-4">
				{#if deck.flashcards?.length > 0}
					<div
						class="mx-auto h-[calc(100vh-197px)] w-full overflow-y-auto pb-8 pt-4 md:h-[calc(100vh-280px)]"
						style="scrollbar-width: thin;"
					>
						<div
							class="absolute bottom-32 left-0 right-0 mx-auto mr-4 h-12 w-full bg-gradient-to-t from-stone-50 to-transparent dark:from-stone-950"
						></div>
						{#each deck.flashcards as flashcard}
							<div
								class="mx-auto my-2 flex h-20 w-11/12 flex-row items-center rounded-3xl border border-stone-400 bg-stone-100 px-4 hover:cursor-pointer hover:border-stone-700 hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 hover:dark:border-stone-500 hover:dark:bg-stone-700"
							>
								<div class="flex h-full items-center justify-center px-4 hover:cursor-grab">
									<Icon icon={Icons.DragIndicator} width="32" height="32" />
								</div>
								<span class="text-xl">{flashcard.title}</span>
								<div class="flex w-full items-center justify-end">
									<Icon icon={Icons.Edit} width="32" height="32" />
									<form method="POST" action="?/delete" use:enhance>
										<input class="hidden" name="id" type="text" bind:value={flashcard.id} />
										<button
											class="flex h-12 w-12 items-center justify-center rounded-lg hover:cursor-pointer"
											type="submit"
										>
											<Icon icon={Icons.Delete} width="32" height="32" />
										</button>
									</form>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="my-24 text-center">
						<h1 class="text-xl text-stone-400">Press the + button to create a new flashcard.</h1>
					</div>
				{/if}
				<div class="mx-6 flex h-28 flex-row items-center justify-between pb-10 pt-4">
					<a href="/flashcards" class="flex flex-row items-center">
						<div class="btn-outline mr-6 h-10 w-10 rounded-md" href="/flashcards">
							<div class="absolute left-[3px] top-[3px] h-8 w-8">
								<Icon icon={Icons.BackArrow} width="32" height="32" />
							</div>
						</div>
						<span class="text-nowrap text-lg font-semibold">All Flashcards</span>
					</a>
					<form method="POST" action="?/create" use:enhance>
						<button class="btn-outline h-16 w-16 rounded-full shadow-md" type="submit">
							<Icon icon={Icons.Plus} width="32" height="32" />
						</button>
					</form>
				</div>
			</div>
		</div>
	</svelte:fragment>
</NavBar>
<div
	class="sticky top-[69px] z-20 bg-stone-50 bg-opacity-[0.98] backdrop-blur transition-colors duration-300 ease-in-out dark:bg-stone-950 dark:bg-opacity-95"
>
	<div class="container mx-auto px-4 md:px-0">
		<div class="flex flex-row items-center justify-start">
			<div
				class="group relative inline-block h-full rounded-md px-3 py-0.5 text-center hover:cursor-pointer hover:bg-stone-300 hover:dark:bg-stone-700"
			>
				File
				<div class="absolute left-0 z-40 hidden pt-4 group-hover:block">
					<div
						class="w-56 rounded-lg border border-stone-700 bg-stone-50 px-4 py-3 dark:border-stone-500 dark:bg-stone-950"
					>
						Copy
					</div>
				</div>
			</div>
			<div
				class="group relative inline-block h-full rounded-md px-3 py-0.5 text-center hover:cursor-pointer hover:bg-stone-300 hover:dark:bg-stone-700"
			>
				Edit
				<div class="absolute left-0 z-40 hidden pt-4 group-hover:block">
					<div
						class="w-56 rounded-lg border border-stone-700 bg-stone-50 px-4 py-3 dark:border-stone-500 dark:bg-stone-950"
					>
						Image
					</div>
				</div>
			</div>
			<div
				class="group relative inline-block h-full rounded-md px-3 py-0.5 text-center hover:cursor-pointer hover:bg-stone-300 hover:dark:bg-stone-700"
			>
				Format
				<div class="absolute left-0 z-40 hidden pt-4 group-hover:block">
					<div
						class="w-56 rounded-lg border border-stone-700 bg-stone-50 px-4 py-3 dark:border-stone-500 dark:bg-stone-950"
					>
						Bold
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-row items-center justify-start space-x-2 py-1.5">
			<Popup>
				<svelte:fragment slot="button">
					<div class="btn-outline rounded-lg">Normal</div>
				</svelte:fragment>
				<svelte:fragment slot="popup">
					<div
						class="absolute left-0 z-40 mt-2 min-w-32 overflow-hidden rounded-md border border-stone-700 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
					>
						Test
					</div>
				</svelte:fragment>
			</Popup>
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.Bold} width="32" height="32" />
			</div>
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.Italic} width="32" height="32" />
			</div>
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.Underline} width="32" height="32" />
			</div>
			<!-- <div class="w-[1px] h-8 bg-stone-400 dark:bg-stone-800"></div> -->
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.NumberedList} width="32" height="32" />
			</div>
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.BulletedList} width="32" height="32" />
			</div>
			<!-- <div class="w-[1px] h-8 bg-stone-400 dark:bg-stone-800"></div> -->
			<div class="hover:cursor-pointer">
				<Icon icon={Icons.AddLink} width="32" height="32" />
			</div>
		</div>
	</div>
</div>
<div class="fixed left-0 z-10 w-full border-b border-b-stone-400 dark:border-b-stone-700"></div>

<div class="container relative z-30 mx-auto w-full px-4">
	<div
		class="bg-stone-20 fixed left-auto right-4 top-[168px] flex w-[80px] flex-row items-center justify-center rounded-md border border-stone-400 dark:border-stone-700 dark:bg-stone-950"
	>
		<div
			class="flex h-10 w-10 items-center justify-center rounded-l-md bg-stone-200 hover:cursor-pointer hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700"
		>
			<div>
				<Icon icon={Icons.FlipToFront} width="32" height="32" />
			</div>
		</div>
		<div
			class="flex h-10 w-10 items-center justify-center rounded-r-md hover:cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-700"
		>
			<div>
				<Icon icon={Icons.FlipToBack} width="32" height="32" />
			</div>
		</div>
	</div>
</div>

<div class="h-full min-h-[calc(100vh-151px)] w-full bg-stone-100 dark:bg-stone-900">
	<div class="container mx-auto px-4">
		<div class="pt-20"></div>

		<div bind:this={editor}></div>
	</div>
</div>
