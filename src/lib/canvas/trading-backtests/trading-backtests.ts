import type { Simulation } from '../simulation';
import { Drawer } from './Drawer';
import { parseData, type Data } from './types';
import { parseColors, type Colors } from './types';
import { type Options, parseOptions } from './types';

export function tradingBacktests(): Simulation<Data, Options> {
	let data: Data;
	let options: Options;
	let canvas: HTMLCanvasElement;
	let colors: Colors;
	let drawer: Drawer;
	let candleDuration: number;

	function init(initCanvas: HTMLCanvasElement) {
		data = parseData(undefined);
		options = parseOptions({}, {});
		canvas = initCanvas;
		colors = parseColors({});
		drawer = new Drawer(initCanvas, colors);
	}

	function start(dataRaw: any, colorsRaw: any) {
		data = parseData(dataRaw);
		options = parseOptions({}, { valueBegin: data.candles[0].openTime, valueEnd: data.candles[data.candles.length - 1].closeTime });
		colors = parseColors(colorsRaw);
		drawer = new Drawer(canvas, colors);
		candleDuration = data.candles[0].closeTime - data.candles[0].openTime;

		document.addEventListener('mousemove', mousemoveEventHandler);
		document.addEventListener('mousedown', mousedownEventHandler);
		document.addEventListener('keydown', keyDownEventHandler);

		drawer.draw(data, options);
	}

	function end() {
		try {
			document.removeEventListener('mousemove', mousemoveEventHandler);
			document.removeEventListener('mousedown', mousedownEventHandler);
			document.removeEventListener('keydown', keyDownEventHandler);
		} catch (err) {}
	}

	function changeOptions(newOptions: Partial<Options>) {
		options = parseOptions(newOptions, options);
		drawer.draw(data, options);
	}

	function mousemoveEventHandler(event: MouseEvent) {
		if (!data.candles.length) return;
		if (options.cursor) drawer.drawCursor(event, options);
	}

	function mousedownEventHandler(event: MouseEvent) {
		let rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;
		const time = drawer.pixel_to_time(x);
		const beginTime = time - 100 * candleDuration;
		const endTime = time + 100 * candleDuration;
		changeOptions({ valueBegin: beginTime, valueEnd: endTime });
		return [beginTime, endTime];
	}

	function keyDownEventHandler(event: KeyboardEvent) {
		const step = 0.05;
		let newBeginTime, newEndTime;
		if (event.key == 'ArrowUp') {
			event.preventDefault();
			newBeginTime = drawer.limits.timeBegin + step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd - step * drawer.limits.timeWidth;
		} else if (event.key == 'ArrowDown') {
			event.preventDefault();
			newBeginTime = drawer.limits.timeBegin - step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd + step * drawer.limits.timeWidth;
		} else if (event.key == 'ArrowRight') {
			newBeginTime = drawer.limits.timeBegin + step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd + step * drawer.limits.timeWidth;
		} else if (event.key == 'ArrowLeft') {
			newBeginTime = drawer.limits.timeBegin - step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd - step * drawer.limits.timeWidth;
		}
		changeOptions({ valueBegin: newBeginTime, valueEnd: newEndTime });
	}

	function pause() {}
	function resume() {}
	function getData() {
		return data;
	}
	function getOptions(): Options {
		return options;
	}

	return { init, start, pause, resume, end, changeOptions, getData, getOptions };
}
