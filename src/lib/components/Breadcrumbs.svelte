<script lang="ts">
	import { Slash } from '@lucide/svelte';
	import type { Component } from 'svelte';

	type Breadcrumb = {
		label: string;
		href: string;
		icon?: Component;
	};

	let { links }: { links: Breadcrumb[] } = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex items-center gap-2">
		{#each links as link, i}
			{#if i > 0}
				<span class="text-surface-900">/</span>
			{/if}

			<li>
				<a href={link.href} class="flex items-center gap-2 hover:underline">
					{#if link.icon}
						{@const Icon = link.icon}
						<Icon size={16} />
					{/if}

					<span>{link.label}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>
