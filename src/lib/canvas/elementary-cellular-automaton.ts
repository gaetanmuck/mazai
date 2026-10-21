import type { Simulation } from './simulation';

export type Config = {
	horizontalCellNumber: number;
	startMode: string;
	rule: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
};

export type Colors = {
	dead: string;
	alive: string;
};

let c: Config;
let colors: Colors;
let map: boolean[][];
let cellSizePixel: number;
let verticalCellNumber: number;

export function elementaryCellularAutomaton(canvas: HTMLCanvasElement): Simulation<void, void> {
	const ctx = canvas.getContext('2d')!;

	function init(config: Config, colors_: Colors) {
		c = config;
		colors = colors_;
		cellSizePixel = canvas.width / c.horizontalCellNumber;
		verticalCellNumber = canvas.height / cellSizePixel;
		map = [new Array(c.horizontalCellNumber).fill(false)];
	}

	function start() {
		// Clear
		clearCanvas();
		// Setup
		mapInitialization();
		// Loop
		for (let i = 0; i < verticalCellNumber; i++) {
			runGeneration();
			drawRow(map.length - 1);
		}
	}

	function pause() {}
	function resume() {}
	function end() {}

	/** Clear the canvas */
	function clearCanvas() {
		ctx.fillStyle = colors.dead;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	/** Initialize the map */
	function mapInitialization() {
		// Initialize the map
		if (c.startMode === 'One cell in the middle') {
			map[0][Math.floor(c.horizontalCellNumber / 2)] = true;
		} else if (c.startMode === 'Random 25%') {
			for (let i = 0; i < c.horizontalCellNumber; i++) {
				map[0][i] = Math.random() < 0.25;
			}
		} else if (c.startMode === 'Random 50%') {
			for (let i = 0; i < c.horizontalCellNumber; i++) {
				map[0][i] = Math.random() < 0.5;
			}
		} else if (c.startMode === 'Random 75%') {
			for (let i = 0; i < c.horizontalCellNumber; i++) {
				map[0][i] = Math.random() < 0.75;
			}
		}
		drawRow(0);
	}

	/** Compute (add) a new generation */
	function runGeneration() {
		let lastGeneration = map[map.length - 1];
		let newGeneration = getNextRow(lastGeneration);
		map.push(newGeneration);
	}

	/** Draw a single row of the cellular automaton */
	function drawRow(index: number) {
		ctx.fillStyle = colors.alive;
		for (let i = 0; i < c.horizontalCellNumber; i++) {
			if (map[index][i]) {
				ctx.fillRect(i * cellSizePixel, index * cellSizePixel, cellSizePixel, cellSizePixel);
			}
		}
	}

	/** Compute the next generation */
	function getNextRow(previousRow: boolean[]) {
		let newRow = new Array(c.horizontalCellNumber).fill(false);
		for (let i = 0; i < c.horizontalCellNumber; i++) {
			let left = previousRow[i - 1] || false;
			let center = previousRow[i];
			let right = previousRow[i + 1] || false;
			let ruleIndex = (left ? 1 : 0) + (center ? 2 : 0) + (right ? 4 : 0);
			newRow[i] = c.rule[ruleIndex];
		}
		return newRow;
	}

	function changeOptions() {}
	function getData() {}
	function getOptions() {}

	return { init, start, pause, resume, end, changeOptions, getData, getOptions };
}
