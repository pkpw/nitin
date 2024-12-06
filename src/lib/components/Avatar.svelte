<script>
	import { useProfile } from '$lib/stores/profile';

	const colors = [
		'#ef4444', // red-500
		'#f97316', // orange-500
		'#eab308', // yellow-500
		'#22c55e', // green-500
		'#14b8a6', // teal-500
		'#0ea5e9', // sky-500
		'#3b82f6', // blue-500
		'#a855f7', // purple-500
		'#ec4899' // pink-500
	];
	export let color = colors[Math.floor(Math.random() * colors.length)];

	const profile = useProfile();
</script>

<div
	class="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full text-center {$profile
		? ''
		: 'animate-pulse'} bg-stone-400 dark:bg-stone-600"
	style={$profile ? `background-color: ${color} !important;` : ''}
>
	<span class="text-lg font-extrabold text-white"
		>{#if $profile}
			{$profile.first_name[0].toUpperCase()}
		{/if}
	</span>
</div>
