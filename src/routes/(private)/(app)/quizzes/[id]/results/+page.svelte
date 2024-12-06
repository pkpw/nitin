<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    // =============================================
    // Score Calculation
    // =============================================
    
    /* got help from GPT-4o but learned mostly myself */

    // Extract and format the quiz score from URL parameters
    const score = $page.url.searchParams.get('score');
    const quizTitle = $page.url.searchParams.get('title');
    const formattedScore = score ? Number(score).toFixed(1) : '0.0';
</script>

<!-- =============================================
     Results Display Template
     ============================================= -->

<div class="max-w-2xl mx-auto p-4">
    <div class="text-center p-6 border rounded border-stone-400 dark:border-stone-700">
        <h2 class="text-xl font-bold mb-2">{quizTitle || 'Untitled Quiz'}</h2>
        <h3 class="text-lg mb-4">Quiz Results</h3>
        <p class="text-3xl font-bold">Your Score: {formattedScore}%</p>
        
        <div class="flex justify-center gap-4 mt-6">
            <button
                on:click={() => goto('/quizzes')}
                class="btn-secondary"
            >
                Back to Quizzes
            </button>
            {#if $page.params.id}
                <button
                    on:click={() => goto(`/quizzes/${$page.params.id}/study`)}
                    class="btn-primary"
                >
                    Try Again
                </button>
            {/if}
        </div>
    </div>
</div>