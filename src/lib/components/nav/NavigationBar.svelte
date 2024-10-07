<script>
	import { writable } from 'svelte/store';
	import { crossfade, slide } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import Menu from '$lib/assets/icons/menu_32dp_FAFAF9_FILL0_wght400_GRAD0_opsz40.svg';
	import Close from '$lib/assets/icons/close_32dp_FAFAF9_FILL1_wght400_GRAD0_opsz40.svg';

	export let title = undefined;

	let menuButton;
	let navMenu;
	let enabled = false;

	$: toggle = () => {
		enabled = !enabled;
	};

	$: hide = (event) => {
		if (
			navMenu &&
			menuButton &&
			!navMenu.contains(event.target) &&
			!menuButton.contains(event.target)
		) {
			enabled = false;
		}
	};

	const [send, receive] = crossfade({
		duration: 500,
		easing: quadOut
	});
</script>

<svelte:window on:click={hide} />

<nav
	class="sticky left-0 top-0 z-50 mb-2 h-[69px] w-full border-b border-b-stone-700 bg-stone-950 bg-opacity-95 px-4 py-3 backdrop-blur"
>
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex w-full flex-row items-center">
			<button
				class="btn-outline relative h-10 w-10"
				bind:this={menuButton}
				on:click={toggle}
			>
				{#if enabled}
					<img
						in:send
						out:receive
						class="icon absolute left-[3px] top-[3px] h-8 w-8"
						src={Close}
						alt="Menu"
						width="32"
						height="32"
					/>
				{:else}
					<img
						in:send
						out:receive
						class="icon absolute left-[3px] top-[3px] h-8 w-8"
						src={Menu}
						alt="Menu"
						width="32"
						height="32"
					/>
				{/if}
			</button>
			{#if $title}
				<h1 class="pl-8 text-xl font-bold">{$title}</h1>
			{/if}
			<slot name="left"></slot>
		</div>
		<div class="flex w-full flex-row-reverse items-center">
			<slot name="right"></slot>
		</div>
	</div>
	{#if enabled}
		<div
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			bind:this={navMenu}
			class="absolute left-0 top-[69px] mx-auto h-[calc(100vh-69px)] w-full border-r-stone-700 bg-stone-950 md:w-1/2 md:border-r xl:w-1/3 xl:max-w-lg"
		>
			<div class="w-full min-w-80">
				<slot name="menu"></slot>
			</div>
		</div>
	{/if}
</nav>
