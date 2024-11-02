<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Nitin | Error</title>
</svelte:head>

<div
	class="mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4"
>
	<h1 class="pb-16 text-center font-serif text-5xl font-medium">An error occurred.</h1>
	<div
		class="mx-auto min-w-80 max-w-sm bg-stone-50 bg-opacity-90 p-8 text-center backdrop-blur dark:bg-stone-950"
	>
		<p class="text-lg">Please try again.</p>
		<!-- <p class="mt-8 text-xs text-stone-400">{$page.status} {$page.error.message}</p> -->
	</div>
</div>
