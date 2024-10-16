<script>
	import Dashboard from '$lib/assets/icons/dashboard_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import NoteStack from '$lib/assets/icons/note_stack_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import Quiz from '$lib/assets/icons/quiz_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import School from '$lib/assets/icons/school_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="mt-4 flex flex-col items-center justify-center space-y-4">
	{#each [{ icon: Dashboard, label: 'Dashboard', href: '/dashboard' }, { icon: NoteStack, label: 'Flashcards', href: '/flashcards' }, { icon: Quiz, label: 'Quizzes', href: '/quizzes' }, { icon: School, label: 'Classrooms', href: '/classrooms' }] as item}
		<div class="w-11/12 rounded-full hover:bg-stone-800">
			<a
				href={item.href}
				class="flex h-24 flex-row items-center rounded-full px-20 font-semibold transition-all duration-300 will-change-transform hover:cursor-pointer"
				on:click={() => dispatch('linkClick')}
			>
				<img class="icon mr-4 h-8 w-8" src={item.icon} alt={item.label} width="32" height="32" />
				{item.label}
			</a>
		</div>
	{/each}
	<div class="w-11/12 rounded-full hover:bg-stone-800">
		<a
			href="/canvas"
			class="flex h-24 flex-row items-center rounded-full px-20 font-semibold transition-all duration-300 will-change-transform hover:cursor-pointer"
			>Canvas</a
		>
	</div>
</div>
