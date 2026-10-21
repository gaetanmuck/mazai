import { n as onDestroy, r as tick } from "../../../chunks/index-server.js";
import { C as escape_html, Mt as to_array, Ot as exclude_from_object, c as props_id, i as derived, kt as fallback, n as attr_style, o as ensure_array_like, r as attributes, u as spread_props } from "../../../chunks/server.js";
import { t as Icon } from "../../../chunks/Icon.js";
import { a as createContext, i as normalizeProps, n as useMachine, r as mergeProps, t as LocaleProviderRootContext } from "../../../chunks/root-context.js";
import { connect, machine, splitItemProps, splitProps } from "@zag-js/file-upload";
import hljs from "highlight.js";
//#region node_modules/@lucide/svelte/dist/icons/eye-off.svelte
function Eye_off($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "eye-off",
		"size": 24,
		"node": [
			["path", { "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }],
			["path", { "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
			["path", { "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }],
			["path", { "d": "m2 2 20 20" }]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/eye.svelte
function Eye($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "eye",
		"size": 24,
		"node": [["path", { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", {
			"cx": "12",
			"cy": "12",
			"r": "3"
		}]]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/target.svelte
function Target($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "target",
		"size": 24,
		"node": [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "6"
			}],
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "2"
			}]
		]
	} }]));
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/root-context.js
var FileUploadRootContext = createContext();
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/clear-trigger.svelte
function Clear_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$12 = derived(() => mergeProps(fileUpload().getClearTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$12());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$12() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/dropzone.svelte
function Dropzone($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$11 = derived(() => mergeProps(fileUpload().getDropzoneProps(props), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$11());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$11() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/hidden-input.svelte
function Hidden_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$10 = derived(() => mergeProps(fileUpload().getHiddenInputProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$10());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><input${attributes({ ...attributes$10() }, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/item-context.js
var FileUploadItemContext = createContext();
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-delete-trigger.svelte
function times($$renderer) {
	$$renderer.push(`<!---->×`);
}
function Item_delete_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const itemProps = FileUploadItemContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, times)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$9 = derived(() => mergeProps(fileUpload().getItemDeleteTriggerProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$9() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-group.svelte
function Item_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(fileUpload().getItemGroupProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><ul${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></ul>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-name.svelte
function Item_name($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const itemProps = FileUploadItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(fileUpload().getItemNameProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$7() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-size-text.svelte
function Item_size_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const itemProps = FileUploadItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(fileUpload().getItemSizeTextProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const $$d = derived(() => splitItemProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), itemProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(fileUpload().getItemProps(itemProps()), rest()));
		FileUploadItemContext.provide(() => itemProps());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><li${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></li>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(fileUpload().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><label${attributes({ ...attributes$4() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></label>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		derived(() => props.children)()($$renderer, fileUpload);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), fileUpload = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$3 = derived(() => mergeProps(fileUpload()().getRootProps(), rest()));
		FileUploadRootContext.provide(() => fileUpload()());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$3());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$3() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/provider.svelte.js
function useFileUpload(props) {
	const locale = LocaleProviderRootContext.consume();
	const service = useMachine(machine, () => ({
		dir: locale().dir,
		...typeof props === "function" ? props() : props
	}));
	const fileUpload = derived(() => connect(service, normalizeProps));
	return () => fileUpload();
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), fileUploadProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const fileUpload = useFileUpload(() => ({
			...fileUploadProps(),
			id
		}));
		const attributes$2 = derived(() => mergeProps(fileUpload().getRootProps(), rest()));
		FileUploadRootContext.provide(() => fileUpload());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$2());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$2() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = FileUploadRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(fileUpload().getTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/anatomy.js
var FileUpload = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	Dropzone,
	Trigger,
	ClearTrigger: Clear_trigger,
	HiddenInput: Hidden_input,
	ItemGroup: Item_group,
	Item,
	ItemName: Item_name,
	ItemSizeText: Item_size_text,
	ItemDeleteTrigger: Item_delete_trigger
});
//#endregion
//#region src/lib/canvas/trading-backtests/IndicatorChannel.ts
var IndicatorChannel = class IndicatorChannel {
	name;
	pointsLow;
	pointsHigh;
	strokeColor;
	fillColor;
	lineWidth;
	isInMainChart = true;
	type = "channel";
	constructor(name, pointsLow, pointsHigh, color, lineWidth) {
		this.name = name;
		this.pointsLow = pointsLow;
		this.pointsHigh = pointsHigh;
		this.strokeColor = color;
		this.lineWidth = lineWidth;
		let hex = this.strokeColor.replace("#", "");
		if (hex.length === 3) hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		this.fillColor = `rgba(${r},${g},${b},0.1)`;
	}
	static parse(rawIndicator) {
		return new IndicatorChannel(rawIndicator.name, rawIndicator.pointsLow, rawIndicator.pointsHigh, rawIndicator.color, rawIndicator.line_width);
	}
	select(timeBegin, timeEnd) {
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
};
//#endregion
//#region src/lib/canvas/trading-backtests/IndicatorLine.ts
var IndicatorLine = class IndicatorLine {
	name;
	points;
	color;
	lineWidth;
	isInMainChart = true;
	type = "line";
	constructor(name, points, color, lineWidth) {
		this.name = name;
		this.points = points;
		this.color = color;
		this.lineWidth = lineWidth;
	}
	static parse(rawIndicator) {
		return new IndicatorLine(rawIndicator.name, rawIndicator.points, rawIndicator.color, rawIndicator.line_width);
	}
	select(timeBegin, timeEnd) {
		const pointsValid = this.points.map((p) => timeBegin <= p.timestamp && p.timestamp <= timeEnd);
		let firstIndex = pointsValid.findIndex((p) => p === true);
		let lastIndex = pointsValid.findLastIndex((p) => p === true);
		if (firstIndex > 0) firstIndex--;
		if (lastIndex < this.points.length - 1) lastIndex++;
		const points = this.points.slice(firstIndex, lastIndex + 1);
		return new IndicatorLine(this.name, points, this.color, this.lineWidth);
	}
	getMin() {
		return Math.min(...this.points.map((p) => p.value));
	}
	getMax() {
		return Math.max(...this.points.map((p) => p.value));
	}
};
//#endregion
//#region src/lib/canvas/trading-backtests/IndicatorPercent.ts
var IndicatorPercent = class IndicatorPercent {
	name;
	points;
	color;
	lineWidth;
	isInMainChart = false;
	type = "percent";
	constructor(name, points, color, lineWidth) {
		this.name = name;
		this.points = points;
		this.color = color;
		this.lineWidth = lineWidth;
	}
	static parse(rawIndicator) {
		return new IndicatorPercent(rawIndicator.name, rawIndicator.points, rawIndicator.color, rawIndicator.line_width);
	}
	select(timeBegin, timeEnd) {
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
};
//#endregion
//#region src/lib/canvas/trading-backtests/Position.ts
var PositionType = /* @__PURE__ */ function(PositionType) {
	PositionType["short"] = "short";
	PositionType["long"] = "long";
	return PositionType;
}({});
var Position = class {
	type;
	openTime;
	openValue;
	volume;
	closeTime;
	closeValue;
	stopLosses;
	takeProfits;
	fees;
	closingVolume;
	result;
	feesPercent;
	resultPercent;
	constructor(type, openTime, openValue, volume, closeTime, closeValue, stoplosses, takeprofits, fees) {
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
	getRisk() {
		if (this.stopLosses.length) return 0;
		const stopLoss = this.type == PositionType.long ? Math.min(...this.stopLosses.map((p) => p.value)) : Math.max(...this.stopLosses.map((p) => p.value));
		const loss = this.type == PositionType.long ? (this.openValue - stopLoss) * this.volume : (stopLoss - this.openValue) * this.volume;
		return Math.max(0, loss) + this.fees;
	}
	getReward() {
		if (this.takeProfits.length) return 0;
		const takeProfit = this.type == PositionType.long ? Math.max(...this.takeProfits.map((p) => p.value)) : Math.min(...this.takeProfits.map((p) => p.value));
		const reward = this.type == PositionType.long ? (takeProfit - this.openValue) * this.volume : (this.openValue - takeProfit) * this.volume;
		return Math.max(0, reward) - this.fees;
	}
};
//#endregion
//#region src/lib/canvas/trading-backtests/Drawer.ts
var Drawer = class {
	canvas;
	ctx;
	limits;
	colors;
	currentImage;
	lastCursorPosition;
	primaryChartHeightRatio = .85;
	constructor(canvas, colors) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
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
		this.lastCursorPosition = {
			x: 0,
			y: 0
		};
	}
	setLimits(timeBegin, timeEnd) {
		this.limits.timeBegin = timeBegin;
		this.limits.timeEnd = timeEnd;
		this.limits.timeWidth = this.limits.timeEnd - this.limits.timeBegin;
	}
	updateLimits(candles) {
		const candleMin = Math.min(...candles.map((c) => c.low));
		const candleMax = Math.max(...candles.map((c) => c.high));
		const candlediff = candleMax - candleMin;
		this.limits.timeWidth = this.limits.timeEnd - this.limits.timeBegin;
		this.limits.valueMin = candleMin - candlediff * .05;
		this.limits.valueMax = candleMax + candlediff * .05;
		this.limits.valueHeight = this.limits.valueMax - this.limits.valueMin;
	}
	draw(data, options) {
		this.setLimits(options.valueBegin, options.valueEnd);
		const candles = data.candles.filter((candle) => {
			return this.limits.timeBegin < candle.closeTime && candle.openTime < this.limits.timeEnd;
		});
		const positions = options.positions ? data.positions.filter((position) => {
			return this.limits.timeBegin < position.closeTime && position.openTime < this.limits.timeEnd;
		}) : [];
		const indicators = data.indicators.map((indicator) => {
			return indicator.select(this.limits.timeBegin, this.limits.timeEnd);
		}).filter((indicator) => !options.indicators.includes(indicator.name));
		this.updateLimits(candles);
		this.drawMainBackground();
		positions.forEach((position) => this.drawPositionUnderCandles(position));
		indicators.filter((i) => i instanceof IndicatorChannel).forEach((i) => this.drawIndicatorChannel(i));
		candles.forEach((candle) => this.drawCandle(candle));
		positions.forEach((position) => this.drawPositionAboveCandles(position));
		indicators.filter((i) => i instanceof IndicatorLine).forEach((i) => this.drawIndicatorLine(i));
		this.drawSecondBackground();
		indicators.filter((i) => i instanceof IndicatorPercent).forEach((i) => this.drawIndicatorPercent(i));
		this.currentImage.src = this.canvas.toDataURL("image/png");
		if (options.cursor) this.drawCursor(void 0, options);
	}
	time_to_pixel(time, isWidth = false) {
		const diff_with_time_begin = time - this.limits.timeBegin;
		return (isWidth ? time : diff_with_time_begin) / this.limits.timeWidth * this.canvas.width;
	}
	value_to_pixel(value, isHeight = false) {
		const diff_with_value_min = value - this.limits.valueMin;
		const pixel = (isHeight ? value : diff_with_value_min) / this.limits.valueHeight * this.canvas.height * this.primaryChartHeightRatio;
		return isHeight ? -pixel : -pixel + this.canvas.height * this.primaryChartHeightRatio;
	}
	pixel_to_time(pixel) {
		if (pixel < 0) return this.limits.timeBegin;
		else if (pixel > this.canvas.width) return this.limits.timeEnd;
		const diff_with_time_begin = pixel / this.canvas.width * this.limits.timeWidth;
		return this.limits.timeBegin + diff_with_time_begin;
	}
	pixel_to_value(pixel) {
		if (pixel < 0) return this.limits.valueMax;
		else if (pixel < this.primaryChartHeightRatio * this.canvas.height) {
			const diff_with_value_min = (this.canvas.height * this.primaryChartHeightRatio - pixel) / (this.canvas.height * this.primaryChartHeightRatio) * this.limits.valueHeight;
			return this.limits.valueMin + diff_with_value_min;
		} else if (pixel < this.canvas.height) return (this.primaryChartHeightRatio * this.canvas.height - pixel) / ((1 - this.primaryChartHeightRatio) * this.canvas.height) * 100 + 100;
		else return 0;
	}
	setColor(color) {
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = color;
	}
	fullRect(x, y, w, h) {
		this.ctx.fillRect(x + .5, y + .5, w, h);
		this.ctx.strokeRect(x + .5, y + .5, w, h);
	}
	drawCursor(event, options) {
		if (!options.cursor) return;
		this.ctx.drawImage(this.currentImage, 0, 0);
		let rect = this.canvas.getBoundingClientRect();
		const x = event ? event.clientX - rect.left : this.lastCursorPosition.x;
		const y = event ? event.clientY - rect.top : this.lastCursorPosition.y;
		this.lastCursorPosition.x = x;
		this.lastCursorPosition.y = y;
		const xValue = this.pixel_to_time(x);
		const date = new Date(xValue);
		const [month, day, year, hours, minutes, seconds] = [
			(date.getMonth() + 1).toString(),
			date.getDate().toString(),
			date.getFullYear().toString(),
			date.getHours().toString(),
			date.getMinutes().toString(),
			date.getSeconds().toString()
		];
		const xValueStr = year.padStart(4, "0") + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0") + " " + hours.padStart(2, "0") + "h" + minutes.padStart(2, "0") + "m" + seconds.padStart(2, "0") + "s";
		let yValue = this.pixel_to_value(y);
		let yValueStr = Math.round(100 * yValue) / 100;
		this.setColor("yellow");
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();
		this.ctx.moveTo(0, y);
		this.ctx.lineTo(this.canvas.width, y);
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, this.canvas.height);
		this.ctx.stroke();
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "top";
		this.ctx.font = "15px Helvetica";
		this.ctx.fillText(xValueStr, this.canvas.width - 10, 10);
		this.ctx.textBaseline = "bottom";
		if (y < this.primaryChartHeightRatio * this.canvas.height) this.ctx.fillText(yValueStr + "", this.canvas.width - 10, this.primaryChartHeightRatio * this.canvas.height - 10);
		else this.ctx.fillText(yValueStr + "", this.canvas.width - 10, this.canvas.height - 10);
	}
	drawMainBackground() {
		this.setColor(this.colors.backgroundColor);
		this.fullRect(0, 0, this.canvas.width, this.primaryChartHeightRatio * this.canvas.height);
	}
	drawSecondBackground() {
		this.setColor(this.colors.percentBackgroundColor);
		const x = 0;
		const y = this.canvas.height * this.primaryChartHeightRatio;
		this.fullRect(x, y, this.canvas.width, this.canvas.height * .15);
	}
	drawNothingToDisplay() {
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#fff";
		this.ctx.font = "48px Helvetica";
		this.ctx.fillText("Nothing to display", this.canvas.width / 2, this.canvas.height / 2);
	}
	drawCandle(candle) {
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
	drawPositionUnderCandles(position) {
		const isLong = position.type == PositionType.long.valueOf();
		const x_begin = this.time_to_pixel(position.openTime);
		const y_begin = this.value_to_pixel(position.openValue);
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
				} else if (curSL.value >= position.openValue) this.setColor(this.colors.losingPositionArea);
				else this.setColor(this.colors.winingPositionArea);
				const x = this.time_to_pixel(curSL.timestamp);
				const w = this.time_to_pixel(position.stopLosses[i + 1].timestamp - curSL.timestamp, true);
				const h = this.value_to_pixel(position.openValue - curSL.value, true);
				this.fullRect(x, y_begin, w, -h);
			}
			const lastSL = position.stopLosses[position.stopLosses.length - 1];
			const x = this.time_to_pixel(lastSL.timestamp);
			const w = this.time_to_pixel(position.closeTime - lastSL.timestamp, true);
			const h = this.value_to_pixel(position.openValue - lastSL.value, true);
			this.fullRect(x, y_begin, w, -h);
		} else {
			this.setColor(this.colors.losingPositionArea);
			const width = this.time_to_pixel(position.closeTime - position.openTime, true);
			const height = this.value_to_pixel((isLong ? this.limits.valueMin : this.limits.valueMax) - position.openValue, true);
			this.fullRect(x_begin, y_begin, width, height);
		}
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
				} else if (curTP.value <= position.openValue) this.setColor(this.colors.winingPositionArea);
				else this.setColor(this.colors.losingPositionArea);
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
	drawPositionAboveCandles(position) {
		this.setColor(this.colors.positionLine);
		const x_open = this.time_to_pixel(position.openTime);
		const x_close = this.time_to_pixel(position.closeTime);
		const y_open = this.value_to_pixel(position.openValue);
		const y_close = this.value_to_pixel(position.closeValue);
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.moveTo(x_open, y_open);
		this.ctx.lineTo(x_close, y_close);
		this.ctx.stroke();
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "bottom";
		this.setColor(this.colors.positionLine);
		this.ctx.font = this.colors.positionFont;
		this.ctx.save();
		this.ctx.translate(x_open, y_open);
		this.ctx.rotate(-Math.PI / 2);
		this.ctx.fillText("OPEN " + position.type.toUpperCase(), 0, 0);
		this.ctx.restore();
		this.ctx.save();
		this.ctx.translate(x_close, y_close);
		this.ctx.rotate(-Math.PI / 2);
		this.ctx.fillText("CLOSE " + position.type.toUpperCase(), 0, 0);
		this.ctx.restore();
	}
	drawIndicator(indicator) {
		if (indicator instanceof IndicatorLine) this.drawIndicatorLine(indicator);
		if (indicator instanceof IndicatorPercent) this.drawIndicatorPercent(indicator);
	}
	drawIndicatorLine(indicator) {
		this.setColor(indicator.color);
		this.ctx.lineWidth = indicator.lineWidth;
		this.ctx.beginPath();
		let firstDrawn = false;
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
	drawIndicatorChannel(indicator) {
		this.ctx.strokeStyle = indicator.strokeColor;
		this.ctx.fillStyle = indicator.fillColor;
		this.ctx.lineWidth = indicator.lineWidth;
		if (!indicator.pointsLow.length && !indicator.pointsHigh.length) return;
		this.ctx.beginPath();
		let x = this.time_to_pixel(indicator.pointsLow[0].timestamp);
		let y = this.value_to_pixel(indicator.pointsLow[0].value);
		this.ctx.moveTo(x, y);
		for (let i = 0; i < indicator.pointsLow.length; i++) {
			x = this.time_to_pixel(indicator.pointsLow[i].timestamp);
			y = this.value_to_pixel(indicator.pointsLow[i].value);
			this.ctx.lineTo(x, y);
		}
		for (let i = indicator.pointsHigh.length - 1; i >= 0; i--) {
			x = this.time_to_pixel(indicator.pointsHigh[i].timestamp);
			y = this.value_to_pixel(indicator.pointsHigh[i].value);
			this.ctx.lineTo(x, y);
		}
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	}
	drawIndicatorPercent(indicator) {
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
};
//#endregion
//#region src/lib/canvas/trading-backtests/Candle.ts
var Candle = class {
	openTime;
	closeTime;
	open;
	high;
	low;
	close;
	volume;
	tradeNb;
	constructor(openTime, closeTime, open, high, low, close, volume, tradeNb) {
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
};
//#endregion
//#region src/lib/canvas/trading-backtests/Indicator.ts
var indicatorParser = {
	channel: (raw) => new IndicatorChannel(raw.name, raw.pointsLow, raw.pointsHigh, raw.color, raw.lineWidth),
	line: (raw) => new IndicatorLine(raw.name, raw.points, raw.color, raw.lineWidth),
	percent: (raw) => new IndicatorPercent(raw.name, raw.points, raw.color, raw.lineWidth)
};
function parseIndicator(raw) {
	const parser = indicatorParser[raw.type];
	if (!parser) throw new Error(`Unknow Indicator Type: ${raw.type}`);
	return parser(raw);
}
//#endregion
//#region src/lib/canvas/trading-backtests/types.ts
function parseData(rawData) {
	if (!rawData) return {
		candles: [],
		positions: [],
		indicators: []
	};
	return {
		candles: rawData["candles"].map((c) => new Candle(c.openTime, c.closeTime, c.open, c.high, c.low, c.close, c.volume, c.tradeNb)),
		positions: rawData["positions"].map((p) => new Position(p.type, p.openTime, p.openValue, p.volume, p.closeTime, p.closeValue, p.stopLosses, p.takeProfits, p.fees)),
		indicators: rawData["indicators"].map((i) => parseIndicator(i))
	};
}
function parseColors(rawColors) {
	return {
		upwardCandle: rawColors?.upwardCandle ?? "#fff",
		downwardCandle: rawColors?.downwardCandle ?? "#000",
		losingPositionArea: rawColors?.losingPositionArea ?? "#a55",
		winingPositionArea: rawColors?.winingPositionArea ?? "#5a5",
		positionLine: rawColors?.positionLine ?? "rgb(110, 110, 182)",
		positionFont: rawColors?.positionFont ?? "11px Helvetica",
		backgroundColor: rawColors?.backgroundColor ?? "#535353",
		percentBackgroundColor: rawColors?.percentBackgroundColor ?? "#434343"
	};
}
function parseOptions(newOptions, oldOptions) {
	return {
		cursor: newOptions?.cursor ?? oldOptions.cursor ?? true,
		positions: newOptions?.positions ?? oldOptions.positions ?? true,
		indicators: newOptions?.indicators ?? oldOptions.indicators ?? [],
		valueBegin: newOptions?.valueBegin ?? oldOptions.valueBegin ?? -Infinity,
		valueEnd: newOptions?.valueEnd ?? oldOptions.valueEnd ?? Infinity
	};
}
//#endregion
//#region src/lib/canvas/trading-backtests/trading-backtests.ts
function tradingBacktests() {
	let data;
	let options;
	let canvas;
	let colors;
	let drawer;
	let candleDuration;
	function init(initCanvas) {
		data = parseData(void 0);
		options = parseOptions({}, {});
		canvas = initCanvas;
		colors = parseColors({});
		drawer = new Drawer(initCanvas, colors);
	}
	function start(dataRaw, colorsRaw) {
		data = parseData(dataRaw);
		options = parseOptions({}, {
			valueBegin: data.candles[0].openTime,
			valueEnd: data.candles[data.candles.length - 1].closeTime
		});
		colors = parseColors(colorsRaw);
		drawer = new Drawer(canvas, colors);
		candleDuration = data.candles[0].closeTime - data.candles[0].openTime;
		document.addEventListener("mousemove", mousemoveEventHandler);
		document.addEventListener("mousedown", mousedownEventHandler);
		document.addEventListener("keydown", keyDownEventHandler);
		drawer.draw(data, options);
	}
	function end() {
		try {
			document.removeEventListener("mousemove", mousemoveEventHandler);
			document.removeEventListener("mousedown", mousedownEventHandler);
			document.removeEventListener("keydown", keyDownEventHandler);
		} catch (err) {}
	}
	function changeOptions(newOptions) {
		options = parseOptions(newOptions, options);
		drawer.draw(data, options);
	}
	function mousemoveEventHandler(event) {
		if (!data.candles.length) return;
		if (options.cursor) drawer.drawCursor(event, options);
	}
	function mousedownEventHandler(event) {
		let rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;
		const time = drawer.pixel_to_time(x);
		const beginTime = time - 100 * candleDuration;
		const endTime = time + 100 * candleDuration;
		changeOptions({
			valueBegin: beginTime,
			valueEnd: endTime
		});
		return [beginTime, endTime];
	}
	function keyDownEventHandler(event) {
		const step = .05;
		let newBeginTime, newEndTime;
		if (event.key == "ArrowUp") {
			event.preventDefault();
			newBeginTime = drawer.limits.timeBegin + step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd - step * drawer.limits.timeWidth;
		} else if (event.key == "ArrowDown") {
			event.preventDefault();
			newBeginTime = drawer.limits.timeBegin - step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd + step * drawer.limits.timeWidth;
		} else if (event.key == "ArrowRight") {
			newBeginTime = drawer.limits.timeBegin + step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd + step * drawer.limits.timeWidth;
		} else if (event.key == "ArrowLeft") {
			newBeginTime = drawer.limits.timeBegin - step * drawer.limits.timeWidth;
			newEndTime = drawer.limits.timeEnd - step * drawer.limits.timeWidth;
		}
		changeOptions({
			valueBegin: newBeginTime,
			valueEnd: newEndTime
		});
	}
	function pause() {}
	function resume() {}
	function getData() {
		return data;
	}
	function getOptions() {
		return options;
	}
	return {
		init,
		start,
		pause,
		resume,
		end,
		changeOptions,
		getData,
		getOptions
	};
}
//#endregion
//#region src/lib/tools.ts
function formatDate(date, format = "YYYY-MM-DD") {
	const parts = {
		YYYY: String(date.getFullYear()),
		MM: String(date.getMonth() + 1).padStart(2, "0"),
		DD: String(date.getDate()).padStart(2, "0"),
		HH: String(date.getHours()).padStart(2, "0"),
		mm: String(date.getMinutes()).padStart(2, "0"),
		ss: String(date.getSeconds()).padStart(2, "0")
	};
	return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (token) => parts[token]);
}
function formatPercent(raw, decimalNb = 0) {
	let percent = raw * 100;
	percent *= 10 ^ decimalNb;
	percent = Math.round(percent) / 10 ^ decimalNb;
	return percent + "%";
}
//#endregion
//#region src/routes/trading-backtests/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const simulationColors = {
			upwardCandle: "#fff",
			downwardCandle: "#000",
			losingPositionArea: "#a55",
			winingPositionArea: "#5a5",
			positionLine: "rgb(110, 110, 182)",
			positionFont: "15px Helvetica bold",
			backgroundColor: "#535353",
			percentBackgroundColor: "#434343"
		};
		let code = [
			"// Backtest file structure",
			"",
			"{",
			"  candles: Candle[],",
			"  positions: Position[],",
			"  indicators: Indicator[],",
			"}",
			"",
			"// Model details",
			"",
			"class Candle {",
			"  openTime: number; // Unix Timestamp in ms",
			"  closeTime: number; // Unix Timestamp in ms",
			"  open: number;",
			"  high: number;",
			"  low: number;",
			"  close: number;",
			"  volume: number;",
			"  tradeNb: number;",
			"}",
			"",
			"class Position {",
			"  type: 'long' | 'short';",
			"  openTime: number; // Unix Timestamp in ms",
			"  openValue: number;",
			"  volume: number;",
			"  closeTime: number; // Unix Timestamp in ms",
			"  closeValue: number;",
			"  stopLosses: Point[];",
			"  takeProfits: Point[];",
			"  fees: number;",
			"}",
			"",
			"class IndicatorChannel implements Indicator {",
			"  type: 'channel'; // Discriminator for Indicator",
			"  name: string;",
			"  color: string; // e.g. hexadecimal",
			"  lineWidth: number;",
			"  pointsLow: Point[];",
			"  pointsHigh: Point[];",
			"}",
			"",
			"class IndicatorLine implements Indicator {",
			"  type: 'line'; // Discriminator for Indicator",
			"  name: string;",
			"  color: string; // e.g. hexadecimal",
			"  lineWidth: number;",
			"  points: Point[];",
			"}",
			"",
			"class IndicatorPercent implements Indicator {",
			"  // Those have values ranging from 0 to 100",
			"  type: 'percent'; // Discriminator for Indicator",
			"  name: string;",
			"  color: string; // e.g. hexadecimal",
			"  lineWidth: number;",
			"  points: Point[];",
			"}",
			"",
			"class Point {",
			"  timestamp: number; // in ms",
			"  value: number;",
			"}"
		].join("\n");
		hljs.highlight(code, { language: "typescript" }).value;
		let canvas;
		let displayGeneratedData = true;
		let errorMessage = "";
		let simulation = tradingBacktests();
		let results = {
			profit: 0,
			expectancy: 0,
			feesByPosition: 0,
			winrate: 0,
			profitFactor: 0
		};
		let simDisplayIndicators = [];
		let simPositions = [];
		let simIndicators = [];
		async function loadFile(details) {
			const file = details.files[0];
			if (!file) return;
			const fileContent = await file.text();
			displayGeneratedData = false;
			await /* @__PURE__ */ tick();
			try {
				startSimulation(JSON.parse(fileContent));
				results = computeResult();
			} catch (err) {
				errorMessage = err.message;
			}
		}
		function startSimulation(data) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			simulation.init(canvas);
			simulation.start(data, simulationColors);
			data = simulation.getData();
			simPositions = data.positions;
			simIndicators = data.indicators;
		}
		function computeResult() {
			const currData = simulation.getData();
			const profit = currData.positions.reduce((acc, p) => acc + p.closingVolume, 0);
			return {
				profit,
				expectancy: profit / currData.positions.length,
				feesByPosition: currData.positions.reduce((acc, p) => acc + p.fees, 0) / currData.positions.length,
				winrate: currData.positions.filter((p) => p.result > 0).length / currData.positions.length,
				profitFactor: currData.positions.filter((p) => p.result > 0).reduce((acc, p) => acc + p.result, 0) / currData.positions.filter((p) => p.result < 0).reduce((acc, p) => acc + p.result, 0)
			};
		}
		onDestroy(() => simulation.end());
		$$renderer.push(`<div class="grid gap-8 px-10"><span class="flex place-items-end"><h1 class="flex-1 h1">Trading backtests</h1> <h4 class="mr-10"${attr_style("", { display: displayGeneratedData ? "block" : "none" })}>Generated data</h4> <button type="button" class="mr-10 btn preset-filled"${attr_style("", { display: "none" })}>Show Generated data</button> <button type="button" class="mr-10 btn preset-filled"${attr_style("", { display: "block" })}>Show file structure</button> `);
		FileUpload($$renderer, {
			class: "w-fit",
			onFileAccept: loadFile,
			accept: ".json",
			children: ($$renderer) => {
				if (FileUpload.Trigger) {
					$$renderer.push("<!--[-->");
					FileUpload.Trigger($$renderer, {
						children: ($$renderer) => {
							$$renderer.push(`<!---->Load backtest file`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (FileUpload.HiddenInput) {
					$$renderer.push("<!--[-->");
					FileUpload.HiddenInput($$renderer, {});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></span> <canvas class="svelte-oh0xx7"${attr_style("", { display: errorMessage == "" ? "block" : "none" })}></canvas> `);
		if (errorMessage) $$renderer.push(`<!--[0--><div><h3 class="pt-20 h3">Error while loading your file:</h3> <p class="pt-5">${escape_html(errorMessage)}</p></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		{
			$$renderer.push(`<!--[-1--><div class="grid place-items-stretch gap-8 md:grid-cols-3"><div class="md:col-span-2"><div class="grid gap-5"><div class="grid grid-cols-2"><div><div class="grid gap-3"><h2 class="h2">Results</h2> <div class="mr-8 card preset-filled-surface-100-900 p-4 text-center"><p>Winrate: ${escape_html(formatPercent(results.winrate, 1))}</p> <p>Profit: ${escape_html(Math.round(results.profit))}</p> <p>Profit Factor: ${escape_html(Math.round(results.profitFactor * 100) / 100)}</p> <p>Expectancy: ${escape_html(Math.round(results.expectancy))}</p> <p>Fees By position: ${escape_html(Math.round(results.expectancy))}</p></div> <h4 class="h4">Positions details</h4> <div class="grid gap-2"><!--[-->`);
			const each_array = ensure_array_like(simPositions);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let position = each_array[$$index];
				$$renderer.push(`<div class="flex items-center gap-2"><button type="button" class="btn preset-tonal">`);
				Target($$renderer, {});
				$$renderer.push(`<!----></button> <span>${escape_html(position.type.toLocaleUpperCase())} - ${escape_html(formatDate(new Date(position.openTime), "YYYY-MM-DD HH:mm"))}: ${escape_html(formatPercent(position.resultPercent))}</span></div>`);
			}
			$$renderer.push(`<!--]--></div></div></div> <div><div class="grid gap-8"><h2 class="h2">Display / Hide</h2> <div class="grid gap-2"><div class="flex items-center gap-2">`);
			$$renderer.push(`<!--[0--><button type="button" class="btn preset-tonal">`);
			Eye_off($$renderer, {});
			$$renderer.push(`<!----></button>`);
			$$renderer.push(`<!--]--> <span>All positions</span></div> <div class="flex items-center gap-2">`);
			if (simDisplayIndicators.length) {
				$$renderer.push(`<!--[0--><button type="button" class="btn preset-filled">`);
				Eye($$renderer, {});
				$$renderer.push(`<!----></button>`);
			} else {
				$$renderer.push(`<!--[-1--><button type="button" class="btn preset-tonal">`);
				Eye_off($$renderer, {});
				$$renderer.push(`<!----></button>`);
			}
			$$renderer.push(`<!--]--> <span>All indicators</span></div> <!--[-->`);
			const each_array_1 = ensure_array_like(simIndicators);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let indicator = each_array_1[$$index_1];
				$$renderer.push(`<div class="flex items-center gap-2">`);
				if (simDisplayIndicators.includes(indicator.name)) {
					$$renderer.push(`<!--[0--><button type="button" class="btn preset-filled">`);
					Eye($$renderer, {});
					$$renderer.push(`<!----></button>`);
				} else {
					$$renderer.push(`<!--[-1--><button type="button" class="btn preset-tonal">`);
					Eye_off($$renderer, {});
					$$renderer.push(`<!----></button>`);
				}
				$$renderer.push(`<!--]--> <span>${escape_html(indicator.name)}</span></div>`);
			}
			$$renderer.push(`<!--]--></div></div></div></div></div></div> <div><div class="grid gap-2"><h2 class="h2">Controls</h2> <p><kbd class="kbd">Click</kbd> - Center view on the click</p> <p><kbd class="kbd">→</kbd> - Move the chart to the right</p> <p><kbd class="kbd">←</kbd> - Move the chart to the left</p> <p><kbd class="kbd">↑</kbd> - Zoom-in the chart (display less candles)</p> <p><kbd class="kbd">↓</kbd> - Zoom-out the chart (display more candles)</p></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
