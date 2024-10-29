<script>
	import { superForm } from 'sveltekit-superforms';
	import { fade } from 'svelte/transition';

	import { Icons } from '$lib/icons.js';
	import Icon from '$lib/components/Icon.svelte';

	import Spinner from '$lib/components/Spinner.svelte';

	import Background from '$lib/assets/Background.avif';

	export let data;

	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form);
</script>

<svelte:head>
	<title>Nitin | Login</title>
</svelte:head>

<div
	class="min-w-screen mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
	style="background-image: url('{Background}');"
>
	<div class="mx-2">
		{#if $message}
			<div
				in:fade
				class="mx-auto max-w-sm rounded-xl border border-stone-400 bg-stone-50 bg-opacity-90 p-8 text-center backdrop-blur dark:border-stone-700 dark:bg-stone-950"
			>
				<div class="relative mx-auto mb-8 w-fit">
					<div
						class="rounded-full border border-stone-400 bg-stone-100 p-8 dark:border-stone-700 dark:bg-stone-950"
					>
						<Icon icon={Icons.Mail} alt="Email" width="72" height="72" />
						<div class="absolute right-7 top-8 flex items-center justify-center">
							<div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
								<span class="text-sm text-white">1</span>
							</div>
						</div>
					</div>
				</div>
				<h1 class="text-xl font-semibold">Check your inbox</h1>
				<p class="text-lg">A sign in link has been sent to<br /> your email.</p>
			</div>
		{:else}
			<h1 class="pb-10 text-center font-serif text-6xl text-white">Study smarter<br /> today.</h1>
			<form
				class="mx-auto max-w-sm rounded-xl border border-stone-400 bg-stone-50 bg-opacity-90 p-8 backdrop-blur dark:border-stone-700 dark:bg-stone-950"
				method="POST"
				use:enhance
			>
				<div class="mb-4">
					<input
						class="form-input"
						name="email"
						type="email"
						placeholder="name@school.edu"
						aria-invalid={$errors.email ? 'true' : undefined}
						bind:value={$form.email}
						{...$constraints.email}
					/>
					{#if $errors.email}
						<div in:fade class="mt-1 flex items-center justify-start">
							<Icon icon={Icons.Error} alt="Error" width="20" height="20" />
							<span class="ml-2 text-sm font-semibold text-red-500">Email is not valid.</span>
						</div>
					{/if}
				</div>
				<button class="btn-primary w-full rounded-full">
					{#if $delayed}
						<div in:fade>
							<Spinner />
						</div>
					{:else}
						Continue with email
					{/if}
				</button>
				<p class="mt-8 text-center text-sm text-stone-500 dark:text-stone-400">
					By clicking continue, you acknowledge and agree to the <a
						class="text-blue-500 hover:text-blue-600 hover:underline"
						href="/terms-of-service"
						aria-label="Terms of Service">Terms of Service</a
					>
					and
					<a class="text-blue-500 hover:text-blue-600 hover:underline" href="/privacy-policy"
						>Privacy Policy</a
					>.
				</p>
			</form>
		{/if}
	</div>
</div>
