<script lang="ts">
	import { onMount } from 'svelte';
	import { Simulation } from '$lib/canvas/emojis/Simulation';

	let canvas: HTMLCanvasElement;
	let ctx: any;
	let simulation: Simulation;
	let pause = $state(true);
	let pauseFirstTurn = false;
	let frameSpeed;
	let data: any = $state({});
	let lastNewData: any;

	let showSettings = $state(false);
	let showDisplays = $state(false);
	let showCharts = $state(false);
	let showInfos = $state(false);

	const displayOptions = {
		energy: true,
		velocity: false,
		sight: false,
		target: true
	};

	onMount(() => {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		ctx = canvas.getContext('2d');

		simulation = new Simulation(canvas.width, canvas.height);
		simulation.initialize(canvas, ctx, displayOptions);

		start();
	});

	const start = () => {
		const wait = new Promise((resolve) => setTimeout(resolve, frameSpeed));

		if (!pause) {
			pauseFirstTurn = true;
			simulation.next();
			simulation.draw(canvas, ctx, displayOptions);
			if (simulation.newData != lastNewData) {
				data = simulation.data;
				lastNewData = simulation.newData;
			}
		} else if (pauseFirstTurn) {
			pauseFirstTurn = false;
		}

		wait.then(next);
	};

	const next = () => window.requestAnimationFrame(start);

	const toggleSettings = () => {
		showCharts = false;
		showDisplays = false;
		showInfos = false;
		showSettings = !showSettings;
	};

	const toggleDisplays = () => {
		showSettings = false;
		showCharts = false;
		showInfos = false;
		showDisplays = !showDisplays;
	};

	const toggleCharts = () => {
		console.log('Hello charts');
		showSettings = false;
		showDisplays = false;
		showInfos = false;
		showCharts = !showCharts;
	};

	const togglePause = () => {
		pause = !pause;
	};

	const toggleDisplayOption = (name: keyof typeof displayOptions) => {
		displayOptions[name] = !displayOptions[name];
		if (pause) simulation.draw(canvas, ctx, displayOptions);
	};

	const onKeyDown = (k: { key: string; preventDefault: () => void }) => {
		if (k.key == 's') toggleSettings();
		if (k.key == 'd') toggleDisplays();
		if (k.key == 'c') toggleCharts();
		if (k.key == ' ') {
			togglePause();
			k.preventDefault();
		}
		if (k.key == '&' || k.key == '1') toggleDisplayOption('energy');
		if (k.key == 'é' || k.key == '2') toggleDisplayOption('velocity');
		if (k.key == '"' || k.key == '3') toggleDisplayOption('sight');
		if (k.key == "'" || k.key == '4') toggleDisplayOption('target');
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="grid gap-8 px-50 py-10">
	<h1 class="h1">Emojis</h1>
</div>
<canvas bind:this={canvas}></canvas>

<div class="grid gap-8 px-50 py-10">
	<h3 class="h3">Information</h3>

	<!-- INTRODUCTION -->
	<p>This is a yet another simulation of the <a href="https://wikipedia.org/wiki/Evolution">evolution by natural selection</a>. It involves a world with rules (explained here), and actors (Emojis and Food) evolving together.</p>
	<p>Be ware! Running this simulation can become CPU heavy in some cases, make sure you do not need to spare your battery before running it.</p>

	<!-- SHORTCUTS -->
	<h4 class="h4">1. Shortcuts</h4>
	<p>To ease controls, shortcuts have been added to the simulation:</p>
	<ul>
		<li><code>space</code> : Pause / resume the simulation</li>
		<li><code>1</code> : Toggle Emoji's energy display</li>
		<li><code>2</code> : Toggle Emoji's velocity display</li>
		<li><code>3</code> : Toggle Emoji's sight</li>
		<li><code>4</code> : Toggle Emoji's target</li>
	</ul>
	<p>In addition, user can click on the map to select a Emoji or a Food and get live details.</p>

	<!-- WORLD -->
	<h4 class="h4">2. World</h4>

	<!-- WORLD measurement units -->
	<h5 class="h5">Measurement units:</h5>
	<ul>
		<li>The World is made of a rectangle of 1900 by 800 length unit. For simplicity, it corresponds to pixel on your screen.</li>
		<li>Time is represented by the age of the world (visible in the top left corner). Each unit of time is a frame.</li>
	</ul>

	<!-- WORLD processing -->
	<h5 class="h5">Processing</h5>
	<p>On each unit of time is calculated the state of the next one. Since the unit of time is small enough, everything looks like smooth movements.</p>
	<p>On death, entities (food or Emojis) are removed from the world.</p>

	<!-- WORLD initialization -->
	<h5 class="h5">Initialization</h5>
	<p>The first core principle of natural selection simulation is the population <strong>Initialization</strong>. Here population is randomly created at start (position and attributes) and let to live.</p>

	<!-- Food -->
	<h4 class="h4">3. Food</h4>
	<p>Food appear randomly in the world according to the creation rate setting. At each unit of time (i.e. frame) there is this rate of chance that a food pops somewhere.</p>
	<p>Food always have a mass of 2 units of mass.</p>

	<!-- Emoji -->
	<h4 class="h4">4. Emoji</h4>

	<h5 class="h5">Actions</h5>
	<p>Emoji have a limited set of possible actions: they can wander, move towards or away from a target, stop, search for something, eat, sleep, and hit another moji.</p>

	<h5 class="h5">Behaviors</h5>
	<p>Behavior tell how moji does act, depending on their state and what they see around.</p>

	<h5 class="h5">DNA</h5>
	<p>Each moji has its own DNA, describing how and when they have the previous mentioned behaviors. These parameters are actually those who are going to be selected through natural selection: if a Emoji is well adapted to the world (i.e. has a "good" DNA), he will most propably survive. On the contrary, if he has a "bad" DNA, he will die. This is the second principle of evolution: <strong>Selection</strong>.</p>

	<h5 class="h5">Reproduction</h5>
	<p>Once the selection is made, and the Emojis validates conditions (i.e. have a sufficient mass to reproduce), Emojis can reproduce themself (just like cells would do in our body), and duplicate their DNA. It is the third evolution principle: <strong>Reproduction</strong>.</p>

	<h5 class="h5">Mutation</h5>
	<p>On reproduction, each DNA gene is allowed to mutate. There is a lot of possibility of applying mutation, but each gene will be updated by a small random amount (depending on the settings). It is the fourths and last principle of natural seleciton: <strong>Mutation</strong>.</p>
</div>

<style>
	canvas {
		border: 3px solid var(--color-dark-0);
		border-radius: 5px;
		width: 100%;
		height: calc(100vh - 15rem);
	}
</style>
