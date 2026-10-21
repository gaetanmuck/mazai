import { n as onDestroy } from "./index-server.js";
import { At as noop, i as derived, jt as run, p as createContext$1 } from "./server.js";
import { INIT_STATE, MachineStatus, createScope, findTransition, getExitEnterStates, hasTag, matchesState, mergeProps, resolveStateValue } from "@zag-js/core";
import { createNormalizer } from "@zag-js/types";
import { callAll, compact, ensure, identity, isFunction, isString, toArray, warn } from "@zag-js/utils";
import { isRTL } from "@zag-js/i18n-utils";
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/internal/create-context.js
function createContext(defaultValue) {
	const [consume, provide] = createContext$1();
	return {
		consume() {
			try {
				return consume();
			} catch {
				return defaultValue;
			}
		},
		provide
	};
}
//#endregion
//#region node_modules/@zag-js/svelte/dist/normalize-props.js
var propMap = {
	className: "class",
	defaultChecked: "checked",
	defaultValue: "value",
	htmlFor: "for",
	onBlur: "onfocusout",
	onChange: "oninput",
	onFocus: "onfocusin",
	onDoubleClick: "ondblclick"
};
function toStyleString(style) {
	let string = "";
	for (let key in style) {
		/**
		* Ignore null and undefined values.
		*/
		const value = style[key];
		if (value === null || value === void 0) continue;
		/**
		* Convert camelCase to kebab-case except for CSS custom properties.
		*/
		if (!key.startsWith("--")) key = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
		string += `${key}:${value};`;
	}
	return string;
}
var preserveKeys = new Set("viewBox,className,preserveAspectRatio,fillRule,clipPath,clipRule,strokeWidth,strokeLinecap,strokeLinejoin,strokeDasharray,strokeDashoffset,strokeMiterlimit".split(","));
function toSvelteProp(key) {
	if (key in propMap) return propMap[key];
	if (preserveKeys.has(key)) return key;
	return key.toLowerCase();
}
function toSveltePropValue(key, value) {
	if (key === "style" && typeof value === "object") return toStyleString(value);
	return value;
}
var normalizeProps = createNormalizer((props) => {
	const normalized = {};
	for (const key in props) normalized[toSvelteProp(key)] = toSveltePropValue(key, props[key]);
	return normalized;
});
//#endregion
//#region node_modules/@zag-js/svelte/dist/merge-props.js
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize = (style) => {
	const res = {};
	let match;
	while (match = CSS_REGEX.exec(style)) res[match[1]] = match[2];
	return res;
};
function mergeProps$1(...args) {
	const classNames = [];
	for (const props of args) {
		if (!props) continue;
		if ("class" in props && props.class != null) classNames.push(props.class);
	}
	const merged = mergeProps(...args);
	if (classNames.length > 0) merged.class = classNames.length === 1 ? classNames[0] : classNames;
	if ("style" in merged) {
		if (typeof merged.style === "string") merged.style = serialize(merged.style);
		merged.style = toStyleString(merged.style);
	}
	return merged;
}
//#endregion
//#region node_modules/@zag-js/svelte/dist/bindable.svelte.js
function bindable(props) {
	const initial = props().value ?? props().defaultValue;
	const eq = props().isEqual ?? Object.is;
	let value = initial;
	const controlled = derived(() => props().value !== void 0);
	let valueRef = { current: run(() => value) };
	let prevValue = { current: void 0 };
	const setValueFn = (v) => {
		const next = isFunction(v) ? v(valueRef.current) : v;
		const prev = prevValue.current;
		if (props().debug) console.log(`[bindable > ${props().debug}] setValue`, {
			next,
			prev
		});
		if (!controlled()) value = next;
		if (!eq(next, prev)) props().onChange?.(next, prev);
	};
	function get() {
		return controlled() ? props().value : value;
	}
	return {
		initial,
		ref: valueRef,
		get,
		set(val) {
			const exec = props().sync ? noop : identity;
			run(() => exec(() => setValueFn(val)));
		},
		invoke(nextValue, prevValue) {
			props().onChange?.(nextValue, prevValue);
		},
		hash(value) {
			return props().hash?.(value) ?? String(value);
		}
	};
}
bindable.cleanup = (fn) => {
	onDestroy(() => fn());
};
bindable.ref = (defaultValue) => {
	let value = defaultValue;
	return {
		get: () => value,
		set: (next) => {
			value = next;
		}
	};
};
//#endregion
//#region node_modules/@zag-js/svelte/dist/refs.svelte.js
function useRefs(refs) {
	const ref = { current: refs };
	return {
		get(key) {
			return ref.current[key];
		},
		set(key, value) {
			ref.current[key] = value;
		}
	};
}
//#endregion
//#region node_modules/@zag-js/svelte/dist/track.svelte.js
var track = (deps, effect) => {};
//#endregion
//#region node_modules/@zag-js/svelte/dist/machine.svelte.js
function access(userProps) {
	if (isFunction(userProps)) return userProps();
	return userProps;
}
function useMachine(machine, userProps) {
	const scope = derived(() => {
		const { id, ids, getRootNode } = access(userProps);
		return createScope({
			id,
			ids,
			getRootNode
		});
	});
	const debug = (...args) => {
		if (machine.debug) console.log(...args);
	};
	const props = derived(() => machine.props?.({
		props: compact(access(userProps)),
		scope: scope()
	}) ?? access(userProps));
	const prop = useProp(() => props());
	const context = machine.context?.({
		prop,
		bindable,
		get scope() {
			return scope();
		},
		flush,
		getContext() {
			return ctx;
		},
		getComputed() {
			return computed;
		},
		getRefs() {
			return refs;
		},
		getEvent() {
			return getEvent();
		}
	});
	const ctx = {
		get(key) {
			return context?.[key].get();
		},
		set(key, value) {
			context?.[key].set(value);
		},
		initial(key) {
			return context?.[key].initial;
		},
		hash(key) {
			const current = context?.[key].get();
			return context?.[key].hash(current);
		}
	};
	let effects = /* @__PURE__ */ new Map();
	let transitionRef = { current: null };
	let previousEventRef = { current: null };
	let eventRef = { current: { type: "" } };
	const getEvent = () => ({
		...eventRef.current,
		current() {
			return eventRef.current;
		},
		previous() {
			return previousEventRef.current;
		}
	});
	const getState = () => ({
		...state,
		hasTag(tag) {
			const currentState = state.get();
			return hasTag(machine, currentState, tag);
		},
		matches(...values) {
			const currentState = state.get();
			return values.some((value) => matchesState(currentState, value));
		}
	});
	const refs = useRefs(machine.refs?.({
		prop,
		context: ctx
	}) ?? {});
	const getParams = () => ({
		state: getState(),
		context: ctx,
		event: getEvent(),
		prop,
		send,
		action,
		guard,
		track,
		refs,
		computed,
		flush,
		scope: scope(),
		choose
	});
	const action = (keys) => {
		const strs = isFunction(keys) ? keys(getParams()) : keys;
		if (!strs) return;
		const fns = strs.map((s) => {
			const fn = machine.implementations?.actions?.[s];
			if (!fn) warn(`[zag-js] No implementation found for action "${JSON.stringify(s)}"`);
			return fn;
		});
		for (const fn of fns) fn?.(getParams());
	};
	const guard = (str) => {
		if (isFunction(str)) return str(getParams());
		const fn = machine.implementations?.guards?.[str];
		if (!fn) warn(`[zag-js] No implementation found for guard "${JSON.stringify(str)}"`);
		return fn?.(getParams());
	};
	const effect = (keys) => {
		const strs = isFunction(keys) ? keys(getParams()) : keys;
		if (!strs) return;
		const fns = strs.map((s) => {
			const fn = machine.implementations?.effects?.[s];
			if (!fn) warn(`[zag-js] No implementation found for effect "${JSON.stringify(s)}"`);
			return fn;
		});
		const cleanups = [];
		for (const fn of fns) {
			const cleanup = fn?.(getParams());
			if (cleanup) cleanups.push(cleanup);
		}
		return () => cleanups.forEach((fn) => fn?.());
	};
	const choose = (transitions) => {
		return toArray(transitions).find((t) => {
			let result = !t.guard;
			if (isString(t.guard)) result = !!guard(t.guard);
			else if (isFunction(t.guard)) result = t.guard(getParams());
			return result;
		});
	};
	const computed = (key) => {
		ensure(machine.computed, () => `[zag-js] No computed object found on machine`);
		const fn = machine.computed[key];
		return fn({
			context: ctx,
			event: getEvent(),
			prop,
			refs,
			scope: scope(),
			computed
		});
	};
	const state = bindable(() => ({
		defaultValue: resolveStateValue(machine, machine.initialState({ prop })),
		onChange(nextState, prevState) {
			const { exiting, entering } = getExitEnterStates(machine, prevState, nextState, transitionRef.current?.reenter);
			exiting.forEach((item) => {
				effects.get(item.path)?.();
				effects.delete(item.path);
			});
			exiting.forEach((item) => {
				action(item.state?.exit);
			});
			action(transitionRef.current?.actions);
			entering.forEach((item) => {
				const cleanup = effect(item.state?.effects);
				if (cleanup) {
					const existing = effects.get(item.path);
					effects.set(item.path, existing ? callAll(existing, cleanup) : cleanup);
				}
			});
			if (prevState === INIT_STATE) {
				action(machine.entry);
				const cleanup = effect(machine.effects);
				if (cleanup) {
					const existing = effects.get(INIT_STATE);
					effects.set(INIT_STATE, existing ? callAll(existing, cleanup) : cleanup);
				}
			}
			entering.forEach((item) => {
				action(item.state?.entry);
			});
		}
	}));
	let status = MachineStatus.NotStarted;
	onDestroy(() => {
		if (status !== MachineStatus.Started) return;
		debug("unmounting...");
		status = MachineStatus.Stopped;
		effects.forEach((fn) => fn?.());
		effects = /* @__PURE__ */ new Map();
		transitionRef.current = null;
		action(machine.exit);
	});
	const send = (event) => {
		if (status !== MachineStatus.Started) return;
		previousEventRef.current = eventRef.current;
		eventRef.current = event;
		let currentState = state.get();
		const { transitions, source } = findTransition(machine, currentState, event.type);
		const transition = choose(transitions);
		if (!transition) return;
		transitionRef.current = transition;
		const target = resolveStateValue(machine, transition.target ?? currentState, source);
		debug("transition", event.type, transition.target || currentState, `(${transition.actions})`);
		if (target !== currentState) state.set(target);
		else if (transition.reenter) state.invoke(currentState, currentState);
		else action(transition.actions);
	};
	machine.watch?.(getParams());
	return {
		get state() {
			return getState();
		},
		send,
		context: ctx,
		prop,
		get scope() {
			return scope();
		},
		refs,
		computed,
		get event() {
			return getEvent();
		},
		getStatus: () => status
	};
}
function useProp(value) {
	return function get(key) {
		return value()[key];
	};
}
function flush(fn) {}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/locale-provider/modules/root-context.js
var LocaleProviderRootContext = createContext(() => ({
	locale: "en-US",
	dir: isRTL("en-US") ? "rtl" : "ltr"
}));
//#endregion
export { createContext as a, normalizeProps as i, useMachine as n, mergeProps$1 as r, LocaleProviderRootContext as t };
