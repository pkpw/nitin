<script>
	import Background from '$lib/assets/Background.avif';
</script>

<svelte:head>
	<title>Nitin | Login Error</title>
</svelte:head>

<div
	class="mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4"
	style="background-image: url('{Background}');"
>
	<h1 class="pb-16 text-center font-serif text-5xl font-medium">An error occurred.</h1>
	<div
		class="mx-auto max-w-80 rounded-xl border border-stone-400 bg-stone-50 bg-opacity-90 p-8 backdrop-blur dark:border-stone-700 dark:bg-stone-950"
	>
		<h1 class="text-center text-xl font-semibold">Login Failed</h1>
		<p class="text-center text-lg">We were unable to sign in to your account.</p>
		<a class="btn-primary mt-4 w-full rounded-full" href="/auth">Try Again</a>
	</div>
</div>
