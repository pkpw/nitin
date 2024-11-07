<script>
	import { createEventDispatcher } from 'svelte';

	import { Icons } from '$lib/components/icons';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="mt-4 flex flex-col items-center justify-center space-y-4">
	{#each [{ icon: Icons.Dashboard, label: 'Dashboard', href: '/dashboard' }, { icon: Icons.FlashcardDeck, label: 'Flashcards', href: '/flashcards' }, { icon: Icons.Quiz, label: 'Quizzes', href: '/quizzes' }, { icon: Icons.Classrooms, label: 'Classrooms', href: '/classrooms' }] as item}
		<div
			class="w-11/12 rounded-3xl bg-stone-50 hover:bg-stone-200 dark:bg-stone-950 dark:hover:bg-stone-700"
		>
			<a
				href={item.href}
				class="flex h-20 flex-row items-center rounded-full px-20 font-semibold transition-all duration-300 will-change-transform hover:cursor-pointer"
				on:click={() => dispatch('linkClick')}
			>
				<div class="mr-4 h-8 w-8">
					<Icon icon={item.icon} alt={item.label} width="32" height="32" />
				</div>
				{item.label}
			</a>
		</div>
	{/each}
</div>
