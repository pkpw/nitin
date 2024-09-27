<script>
	import { enhance } from '$app/forms';

	export let form;
</script>

<a href="/">Back</a>

{#if form?.success}
	<h1>Check your inbox</h1>
	<p>A sign in link has been sent to your email</p>
{:else}
	<form method="POST" use:enhance>
		<label>
			Email
			<input name="email" type="email" />
		</label>
		<button>Continue with email</button>
	</form>
{/if}
