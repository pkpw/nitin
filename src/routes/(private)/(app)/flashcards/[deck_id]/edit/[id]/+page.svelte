<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	import Icon from '$lib/components/Icon.svelte';
	import { Icons } from '$lib/components/icons/icons.js';

	import { useModals } from '$lib/stores/modals.js';
	import DeleteModal from '$lib/components/flashcards/DeleteModal.svelte';
	import RenameModal from '$lib/components/flashcards/RenameModal.svelte';

	import { useNavBar } from '$lib/stores/navbar.js';
	import NavBar from '$lib/components/NavBar.svelte';

	import AccountDropdown from '$lib/components/AccountDropdown.svelte';
	import FileDropdown from '$lib/components/flashcards/FileDropdown.svelte';
	import FormatDropdown from '$lib/components/flashcards/FormatDropdown.svelte';
	import EditDropdown from '$lib/components/flashcards/EditDropdown.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	import 'quill/dist/quill.core.css';
	// import 'quill/dist/quill.snow.css';
	import './editor.css';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';

	export let data;
	$: ({ supabase, deck, id, flashcard } = data);

	const modals = useModals();
	const navBar = useNavBar();

	let quill, editor, toolbar;
	let saved = true;

	beforeNavigate(async () => {
		if (!saved) {
			let response = await fetch($page.url.pathname, {
				method: 'POST',
				body: JSON.stringify({
					id,
					front: quill.getContents()
				})
			})
		}
	})

	onMount(async () => {
		navBar.setTitle(null);

		const { default: Quill } = await import('quill');
		quill = new Quill(editor, {
			modules: {
				toolbar: false
			}
		});
		
		quill.on('text-change', (delta, oldDelta, source) => {
			if (source === 'user') {
				saved = false;
			}
		})
	});

	$: quill?.setContents(flashcard?.front)
	$: console.log(flashcard)
</script>

<svelte:head>
	<title>Nitin | {deck.title}</title>
</svelte:head>

