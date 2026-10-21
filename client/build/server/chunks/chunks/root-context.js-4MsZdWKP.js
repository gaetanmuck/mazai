import { o as onDestroy } from './index-server.js-5D67dzyk.js';
import { n as noop, r as run, _ as derived, c as createContext$1 } from './server.js-CBrlCBVp.js';

// src/array.ts
function toArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
function flatArray(arr) {
  return arr.reduce((flat, item) => {
    if (Array.isArray(item)) {
      return flat.concat(flatArray(item));
    }
    return flat.concat(item);
  }, []);
}

// src/equal.ts
var isArrayLike = (value) => value?.constructor.name === "Array";
var isArrayEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual(a[i], b[i])) return false;
  }
  return true;
};
var isEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  if (a == null && b != null || a != null && b == null) return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike(a) && isArrayLike(b)) {
    return isArrayEqual(Array.from(a), Array.from(b));
  }
  if (!(typeof a === "object") || !(typeof b === "object")) return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey) return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
};

var isArray = (v) => Array.isArray(v);
var isObjectLike = (v) => v != null && typeof v === "object";
var isObject$1 = (v) => isObjectLike(v) && !isArray(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag = (v) => Object.prototype.toString.call(v);
var fnToString = Function.prototype.toString;
var objectCtorString = fnToString.call(Object);
var isPlainObject = (v) => {
  if (!isObjectLike(v) || baseGetTag(v) != "[object Object]" || isFrameworkElement(v)) return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null) return true;
  const Ctor = hasProp(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
};
var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isFrameworkElement = (x) => isReactElement(x) || isVueElement(x);

var identity = (v) => v();
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var toChar = (code) => String.fromCharCode(code + (code > 25 ? 39 : 97));
function toName(code) {
  let name = "";
  let x;
  for (x = Math.abs(code); x > 52; x = x / 52 | 0) name = toChar(x % 52) + name;
  return toChar(x % 52) + name;
}
function toPhash(h, x) {
  let i = x.length;
  while (i) h = h * 33 ^ x.charCodeAt(--i);
  return h;
}
var hash = (value) => toName(toPhash(5381, value) >>> 0);

function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) return obj;
  const keys2 = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys2) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
function splitProps(props, keys2) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys2);
  const ownKeys = Reflect.ownKeys(props);
  for (const key of ownKeys) {
    if (keySet.has(key)) {
      result[key] = props[key];
    } else {
      rest[key] = props[key];
    }
  }
  return [result, rest];
}
var createSplitProps = (keys2) => {
  return function split(props) {
    return splitProps(props, keys2);
  };
};

// src/warning.ts
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    throw new Error(m);
  }
}
function ensure(c, m) {
  if (c == null) throw new Error(m());
}

