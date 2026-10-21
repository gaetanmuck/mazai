<script lang="ts">
	// 1. Imports
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { elementaryCellularAutomaton } from '$lib/canvas/elementary-cellular-automaton';
	import type { Config, Colors } from '$lib/canvas/elementary-cellular-automaton';
	import type { Simulation } from '$lib/canvas/simulation';

	// 2. Types

	// 3. Constants / static data
	const breadcrumbs = [
		{ label: 'Cellular automata', href: '/cellular-automata' },
		{
			label: 'Elementar Cellular Automaton',
			href: '/cellular-automata/elementar-cellular-automaton'
		}
	];
	const colors: Colors = {
		dead: '#1d2218',
		alive: '#acb6a1'
	};
	const ruleElements = [
		{ label: '⬜️⬜️⬜️', value: 0 },
		{ label: '⬜️⬜️⬛️', value: 1 },
		{ label: '⬜️⬛️⬜️', value: 2 },
		{ label: '⬜️⬛️⬛️', value: 3 },
		{ label: '⬛️⬜️⬜️', value: 4 },
		{ label: '⬛️⬜️⬛️', value: 5 },
		{ label: '⬛️⬛️⬜️', value: 6 },
		{ label: '⬛️⬛️⬛️', value: 7 }
	];

	// 4. Component references / runtime objects
	let simulation: Simulation<void, void>;
	let canvas: HTMLCanvasElement;

	// 5. Reactive state
	const config: Config = $state({
		horizontalCellNumber: 489,
		startMode: 'One cell in the middle',
		rule: [false, true, false, false, true, false, true, false]
	});

	// 6. Derived state

	// 7. Effects
	$effect(() => {
		const currentConfig = $state.snapshot(config);
		if (currentConfig.horizontalCellNumber >= 5000) {
			config.horizontalCellNumber = 5000;
			currentConfig.horizontalCellNumber = 5000;
		}
		startSimulation(currentConfig);
	});

	// 8. Functions
	function startSimulation(givenConfig: Config) {
		if (!simulation) return;
		// Resizing to correct dimensions (resolution)
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		// Start the simulation
		simulation.init(givenConfig, colors);
		simulation.start();
	}

	function calcRuleNumber() {
		let ruleNumber = 0;
		for (let i = 0; i < config.rule.length; i++) {
			ruleNumber += config.rule[i] ? Math.pow(2, i) : 0;
		}
		return ruleNumber;
	}

	// 9. Lifecycle
	onMount(() => {
		simulation = elementaryCellularAutomaton(canvas);
		startSimulation(config);
	});
	// onDestroy(() => simulation.end());
</script>

<header class="w-fit border-b px-6 py-3">
	<Breadcrumbs links={breadcrumbs} />
</header>

<div class="grid gap-8 px-10 py-10">
	<span class="flex place-items-end">
		<h1 class="flex-1 h1">Elementary Cellular Automaton</h1>
		<a class="anchor" href="https://en.wikipedia.org/wiki/Elementary_cellular_automaton" target="_blank"> Wikipedia page </a>
	</span>

	<canvas bind:this={canvas}></canvas>

	<span class="flex place-items-end">
		<h3 class="flex-1 h3">Current rule: {calcRuleNumber()}</h3>
		<label class="label w-50">
			<span class="label-text">Cell number by row</span>
			<input class="input" type="number" placeholder="Input" bind:value={config.horizontalCellNumber} min="1" max="1000" />
		</label>
	</span>

	<div class="grid grid-cols-4 grid-rows-2 gap-4">
		{#each ruleElements as item}
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" bind:checked={config.rule[item.value]} />
				<p>{item.label}</p>
			</label>
		{/each}
	</div>
</div>

<style>
	canvas {
		width: 100%;
		height: calc(100vh - 30rem);
	}
</style>
