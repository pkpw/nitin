<script>
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	in:slide={{ axis: 'x' }}
	out:slide={{ axis: 'x' }}
	class="absolute left-0 top-[69px] h-[calc(100vh-69px)] w-full bg-stone-50 bg-opacity-[0.98] backdrop-blur dark:bg-stone-950 dark:bg-opacity-95 md:w-1/2 xl:w-1/3 xl:max-w-[472px]"
>
	<div class="w-full min-w-80">
		<div class="mt-4 flex flex-col items-center justify-center space-y-4">
			{#each [{ icon: Icons.Dashboard, label: 'Dashboard', href: '/dashboard' }, { icon: Icons.Decks, label: 'Flashcards', href: '/flashcards' }, { icon: Icons.Quiz, label: 'Quizzes', href: '/quizzes' }, { icon: Icons.Classrooms, label: 'Classrooms', href: '/classrooms' }] as item}
				<div class="w-11/12 rounded-3xl hover:bg-stone-200/85 dark:hover:bg-stone-700/85">
					<a
						href={item.href}
						class="mx-auto flex h-20 flex-row items-center justify-center rounded-full font-semibold transition-all duration-300 will-change-transform hover:cursor-pointer"
						on:click={() => dispatch('linkClick')}
					>
						<div class="flex w-full max-w-36 flex-row items-center justify-start">
							<div class="mr-4 h-8 w-8">
								<Icon icon={item.icon} width="32" height="32" />
							</div>
							{item.label}
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
