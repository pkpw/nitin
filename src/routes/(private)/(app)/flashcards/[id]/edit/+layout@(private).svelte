<script>
	import { Icons } from '$lib/icons';

	import Icon from '$lib/components/Icon.svelte';
	import NavigationBar from '$lib/components/nav/NavigationBar.svelte';
	import AccountDropdown from '$lib/components/nav/AccountDropdown.svelte';
	import NavigationMenu from '$lib/components/nav/NavigationMenu.svelte';

	export let data;
	$: ({ supabase, navigationBar } = data);
</script>

<NavigationBar title={navigationBar.pageTitle} visible={navigationBar.visible}>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right">
		<AccountDropdown {supabase} />
	</svelte:fragment>
	<svelte:fragment slot="menu">
		<div class="flex h-[calc(100vh-69px)] flex-col justify-between space-y-4">
			<div class="mt-4 flex h-full flex-col items-center space-y-4">
				<div
					class="flex h-24 w-11/12 flex-row items-center rounded-3xl border border-stone-400 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
				>
					<div class="flex h-full w-1/5 items-center justify-center hover:cursor-grab">
						<Icon icon={Icons.DragIndicator} alt="Reorder flashcard" width="32" height="32" />
					</div>
					<span class="text-xl">1.</span>
					<!-- <div class="btn-outline h-12 w-12 rounded-lg">
						<div class="absolute left-[7px] top-[7px] h-8 w-8">
							<Icon icon={Icons.Edit} alt="Add Flashcard" width="32" height="32" />
						</div>
					</div> -->
				</div>
				<div
					class="flex h-24 w-11/12 flex-row items-center rounded-3xl border border-stone-400 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
				>
					<div class="flex h-full w-1/5 items-center justify-center hover:cursor-grab">
						<Icon icon={Icons.DragIndicator} alt="Reorder flashcard" width="32" height="32" />
					</div>
					<span class="text-xl">2.</span>
					<!-- <div class="btn-outline h-12 w-12 rounded-lg">
						<div class="absolute left-[7px] top-[7px] h-8 w-8">
							<Icon icon={Icons.Edit} alt="Add Flashcard" width="32" height="32" />
						</div>
					</div> -->
				</div>
				<div
					class="flex h-24 w-11/12 flex-row items-center rounded-3xl border border-stone-400 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
				>
					<div class="flex h-full w-1/5 items-center justify-center hover:cursor-grab">
						<Icon icon={Icons.DragIndicator} alt="Reorder flashcard" width="32" height="32" />
					</div>
					<span class="text-xl">3.</span>
					<!-- <div class="btn-outline h-12 w-12 rounded-lg">
						<div class="absolute left-[7px] top-[7px] h-8 w-8">
							<Icon icon={Icons.Edit} alt="Add Flashcard" width="32" height="32" />
						</div>
					</div> -->
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
</NavigationBar>

<div class="h-[calc(100vh-69px)] w-full bg-stone-100 dark:bg-stone-900">
	<div class="container mx-auto">
		<slot />
	</div>
</div>
