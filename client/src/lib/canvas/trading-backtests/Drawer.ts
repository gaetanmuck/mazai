import { Candle } from './Candle';
import type { Indicator } from './Indicator';
import { IndicatorChannel } from './IndicatorChannel';
import { IndicatorLine } from './IndicatorLine';
import { IndicatorPercent } from './IndicatorPercent';
import { PositionType, type Position } from './Position';
import type { Colors, Data, Options } from './types';

export type DrawerLimits = {
	timeBegin: number;
	timeEnd: number;
	timeWidth: number;
	valueMax: number;
	valueMin: number;
	valueHeight: number;
};

export class Drawer {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	limits: DrawerLimits;
	colors: Colors;
	currentImage: HTMLImageElement;
	lastCursorPosition: { x: number; y: number };
	primaryChartHeightRatio: number = 0.85;

	constructor(canvas: HTMLCanvasElement, colors: Colors) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.colors = colors;
		this.limits = {
			timeBegin: -Infinity,
			timeEnd: Infinity,
			timeWidth: Infinity,
			valueMin: -Infinity,
			valueMax: Infinity,
			valueHeight: Infinity
		};
		this.currentImage = new Image();
		this.lastCursorPosition = { x: 0, y: 0 };
	}

	setLimits(timeBegin: number, timeEnd: number) {
		this.limits.timeBegin = timeBegin;
		this.limits.timeEnd = timeEnd;
		this.limits.timeWidth = this.limits.timeEnd - this.limits.timeBegin;
	}

	updateLimits(candles: Candle[]) {
		const candleMin = Math.min(...candles.map((c) => c.low));
		const candleMax = Math.max(...candles.map((c) => c.high));
		const candlediff = candleMax - candleMin;

		this.limits.timeWidth = this.limits.timeEnd - this.limits.timeBegin;
		this.limits.valueMin = candleMin - candlediff * 0.05;
		this.limits.valueMax = candleMax + candlediff * 0.05;
		this.limits.valueHeight = this.limits.valueMax - this.limits.valueMin;
	}

	draw(data: Data, options: Options) {
		this.setLimits(options.valueBegin, options.valueEnd);

		// Filter in bound elements
		const candles = data.candles.filter((candle) => {
			return this.limits.timeBegin < candle.closeTime && candle.openTime < this.limits.timeEnd;
		});
		const positions = options.positions
			? data.positions.filter((position) => {
					return this.limits.timeBegin < position.closeTime && position.openTime < this.limits.timeEnd;
				})
			: [];
		const indicators = data.indicators
			.map((indicator) => {
				return indicator.select(this.limits.timeBegin, this.limits.timeEnd);
			})
			.filter((indicator) => !options.indicators.includes(indicator.name));

		this.updateLimits(candles);

		// Draw sequence
		this.drawMainBackground();
		positions.forEach((position) => this.drawPositionUnderCandles(position));
		indicators.filter((i) => i instanceof IndicatorChannel).forEach((i) => this.drawIndicatorChannel(i));
		candles.forEach((candle) => this.drawCandle(candle));
		positions.forEach((position) => this.drawPositionAboveCandles(position));
		indicators.filter((i) => i instanceof IndicatorLine).forEach((i) => this.drawIndicatorLine(i));

		this.drawSecondBackground();
		indicators.filter((i) => i instanceof IndicatorPercent).forEach((i) => this.drawIndicatorPercent(i));

		// Save for performance
		this.currentImage.src = this.canvas.toDataURL('image/png');

		if (options.cursor) this.drawCursor(undefined, options);
	}

	time_to_pixel(time: number, isWidth: boolean = false) {
		const diff_with_time_begin = time - this.limits.timeBegin;
		const ratio_with_time_width = (isWidth ? time : diff_with_time_begin) / this.limits.timeWidth;
		const pixel = ratio_with_time_width * this.canvas.width;
		return pixel;
	}

	value_to_pixel(value: number, isHeight: boolean = false) {
		const diff_with_value_min = value - this.limits.valueMin;
		const ratio_with_value_height = (isHeight ? value : diff_with_value_min) / this.limits.valueHeight;
		const pixel = ratio_with_value_height * this.canvas.height * this.primaryChartHeightRatio;
		return isHeight ? -pixel : -pixel + this.canvas.height * this.primaryChartHeightRatio; // because 0 is at bottom
	}

	pixel_to_time(pixel: number) {
		if (pixel < 0) return this.limits.timeBegin;
		else if (pixel > this.canvas.width) return this.limits.timeEnd;

		const ratio_with_canvas_width = pixel / this.canvas.width;
		const diff_with_time_begin = ratio_with_canvas_width * this.limits.timeWidth;
		const time = this.limits.timeBegin + diff_with_time_begin;
		return time;
	}
	pixel_to_value(pixel: number) {
		if (pixel < 0) return this.limits.valueMax;
		else if (pixel < this.primaryChartHeightRatio * this.canvas.height) {
			const adjusted_pixel = this.canvas.height * this.primaryChartHeightRatio - pixel;
			const ratio_with_canvas_height = adjusted_pixel / (this.canvas.height * this.primaryChartHeightRatio);
			const diff_with_value_min = ratio_with_canvas_height * this.limits.valueHeight;
			const value = this.limits.valueMin + diff_with_value_min;
			return value;
		} else if (pixel < this.canvas.height) {
			const pixelInSecondaryChart = this.primaryChartHeightRatio * this.canvas.height - pixel; // below 0
			const ratio_with_secondary_chart_height = pixelInSecondaryChart / ((1 - this.primaryChartHeightRatio) * this.canvas.height);
			const value = ratio_with_secondary_chart_height * 100; // To map it to a [0:100] scale, instead of [0:1]
			return value + 100; // Because scale is in other way: we want positif numbers, and we currently have 100 diff
		} else return 0;
	}

	setColor(color: string) {
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = color;
	}

	fullRect(x: number, y: number, w: number, h: number) {
		this.ctx.fillRect(x + 0.5, y + 0.5, w, h);
		this.ctx.strokeRect(x + 0.5, y + 0.5, w, h);
	}

	drawCursor(event: MouseEvent | undefined, options: Options) {
		if (!options.cursor) return;

		this.ctx.drawImage(this.currentImage, 0, 0);

		let rect = this.canvas.getBoundingClientRect();
		const x = event ? event.clientX - rect.left : this.lastCursorPosition.x;
		const y = event ? event.clientY - rect.top : this.lastCursorPosition.y;

		this.lastCursorPosition.x = x;
		this.lastCursorPosition.y = y;

		const xValue = this.pixel_to_time(x);
		const date = new Date(xValue);
		const [month, day, year, hours, minutes, seconds] = [(date.getMonth() + 1).toString(), date.getDate().toString(), date.getFullYear().toString(), date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
		const xValueStr = year.padStart(4, '0') + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0') + ' ' + hours.padStart(2, '0') + 'h' + minutes.padStart(2, '0') + 'm' + seconds.padStart(2, '0') + 's';

		let yValue = this.pixel_to_value(y);
		let yValueStr = Math.round(100 * yValue) / 100;

		this.setColor('yellow');
		this.ctx.lineWidth = 1;

		this.ctx.beginPath();
		this.ctx.moveTo(0, y);
		this.ctx.lineTo(this.canvas.width, y);
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, this.canvas.height);
		this.ctx.stroke();

		this.ctx.textAlign = 'right';
		this.ctx.textBaseline = 'top';
		this.ctx.font = '15px Helvetica';
		this.ctx.fillText(xValueStr, this.canvas.width - 10, 10);
		this.ctx.textBaseline = 'bottom';
		if (y < this.primaryChartHeightRatio * this.canvas.height) {
			this.ctx.fillText(yValueStr + '', this.canvas.width - 10, this.primaryChartHeightRatio * this.canvas.height - 10);
		} else {
			this.ctx.fillText(yValueStr + '', this.canvas.width - 10, this.canvas.height - 10);
		}
	}

	drawMainBackground() {
		// Main graph
		this.setColor(this.colors.backgroundColor);
		this.fullRect(0, 0, this.canvas.width, this.primaryChartHeightRatio * this.canvas.height);
	}

	drawSecondBackground() {
		this.setColor(this.colors.percentBackgroundColor);
		const x = 0;
		const y = this.canvas.height * this.primaryChartHeightRatio;
		this.fullRect(x, y, this.canvas.width, this.canvas.height * 0.15);
	}

	drawNothingToDisplay() {
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = '#fff';
		this.ctx.font = '48px Helvetica';
		this.ctx.fillText('Nothing to display', this.canvas.width / 2, this.canvas.height / 2);
	}

	drawCandle(candle: Candle) {
		const x_begin = this.time_to_pixel(candle.openTime);
		const x_middle = this.time_to_pixel((candle.openTime + candle.closeTime) / 2);
		const width_pixel = this.time_to_pixel(candle.closeTime - candle.openTime, true);

		const y_begin = this.value_to_pixel(candle.open);
		const y_high = this.value_to_pixel(candle.high);
		const y_low = this.value_to_pixel(candle.low);
		const height_pixel = this.value_to_pixel(candle.close - candle.open, true);

		const color = candle.isUpward() ? this.colors.upwardCandle : this.colors.downwardCandle;
		this.setColor(color);
		this.fullRect(x_begin, y_begin, width_pixel, height_pixel);
		this.ctx.beginPath();
		this.ctx.moveTo(x_middle, y_high);
		this.ctx.lineTo(x_middle, y_low);
		this.ctx.stroke();
	}

	drawPositionUnderCandles(position: Position) {
		const isLong = position.type == PositionType.long.valueOf();

		const x_begin = this.time_to_pixel(position.openTime);
		const y_begin = this.value_to_pixel(position.openValue);

		// Stop Losses
		if (position.stopLosses.length) {
			this.setColor(this.colors.losingPositionArea);
			const w_begin = this.time_to_pixel(position.stopLosses[0].timestamp - position.openTime, true);
			const h_value = (isLong ? this.limits.valueMin : this.limits.valueMax) - position.openValue;
			const h_begin = this.value_to_pixel(h_value, true);
			this.fullRect(x_begin, y_begin, w_begin, h_begin);
			for (let i = 0; i < position.stopLosses.length - 1; i++) {
				const curSL = position.stopLosses[i];
				if (isLong) {
					if (curSL.value <= position.openValue) this.setColor(this.colors.losingPositionArea);
					else this.setColor(this.colors.winingPositionArea);
				} else {
					if (curSL.value >= position.openValue) this.setColor(this.colors.losingPositionArea);
					else this.setColor(this.colors.winingPositionArea);
				}
				const x = this.time_to_pixel(curSL.timestamp);
				const w = this.time_to_pixel(position.stopLosses[i + 1].timestamp - curSL.timestamp, true);
				const h = this.value_to_pixel(position.openValue - curSL.value, true);
				this.fullRect(x, y_begin, w, -h); // -h because stop loss goes downward
			}
			const lastSL = position.stopLosses[position.stopLosses.length - 1];
			const x = this.time_to_pixel(lastSL.timestamp);
			const w = this.time_to_pixel(position.closeTime - lastSL.timestamp, true);
			const h = this.value_to_pixel(position.openValue - lastSL.value, true);
			this.fullRect(x, y_begin, w, -h); // -h because stop loss goes downward
		} else {
			this.setColor(this.colors.losingPositionArea);
			const width = this.time_to_pixel(position.closeTime - position.openTime, true);
			const height = this.value_to_pixel((isLong ? this.limits.valueMin : this.limits.valueMax) - position.openValue, true);
			this.fullRect(x_begin, y_begin, width, height);
		}

		// Take profits
		if (position.takeProfits.length) {
			this.setColor(this.colors.winingPositionArea);
			const w_begin = this.time_to_pixel(position.takeProfits[0].timestamp - position.openTime, true);
			const h_value = (isLong ? this.limits.valueMax : this.limits.valueMin) - position.openValue;
			const h_begin = this.value_to_pixel(h_value, true);
			this.fullRect(x_begin, y_begin, w_begin, h_begin);
			for (let i = 0; i < position.takeProfits.length - 1; i++) {
				const curTP = position.takeProfits[i];
				if (isLong) {
					if (curTP.value >= position.openValue) this.setColor(this.colors.winingPositionArea);
					else this.setColor(this.colors.losingPositionArea);
				} else {
					if (curTP.value <= position.openValue) this.setColor(this.colors.winingPositionArea);
					else this.setColor(this.colors.losingPositionArea);
				}
				const x = this.time_to_pixel(curTP.timestamp);
				const w = this.time_to_pixel(position.takeProfits[i + 1].timestamp - curTP.timestamp, true);
				const h = this.value_to_pixel(position.openValue - curTP.value, true);
				this.fullRect(x, y_begin, w, -h);
			}
			const lastTP = position.takeProfits[position.takeProfits.length - 1];
			const x = this.time_to_pixel(lastTP.timestamp);
			const w = this.time_to_pixel(position.closeTime - lastTP.timestamp, true);
			const h = this.value_to_pixel(position.openValue - lastTP.value, true);
			this.fullRect(x, y_begin, w, -h);
		} else {
			this.setColor(this.colors.winingPositionArea);
			const width = this.time_to_pixel(position.closeTime - position.openTime, true);
			const height = this.value_to_pixel((isLong ? this.limits.valueMax : this.limits.valueMin) - position.openValue, true);
			this.fullRect(x_begin, y_begin, width, height);
		}
	}

	drawPositionAboveCandles(position: Position) {
		this.setColor(this.colors.positionLine);

		const x_open = this.time_to_pixel(position.openTime);
		const x_close = this.time_to_pixel(position.closeTime);
		const y_open = this.value_to_pixel(position.openValue);
		const y_close = this.value_to_pixel(position.closeValue);

		// line
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.moveTo(x_open, y_open);
		this.ctx.lineTo(x_close, y_close);
		this.ctx.stroke();

		// Texts
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline = 'bottom';
		this.setColor(this.colors.positionLine);
		this.ctx.font = this.colors.positionFont;
		// Open
		this.ctx.save();
		this.ctx.translate(x_open, y_open);
		this.ctx.rotate(-Math.PI / 2); // 90° counter-clockwise

		this.ctx.fillText('OPEN ' + position.type.toUpperCase(), 0, 0);
		this.ctx.restore();
		// Close
		this.ctx.save();
		this.ctx.translate(x_close, y_close);
		this.ctx.rotate(-Math.PI / 2); // 90° counter-clockwise
		this.ctx.fillText('CLOSE ' + position.type.toUpperCase(), 0, 0);
		this.ctx.restore();
	}

	drawIndicator(indicator: Indicator) {
		// if (indicator instanceof IndicatorChannel) this.drawIndicatorChannel(indicator); ==> They are drawn before second chart
		if (indicator instanceof IndicatorLine) this.drawIndicatorLine(indicator);
		if (indicator instanceof IndicatorPercent) this.drawIndicatorPercent(indicator);
	}

	drawIndicatorLine(indicator: IndicatorLine) {
		this.setColor(indicator.color);
		this.ctx.lineWidth = indicator.lineWidth;

		this.ctx.beginPath();
		let firstDrawn: boolean = false;
		for (let i = 0; i < indicator.points.length; i++) {
			const x = this.time_to_pixel(indicator.points[i].timestamp);
			const y = this.value_to_pixel(indicator.points[i].value);
			if (!firstDrawn) {
				this.ctx.moveTo(x, y);
				firstDrawn = true;
			} else this.ctx.lineTo(x, y);
		}
		this.ctx.stroke();
	}

	drawIndicatorChannel(indicator: IndicatorChannel) {
		this.ctx.strokeStyle = indicator.strokeColor;
		this.ctx.fillStyle = indicator.fillColor;
		this.ctx.lineWidth = indicator.lineWidth;
		if (!indicator.pointsLow.length && !indicator.pointsHigh.length) return;
		// Line to join points below
		// Initiate shape
		this.ctx.beginPath();
		let x = this.time_to_pixel(indicator.pointsLow[0].timestamp);
		let y = this.value_to_pixel(indicator.pointsLow[0].value);
		this.ctx.moveTo(x, y);
		for (let i = 0; i < indicator.pointsLow.length; i++) {
			x = this.time_to_pixel(indicator.pointsLow[i].timestamp);
			y = this.value_to_pixel(indicator.pointsLow[i].value);
			this.ctx.lineTo(x, y);
		}
		// Line to join points above
		for (let i = indicator.pointsHigh.length - 1; i >= 0; i--) {
			x = this.time_to_pixel(indicator.pointsHigh[i].timestamp);
			y = this.value_to_pixel(indicator.pointsHigh[i].value);
			this.ctx.lineTo(x, y);
		}
		// Finalize
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	}

	drawIndicatorPercent(indicator: IndicatorPercent) {
		this.setColor(indicator.color);
		this.ctx.lineWidth = indicator.lineWidth;

		if (!indicator.points.length) return;
		this.ctx.beginPath();
		let x = this.time_to_pixel(indicator.points[0].timestamp);
		let y = -(indicator.points[0].value / 100) * (1 - this.primaryChartHeightRatio) * this.canvas.height + this.canvas.height;
		this.ctx.moveTo(x, y);
		for (let i = 0; i < indicator.points.length; i++) {
			x = this.time_to_pixel(indicator.points[i].timestamp);
			y = -(indicator.points[i].value / 100) * (1 - this.primaryChartHeightRatio) * this.canvas.height + this.canvas.height;
			this.ctx.lineTo(x, y);
		}
		this.ctx.stroke();
	}
}
