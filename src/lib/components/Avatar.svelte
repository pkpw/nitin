<script>
	import { Profile } from '$lib/profile.js';

	const colors = [
		'bg-red-500',
		'bg-orange-500',
		'bg-yellow-500',
		'bg-green-500',
		'bg-blue-500',
		'bg-sky-500',
		'bg-purple-500',
		'bg-pink-500'
	];
	export let color = colors[Math.floor(Math.random() * colors.length)];

	const profile = Profile.get();
</script>

<div
	class="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full text-center {$profile
		? color
		: 'animate-pulse bg-stone-400 dark:bg-stone-600'}"
>
	<span class="text-lg font-extrabold text-white"
		>{#if $profile}
			{$profile.first_name[0].toUpperCase()}
		{/if}
	</span>
</div>
