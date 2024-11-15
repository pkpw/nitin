// import { getContext, setContext } from 'svelte';
// import { derived, writable } from 'svelte/store';

// const CONTEXT = 'editor';

// function createEditor(quill) {
// 	const editor = writable(quill);
// 	return {
// 		subscribe: editor.subscribe,
// 		isBold: derived(editor, (e) => {
// 			const selection = e.getSelection();
// 			return e.getFormat(selection).bold;
// 		}),
// 		bold() {
// 			editor.update((e) => {
// 				const selection = e.getSelection();
// 				if (selection) {
// 					e.format('bold', !e.getFormat(selection).bold);
// 				}
// 			});
// 		}
// 	};
// }

// export function setEditor(quill) {
// 	return setContext(CONTEXT, createEditor(quill));
// }

// export function useEditor() {
// 	const editor = getContext(CONTEXT);
// 	if (!editor) {
// 		throw new Error('Editor store is not set!');
// 	}

// 	return editor;
// }
