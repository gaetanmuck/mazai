import { IndicatorChannel } from './IndicatorChannel';
import { IndicatorLine } from './IndicatorLine';
import { IndicatorPercent } from './IndicatorPercent';

export interface Indicator {
	name: string;
	isInMainChart: boolean;
	type: string;

	select(timeBegin: number, timeEnd: number): Indicator;
	getMin(): number;
	getMax(): number;
}

export type IndicatorParser = (raw: any) => Indicator;

const indicatorParser: Record<string, IndicatorParser> = {
	channel: (raw) => new IndicatorChannel(raw.name, raw.pointsLow, raw.pointsHigh, raw.color, raw.lineWidth),
	line: (raw) => new IndicatorLine(raw.name, raw.points, raw.color, raw.lineWidth),
	percent: (raw) => new IndicatorPercent(raw.name, raw.points, raw.color, raw.lineWidth)
};

export function parseIndicator(raw: any): Indicator {
	const parser = indicatorParser[raw.type];
	if (!parser) throw new Error(`Unknow Indicator Type: ${raw.type}`);
	return parser(raw);
}
