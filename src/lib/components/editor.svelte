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
	let headerLevel = 'Normal';
	let isFlipped = false;

	$: isFlipped ? (back = content) : (front = content);
	// $: console.log(`Input:\n${content}\n\nOutput:\n${md.render(content)}`);

	function flip() {
		isFlipped = !isFlipped;
		content = isFlipped ? back : front;
	}

	/* Generated on 9/17/24 using GPT-4o by OpenAI */
	function resizeTextarea() {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
	/* End generated code */

	/* Generated on 9/19/24 using GPT-4o by OpenAI */
	function insertMarkdownSyntax(openingSymbol, closingSymbol = openingSymbol) {
		const selectionStart = textarea.selectionStart;
		const selectionEnd = textarea.selectionEnd;
		const selectedText = content.substring(selectionStart, selectionEnd);
		const beforeText = content.substring(0, selectionStart);
		const afterText = content.substring(selectionEnd);
		content = beforeText + openingSymbol + selectedText + closingSymbol + afterText;
		textarea.setSelectionRange(
			selectionStart + openingSymbol.length,
			selectionEnd + openingSymbol.length
		);
		textarea.focus();
		resizeTextarea();
	}

	function bold() {
		insertMarkdownSyntax('**');
	}

	function italicize() {
		insertMarkdownSyntax('_');
	}

	function underline() {
		insertMarkdownSyntax('<u>', '</u>');
	}

	function strikethrough() {
		insertMarkdownSyntax('~~');
	}

	function getCurrentLineInfo(content, selectionStart) {
		const lines = content.split('\n');
		let currentLineIndex = 0;
		let charactersCount = 0;

		for (let i = 0; i < lines.length; i++) {
			if (charactersCount + lines[i].length >= selectionStart) {
				currentLineIndex = i;
				break;
			}
			charactersCount += lines[i].length + 1; // +1 for the newline character
		}

		const currentLine = lines[currentLineIndex].trimStart();
		return { currentLineIndex, currentLine, lines };
	}

	function setHeader(level) {
		const selectionStart = textarea.selectionStart;
		const { currentLineIndex, currentLine, lines } = getCurrentLineInfo(content, selectionStart);

		const headerSymbol = level > 0 ? '#'.repeat(level) + ' ' : '';
		lines[currentLineIndex] = headerSymbol + currentLine.replace(/^#+\s*/, '');

		content = lines.join('\n');
		resizeTextarea();
		updateHeaderDropdown();
	}

	function updateHeaderDropdown() {
		const selectionStart = textarea.selectionStart;
		const { currentLine, lines } = getCurrentLineInfo(content, selectionStart);

		const match = currentLine.match(/^#+/);

		if (match) {
			headerLevel = `Header ${match[0].length}`;
		} else {
			headerLevel = 'Normal';
		}
	}

	function handleTextareaInput() {
		updateHeaderDropdown();
		resizeTextarea();
	}
	/* End generated code */
</script>

<div class="mx-auto p-8">
	<div class="mx-auto container text-center py-4">
		<select
			bind:value={headerLevel}
			on:change={() =>
				setHeader(headerLevel === 'Normal' ? 0 : parseInt(headerLevel.split(' ')[1]))}
		>
			<option>Header 1</option>
			<option>Header 2</option>
			<option>Header 3</option>
			<option>Header 4</option>
			<option>Header 5</option>
			<option>Header 6</option>
			<option>Normal</option>
		</select>
		<button
			class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50 border border-stone-700"
			on:click={bold}>Bold</button
		>
		<button
			class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50 border border-stone-700"
			on:click={italicize}>Italicize</button
		>
		<button
			class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50 border border-stone-700"
			on:click={underline}>Underline</button
		>
		<button
			class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50 border border-stone-700"
			on:click={strikethrough}>Strikethrough</button
		>
		<button
			class="px-4 py-2 rounded-md bg-stone-500 text-neutral-50 border border-stone-700"
			on:click={flip}>Flip</button
		>
	</div>
	<div class="mx-auto container text-center">
		<textarea
			class="w-2/3 min-h-28 p-4 resize-none border-stone-900 border border-stone-700 rounded-md overflow-hidden"
			bind:this={textarea}
			bind:value={content}
			on:input={handleTextareaInput}
			on:click={handleTextareaInput}
			on:keyup={handleTextareaInput}
		></textarea>
		<br />
	</div>
	<h1 class="py-2 font-bold">Preview ({isFlipped ? 'Back' : 'Front'})</h1>
	<div>
		{@html md.render(content)}
	</div>
</div>

<style>
	/* Generated on 9/19/24 using GPT-4o by OpenAI */
	:global(h1) {
		@apply text-xl font-extrabold;
	}

	:global(h2) {
		@apply text-lg font-extrabold;
	}

	:global(h3) {
		@apply text-lg font-bold;
	}

	:global(h4) {
		@apply text-lg font-semibold;
	}

	:global(h5) {
		@apply text-lg font-medium;
	}

	:global(h6) {
		@apply text-lg font-normal;
	}

	:global(p) {
		@apply mb-4 leading-relaxed text-base;
	}

	:global(ul) {
		@apply list-disc pl-4 mb-4;
	}

	:global(ol) {
		@apply list-decimal pl-4 mb-4;
	}

	:global(blockquote) {
		@apply border-l-4 border-stone-300 pl-4 italic mb-4;
	}

	:global(code) {
		@apply bg-stone-100 p-2 rounded font-mono no-underline;
	}
	/* End generated code */
</style>
