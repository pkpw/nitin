<script>
	import { onMount } from 'svelte';
	import 'quill/dist/quill.core.css';

	export let data;
	$: ({ supabase, navigationBar } = data);
	// $: navigationBar.pageTitle.set('Flashcard Deck');

	let editor, toolbar;

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			debug: 'info',
			modules: {
				toolbar: false
			},
			placeholder: 'Test',
			theme: 'snow'
		});
	});
</script>

<div class="container">
	<div
		class="sticky left-[75vw] flex w-[80px] flex-row items-center justify-center bg-stone-100 dark:bg-stone-950"
	>
		<div
			class="flex h-10 w-10 items-center justify-center hover:cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-800"
		>
			Q
		</div>
		<div
			class="flex h-10 w-10 items-center justify-center hover:cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-800"
		>
			A
		</div>
	</div>
</div>

<div bind:this={editor} class="rounded-lg border border-stone-700"></div>
