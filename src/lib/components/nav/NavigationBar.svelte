<script>
	import { writable } from 'svelte/store';
	import { crossfade, slide } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { Icons } from '$lib/icons';
	import Icon from '../Icon.svelte';

	export let title = undefined;
	export let shown = false;

	let menuButton;
	let navMenu;

	$: toggle = () => {
		shown = !shown;
	};

	$: hide = (event) => {
		if (
			shown &&
			navMenu &&
			menuButton &&
			!navMenu.contains(event.target) &&
			!menuButton.contains(event.target)
		) {
			shown = false;
		}
	};

	const [send, receive] = crossfade({
		duration: 500,
		easing: quadOut
	});
</script>

<svelte:window on:click={hide} />

<nav
	class="sticky left-0 top-0 z-50 mb-2 h-[69px] w-full border-b border-b-stone-400 bg-stone-50 bg-opacity-95 px-4 py-3 backdrop-blur transition-colors duration-300 ease-in-out dark:border-b-stone-700 dark:bg-stone-950"
>
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex w-full flex-row items-center">
			<button class="btn-outline relative h-10 w-10" bind:this={menuButton} on:click={toggle}>
				{#if shown}
					<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
						<Icon icon={Icons.Close} alt="Close" width="32" height="32" />
					</div>
				{:else}
					<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
						<Icon icon={Icons.Menu} alt="Menu" width="32" height="32" />
					</div>
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
	{#if shown}
		<div
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			bind:this={navMenu}
			class="absolute left-0 top-[69px] mx-auto h-[calc(100vh-69px)] w-full border-r-stone-400 bg-stone-50 dark:border-r-stone-700 dark:bg-stone-950 md:w-1/2 md:border-r xl:w-1/3 xl:max-w-[472px]"
		>
			<div class="w-full min-w-80">
				<slot name="menu"></slot>
			</div>
		</div>
	{/if}
</nav>
