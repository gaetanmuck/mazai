<script lang="ts">
	// 1. Imports
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { gameOfLife, StartingMap } from '$lib/canvas/game-of-life';
	import type { Config, Colors } from '$lib/canvas/game-of-life';
	import type { Simulation } from '$lib/canvas/simulation';

	// 2. Types

	// 3. Constants / static data
	const breadcrumbs = [
		{ label: 'Cellular automata', href: '/cellular-automata' },
		{
			label: 'Game Of Life',
			href: '/cellular-automata/game-of-life'
		}
	];
	const colors: Colors = {
		dead: '#1d2218',
		alive: '#acb6a1'
	};

	// 4. Component references / runtime objects
	let simulation: Simulation<void, void>;
	let canvas: HTMLCanvasElement;

	// 5. Reactive state
	const config: Config = $state({
		horizontalCellNumber: 200,
		startingMap: StartingMap.Random75,
		fps: 20
	});
	let previousFPS: number = $state(config.fps);

	// 6. Derived state

	// 7. Effects
	$effect(() => {
		const currentConfig = $state.snapshot(config);
		if (currentConfig.horizontalCellNumber >= 2000) {
			currentConfig.horizontalCellNumber = 2000;
			config.horizontalCellNumber = 2000;
		}
		// if (currentConfig.fps >= 60) {
		// 	currentConfig.fps = 60;
		// 	config.fps = 60;
		// }

		// if (previousFPS == currentConfig.fps) {
		startSimulation(currentConfig);
		// 	previousFPS = currentConfig.fps;
		// }
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

	// 9. Lifecycle
	onMount(() => {
		simulation = gameOfLife(canvas);
		startSimulation(config);
	});
	// onDestroy(() => simulation.end());
</script>

<header class="w-fit border-b px-6 py-3">
	<Breadcrumbs links={breadcrumbs} />
</header>

<div class="grid gap-8 px-10 py-10">
	<span class="flex place-items-end">
		<h1 class="flex-1 h1">Conway's Game of Life</h1>
		<a class="anchor" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"> Wikipedia page </a>
	</span>

	<canvas bind:this={canvas}></canvas>

	<span class="flex place-items-end">
		<h3 class="flex-1 h3">Options</h3>
	</span>

	<span class="grid grid-cols-3 gap-4">
		<label class="label">
			<span class="label-text">Cell number by row</span>
			<input class="input" type="number" placeholder="Input" bind:value={config.horizontalCellNumber} />
		</label>

		<label class="label">
			<span class="label-text">Starting map</span>
			<select class="select" bind:value={config.startingMap}>
				{#each Object.values(StartingMap).filter((e) => isNaN(Number(e))) as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span class="label-text">FPS</span>
			<input class="input" type="number" placeholder="Input" bind:value={config.fps} />
		</label>
	</span>
</div>

<style>
	canvas {
		width: 100%;
		height: calc(100vh - 30rem);
	}
</style>
