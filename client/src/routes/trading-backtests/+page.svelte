<script lang="ts">
	// 1. Imports
	import { onDestroy, onMount } from 'svelte';
	import { tradingBacktests } from '$lib/canvas/trading-backtests/trading-backtests';
	import type { Colors, Data } from '$lib/canvas/trading-backtests/types';
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { tick } from 'svelte';
	import defaultDataFile from '$lib/canvas/trading-backtests/test-file.json';
	import { Eye, EyeOff, Target } from '@lucide/svelte';
	import { formatDate, formatPercent } from '$lib/tools';
	import type { Position } from '$lib/canvas/trading-backtests/Position';
	import type { Indicator } from '$lib/canvas/trading-backtests/Indicator';

	// 2. Types

	// 3. Constants / static data
	const simulationColors: Colors = {
		upwardCandle: '#fff',
		downwardCandle: '#000',
		losingPositionArea: '#a55',
		winingPositionArea: '#5a5',
		positionLine: 'rgb(110, 110, 182)',
		positionFont: '15px Helvetica bold',
		backgroundColor: '#535353',
		percentBackgroundColor: '#434343'
	};
	let code = ['// Backtest file structure', '', '{', '  candles: Candle[],', '  positions: Position[],', '  indicators: Indicator[],', '}', '', '// Model details', '', 'class Candle {', '  openTime: number; // Unix Timestamp in ms', '  closeTime: number; // Unix Timestamp in ms', '  open: number;', '  high: number;', '  low: number;', '  close: number;', '  volume: number;', '  tradeNb: number;', '}', '', 'class Position {', "  type: 'long' | 'short';", '  openTime: number; // Unix Timestamp in ms', '  openValue: number;', '  volume: number;', '  closeTime: number; // Unix Timestamp in ms', '  closeValue: number;', '  stopLosses: Point[];', '  takeProfits: Point[];', '  fees: number;', '}', '', 'class IndicatorChannel implements Indicator {', "  type: 'channel'; // Discriminator for Indicator", '  name: string;', '  color: string; // e.g. hexadecimal', '  lineWidth: number;', '  pointsLow: Point[];', '  pointsHigh: Point[];', '}', '', 'class IndicatorLine implements Indicator {', "  type: 'line'; // Discriminator for Indicator", '  name: string;', '  color: string; // e.g. hexadecimal', '  lineWidth: number;', '  points: Point[];', '}', '', 'class IndicatorPercent implements Indicator {', '  // Those have values ranging from 0 to 100', "  type: 'percent'; // Discriminator for Indicator", '  name: string;', '  color: string; // e.g. hexadecimal', '  lineWidth: number;', '  points: Point[];', '}', '', 'class Point {', '  timestamp: number; // in ms', '  value: number;', '}'].join('\n');
	const highlighted = hljs.highlight(code, {
		language: 'typescript'
	}).value;

	// 4. Component references / runtime objects
	let canvas: HTMLCanvasElement;

	// 5. Reactive state
	let displayFileStructure = $state(false);
	let displayCanvas = $state(true);
	let displayGeneratedData = $state(true);
	let errorMessage = $state('');
	let simulation = $state(tradingBacktests());
	let results = $state({ profit: 0, expectancy: 0, feesByPosition: 0, winrate: 0, profitFactor: 0 });
	let simDisplayAllPositions: Boolean = $state(true);
	let simDisplayIndicators: Array<string> = $state([]);
	let simPositions: Array<Position> = $state([]);
	let simIndicators: Array<Indicator> = $state([]);

	// 6. Derived state

	// 7. Effects

	// 8. Functions
	async function loadFile(details: { files: File[] }) {
		const file = details.files[0];
		if (!file) return;

		const fileContent = await file.text();
		displayGeneratedData = false;

		await tick();

		try {
			startSimulation(JSON.parse(fileContent));
			results = computeResult();
		} catch (err) {
			errorMessage = (err as Error).message;
		}
	}

	function startSimulation(data: Data) {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		simulation.init(canvas);
		simulation.start(data, simulationColors);
		data = simulation.getData();
		simPositions = data.positions;
		simIndicators = data.indicators;
	}

	function showFileStructure() {
		displayCanvas = false;
		displayFileStructure = true;
		displayGeneratedData = false;
	}
	function showGeneratedData() {
		displayCanvas = true;
		displayFileStructure = false;
		displayGeneratedData = true;
	}
	function computeResult() {
		const currData = simulation.getData();
		const profit = currData.positions.reduce((acc, p) => acc + p.closingVolume, 0);
		const expectancy = profit / currData.positions.length;
		const fees = currData.positions.reduce((acc, p) => acc + p.fees, 0);
		const feesByPosition = fees / currData.positions.length;
		const winrate = currData.positions.filter((p) => p.result > 0).length / currData.positions.length;
		const totalWinProfit = currData.positions.filter((p) => p.result > 0).reduce((acc, p) => acc + p.result, 0);
		const totalLossProfit = currData.positions.filter((p) => p.result < 0).reduce((acc, p) => acc + p.result, 0);
		const profitFactor = totalWinProfit / totalLossProfit;
		return { profit, expectancy, feesByPosition, winrate, profitFactor };
	}
	function toggleDisplayPosition() {
		simDisplayAllPositions = !simDisplayAllPositions;
		simulation.changeOptions({ positions: simDisplayAllPositions });
	}
	function toggleDisplayIndicator(name: string | void) {
		if (name) {
			if (simDisplayIndicators.includes(name)) {
				simDisplayIndicators = simDisplayIndicators.filter((e) => e != name);
			} else simDisplayIndicators.push(name);
			simulation.changeOptions({ indicators: simDisplayIndicators });
		} else {
			if (simDisplayIndicators.length) simDisplayIndicators = [];
			else simDisplayIndicators = simIndicators.map((i) => i.name);
			simulation.changeOptions({ indicators: simDisplayIndicators });
		}
	}

	// 9. Lifecycle
	onMount(() => {
		startSimulation(defaultDataFile as Data);
		results = computeResult();
	});
	onDestroy(() => simulation.end());
