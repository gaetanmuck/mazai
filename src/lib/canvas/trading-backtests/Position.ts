import type { Point } from './Point';

export enum PositionType {
	short = 'short',
	long = 'long'
}

export enum PositionLimitType {
	sl = 'sl',
	tp = 'tp'
}

export class Position {
	type: PositionType;
	openTime: number;
	openValue: number;
	volume: number;
	closeTime: number;
	closeValue: number;
	stopLosses: Point[];
	takeProfits: Point[];
	fees: number;
	closingVolume: number;
	result: number;
	feesPercent: number;
	resultPercent: number;

	constructor(type: PositionType, openTime: number, openValue: number, volume: number, closeTime: number, closeValue: number, stoplosses: Point[], takeprofits: Point[], fees: number) {
		this.type = type;
		this.openTime = openTime;
		this.openValue = openValue;
		this.volume = volume;
		this.closeTime = closeTime;
		this.closeValue = closeValue;
		this.stopLosses = stoplosses ?? [];
		this.takeProfits = takeprofits ?? [];
		this.fees = fees ?? 0;
		this.closingVolume = this.volume * (this.type == PositionType.long ? this.closeValue / this.openValue : this.openValue / this.closeValue);
		this.result = this.closingVolume - this.volume;
		this.feesPercent = this.fees / (this.volume + this.closingVolume);
		this.resultPercent = this.result / this.volume;
	}
	getRisk(): number {
		if (this.stopLosses.length) return 0;
		const stopLoss = this.type == PositionType.long ? Math.min(...this.stopLosses.map((p) => p.value)) : Math.max(...this.stopLosses.map((p) => p.value));
		const loss = this.type == PositionType.long ? (this.openValue - stopLoss) * this.volume : (stopLoss - this.openValue) * this.volume;
		return Math.max(0, loss) + this.fees;
	}
	getReward(): number {
		if (this.takeProfits.length) return 0;
		const takeProfit = this.type == PositionType.long ? Math.max(...this.takeProfits.map((p) => p.value)) : Math.min(...this.takeProfits.map((p) => p.value));
		const reward = this.type == PositionType.long ? (takeProfit - this.openValue) * this.volume : (this.openValue - takeProfit) * this.volume;
		return Math.max(0, reward) - this.fees;
	}
}