<NavBar>
	<svelte:fragment slot="left">
		<h1
			class="ml-4 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap py-1.5 text-xl font-semibold sm:max-w-full"
		>
			{deck.title}
		</h1>
	</svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown />
		<!-- Cloud Connection Indicator -->
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		<div class="flex flex-row items-center justify-start space-x-1 pt-1.5">
			<FileDropdown />
			<EditDropdown />
			<FormatDropdown />
		</div>
		<div
			class="flex min-w-80 flex-row flex-wrap items-center justify-start space-x-1 space-y-1 pt-1.5"
		>
			<select class="form-dropdown">
				<option value="small">Small</option>
				<option selected>Normal</option>
				<option value="large">Large</option>
				<option value="huge">Huge</option>
			</select>
			<button
				class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800"
				on:click={() => quill.format('bold', true)}
			>
				<Icon icon={Icons.Bold} width="32" height="32" />
			</button>
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.Italic} width="32" height="32" />
			</div>
			<div
				class="self-end rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800"
			>
				<Icon icon={Icons.Underline} width="32" height="32" />
			</div>
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.Strikethrough} width="32" height="32" />
			</div>
			<!-- <div class="w-[1px] h-8 bg-stone-400 dark:bg-stone-800"></div> -->
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.NumberedList} width="32" height="32" />
			</div>
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.BulletedList} width="32" height="32" />
			</div>
			<!-- <div class="w-[1px] h-8 bg-stone-400 dark:bg-stone-800"></div> -->
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.AddLink} width="32" height="32" />
			</div>
			<div class="h-8 w-[1px] bg-stone-400 dark:bg-stone-800"></div>
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.AddPhoto} width="32" height="32" />
			</div>
			<div class="rounded-lg p-1 hover:cursor-pointer hover:bg-stone-200 hover:dark:bg-stone-800">
				<Icon icon={Icons.Draw} width="32" height="32" />
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<div
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			class="absolute left-0 top-[60px] h-[calc(100vh-60px)] w-full md:top-[152px] md:h-[calc(100vh-152px)] md:w-1/3 xl:max-w-[472px]"
		>
			<div
				class="flex w-full min-w-80 flex-col justify-between space-y-4 bg-stone-50/90 backdrop-blur dark:bg-stone-950/90"
			>
				{#if deck.flashcards?.length > 0}
					<div
						class="mx-auto h-[calc(100vh-188px)] w-full overflow-y-auto pb-8 pt-4 md:h-[calc(100vh-281px)]"
						style="scrollbar-width: thin;"
					>
						<!-- <div
							class="absolute bottom-32 left-0 right-0 mx-auto mr-4 h-12 w-full bg-gradient-to-t from-stone-50/90 to-transparent dark:from-stone-950/90"
						></div> -->
						{#each deck.flashcards as flashcard}
							<div
								class="mx-auto my-2 flex h-20 w-11/12 flex-row items-center rounded-3xl {flashcard.id ==
								id
									? 'bg-stone-200 dark:bg-stone-700'
									: 'bg-stone-100 dark:bg-stone-800'} border border-stone-400 px-4 hover:cursor-pointer hover:border-stone-700 hover:bg-stone-200 dark:border-stone-700 hover:dark:border-stone-500 hover:dark:bg-stone-700"
							>
								<div class="flex h-full items-center justify-center px-4 hover:cursor-grab">
									<Icon icon={Icons.DragIndicator} width="32" height="32" />
								</div>
								<a
									class="flex h-full w-full flex-row items-center text-xl"
									href="/flashcards/{deck.id}/edit/{flashcard.id}"
									data-sveltekit-preload-data="false">{flashcard.title}</a
								>
								<div class="flex w-full items-center justify-end">
									<button
										class="z-10 flex h-12 w-12 items-center justify-center rounded-lg hover:cursor-pointer"
										on:click={() => {
											modals.trigger({
												modal: RenameModal,
												props: { data: data.renameForm, flashcard },
												response: async (confirmed) => {}
											});
										}}
									>
										<Icon icon={Icons.Edit} width="32" height="32" />
									</button>
									<button
										class="icon-button-danger z-10 flex h-12 w-12 items-center justify-center rounded-lg hover:cursor-pointer"
										on:click={() =>
											modals.trigger({
												modal: DeleteModal,
												props: { data: data.deleteForm, flashcard },
												response: async (confirmed) => {
													// Optimistically remove flashcard
													// If error, do not need to readd since load function is reran
													// if (confirmed) {
													// 	deck.flashcards.splice(deck.flashcards.indexOf(flashcard), 1)
													// }
												}
											})}
									>
										<Icon icon={Icons.Delete} width="32" height="32" />
									</button>
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
					<a href="/flashcards" class="flex flex-row items-center" on:click={() => navBar.hide()}>
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

<div class="container relative z-20 mx-auto w-full px-4">
	<div
		class="bg-stone-20 sticky float-right mt-3 flex w-[80px] flex-row items-center justify-center rounded-md border border-stone-400 dark:border-stone-700 dark:bg-stone-950"
	>
		<div
			class="flex h-10 w-10 items-center justify-center rounded-l-md bg-stone-200 hover:cursor-pointer hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700"
		>
			<div>
				<Icon icon={Icons.FlipToFront} width="32" height="32" />
			</div>
		</div>
		<div
			class="flex h-10 w-10 items-center justify-center rounded-r-md bg-stone-50 hover:cursor-pointer hover:bg-stone-300 dark:bg-stone-950 dark:hover:bg-stone-700"
		>
			<div>
				<Icon icon={Icons.FlipToBack} width="32" height="32" />
			</div>
		</div>
	</div>
</div>

<div
	class="fixed left-0 top-[196px] h-[calc(100%-196px)] min-h-[calc(100vh-196px)] w-full overflow-y-auto bg-stone-100 dark:bg-stone-900 md:top-[152px] md:h-[calc(100%-152px)] md:min-h-[calc(100vh-152px)]"
>
	<div class="container mx-auto px-4">
		<div class="pt-20"></div>
		<div bind:this={editor}>
			<Spinner />
		</div>
		<div class="pt-20"></div>
	</div>
</div>