</script>

<div class="grid gap-8 px-10">
	<span class="flex place-items-end">
		<h1 class="flex-1 h1">Trading backtests</h1>

		<h4 class="mr-10" style:display={displayGeneratedData ? 'block' : 'none'}>Generated data</h4>

		<button type="button" class="mr-10 btn preset-filled" onclick={showGeneratedData} style:display={displayFileStructure ? 'block' : 'none'}>Show Generated data</button>

		<button type="button" class="mr-10 btn preset-filled" onclick={showFileStructure} style:display={displayFileStructure ? 'none' : 'block'}>Show file structure</button>

		<FileUpload class="w-fit" onFileAccept={loadFile} accept=".json">
			<FileUpload.Trigger>Load backtest file</FileUpload.Trigger>
			<FileUpload.HiddenInput />
		</FileUpload>
	</span>

	<canvas bind:this={canvas} style:display={displayCanvas && errorMessage == '' ? 'block' : 'none'}></canvas>

	{#if errorMessage}
		<div>
			<h3 class="pt-20 h3">Error while loading your file:</h3>
			<p class="pt-5">
				{errorMessage}
			</p>
		</div>
	{/if}

	{#if displayFileStructure}
		<div style:display={displayFileStructure && errorMessage == '' ? 'block' : 'none'}>
			<pre><code class="hljs">{@html highlighted}</code></pre>
		</div>
	{:else}
		<div class="grid place-items-stretch gap-8 md:grid-cols-3">
			<!-- col1&2: Chart elements -->
			<div class="md:col-span-2">
				<div class="grid gap-5">
					<div class="grid grid-cols-2">
						<div>
							<div class="grid gap-3">
								<h2 class="h2">Results</h2>
								<div class="mr-8 card preset-filled-surface-100-900 p-4 text-center">
									<p>Winrate: {formatPercent(results.winrate, 1)}</p>
									<p>Profit: {Math.round(results.profit)}</p>
									<p>Profit Factor: {Math.round(results.profitFactor * 100) / 100}</p>
									<p>Expectancy: {Math.round(results.expectancy)}</p>
									<p>Fees By position: {Math.round(results.expectancy)}</p>
								</div>
								<h4 class="h4">Positions details</h4>
								<div class="grid gap-2">
									{#each simPositions as position}
										<div class="flex items-center gap-2">
											<button type="button" class="btn preset-tonal" onclick={() => simulation.changeOptions({ valueBegin: position.openTime, valueEnd: position.closeTime })}><Target /></button>
											<span>{position.type.toLocaleUpperCase()} - {formatDate(new Date(position.openTime), 'YYYY-MM-DD HH:mm')}: {formatPercent(position.resultPercent)}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
						<div>
							<div class="grid gap-8">
								<h2 class="h2">Display / Hide</h2>
								<div class="grid gap-2">
									<div class="flex items-center gap-2">
										{#if simDisplayAllPositions}
											<button type="button" class="btn preset-tonal" onclick={toggleDisplayPosition}><EyeOff /></button>
										{:else}
											<button type="button" class="btn preset-filled" onclick={toggleDisplayPosition}><Eye /></button>
										{/if}
										<span>All positions</span>
									</div>
									<div class="flex items-center gap-2">
										{#if simDisplayIndicators.length}
											<button type="button" class="btn preset-filled" onclick={() => toggleDisplayIndicator()}><Eye /></button>
										{:else}
											<button type="button" class="btn preset-tonal" onclick={() => toggleDisplayIndicator()}><EyeOff /></button>
										{/if}
										<span>All indicators</span>
									</div>

									{#each simIndicators as indicator}
										<div class="flex items-center gap-2">
											{#if simDisplayIndicators.includes(indicator.name)}
												<button type="button" class="btn preset-filled" onclick={() => toggleDisplayIndicator(indicator.name)}><Eye /></button>
											{:else}
												<button type="button" class="btn preset-tonal" onclick={() => toggleDisplayIndicator(indicator.name)}><EyeOff /></button>
											{/if}
											<span>{indicator.name}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Col3: controls -->
			<div>
				<div class="grid gap-2">
					<h2 class="h2">Controls</h2>
					<p><kbd class="kbd">Click</kbd> - Center view on the click</p>
					<p><kbd class="kbd">→</kbd> - Move the chart to the right</p>
					<p><kbd class="kbd">←</kbd> - Move the chart to the left</p>
					<p><kbd class="kbd">↑</kbd> - Zoom-in the chart (display less candles)</p>
					<p><kbd class="kbd">↓</kbd> - Zoom-out the chart (display more candles)</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	canvas {
		width: 100%;
		height: calc(100vh - 15rem);
	}
</style>
