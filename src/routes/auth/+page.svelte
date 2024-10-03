<script>
	import { superForm } from 'sveltekit-superforms';
	import { fade } from 'svelte/transition';
	import Mail from '$lib/assets/icons/mail_72dp_FAFAF9_FILL1_wght400_GRAD0_opsz48.svg';
	import Error from '$lib/assets/icons/error_20dp_EF4444_FILL1_wght400_GRAD0_opsz20.svg';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;

	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form);
</script>

<svelte:head>
	<title>Nitin | Login</title>
</svelte:head>

<div class="mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden">
	<div class="mx-auto max-w-sm p-4">
		{#if $message}
			<h1 class="pb-20 text-center text-4xl font-bold text-white">You're all set!</h1>
			<div in:fade class="rounded-md border border-stone-700 p-8 text-center text-white">
				<div class="relative mx-auto mb-8 w-fit">
					<div class="rounded-full border border-stone-700 p-8">
						<img src={Mail} alt="Email" width="72" height="72" />
						<div class="absolute right-7 top-8 flex items-center justify-center">
							<div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
								<span class="text-sm">1</span>
							</div>
						</div>
					</div>
				</div>
				<h1 class="text-xl font-semibold">Check your inbox</h1>
				<p class="text-lg">A sign in link has been sent to your email.</p>
			</div>
		{:else}
			<h1 class="pb-20 text-center text-4xl font-bold text-white">Study smarter today.</h1>
			<form class="rounded-md border border-stone-700 p-8" method="POST" use:enhance>
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
							<img src={Error} alt="Error" />
							<span class="ml-2 text-sm font-semibold text-red-500">Email is not valid.</span>
						</div>
					{/if}
				</div>
				<button class="btn">
					{#if $delayed}
						<div in:fade>
							<Spinner />
						</div>
					{:else}
						Continue with email
					{/if}
				</button>
				<p class="mt-8 text-center text-sm text-stone-400">
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
