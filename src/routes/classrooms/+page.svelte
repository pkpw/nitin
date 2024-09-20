<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';

    type Classroom = {
        id: number;
        name: string;
        created_at: string;
    };

    let classrooms: Classroom[] = [];
    let classroomName: string = '';

    async function loadClassrooms() {
    try {
        const { data, error } = await supabase
            .from('classrooms')  
            .select('*'); 

        if (error) {
            console.error('Error getting classrooms:', error);
        } else {
            classrooms = data;  
        }
    } catch (err) {
        console.error('Unexpected error while getting classrooms:', err);
    }
}

    async function createClassroom() {
    if (classroomName.length < 3 || classroomName.length > 32) {
        alert("Classroom name must be between 3 and 32 characters.");
        return;
    }

    try {
        const { data, error } = await supabase
            .from('classrooms')
            .insert([{ name: classroomName }]); 

        if (error) {
            console.error('Error creating classroom:', error);
        } else {
            classroomName = '';
            loadClassrooms();  
        }
    } catch (err) {
        console.error('Unexpected error while creating classroom :', err);
    }
}

    onMount(loadClassrooms);

    async function deleteClassroom(classroomId: any) {
        try {
            const { error } = await supabase
                .from('classrooms')
                .delete()
                .eq('id', classroomId);  

            if (error) {
                console.error('Error deleting classroom:', error);
            } else {
                loadClassrooms();  
            }
        } catch (err) {
            console.error('Error while deleting classroom:', err);
        }
    }

    loadClassrooms();
</script>

<div class="mx-auto p-8">
    <h1 class="text-2xl font-bold">Classrooms</h1>

    <input 
        type="text" 
        bind:value={classroomName} 
        placeholder="Enter Classroom Name" 
        class="p-2 border-stone-900 border-2 rounded-md w-1/3 mt-4" 
    />

    <button 
        class="px-4 py-2 bg-stone-500 text-white rounded-md ml-4" 
        on:click={createClassroom}
    >
        Create Classroom
    </button>

    <ul class="mt-8">
        {#each classrooms as classroom}
            <li class="border p-4 rounded-md mb-4">
                {classroom.name} (Created at: {new Date(classroom.created_at).toLocaleString()})
                <button class="border p-4 rounded-md mb-4" on:click={() => deleteClassroom(classroom.id)}>Delete</button>

            </li>
        {/each}
    </ul>
</div>