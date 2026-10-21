import type { Indicator } from './Indicator';
import type { Point } from './Point';

export class IndicatorPercent implements Indicator {
	name: string;
	points: Point[];

	color: string;
	lineWidth: number;

	isInMainChart = false;
	type = 'percent';

	constructor(name: string, points: Point[], color: string, lineWidth: number) {
		this.name = name;
		this.points = points;
		this.color = color;
		this.lineWidth = lineWidth;
	}

	static parse(rawIndicator: any) {
		return new IndicatorPercent(rawIndicator.name, rawIndicator.points, rawIndicator.color, rawIndicator.line_width);
	}

	select(timeBegin: number, timeEnd: number): IndicatorPercent {
		const pointsValid = this.points.map((p) => timeBegin <= p.timestamp && p.timestamp <= timeEnd);
		let firstIndex = pointsValid.findIndex((p) => p === true);
		let lastIndex = pointsValid.findLastIndex((p) => p === true);
		if (firstIndex > 0) firstIndex--;
		if (lastIndex < this.points.length - 1) lastIndex++;
		const points = this.points.slice(firstIndex, lastIndex + 1);
		return new IndicatorPercent(this.name, points, this.color, this.lineWidth);
	}

	getMin() {
		return Math.min(...this.points.map((p) => p.value));
	}

	getMax() {
		return Math.max(...this.points.map((p) => p.value));
	}
}
