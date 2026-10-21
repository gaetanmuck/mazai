import type { Simulation } from './simulation';

export enum StartingMap {
	Random25 = 'Random25',
	Random50 = 'Random50',
	Random75 = 'Random75',
	Pulsar = 'Pulsar',
	PentaDecathlon = 'PentaDecathlon',
	Rpentomino = 'Rpentomino',
	Diehard = 'Diehard',
	Acorn = 'Acorn',
	GosperGliderGun = 'GosperGliderGun',
	InfinitePattern1 = 'InfinitePattern1',
	InfinitePattern2 = 'InfinitePattern2',
	InfinitePattern3 = 'InfinitePattern3'
}
enum State {
	Pause,
	Running
}

export type Config = {
	horizontalCellNumber: number;
	fps: number;
	startingMap: StartingMap;
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
let generation: number;
let state: State;
let previousRunTime: Date;

export function gameOfLife(canvas: HTMLCanvasElement): Simulation<void, void> {
	let data, options;

	const ctx = canvas.getContext('2d')!;
	document.addEventListener('keydown', keydownEventHandler);

	function init(config: Config, colors_: Colors) {
		c = config;
		colors = colors_;
		cellSizePixel = canvas.width / c.horizontalCellNumber;
		verticalCellNumber = canvas.height / cellSizePixel;
		map = Array.from({ length: verticalCellNumber }, () => Array.from({ length: c.horizontalCellNumber }, () => false));
		generation = 0;
		previousRunTime = new Date();

		if (c.startingMap == StartingMap.Random25) {
			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					map[i][j] = Math.random() > 0.25;
				}
			}
		} else if (c.startingMap == StartingMap.Random50) {
			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					map[i][j] = Math.random() > 0.5;
				}
			}
		} else if (c.startingMap == StartingMap.Random75) {
			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					map[i][j] = Math.random() > 0.75;
				}
			}
		} else if (c.startingMap == StartingMap.Pulsar) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY - 1][centerX - 2] = true;
			map[centerY - 1][centerX - 3] = true;
			map[centerY - 1][centerX - 4] = true;
			map[centerY - 1][centerX + 2] = true;
			map[centerY - 1][centerX + 3] = true;
			map[centerY - 1][centerX + 4] = true;
			map[centerY + 1][centerX - 2] = true;
			map[centerY + 1][centerX - 3] = true;
			map[centerY + 1][centerX - 4] = true;
			map[centerY + 1][centerX + 2] = true;
			map[centerY + 1][centerX + 3] = true;
			map[centerY + 1][centerX + 4] = true;
			map[centerY - 2][centerX - 1] = true;
			map[centerY - 3][centerX - 1] = true;
			map[centerY - 4][centerX - 1] = true;
			map[centerY + 2][centerX - 1] = true;
			map[centerY + 3][centerX - 1] = true;
			map[centerY + 4][centerX - 1] = true;
			map[centerY - 2][centerX + 1] = true;
			map[centerY - 3][centerX + 1] = true;
			map[centerY - 4][centerX + 1] = true;
			map[centerY + 2][centerX + 1] = true;
			map[centerY + 3][centerX + 1] = true;
			map[centerY + 4][centerX + 1] = true;
			map[centerY - 6][centerX - 2] = true;
			map[centerY - 6][centerX - 3] = true;
			map[centerY - 6][centerX - 4] = true;
			map[centerY - 6][centerX + 2] = true;
			map[centerY - 6][centerX + 3] = true;
			map[centerY - 6][centerX + 4] = true;
			map[centerY + 6][centerX - 2] = true;
			map[centerY + 6][centerX - 3] = true;
			map[centerY + 6][centerX - 4] = true;
			map[centerY + 6][centerX + 2] = true;
			map[centerY + 6][centerX + 3] = true;
			map[centerY + 6][centerX + 4] = true;
			map[centerY - 2][centerX - 6] = true;
			map[centerY - 3][centerX - 6] = true;
			map[centerY - 4][centerX - 6] = true;
			map[centerY + 2][centerX - 6] = true;
			map[centerY + 3][centerX - 6] = true;
			map[centerY + 4][centerX - 6] = true;
			map[centerY - 2][centerX + 6] = true;
			map[centerY - 3][centerX + 6] = true;
			map[centerY - 4][centerX + 6] = true;
			map[centerY + 2][centerX + 6] = true;
			map[centerY + 3][centerX + 6] = true;
			map[centerY + 4][centerX + 6] = true;
		} else if (c.startingMap == StartingMap.PentaDecathlon) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY - 4][centerX] = true;
			map[centerY - 3][centerX] = true;
			map[centerY - 2][centerX - 1] = true;
			map[centerY - 2][centerX + 1] = true;
			map[centerY - 1][centerX] = true;
			map[centerY][centerX] = true;
			map[centerY + 1][centerX] = true;
			map[centerY + 2][centerX] = true;
			map[centerY + 3][centerX - 1] = true;
			map[centerY + 3][centerX + 1] = true;
			map[centerY + 4][centerX] = true;
			map[centerY + 5][centerX] = true;
		} else if (c.startingMap == StartingMap.Rpentomino) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX] = true;
			map[centerY][centerX + 1] = true;
			map[centerY][centerX - 1] = true;
			map[centerY - 1][centerX + 1] = true;
			map[centerY][centerX - 1] = true;
			map[centerY + 1][centerX] = true;
		} else if (c.startingMap == StartingMap.Diehard) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX - 2] = true;
			map[centerY][centerX - 3] = true;
			map[centerY + 1][centerX - 2] = true;
			map[centerY + 1][centerX + 2] = true;
			map[centerY + 1][centerX + 3] = true;
			map[centerY + 1][centerX + 4] = true;
			map[centerY - 1][centerX + 3] = true;
		} else if (c.startingMap == StartingMap.Acorn) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX - 1] = true;
			map[centerY][centerX - 2] = true;
			map[centerY - 2][centerX - 1] = true;
			map[centerY - 1][centerX + 1] = true;
			map[centerY][centerX + 2] = true;
			map[centerY][centerX + 3] = true;
			map[centerY][centerX + 4] = true;
		} else if (c.startingMap == StartingMap.GosperGliderGun) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX] = true;
			map[centerY - 1][centerX - 1] = true;
			map[centerY][centerX - 1] = true;
			map[centerY + 1][centerX - 1] = true;
			map[centerY - 2][centerX - 2] = true;
			map[centerY + 2][centerX - 2] = true;
			map[centerY][centerX - 3] = true;
			map[centerY - 3][centerX - 4] = true;
			map[centerY + 3][centerX - 4] = true;
			map[centerY - 3][centerX - 5] = true;
			map[centerY + 3][centerX - 5] = true;
			map[centerY - 2][centerX - 6] = true;
			map[centerY + 2][centerX - 6] = true;
			map[centerY - 1][centerX - 7] = true;
			map[centerY][centerX - 7] = true;
			map[centerY + 1][centerX - 7] = true;
			map[centerY][centerX - 16] = true;
			map[centerY][centerX - 17] = true;
			map[centerY - 1][centerX - 16] = true;
			map[centerY - 1][centerX - 17] = true;
			map[centerY - 1][centerX + 3] = true;
			map[centerY - 2][centerX + 3] = true;
			map[centerY - 3][centerX + 3] = true;
			map[centerY - 1][centerX + 4] = true;
			map[centerY - 2][centerX + 4] = true;
			map[centerY - 3][centerX + 4] = true;
			map[centerY][centerX + 5] = true;
			map[centerY - 4][centerX + 5] = true;
			map[centerY - 4][centerX + 7] = true;
			map[centerY - 5][centerX + 7] = true;
			map[centerY][centerX + 7] = true;
			map[centerY + 1][centerX + 7] = true;
			map[centerY - 2][centerX + 17] = true;
			map[centerY - 2][centerX + 18] = true;
			map[centerY - 3][centerX + 17] = true;
			map[centerY - 3][centerX + 18] = true;
		} else if (c.startingMap == StartingMap.InfinitePattern1) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX] = true;
			map[centerY - 1][centerX] = true;
			map[centerY - 2][centerX] = true;
			map[centerY - 1][centerX + 2] = true;
			map[centerY - 2][centerX + 2] = true;
			map[centerY - 3][centerX + 2] = true;
			map[centerY - 2][centerX + 3] = true;
			map[centerY + 1][centerX - 2] = true;
			map[centerY + 2][centerX - 2] = true;
			map[centerY + 2][centerX - 4] = true;
		} else if (c.startingMap == StartingMap.InfinitePattern2) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY + 1][centerX] = true;
			map[centerY + 2][centerX] = true;
			map[centerY + 1][centerX - 1] = true;
			map[centerY + 2][centerX - 2] = true;
			map[centerY][centerX + 1] = true;
			map[centerY][centerX + 2] = true;
			map[centerY + 1][centerX + 2] = true;
			map[centerY + 2][centerX + 2] = true;
			map[centerY - 2][centerX + 2] = true;
			map[centerY - 2][centerX] = true;
			map[centerY - 2][centerX - 1] = true;
			map[centerY - 2][centerX - 2] = true;
			map[centerY - 1][centerX - 2] = true;
		} else if (c.startingMap == StartingMap.InfinitePattern3) {
			var centerX = Math.floor(c.horizontalCellNumber / 2);
			var centerY = Math.floor(verticalCellNumber / 2);
			map[centerY][centerX] = true;
			map[centerY][centerX - 1] = true;
			map[centerY][centerX - 2] = true;
			map[centerY][centerX - 6] = true;
			map[centerY][centerX - 7] = true;
			map[centerY][centerX - 8] = true;
			map[centerY][centerX - 9] = true;
			map[centerY][centerX - 10] = true;
			map[centerY][centerX - 12] = true;
			map[centerY][centerX - 13] = true;
			map[centerY][centerX - 14] = true;
			map[centerY][centerX - 15] = true;
			map[centerY][centerX - 16] = true;
			map[centerY][centerX - 17] = true;
			map[centerY][centerX - 18] = true;
			map[centerY][centerX - 19] = true;
			map[centerY][centerX + 7] = true;
			map[centerY][centerX + 8] = true;
			map[centerY][centerX + 9] = true;
			map[centerY][centerX + 10] = true;
			map[centerY][centerX + 12] = true;
			map[centerY][centerX + 13] = true;
			map[centerY][centerX + 15] = true;
			map[centerY][centerX + 16] = true;
			map[centerY][centerX + 17] = true;
			map[centerY][centerX + 18] = true;
			map[centerY][centerX + 19] = true;
		}
	}

	function start() {
		state = State.Running;
		run();
	}

	function pause() {
		state = State.Pause;
	}

	function resume() {
		state = State.Running;
		run();
	}

	function end() {
		state = State.Pause;
		document.removeEventListener('keydown', keydownEventHandler);
	}

	function run() {
		const now = new Date();
		if (previousRunTime.getTime() + 1000 / c.fps < now.getTime() && state != State.Pause) {
			previousRunTime = now;
			nextGeneration();
			draw();
			requestAnimationFrame(run);
		} else if (state == State.Pause) {
			drawPause();
		} else {
			requestAnimationFrame(run);
		}
	}

	function nextGeneration() {
		const nextMap = [];
		for (let i = 0; i < map.length; i++) {
			const newRow = [];
			for (let j = 0; j < map[i].length; j++) {
				const neighbors = getAliveNeighorsNumber(i, j);
				if (map[i][j]) {
					if (neighbors < 2) newRow.push(false);
					else if (neighbors <= 3) newRow.push(true);
					else newRow.push(false);
				} else if (neighbors == 3) newRow.push(true);
				else newRow.push(map[i][j]);
			}
			nextMap.push(newRow);
		}
		map = nextMap;
		generation++;
	}

	function getAliveNeighorsNumber(i: number, j: number) {
		const neighbors = [
			i > 0 && j > 0 ? map[i - 1][j - 1] : false, // top left
			j > 0 ? map[i][j - 1] : false, // top
			i < map.length - 1 && j > 0 ? map[i + 1][j - 1] : false, // top right
			i > 0 ? map[i - 1][j] : false, // center left
			i < map.length - 1 ? map[i + 1][j] : false, // center right
			i > 0 && j < map[i].length - 1 ? map[i - 1][j + 1] : false, // bot left
			j < map[i].length - 1 ? map[i][j + 1] : false, // bot
			i < map.length - 1 && j < map[i].length - 1 ? map[i + 1][j + 1] : false // bot right
		];

		return neighbors.filter(Boolean).length;
	}

	function draw() {
		var cellsAlive = 0;

		ctx.fillStyle = colors.dead;
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

		ctx.fillStyle = colors.alive;
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j]) {
					ctx.fillRect(j * cellSizePixel, i * cellSizePixel, cellSizePixel, cellSizePixel);
					cellsAlive++;
				}
			}
		}

		ctx.fillStyle = 'red';
		ctx.font = '22px Arial';
		ctx.fillText('Generation: ' + generation, 10, 20);
		ctx.fillText('Cells alive: ' + cellsAlive, 10, 40);
		ctx.fillText('Generations per second:' + Math.round(c.fps), 10, 60);
	}

	function drawPause() {
		ctx.fillText('PAUSED', 10, 80);
	}

	function keydownEventHandler(evt: KeyboardEvent) {
		//  Pause event handler
		if (evt.key == ' ') {
			if (state == State.Pause) resume();
			else if (state == State.Running) pause();
			evt.preventDefault();
		}
		// FPS event handler
		if (evt.key == '-') c.fps *= 0.9;
		else if (evt.key == '+') c.fps *= 1.1;
	}

	function changeOptions() {}
	function getData() {}
	function getOptions() {}

	return { init, start, pause, resume, end, changeOptions, getData, getOptions };
}
