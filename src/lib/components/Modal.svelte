<script>
	import { fade } from 'svelte/transition';

	let dialog;
	export let visible = false;
  export let close;
  export let message = "Are you sure?";
  export let isConfirm = false;

	$: hide = (event) => {
		if (visible && !dialog.contains(event.target)) {
			visible = false;
		}
	};
</script>

{#if visible}
	<button
		in:fade={{ delay: 0, duration: 150 }}
		out:fade={{ delay: 0, duration: 150 }}
		class="fixed left-0 top-0 z-50 flex h-screen w-screen cursor-default flex-col items-center justify-center overflow-clip bg-stone-950 bg-opacity-80 backdrop-blur-sm"
		on:click={hide}
	>
		<div
			bind:this={dialog}
			class="m-1 rounded-md border border-stone-400 bg-stone-50 p-8 dark:border-stone-700 dark:bg-stone-950"
		>
			<slot />
		</div>
	</button>
{/if}
<div class="modal-backdrop" on:click={() => close(false)}>
  <div class="modal-content" on:click|stopPropagation>
    <p>{message}</p>
    {#if isConfirm}
      <!-- Confirm and Cancel buttons for delete action -->
      <button on:click={() => close(true)} class="confirm-btn">Confirm</button>
      <button on:click={() => close(false)} class="cancel-btn">Cancel</button>
    {:else}
      <!-- Single Dismiss button for add success message -->
      <button on:click={() => close(false)} class="dismiss-btn">Dismiss</button>
    {/if}
  </div>
</div>