<script>
	import Dashboard from '$lib/assets/icons/dashboard_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import NoteStack from '$lib/assets/icons/note_stack_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import Quiz from '$lib/assets/icons/quiz_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
	import School from '$lib/assets/icons/school_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';
</script>

<div class="flex flex-col items-center justify-center">
	<a href="/dashboard" class="flex w-full flex-row items-center px-12 py-8 hover:bg-stone-800">
		<img class="icon mr-4 h-8 w-8" src={Dashboard} alt="Dashboard" width="32" height="32" />
		Dashboard
	</a>
	<a href="/flashcards" class="flex w-full flex-row items-center px-12 py-8 hover:bg-stone-800">
		<img class="icon mr-4 h-8 w-8" src={NoteStack} alt="Flashcards" width="32" height="32" />
		Flashcards
	</a>
	<a href="/quizzes" class="flex w-full flex-row items-center px-12 py-8 hover:bg-stone-800">
		<img class="icon mr-4 h-8 w-8" src={Quiz} alt="Quizzes" width="32" height="32" />
		Quizzes
	</a>
	<a href="/classrooms" class="flex w-full flex-row items-center px-12 py-8 hover:bg-stone-800">
		<img class="icon mr-4 h-8 w-8" src={School} alt="Classrooms" width="32" height="32" />
		Classrooms
	</a>
	<a href="/canvas" class="flex w-full flex-row items-center px-12 py-8 hover:bg-stone-800">
		Canvas
	</a>
</div>