// src/merge-props.ts
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var ownedBy = (...args) => Array.from(
  new Set(
    clsx(...args).split(/\s+/).filter(Boolean)
  )
).join(" ");
var CSS_REGEX$1 = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize$1 = (style) => {
  const res = {};
  let match;
  while (match = CSS_REGEX$1.exec(style)) {
    res[match[1]] = match[2];
  }
  return res;
};
var css = (a, b) => {
  if (isString(a)) {
    if (isString(b)) return `${a};${b}`;
    a = serialize$1(a);
  } else if (isString(b)) {
    b = serialize$1(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
function mergeProps(...args) {
  let result = {};
  for (let props of args) {
    if (!props) continue;
    for (let key in result) {
      if (key.startsWith("on") && typeof result[key] === "function" && typeof props[key] === "function") {
        result[key] = callAll(props[key], result[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key]);
        continue;
      }
      if (key === "style") {
        result[key] = css(result[key], props[key]);
        continue;
      }
      if (key === "data-ownedby") {
        result[key] = ownedBy(result[key], props[key]);
        continue;
      }
      result[key] = props[key] !== void 0 ? props[key] : result[key];
    }
    for (let key in props) {
      if (result[key] === void 0) {
        result[key] = props[key];
      }
    }
    const symbols = Object.getOwnPropertySymbols(props);
    for (let symbol of symbols) {
      result[symbol] = props[symbol];
    }
  }
  return result;
}

// src/state.ts
var STATE_DELIMITER = ".";
var ABSOLUTE_PREFIX = "#";
var stateIndexCache = /* @__PURE__ */ new WeakMap();
var stateIdIndexCache = /* @__PURE__ */ new WeakMap();
function joinStatePath(parts) {
  return parts.join(STATE_DELIMITER);
}
function isAbsoluteStatePath(value) {
  return value.includes(STATE_DELIMITER);
}
function isExplicitAbsoluteStatePath(value) {
  return value.startsWith(ABSOLUTE_PREFIX);
}
function isChildTarget(value) {
  return value.startsWith(STATE_DELIMITER);
}
function stripAbsolutePrefix(value) {
  return isExplicitAbsoluteStatePath(value) ? value.slice(ABSOLUTE_PREFIX.length) : value;
}
function appendStatePath(base, segment) {
  return base ? `${base}${STATE_DELIMITER}${segment}` : segment;
}
function buildStateIndex(machine) {
  const index = /* @__PURE__ */ new Map();
  const idIndex = /* @__PURE__ */ new Map();
  const visit = (basePath, state) => {
    index.set(basePath, state);
    const stateId = state.id;
    if (stateId) {
      if (idIndex.has(stateId)) {
        invariant(`[zag-js] Duplicate state id: "${stateId}"`);
      }
      idIndex.set(stateId, basePath);
    }
    const childStates = state.states;
    if (!childStates) return;
    ensure(state.initial, () => `[zag-js] Compound state "${basePath}" has child states but no "initial" property`);
    if (!(state.initial in childStates)) {
      invariant(
        `[zag-js] Compound state "${basePath}" has initial "${String(state.initial)}" which is not a child state`
      );
    }
    for (const [childKey, childState] of Object.entries(childStates)) {
      if (!childState) continue;
      const childPath = appendStatePath(basePath, childKey);
      visit(childPath, childState);
    }
  };
  for (const [topKey, topState] of Object.entries(machine.states)) {
    if (!topState) continue;
    visit(topKey, topState);
  }
  return { index, idIndex };
}
function ensureStateIndex(machine) {
  const cached = stateIndexCache.get(machine);
  if (cached) return cached;
  const { index, idIndex } = buildStateIndex(machine);
  stateIndexCache.set(machine, index);
  stateIdIndexCache.set(machine, idIndex);
  return index;
}
function getStatePathById(machine, stateId) {
  ensureStateIndex(machine);
  return stateIdIndexCache.get(machine)?.get(stateId);
}
function toSegments(value) {
  if (!value) return [];
  return String(value).split(STATE_DELIMITER).filter(Boolean);
}
function getStateChain(machine, state) {
  if (!state) return [];
  const stateIndex = ensureStateIndex(machine);
  const segments = toSegments(state);
  const chain = [];
  const statePath = [];
  for (const segment of segments) {
    statePath.push(segment);
    const path = joinStatePath(statePath);
    const current = stateIndex.get(path);
    if (!current) break;
    chain.push({ path, state: current });
  }
  return chain;
}
function resolveAbsoluteStateValue(machine, value) {
  const stateIndex = ensureStateIndex(machine);
  const segments = toSegments(value);
  if (!segments.length) return value;
  const resolved = [];
  for (const segment of segments) {
    resolved.push(segment);
    const path = joinStatePath(resolved);
    if (!stateIndex.has(path)) return value;
  }
  let resolvedPath = joinStatePath(resolved);
  let current = stateIndex.get(resolvedPath);
  while (current?.initial) {
    const nextPath = `${resolvedPath}${STATE_DELIMITER}${current.initial}`;
    const nextState = stateIndex.get(nextPath);
    if (!nextState) break;
    resolvedPath = nextPath;
    current = nextState;
  }
  return resolvedPath;
}
function hasStatePath(machine, value) {
  const stateIndex = ensureStateIndex(machine);
  return stateIndex.has(value);
}
function resolveStateValue(machine, value, source) {
  const stateValue = String(value);
  if (isExplicitAbsoluteStatePath(stateValue)) {
    const stateId = stripAbsolutePrefix(stateValue);
    const statePath = getStatePathById(machine, stateId);
    ensure(statePath, () => `[zag-js] Unknown state id: "${stateId}"`);
    return resolveAbsoluteStateValue(machine, statePath);
  }
  if (isChildTarget(stateValue) && source) {
    const childPath = appendStatePath(source, stateValue.slice(1));
    return resolveAbsoluteStateValue(machine, childPath);
  }
  if (!isAbsoluteStatePath(stateValue) && source) {
    const sourceSegments = toSegments(source);
    for (let index = sourceSegments.length - 1; index >= 1; index--) {
      const base = sourceSegments.slice(0, index).join(STATE_DELIMITER);
      const candidate = appendStatePath(base, stateValue);
      if (hasStatePath(machine, candidate)) return resolveAbsoluteStateValue(machine, candidate);
    }
    if (hasStatePath(machine, stateValue)) return resolveAbsoluteStateValue(machine, stateValue);
  }
  return resolveAbsoluteStateValue(machine, stateValue);
}
function findTransition(machine, state, eventType) {
  const chain = getStateChain(machine, state);
  for (let index = chain.length - 1; index >= 0; index--) {
    const transitionMap = chain[index]?.state.on;
    const transition = transitionMap?.[eventType];
    if (transition) return { transitions: transition, source: chain[index]?.path };
  }
  const rootTransitionMap = machine.on;
  return { transitions: rootTransitionMap?.[eventType], source: void 0 };
}
function getExitEnterStates(machine, prevState, nextState, reenter) {
  const prevChain = prevState ? getStateChain(machine, prevState) : [];
  const nextChain = getStateChain(machine, nextState);
  let commonIndex = 0;
  while (commonIndex < prevChain.length && commonIndex < nextChain.length && prevChain[commonIndex]?.path === nextChain[commonIndex]?.path) {
    commonIndex += 1;
  }
  let exiting = prevChain.slice(commonIndex).reverse();
  let entering = nextChain.slice(commonIndex);
  const sameLeaf = prevChain.at(-1)?.path === nextChain.at(-1)?.path;
  if (reenter && sameLeaf) {
    exiting = prevChain.slice().reverse();
    entering = nextChain;
  }
  return { exiting, entering };
}
function matchesState(current, value) {
  if (!current) return false;
  return current === value || current.startsWith(`${value}${STATE_DELIMITER}`);
}
function hasTag(machine, state, tag) {
  return getStateChain(machine, state).some((item) => item.state.tags?.includes(tag));
}

// src/create-machine.ts
function createGuards() {
  return {
    and: (...guards) => {
      return function andGuard(params) {
        return guards.every((str) => params.guard(str));
      };
    },
    or: (...guards) => {
      return function orGuard(params) {
        return guards.some((str) => params.guard(str));
      };
    },
    not: (guard) => {
      return function notGuard(params) {
        return !params.guard(guard);
      };
    }
  };
}
function createMachine(config) {
  ensureStateIndex(config);
  return config;
}
function setup() {
  return {
    guards: createGuards(),
    createMachine: (config) => {
      return createMachine(config);
    },
    choose: (transitions) => {
      return function chooseFn({ choose }) {
        return choose(transitions)?.actions;
      };
    }
  };
}

// src/types.ts
var MachineStatus = /* @__PURE__ */ ((MachineStatus2) => {
  MachineStatus2["NotStarted"] = "Not Started";
  MachineStatus2["Started"] = "Started";
  MachineStatus2["Stopped"] = "Stopped";
  return MachineStatus2;
})(MachineStatus || {});
var INIT_STATE = "__init__";

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

var wrap = (v, idx) => {
  return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
var isObject = (v) => typeof v === "object" && v !== null;
var dataAttr = (guard) => guard ? "" : void 0;
var ariaAttr = (guard) => guard ? "true" : void 0;

var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var isHTMLElement = (el) => isObject(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
var isDocument = (el) => isObject(el) && el.nodeType === DOCUMENT_NODE;
var isWindow = (el) => isObject(el) && el === el.window;
var isNode = (el) => isObject(el) && el.nodeType !== void 0;
var isShadowRoot = (el) => isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;
var isInputElement = (el) => isHTMLElement(el) && el.localName === "input";
function isActiveElement(element) {
  if (!element) return false;
  const rootNode = element.getRootNode();
  return getActiveElement(rootNode) === element;
}
var TEXTAREA_SELECT_REGEX = /(textarea|select)/;
function isEditableElement(el) {
  if (el == null || !isHTMLElement(el)) return false;
  try {
    return isInputElement(el) && el.selectionStart != null || TEXTAREA_SELECT_REGEX.test(el.localName) || el.isContentEditable || el.getAttribute("contenteditable") === "true" || el.getAttribute("contenteditable") === "";
  } catch {
    return false;
  }
}
function contains(parent, child) {
  if (!parent || !child) return false;
  if (!isHTMLElement(parent) || !isNode(child)) return false;
  if (isHTMLElement(child) && parent === child) return true;
  if (parent.contains(child)) return true;
  const rootNode = child.getRootNode?.();
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) return true;
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getDocument(el) {
  if (isDocument(el)) return el;
  if (isWindow(el)) return el.document;
  return el?.ownerDocument ?? document;
}
function getWindow(el) {
  if (isShadowRoot(el)) return getWindow(el.host);
  if (isDocument(el)) return el.defaultView ?? window;
  if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (!el || el === activeElement) break;
    else activeElement = el;
  }
  return activeElement;
}

// src/platform.ts
var isDom = () => typeof document !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
function getUserAgent() {
  const ua2 = navigator.userAgentData;
  if (ua2 && Array.isArray(ua2.brands)) {
    return ua2.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
  }
  return navigator.userAgent;
}
var pt = (v) => isDom() && v.test(getPlatform());
var ua = (v) => isDom() && v.test(getUserAgent());
var isMac = () => pt(/^Mac/i);
var isAndroid = () => ua(/Android/i);

function getComposedPath(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget(event) {
  const composedPath = getComposedPath(event);
  return composedPath?.[0] ?? event.target;
}
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const validElement = element.matches("a[href], button[type='submit'], input[type='submit']");
  if (!validElement) return false;
  const isMiddleClick = event.button === 1;
  const isModKeyClick = isCtrlOrMetaKey(event);
  return isMiddleClick || isModKeyClick;
}
function isDownloadingEvent(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const localName = element.localName;
  if (!event.altKey) return false;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
function isComposingEvent(event) {
  return getNativeEvent(event).isComposing || event.keyCode === 229;
}
function isCtrlOrMetaKey(e) {
  if (isMac()) return e.metaKey;
  return e.ctrlKey;
}
function isVirtualClick(e) {
  if (e.pointerType === "" && e.isTrusted) return true;
  if (isAndroid() && e.pointerType) {
    return e.type === "click" && e.buttons === 1;
  }
  return e.detail === 0 && !e.pointerType;
}
var isContextMenuEvent = (e) => {
  return e.button === 2 || isMac() && e.ctrlKey && e.button === 0;
};
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let key = event.key;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) key = rtlKeyMap[key];
  return key;
}
function getNativeEvent(event) {
  return event.nativeEvent ?? event;
}
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};

// src/raf.ts
var AnimationFrame = class _AnimationFrame {
  constructor() {
    __publicField(this, "id", null);
    __publicField(this, "fn_cleanup");
    __publicField(this, "cleanup", () => {
      this.cancel();
    });
  }
  static create() {
    return new _AnimationFrame();
  }
  request(fn) {
    this.cancel();
    this.id = globalThis.requestAnimationFrame(() => {
      this.id = null;
      this.fn_cleanup = fn?.();
    });
  }
  cancel() {
    if (this.id !== null) {
      globalThis.cancelAnimationFrame(this.id);
      this.id = null;
    }
    this.fn_cleanup?.();
    this.fn_cleanup = void 0;
  }
  isActive() {
    return this.id !== null;
  }
};
function raf(fn) {
  const frame = AnimationFrame.create();
  frame.request(fn);
  return frame.cleanup;
}

function observeAttributesImpl(node, options) {
  if (!node) return;
  const { attributes, callback: fn } = options;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeAttributes(nodeOrFn, options) {
  const func = raf ;
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(observeAttributesImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}

var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
var nonOverflowValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(el) {
  const win = getWindow(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !nonOverflowValues.has(display);
}

var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
  const item = itemById(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}

function isScrollable(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
function scrollIntoView(el, options) {
  const { rootEl, ...scrollOptions } = options || {};
  if (!el || !rootEl) return;
  if (!isOverflowElement(rootEl) || !isScrollable(rootEl)) return;
  el.scrollIntoView(scrollOptions);
}

var sanitize = (str) => str.split("").map((char) => {
  const code = char.charCodeAt(0);
  if (code > 0 && code < 128) return char;
  if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
  return "";
}).join("").trim();
var getValueText = (el) => {
  return sanitize(el.dataset?.valuetext ?? el.textContent ?? "");
};
var match = (valueText, query) => {
  return valueText.trim().toLowerCase().startsWith(query.toLowerCase());
};
function getByText(v, text, currentId, itemToId = defaultItemToId) {
  const index = currentId ? indexOfId(v, currentId, itemToId) : -1;
  let items = currentId ? wrap(v, index) : v;
  const isSingleKey = text.length === 1;
  if (isSingleKey) {
    items = items.filter((item) => itemToId(item) !== currentId);
  }
  return items.find((item) => match(getValueText(item), text));
}

function getByTypeaheadImpl(baseItems, options) {
  const { state, activeId, key, timeout = 350, itemToId } = options;
  const search = state.keysSoFar + key;
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const query = isRepeated ? search[0] : search;
  let items = baseItems.slice();
  const next = getByText(items, query, activeId, itemToId);
  function cleanup() {
    clearTimeout(state.timer);
    state.timer = -1;
  }
  function update(value) {
    state.keysSoFar = value;
    cleanup();
    if (value !== "") {
      state.timer = +setTimeout(() => {
        update("");
        cleanup();
      }, timeout);
    }
  }
  update(search);
  return next;
}
var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: isValidTypeaheadEvent
});
function isValidTypeaheadEvent(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}

// src/visually-hidden.ts
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};

// src/scope.ts
function createScope(props) {
  const getRootNode = () => props.getRootNode?.() ?? document;
  const getDoc = () => getDocument(getRootNode());
  const getWin = () => getDoc().defaultView ?? window;
  const getActiveElementFn = () => getActiveElement(getRootNode());
  const getById = (id) => getRootNode().getElementById(id);
  return {
    ...props,
    getRootNode,
    getDoc,
    getWin,
    getActiveElement: getActiveElementFn,
    isActiveElement,
    getById
  };
}

// src/prop-types.ts
function createNormalizer(fn) {
  return new Proxy({}, {
    get(_target, key) {
      if (key === "style")
        return (props) => {
          return fn({ style: props }).style;
        };
      return fn;
    }
  });
}

// src/create-props.ts
var createProps = () => (props) => Array.from(new Set(props));

// src/cache.ts
function i18nCache(Ins) {
  const formatterCache = /* @__PURE__ */ new Map();
  return function create(locale, options) {
    const cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
    if (formatterCache.has(cacheKey)) {
      return formatterCache.get(cacheKey);
    }
    let formatter = new Ins(locale, options);
    formatterCache.set(cacheKey, formatter);
    return formatter;
  };
}

// src/format-number.ts
var getNumberFormatter = i18nCache(Intl.NumberFormat);
function formatNumber(v, locale, options = {}) {
  const formatter = getNumberFormatter(locale, options);
  return formatter.format(v);
}

// src/format-bytes.ts
var bitPrefixes = ["", "kilo", "mega", "giga", "tera"];
var bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
var formatBytes = (bytes, locale = "en-US", options = {}) => {
  if (Number.isNaN(bytes)) return "";
  if (bytes === 0) return "0 B";
  const { unitSystem = "decimal", precision = 3, unit = "byte", unitDisplay = "short" } = options;
  const factor = unitSystem === "binary" ? 1024 : 1e3;
  const prefix = unit === "bit" ? bitPrefixes : bytePrefixes;
  const isNegative = bytes < 0;
  const absoluteBytes = Math.abs(bytes);
  let value = absoluteBytes;
  let index = 0;
  while (value >= factor && index < prefix.length - 1) {
    value /= factor;
    index++;
  }
  const v = parseFloat(value.toPrecision(precision));
  const finalValue = isNegative ? -v : v;
  return formatNumber(finalValue, locale, {
    style: "unit",
    unit: prefix[index] + unit,
    unitDisplay
  });
};

// src/is-rtl.ts
var RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Avst",
  "Arab",
  "Armi",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
var RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function isRTL(locale) {
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script ?? "";
    return RTL_SCRIPTS.has(script);
  }
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}

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

export { createSplitProps as A, createProps as B, useMachine as C, createContext as D, mergeProps$1 as E, normalizeProps as F, hash as G, visuallyHiddenStyle as H, flatArray as I, formatBytes as J, createMachine as K, LocaleProviderRootContext as L, warn as M, callAll as N, addDomEvent as O, isObject$1 as a, getEventKey as b, contains as c, isEditableElement as d, getByTypeahead as e, dataAttr as f, getEventTarget as g, hasProp as h, isEqual as i, isDownloadingEvent as j, isOpeningInNewTab as k, isContextMenuEvent as l, isCtrlOrMetaKey as m, ariaAttr as n, isComposingEvent as o, getNativeEvent as p, ensure as q, getWindow as r, getDocument as s, isVirtualClick as t, getActiveElement as u, isMac as v, setup as w, raf as x, observeAttributes as y, scrollIntoView as z };
//# sourceMappingURL=root-context.js-4MsZdWKP.js.map
