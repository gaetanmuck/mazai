import { Candle } from './Candle';
import { parseIndicator } from './Indicator';
import type { IndicatorChannel } from './IndicatorChannel';
import type { IndicatorLine } from './IndicatorLine';
import type { IndicatorPercent } from './IndicatorPercent';
import { Position } from './Position';

////////// DATA //////////

export type Data = {
	candles: Candle[];
	positions: Position[];
	indicators: IndicatorLine[] | IndicatorChannel[] | IndicatorPercent[];
};

export function parseData(rawData: any | undefined): Data {
	if (!rawData) return { candles: [], positions: [], indicators: [] };
	return {
		candles: rawData['candles'].map((c: any) => new Candle(c.openTime, c.closeTime, c.open, c.high, c.low, c.close, c.volume, c.tradeNb)),
		positions: rawData['positions'].map((p: any) => new Position(p.type, p.openTime, p.openValue, p.volume, p.closeTime, p.closeValue, p.stopLosses, p.takeProfits, p.fees)),
		indicators: rawData['indicators'].map((i: any) => parseIndicator(i))
	};
}

////////// COLORS //////////

export type Colors = {
	upwardCandle: string;
	downwardCandle: string;
	losingPositionArea: string;
	winingPositionArea: string;
	positionLine: string;
	positionFont: string;
	backgroundColor: string;
	percentBackgroundColor: string;
};

export function parseColors(rawColors: any): Colors {
	return {
		upwardCandle: rawColors?.upwardCandle ?? '#fff',
		downwardCandle: rawColors?.downwardCandle ?? '#000',
		losingPositionArea: rawColors?.losingPositionArea ?? '#a55',
		winingPositionArea: rawColors?.winingPositionArea ?? '#5a5',
		positionLine: rawColors?.positionLine ?? 'rgb(110, 110, 182)',
		positionFont: rawColors?.positionFont ?? '11px Helvetica',
		backgroundColor: rawColors?.backgroundColor ?? '#535353',
		percentBackgroundColor: rawColors?.percentBackgroundColor ?? '#434343'
	};
}

////////// OPTIONS //////////

export type Options = {
	cursor: Boolean;
	positions: Boolean;
	indicators: Array<string>;
	valueBegin: number;
	valueEnd: number;
};

export function parseOptions(newOptions: Partial<Options>, oldOptions: Partial<Options>): Options {
	return {
		cursor: newOptions?.cursor ?? oldOptions.cursor ?? true,
		positions: newOptions?.positions ?? oldOptions.positions ?? true,
		indicators: newOptions?.indicators ?? oldOptions.indicators ?? [],
		valueBegin: newOptions?.valueBegin ?? oldOptions.valueBegin ?? -Infinity,
		valueEnd: newOptions?.valueEnd ?? oldOptions.valueEnd ?? Infinity
	};
}
