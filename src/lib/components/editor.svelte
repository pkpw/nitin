<script>
	import markdownit from 'markdown-it';

	const md = markdownit({
		html: true,
		breaks: true
	});

	let textarea;
	let front = 'Ask a question.';
	let back = 'Write your answer here.';
	let content = front;
	let isFlipped = false;

	$: isFlipped ? (back = content) : (front = content);
	// $: console.log(`Input:\n${content}\n\nOutput:\n${md.render(content)}`);

	function flip() {
		isFlipped = !isFlipped;
		content = isFlipped ? back : front;
	}

	// Generated on 9/17/24 using GPT-4o
	// Prompt: Svelte automatically resize textarea based on content
	function resizeTextarea() {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
	// End
</script>

<div class="mx-auto p-8">
	<div class="mx-auto container text-center">
		<textarea
			class="w-2/3 min-h-28 p-4 resize-none border-stone-900 border-2 rounded-md overflow-hidden"
			bind:this={textarea}
			bind:value={content}
			on:input={resizeTextarea}
		></textarea>
		<br />
		<button class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50" on:click={flip}>Flip</button>
	</div>
	<h1 class="py-2 font-bold">Preview ({isFlipped ? 'Back' : 'Front'})</h1>
	<div contenteditable="true">
		{@html md.render(content)}
	</div>
</div>

<style>
	:global(h1) {
		@apply text-xl font-bold;
	}

	:global(ul) {
		@apply list-disc pl-4;
	}

	:global(ol) {
		@apply list-decimal pl-4;
	}
</style>
