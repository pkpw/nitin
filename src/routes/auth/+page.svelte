<script>
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>Nitin | Login</title>
</svelte:head>

<a href="/">Back</a>

{#if $message}
	<h1>Check your inbox</h1>
	<p>A sign in link has been sent to your email</p>
{:else}
	<form method="POST" use:enhance>
		<label>
			Email
			<input
				name="email"
				type="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>
		{#if $errors.email}<span class="invalid">Please enter a valid email</span>{/if}
		<button>Continue with email</button>
	</form>
{/if}

<style>
	.invalid {
		color: red;
	}
</style>
