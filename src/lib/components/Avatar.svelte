<script>
	import { getUserProfile } from '$lib/profile.js';

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

	const profile = getUserProfile();
</script>

<div
	class="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full text-center {color}"
>
	<span class="text-lg font-extrabold text-white">{$profile.firstName[0].toUpperCase()}</span>
</div>
