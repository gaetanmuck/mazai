<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const cellularAutomata = [
		{
			label: 'Elementar Cellular Automaton',
			href: '/cellular-automata/elementar-cellular-automaton'
		},
		{
			label: "Conway's Game of Life",
			href: '/cellular-automata/game-of-life'
		}
	];
	const collection = useListCollection({
		items: cellularAutomata,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.href
	});
</script>

<div class="grid gap-8 px-50 py-10">
	<h1 class="h1">Cellular Automata</h1>

	<p class="max-w-prose text-lg">
		Simple rules can produce surprisingly complex worlds.
		<br /> <br />
		Cellular automata are mathematical models made of a grid of cells, where each cell changes over time according to a small set of local rules.
		<br /> <br />
		Despite their simplicity, these rules can generate patterns, structures, and behaviours that resemble surprisingly complex systems.
		<br /> <br />
		This page is a collection of cellular automata I've implemented and experimented with. Each one explores a different set of rules and emergent behaviours — from familiar classics to more unusual experiments.
		<br /> <br />
		Choose an automaton below to explore its rules and watch it evolve.
	</p>

	<Listbox class="w-fit" {collection}>
		<Listbox.Content>
			{#each collection.items as item (item.href)}
				<a href={item.href} class="anchor">
					<Listbox.Item {item}>
						<Listbox.ItemText>{item.label}</Listbox.ItemText>
					</Listbox.Item>
				</a>
			{/each}
		</Listbox.Content>
	</Listbox>
</div>
