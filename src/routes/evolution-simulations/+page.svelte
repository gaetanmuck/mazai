<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const evolutionSimulations = [
		{
			label: 'Emojis',
			href: '/evolution-simulations/emojis'
		}
	];
	const collection = useListCollection({
		items: evolutionSimulations,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.href
	});
</script>

<div class="grid gap-8 px-50 py-10">
	<h1 class="h1">Evolution simulations</h1>

	<p class="max-w-prose text-lg">
		Some explorations of the fascinating world of evolution through interactive simulations.
		<br /><br />
		From natural selection to complex patterns and emergent behaviors, discover how simple rules, beings, and interactions can give rise to unexpected complexity over time. Experiment with different parameters, observe the results, and see evolution unfold.
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
