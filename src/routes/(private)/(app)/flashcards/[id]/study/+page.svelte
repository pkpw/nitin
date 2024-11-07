<script>
	export let data;
	$: ({ supabase, navBar } = data);
	$: navBar.title.set('Study');
</script>
