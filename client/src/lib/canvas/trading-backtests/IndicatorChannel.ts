import type { Indicator } from './Indicator';
import type { Point } from './Point';

export class IndicatorChannel implements Indicator {
	name: string;
	pointsLow: Point[];
	pointsHigh: Point[];

	strokeColor: string;
	fillColor: string;
	lineWidth: number;

	isInMainChart = true;
	type = 'channel';

	constructor(name: string, pointsLow: Point[], pointsHigh: Point[], color: string, lineWidth: number) {
		this.name = name;
		this.pointsLow = pointsLow;
		this.pointsHigh = pointsHigh;
		this.strokeColor = color;
		this.lineWidth = lineWidth;

		let hex = this.strokeColor.replace('#', '');
		if (hex.length === 3) hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		this.fillColor = `rgba(${r},${g},${b},0.1)`;
	}

	static parse(rawIndicator: any) {
		return new IndicatorChannel(rawIndicator.name, rawIndicator.pointsLow, rawIndicator.pointsHigh, rawIndicator.color, rawIndicator.line_width);
	}

	select(timeBegin: number, timeEnd: number): IndicatorChannel {
		const pointsLowValid = this.pointsLow.map((p) => timeBegin <= p.timestamp && p.timestamp <= timeEnd);
		let firstIndex = pointsLowValid.findIndex((p) => p === true);
		let lastIndex = pointsLowValid.findLastIndex((p) => p === true);
		if (firstIndex > 0) firstIndex--;
		if (lastIndex < this.pointsLow.length - 1) lastIndex++;
		const pointsLow = this.pointsLow.slice(firstIndex, lastIndex + 1);
		const pointsHigh = this.pointsHigh.slice(firstIndex, lastIndex + 1);
		return new IndicatorChannel(this.name, pointsLow, pointsHigh, this.strokeColor, this.lineWidth);
	}

	getMin() {
		return Math.min(...this.pointsLow.map((p) => p.value));
	}

	getMax() {
		return Math.max(...this.pointsHigh.map((p) => p.value));
	}
}
