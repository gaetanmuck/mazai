export class Candle {
	openTime: number; // ms
	closeTime: number; // ms
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	tradeNb: number;

	constructor(openTime: number, closeTime: number, open: number, high: number, low: number, close: number, volume: number, tradeNb: number) {
		this.openTime = openTime;
		this.closeTime = closeTime;
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
		this.tradeNb = tradeNb;
	}

	isUpward() {
		return this.open < this.close;
	}
}
