<script>
    export let data;
    let classroom = data.classroom;
</script>

<svelte:head>
    <title>{classroom.name}</title>
</svelte:head>

<div class="bg-white min-h-screen p-8">
    <h1 class="text-2xl font-bold">Classroom: {classroom.name}</h1>
</div>