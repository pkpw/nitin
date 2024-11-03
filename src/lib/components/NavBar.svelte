<script>
	import { get, writable } from 'svelte/store';
	import { crossfade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from './Icon.svelte';

	export let title = writable(undefined);
	export let visible = writable(false);

	let menuButton;
	let navMenu;

	$: toggle = () => {
		visible.update((v) => !v);
	};

	$: hide = (event) => {
		if (
			get(visible) &&
			navMenu &&
			menuButton &&
			!navMenu.contains(event.target) &&
			!menuButton.contains(event.target)
		) {
			visible.set(false);
		}
	};

	const [send, receive] = crossfade({
		duration: 500,
		easing: quadOut
	});
</script>

<svelte:window on:click={hide} />

<nav
	class="sticky left-0 top-0 z-40 h-[69px] w-full bg-stone-50 bg-opacity-[0.98] px-4 py-3 backdrop-blur transition-colors duration-300 ease-in-out dark:bg-stone-950/95 dark:bg-opacity-95"
>
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex w-full flex-row items-center">
			<button
				class="btn-outline relative h-10 w-10 rounded-md"
				bind:this={menuButton}
				on:click={toggle}
			>
				{#if $visible}
					<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
						<Icon icon={Icons.Close} width="32" height="32" />
					</div>
				{:else}
					<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
						<Icon icon={Icons.Menu} width="32" height="32" />
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
	{#if $visible}
		<div bind:this={navMenu}>
			<slot name="menu"></slot>
		</div>
	{/if}
</nav>
