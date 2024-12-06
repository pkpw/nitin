<script>
	import { useProfile } from '$lib/stores/profile.js';

	import { Icons } from '$lib/components/icons/icons.js';
	import Icon from '$lib/components/Icon.svelte';

	import { useModals } from '$lib/stores/modals.js';
	import CreateModal from '$lib/components/quizzes/CreateModal.svelte';

	import DeckDropdown from '$lib/components/quizzes/DeckDropdown.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Study from '$lib/components/icons/Study.svelte';
	import Edit from '$lib/components/icons/Edit.svelte';
	import { onMount } from 'svelte';
	import { useNavBar } from '$lib/stores/navbar.js';

	export let data;
	$: ({ supabase } = data);

	const profile = useProfile();
	const modals = useModals();
	const navBar = useNavBar();

	onMount(() => {
		navBar.setTitle('Quizzes');
	});
</script>

<svelte:head>
	<title>Nitin | My Quizzes</title>
</svelte:head>

<div class="container pointer-events-none fixed left-auto top-0 z-10 h-screen">
	<div class="pointer-events-auto sticky top-[82vh] float-right mr-12 md:mr-6">
		<button
			on:click={() =>
				modals.trigger({
					modal: CreateModal,
					props: { data: data.createForm }
				})}
		>
			<div class="btn-outline h-16 w-16 rounded-full shadow-md">
				<Icon icon={Icons.Plus} width="32" height="32" />
			</div>
		</button>
	</div>
</div>

<h1 class="pb-8 text-4xl font-bold">My Quizzes</h1>
{#await data.quizzes}
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:then result}
	{#if result.error}
		<div class="my-24 text-center">
			<h1 class="text-xl text-red-500">An error occurred.</h1>
		</div>
	{:else if result.data.length > 0}
		<div class="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each result.data as quiz}
				<div
					class="h-96 w-full min-w-80 max-w-sm overflow-hidden rounded-lg border border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-950"
				>
					<div
						class="flex h-48 w-full flex-col justify-between border-b border-stone-400 bg-gradient-to-br to-stone-50 p-4 dark:border-stone-700 dark:to-stone-950"
						style="--tw-gradient-from: {quiz.color} var(--tw-gradient-from-position);
		--tw-gradient-to: rgb(14 165 233 / 0) var(--tw-gradient-to-position);
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);"
					>
						<div class="self-end">
							<DeckDropdown {data} {quiz} />
						</div>

						<h1
							class="max-w-96 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold"
						>
							{quiz.title}
						</h1>
					</div>
					<div class="p-4">
						<div class="mt-28 flex w-full flex-row space-x-4">
							<a class="btn-secondary w-full rounded-md" href="/quizzes/{quiz.id}/study">
								<div class="mr-4">
									<Icon icon={Icons.Study} width="32" height="32" fill="#fafaf9" />
								</div>
								Study
							</a>
							<a class="btn-primary w-full rounded-md" href="/quizzes/{quiz.id}/edit">
								<div class="mr-4">
									<Icon icon={Icons.Edit} width="32" height="32" fill="#fafaf9" />
								</div>
								Edit
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="my-24 text-center">
			<h1 class="text-xl text-stone-400">Press the + button to create a new Quiz.</h1>
		</div>
	{/if}
{:catch error}
	<div class="my-24 text-center">
		<h1 class="text-xl text-red-500">An error occurred.</h1>
	</div>
{/await}
