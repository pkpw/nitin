<script>
    import { fade } from 'svelte/transition';
    import { Icons } from '$lib/components/icons/icons';
    import Icon from '$lib/components/Icon.svelte';
    import Spinner from '../Spinner.svelte';

    export let close;
    export let questionIndex;
    export let questionText;
    export let onDelete;  
    
    let deleting = false;

    async function handleDelete() {
        deleting = true;
        await onDelete();  // Wait for deletion to complete
        close(true);
    }
</script>

<div class="mb-4 flex flex-row items-center space-x-4">
    <Icon icon={Icons.Delete} alt="Delete" width="32" height="32" fill={'#ef4444'} />
    <h1 class="text-xl font-semibold text-red-500">Delete Question</h1>
</div>

<p class="text-lg">
    Are you sure you want to permanently delete Question {questionIndex + 1}?
    {#if questionText}
        <br/>
        <span class="font-semibold">"{questionText}"</span>
    {/if}
</p>

<div class="flex flex-row items-center justify-end space-x-4 pt-4">
    <button 
        type="button" 
        class="btn-secondary rounded-full" 
        on:click={() => close(false)}
    >
        Cancel
    </button>
    
    <button 
        class="btn-danger rounded-full" 
        type="button"
        disabled={deleting}
        on:click={handleDelete}
    >
        {#if deleting}
            <div in:fade>
                <Spinner fill={'#fafaf9'} />
            </div>
        {:else}
            Delete
        {/if}
    </button>
</div>