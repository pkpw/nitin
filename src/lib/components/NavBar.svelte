<script>
	import { get, writable } from 'svelte/store';
	import { crossfade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import { Icons } from '$lib/components/icons/icons';
	import Icon from './Icon.svelte';

	import { useNavBar } from '$lib/stores/navbar';
	import { page } from '$app/stores';

	const navBar = useNavBar();

	let menuButton;
	let navMenu;

	$: toggle = () => {
		navBar.toggle();
	};

	const [send, receive] = crossfade({
		duration: 500,
		easing: quadOut
	});
</script>

<div class="sticky left-0 top-0 z-30">
	<nav
		class="bg-stone-50/90 py-3 backdrop-blur transition-colors duration-300 ease-in-out dark:bg-stone-950/90"
	>
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between">
				<div class="flex w-full flex-row items-center">
					<button
						class="btn-outline relative h-10 w-10 rounded-md"
						bind:this={menuButton}
						on:click={toggle}
					>
						{#if $navBar.visible}
							<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
								<Icon icon={Icons.Close} width="32" height="32" />
							</div>
						{:else}
							<div in:send out:receive class="absolute left-[3px] top-[3px] h-8 w-8">
								<Icon icon={Icons.Menu} width="32" height="32" />
							</div>
						{/if}
					</button>
					{#if $navBar.title}
						<h1 class="pl-8 text-xl font-bold">{$navBar.title}</h1>
					{/if}
					<slot name="left"></slot>
				</div>
				<div class="flex w-full flex-row-reverse items-center">
					<slot name="right"></slot>
				</div>
			</div>
			<div class="w-full">
				<slot name="bottom"></slot>
			</div>
		</div>
	</nav>
	{#if $navBar.visible}
		<div bind:this={navMenu}>
			<slot name="menu"></slot>
		</div>
	{/if}
</div>
