<script lang="ts">
	import { Menu, X, House, Germ, ChartCandlestick, Virus } from '@lucide/svelte/icons';

	// App title
	let title = 'mazai.dev';

	// Menu items
	let items = [
		{ label: 'Home', href: '/', icon: House },
		{ label: 'Cellular Automata', href: '/cellular-automata', icon: Germ },
		{ label: 'Trading backtests', href: '/trading-backtests', icon: ChartCandlestick },
		{ label: 'Evolution simulations', href: '/evolution-simulations', icon: Virus }
	];

	// for responsiveness
	let open = $state(false);
	function closeOnMobile() {
		if (window.innerWidth < 768) {
			open = false;
		}
	}
</script>

<!-- Mobile backdrop -->
{#if open}
	<button
		class="fixed inset-0 z-40 bg-black/30 md:hidden"
		aria-label="Close sidebar"
		onclick={() => (open = false)}
	></button>
{/if}

<!-- Mobile menu button -->
<button
	class="fixed top-3 left-3 z-50 md:hidden"
	class:btn={!open}
	class:btn-sm={!open}
	aria-label="Open sidebar"
	onclick={() => (open = true)}
>
	<Menu size={20} />
</button>

<!-- Sidebar -->
<aside
	class="
		border-surface-200-800-token fixed inset-y-0 left-0
		z-50 flex w-80
		flex-col items-center
		border-r
		bg-surface-900 transition-transform
		duration-200

		md:translate-x-0
	"
	class:-translate-x-full={!open}
	class:translate-x-0={open}
>
	<!-- Header -->
	<div class="mt-20 mb-10 flex h-14 items-center justify-between px-4">
		<a href="/" class="text-lg font-semibold">
			{title}
		</a>

		<button
			class="variant-ghost btn btn-sm md:hidden"
			aria-label="Close sidebar"
			onclick={() => (open = false)}
		>
			<X size={20} />
		</button>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 space-y-1 overflow-y-auto px-2 py-3">
		{#each items as item}
			<a
				href={item.href}
				class="hover:bg-surface-200-800-token flex items-center gap-3 rounded-lg px-3 py-2 text-sm
					transition-colors"
				onclick={closeOnMobile}
			>
				{#if item.icon}
					{@const Icon = item.icon}
					<Icon />
				{/if}

				<span>{item.label}</span>
			</a>
		{/each}
	</nav>
</aside>

<!-- Desktop content offset -->
<style>
	:global(main) {
		margin-left: 20rem;
		margin-top: 5rem;
	}

	@media (max-width: 767px) {
		:global(main) {
			margin-left: 1rem;
		}
	}
</style>
