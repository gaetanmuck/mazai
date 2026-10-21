import { ao as props_id, ae as attributes, _ as derived, ah as fallback$1, ap as exclude_from_object, ai as to_array } from './server.js-CBrlCBVp.js';
import { i as isEqual, a as isObject, h as hasProp, g as getEventTarget, c as contains, b as getEventKey, d as isEditableElement, e as getByTypeahead, f as dataAttr, j as isDownloadingEvent, k as isOpeningInNewTab, l as isContextMenuEvent, m as isCtrlOrMetaKey, n as ariaAttr, o as isComposingEvent, p as getNativeEvent, q as ensure, r as getWindow, s as getDocument, t as isVirtualClick, u as getActiveElement, v as isMac, w as setup, x as raf, y as observeAttributes, z as scrollIntoView, A as createSplitProps, B as createProps, L as LocaleProviderRootContext, C as useMachine, D as createContext, E as mergeProps$1, F as normalizeProps } from './root-context.js-4MsZdWKP.js';

// src/create-anatomy.ts
var createAnatomy = (name, parts = []) => ({
  parts: (...values) => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
  omit: (...values) => createAnatomy(name, parts.filter((part) => !values.includes(part))),
  rename: (newName) => createAnatomy(newName, parts),
  keys: () => parts,
  build: () => [...new Set(parts)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
          `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
      }
    }),
    {}
  )
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;

// src/listbox.anatomy.ts
var anatomy = createAnatomy("listbox").parts(
  "label",
  "input",
  "item",
  "itemText",
  "itemIndicator",
  "itemGroup",
  "itemGroupLabel",
  "content",
  "root",
  "valueText"
);
var parts = anatomy.build();

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

var fallback = {
  itemToValue(item) {
    if (typeof item === "string") return item;
    if (isObject(item) && hasProp(item, "value")) return item.value;
    return "";
  },
  itemToString(item) {
    if (typeof item === "string") return item;
    if (isObject(item) && hasProp(item, "label")) return item.label;
    return fallback.itemToValue(item);
  },
  isItemDisabled(item) {
    if (isObject(item) && hasProp(item, "disabled")) return !!item.disabled;
    return false;
  }
};
var ListCollection = class _ListCollection {
  constructor(options) {
    __publicField(this, "options", options);
    /**
     * The items in the collection
     */
    __publicField(this, "items");
    __publicField(this, "indexMap", null);
    /**
     * Copy the collection
     */
    __publicField(this, "copy", (items) => {
      return new _ListCollection({ ...this.options, items: items ?? [...this.items] });
    });
    /**
     * Check if the collection is equal to another collection
     */
    __publicField(this, "isEqual", (other) => {
      return isEqual(this.items, other.items);
    });
    /**
     * Function to update the collection items
     */
    __publicField(this, "setItems", (items) => {
      return this.copy(items);
    });
    /**
     * Returns all the values in the collection
     */
    __publicField(this, "getValues", (items = this.items) => {
      const values = [];
      for (const item of items) {
        const value = this.getItemValue(item);
        if (value != null) values.push(value);
      }
      return values;
    });
    /**
     * Get the item based on its value
     */
    __publicField(this, "find", (value) => {
      if (value == null) return null;
      const index = this.indexOf(value);
      return index !== -1 ? this.at(index) : null;
    });
    /**
     * Get the items based on its values
     */
    __publicField(this, "findMany", (values) => {
      const result = [];
      for (const value of values) {
        const item = this.find(value);
        if (item != null) result.push(item);
      }
      return result;
    });
    /**
     * Get the item based on its index
     */
    __publicField(this, "at", (index) => {
      if (!this.options.groupBy && !this.options.groupSort) {
        return this.items[index] ?? null;
      }
      let idx = 0;
      const groups = this.group();
      for (const [, items] of groups) {
        for (const item of items) {
          if (idx === index) return item;
          idx++;
        }
      }
      return null;
    });
    __publicField(this, "sortFn", (valueA, valueB) => {
      const indexA = this.indexOf(valueA);
      const indexB = this.indexOf(valueB);
      return (indexA ?? 0) - (indexB ?? 0);
    });
    /**
     * Sort the values based on their index
     */
    __publicField(this, "sort", (values) => {
      return [...values].sort(this.sortFn.bind(this));
    });
    /**
     * Convert an item to a value
     */
    __publicField(this, "getItemValue", (item) => {
      if (item == null) return null;
      return this.options.itemToValue?.(item) ?? fallback.itemToValue(item);
    });
    /**
     * Whether an item is disabled
     */
    __publicField(this, "getItemDisabled", (item) => {
      if (item == null) return false;
      return this.options.isItemDisabled?.(item) ?? fallback.isItemDisabled(item);
    });
    /**
     * Convert an item to a string
     */
    __publicField(this, "stringifyItem", (item) => {
      if (item == null) return null;
      return this.options.itemToString?.(item) ?? fallback.itemToString(item);
    });
    /**
     * Convert a value to a string
     */
    __publicField(this, "stringify", (value) => {
      if (value == null) return null;
      return this.stringifyItem(this.find(value));
    });
    /**
     * Convert an array of items to a string
     */
    __publicField(this, "stringifyItems", (items, separator = ", ") => {
      const strs = [];
      for (const item of items) {
        const str = this.stringifyItem(item);
        if (str != null) strs.push(str);
      }
      return strs.join(separator);
    });
    /**
     * Convert an array of items to a string
     */
    __publicField(this, "stringifyMany", (value, separator) => {
      return this.stringifyItems(this.findMany(value), separator);
    });
    /**
     * Whether the collection has a value
     */
    __publicField(this, "has", (value) => {
      return this.indexOf(value) !== -1;
    });
    /**
     * Whether the collection has an item
     */
    __publicField(this, "hasItem", (item) => {
      if (item == null) return false;
      return this.has(this.getItemValue(item));
    });
    /**
     * Group items by the groupBy function provided in options
     * Returns an array of [groupKey, items] tuples
     */
    __publicField(this, "group", () => {
      const { groupBy, groupSort } = this.options;
      if (!groupBy) return [["", [...this.items]]];
      const groups = /* @__PURE__ */ new Map();
      this.items.forEach((item, index) => {
        const groupKey = groupBy(item, index);
        if (!groups.has(groupKey)) {
          groups.set(groupKey, []);
        }
        groups.get(groupKey).push(item);
      });
      let entries = Array.from(groups.entries());
      if (groupSort) {
        entries.sort(([a], [b]) => {
          if (typeof groupSort === "function") return groupSort(a, b);
          if (Array.isArray(groupSort)) {
            const indexA = groupSort.indexOf(a);
            const indexB = groupSort.indexOf(b);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          }
          if (groupSort === "asc") return a.localeCompare(b);
          if (groupSort === "desc") return b.localeCompare(a);
          return 0;
        });
      }
      return entries;
    });
    /**
     * Returns the next value in the collection
     */
    __publicField(this, "getNextValue", (value, step = 1, clamp = false) => {
      let index = this.indexOf(value);
      if (index === -1) return null;
      index = clamp ? Math.min(index + step, this.size - 1) : index + step;
      while (index <= this.size && this.getItemDisabled(this.at(index))) index++;
      return this.getItemValue(this.at(index));
    });
    /**
     * Returns the previous value in the collection
     */
    __publicField(this, "getPreviousValue", (value, step = 1, clamp = false) => {
      let index = this.indexOf(value);
      if (index === -1) return null;
      index = clamp ? Math.max(index - step, 0) : index - step;
      while (index >= 0 && this.getItemDisabled(this.at(index))) index--;
      return this.getItemValue(this.at(index));
    });
    /**
     * Get the index of an item based on its key
     */
    __publicField(this, "indexOf", (value) => {
      if (value == null) return -1;
      if (!this.options.groupBy && !this.options.groupSort) {
        return this.items.findIndex((item) => this.getItemValue(item) === value);
      }
      if (!this.indexMap) {
        this.indexMap = /* @__PURE__ */ new Map();
        let idx = 0;
        const groups = this.group();
        for (const [, items] of groups) {
          for (const item of items) {
            const itemValue = this.getItemValue(item);
            if (itemValue != null) {
              this.indexMap.set(itemValue, idx);
            }
            idx++;
          }
        }
      }
      return this.indexMap.get(value) ?? -1;
    });
    __publicField(this, "getByText", (text, current) => {
      const currentIndex = current != null ? this.indexOf(current) : -1;
      const isSingleKey = text.length === 1;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[(currentIndex + i + 1) % this.items.length];
        if (isSingleKey && this.getItemValue(item) === current) continue;
        if (this.getItemDisabled(item)) continue;
        if (match(this.stringifyItem(item), text)) return item;
      }
      return void 0;
    });
    /**
     * Search for a value based on a query
     */
    __publicField(this, "search", (queryString, options) => {
      const { state, currentValue, timeout = 350 } = options;
      const search = state.keysSoFar + queryString;
      const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
      const query = isRepeated ? search[0] : search;
      const item = this.getByText(query, currentValue);
      const value = this.getItemValue(item);
      function cleanup() {
        clearTimeout(state.timer);
        state.timer = -1;
      }
      function update(value2) {
        state.keysSoFar = value2;
        cleanup();
        if (value2 !== "") {
          state.timer = +setTimeout(() => {
            update("");
            cleanup();
          }, timeout);
        }
      }
      update(search);
      return value;
    });
    /**
     * Update an item in the collection
     */
    __publicField(this, "update", (value, item) => {
      let index = this.indexOf(value);
      if (index === -1) return this;
      return this.copy([...this.items.slice(0, index), item, ...this.items.slice(index + 1)]);
    });
    /**
     * Update an item in the collection if it exists, otherwise append it
     */
    __publicField(this, "upsert", (value, item, mode = "append") => {
      let index = this.indexOf(value);
      if (index === -1) {
        const fn = mode === "append" ? this.append : this.prepend;
        return fn(item);
      }
      return this.copy([...this.items.slice(0, index), item, ...this.items.slice(index + 1)]);
    });
    /**
     * Insert items at a specific index
     */
    __publicField(this, "insert", (index, ...items) => {
      return this.copy(insert(this.items, index, ...items));
    });
    /**
     * Insert items before a specific value
     */
    __publicField(this, "insertBefore", (value, ...items) => {
      let toIndex = this.indexOf(value);
      if (toIndex === -1) {
        if (this.items.length === 0) toIndex = 0;
        else return this;
      }
      return this.copy(insert(this.items, toIndex, ...items));
    });
    /**
     * Insert items after a specific value
     */
    __publicField(this, "insertAfter", (value, ...items) => {
      let toIndex = this.indexOf(value);
      if (toIndex === -1) {
        if (this.items.length === 0) toIndex = 0;
        else return this;
      }
      return this.copy(insert(this.items, toIndex + 1, ...items));
    });
    /**
     * Prepend items to the collection
     */
    __publicField(this, "prepend", (...items) => {
      return this.copy(insert(this.items, 0, ...items));
    });
    /**
     * Append items to the collection
     */
    __publicField(this, "append", (...items) => {
      return this.copy(insert(this.items, this.items.length, ...items));
    });
    /**
     * Filter the collection
     */
    __publicField(this, "filter", (fn) => {
      const filteredItems = this.items.filter((item, index) => fn(this.stringifyItem(item), index, item));
      return this.copy(filteredItems);
    });
    /**
     * Remove items from the collection
     */
    __publicField(this, "remove", (...itemsOrValues) => {
      const values = itemsOrValues.map(
        (itemOrValue) => typeof itemOrValue === "string" ? itemOrValue : this.getItemValue(itemOrValue)
      );
      return this.copy(
        this.items.filter((item) => {
          const value = this.getItemValue(item);
          if (value == null) return false;
          return !values.includes(value);
        })
      );
    });
    /**
     * Move an item to a specific index
     */
    __publicField(this, "move", (value, toIndex) => {
      const fromIndex = this.indexOf(value);
      if (fromIndex === -1) return this;
      return this.copy(move(this.items, [fromIndex], toIndex));
    });
    /**
     * Move items before a specific value
     */
    __publicField(this, "moveBefore", (value, ...values) => {
      let toIndex = this.items.findIndex((item) => this.getItemValue(item) === value);
      if (toIndex === -1) return this;
      let indices = values.map((value2) => this.items.findIndex((item) => this.getItemValue(item) === value2)).sort((a, b) => a - b);
      return this.copy(move(this.items, indices, toIndex));
    });
    /**
     * Move items after a specific value
     */
    __publicField(this, "moveAfter", (value, ...values) => {
      let toIndex = this.items.findIndex((item) => this.getItemValue(item) === value);
      if (toIndex === -1) return this;
      let indices = values.map((value2) => this.items.findIndex((item) => this.getItemValue(item) === value2)).sort((a, b) => a - b);
      return this.copy(move(this.items, indices, toIndex + 1));
    });
    /**
     * Reorder items
     */
    __publicField(this, "reorder", (fromIndex, toIndex) => {
      return this.copy(move(this.items, [fromIndex], toIndex));
    });
    /**
     * Compare two values
     */
    __publicField(this, "compareValue", (a, b) => {
      const indexA = this.indexOf(a);
      const indexB = this.indexOf(b);
      if (indexA < indexB) return -1;
      if (indexA > indexB) return 1;
      return 0;
    });
    /**
     * Get the range of values between two values
     */
    __publicField(this, "range", (from, to) => {
      let keys = [];
      let key = from;
      while (key != null) {
        let item = this.find(key);
        if (item) keys.push(key);
        if (key === to) return keys;
        key = this.getNextValue(key);
      }
      return [];
    });
    /**
     * Get the range of values between two values
     */
    __publicField(this, "getValueRange", (from, to) => {
      if (from && to) {
        if (this.compareValue(from, to) <= 0) {
          return this.range(from, to);
        }
        return this.range(to, from);
      }
      return [];
    });
    /**
     * Convert the collection to a string
     */
    __publicField(this, "toString", () => {
      let result = "";
      for (const item of this.items) {
        const value = this.getItemValue(item);
        const label = this.stringifyItem(item);
        const disabled = this.getItemDisabled(item);
        const itemString = [value, label, disabled].filter(Boolean).join(":");
        result += itemString + ",";
      }
      return result;
    });
    /**
     * Convert the collection to a JSON object
     */
    __publicField(this, "toJSON", () => {
      return {
        size: this.size,
        first: this.firstValue,
        last: this.lastValue
      };
    });
    this.items = [...options.items];
  }
  /**
   * Returns the number of items in the collection
   */
  get size() {
    return this.items.length;
  }
  /**
   * Returns the first value in the collection
   */
  get firstValue() {
    let index = 0;
    while (this.getItemDisabled(this.at(index))) index++;
    return this.getItemValue(this.at(index));
  }
  /**
   * Returns the last value in the collection
   */
  get lastValue() {
    let index = this.size - 1;
    while (this.getItemDisabled(this.at(index))) index--;
    return this.getItemValue(this.at(index));
  }
  *[Symbol.iterator]() {
    yield* this.items;
  }
};
var match = (label, query) => {
  return !!label?.toLowerCase().startsWith(query.toLowerCase());
};
function insert(items, index, ...values) {
  return [...items.slice(0, index), ...values, ...items.slice(index)];
}
function move(items, indices, toIndex) {
  indices = [...indices].sort((a, b) => a - b);
  const itemsToMove = indices.map((i) => items[i]);
  for (let i = indices.length - 1; i >= 0; i--) {
    items = [...items.slice(0, indices[i]), ...items.slice(indices[i] + 1)];
  }
  toIndex = Math.max(0, toIndex - indices.filter((i) => i < toIndex).length);
  return [...items.slice(0, toIndex), ...itemsToMove, ...items.slice(toIndex)];
}

function isGridCollection(v) {
  return hasProp(v, "columnCount") && hasProp(v, "getRows");
}

// src/selection-map.ts
function resolveSelectedItems({
  values,
  collection,
  selectedItemMap
}) {
  const result = [];
  for (const value of values) {
    const item = collection.find(value) ?? selectedItemMap.get(value);
    if (item != null) result.push(item);
  }
  return result;
}
function updateSelectedItemMap({
  selectedItemMap,
  values,
  selectedItems,
  collection
}) {
  const nextMap = new Map(selectedItemMap);
  for (const item of selectedItems) {
    const value = collection.getItemValue(item);
    if (value != null) nextMap.set(value, item);
  }
  const allowedValues = new Set(values);
  for (const value of nextMap.keys()) {
    if (!allowedValues.has(value)) nextMap.delete(value);
  }
  return nextMap;
}
function deriveSelectionState({
  values,
  collection,
  selectedItemMap
}) {
  const selectedItems = resolveSelectedItems({ values, collection, selectedItemMap });
  const nextSelectedItemMap = updateSelectedItemMap({
    selectedItemMap,
    values,
    selectedItems,
    collection
  });
  return { selectedItems, nextSelectedItemMap };
}
function createSelectedItemMap({
  selectedItems,
  collection
}) {
  return updateSelectedItemMap({
    selectedItemMap: /* @__PURE__ */ new Map(),
    values: selectedItems.map((item) => collection.getItemValue(item)).filter(Boolean),
    selectedItems,
    collection
  });
}

var Selection = class _Selection extends Set {
  constructor(values = []) {
    super(values);
    __publicField(this, "selectionMode", "single");
    __publicField(this, "deselectable", true);
    __publicField(this, "copy", () => {
      const clone = new _Selection([...this]);
      return this.sync(clone);
    });
    __publicField(this, "sync", (other) => {
      other.selectionMode = this.selectionMode;
      other.deselectable = this.deselectable;
      return other;
    });
    __publicField(this, "isEmpty", () => {
      return this.size === 0;
    });
    __publicField(this, "isSelected", (value) => {
      if (this.selectionMode === "none" || value == null) {
        return false;
      }
      return this.has(value);
    });
    __publicField(this, "canSelect", (collection, value) => {
      return this.selectionMode !== "none" || !collection.getItemDisabled(collection.find(value));
    });
    __publicField(this, "firstSelectedValue", (collection) => {
      let firstValue = null;
      for (let value of this) {
        if (!firstValue || collection.compareValue(value, firstValue) < 0) {
          firstValue = value;
        }
      }
      return firstValue;
    });
    __publicField(this, "lastSelectedValue", (collection) => {
      let lastValue = null;
      for (let value of this) {
        if (!lastValue || collection.compareValue(value, lastValue) > 0) {
          lastValue = value;
        }
      }
      return lastValue;
    });
    __publicField(this, "extendSelection", (collection, anchorValue, targetValue) => {
      if (this.selectionMode === "none") {
        return this;
      }
      if (this.selectionMode === "single") {
        return this.replaceSelection(collection, targetValue);
      }
      const selection = this.copy();
      const lastSelected = Array.from(this).pop();
      for (let key of collection.getValueRange(anchorValue, lastSelected ?? targetValue)) {
        selection.delete(key);
      }
      for (let key of collection.getValueRange(targetValue, anchorValue)) {
        if (this.canSelect(collection, key)) {
          selection.add(key);
        }
      }
      return selection;
    });
    __publicField(this, "toggleSelection", (collection, value) => {
      if (this.selectionMode === "none") {
        return this;
      }
      if (this.selectionMode === "single" && !this.isSelected(value)) {
        return this.replaceSelection(collection, value);
      }
      const selection = this.copy();
      if (selection.has(value)) {
        selection.delete(value);
      } else if (selection.canSelect(collection, value)) {
        selection.add(value);
      }
      return selection;
    });
    __publicField(this, "replaceSelection", (collection, value) => {
      if (this.selectionMode === "none") {
        return this;
      }
      if (value == null) {
        return this;
      }
      if (!this.canSelect(collection, value)) {
        return this;
      }
      const selection = new _Selection([value]);
      return this.sync(selection);
    });
    __publicField(this, "setSelection", (values) => {
      if (this.selectionMode === "none") {
        return this;
      }
      let selection = new _Selection();
      for (let value of values) {
        if (value != null) {
          selection.add(value);
          if (this.selectionMode === "single") {
            break;
          }
        }
      }
      return this.sync(selection);
    });
    __publicField(this, "clearSelection", () => {
      const selection = this.copy();
      if (selection.deselectable && selection.size > 0) {
        selection.clear();
      }
      return selection;
    });
    __publicField(this, "select", (collection, value, forceToggle) => {
      if (this.selectionMode === "none") {
        return this;
      }
      if (this.selectionMode === "single") {
        if (this.isSelected(value) && this.deselectable) {
          return this.toggleSelection(collection, value);
        } else {
          return this.replaceSelection(collection, value);
        }
      } else if (this.selectionMode === "multiple" || forceToggle) {
        return this.toggleSelection(collection, value);
      } else {
        return this.replaceSelection(collection, value);
      }
    });
    __publicField(this, "deselect", (value) => {
      const selection = this.copy();
      selection.delete(value);
      return selection;
    });
    __publicField(this, "isEqual", (other) => {
      return isEqual(Array.from(this), Array.from(other));
    });
  }
};

// src/listbox.collection.ts
var collection = (options) => {
  return new ListCollection(options);
};
collection.empty = () => {
  return new ListCollection({ items: [] });
};

// src/listbox.dom.ts
var getRootId = (ctx) => ctx.ids?.root ?? `listbox:${ctx.id}`;
var getContentId = (ctx) => ctx.ids?.content ?? `listbox:${ctx.id}:content`;
var getLabelId = (ctx) => ctx.ids?.label ?? `listbox:${ctx.id}:label`;
var getItemId = (ctx, id) => ctx.ids?.item?.(id) ?? `listbox:${ctx.id}:item:${id}`;
var getItemGroupId = (ctx, id) => ctx.ids?.itemGroup?.(id) ?? `listbox:${ctx.id}:item-group:${id}`;
var getItemGroupLabelId = (ctx, id) => ctx.ids?.itemGroupLabel?.(id) ?? `listbox:${ctx.id}:item-group-label:${id}`;
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getItemEl = (ctx, id) => ctx.getById(getItemId(ctx, id));

// src/listbox.connect.ts
function connect(service, normalize) {
  const { context, prop, scope, computed, send, refs } = service;
  const disabled = prop("disabled");
  const collection = prop("collection");
  const layout = isGridCollection(collection) ? "grid" : "list";
  const focused = context.get("focused");
  const focusVisible = refs.get("focusVisible") && focused;
  const inputState = refs.get("inputState");
  const value = context.get("value");
  const selectedItems = computed("selectedItems");
  const highlightedValue = context.get("highlightedValue");
  const highlightedItem = context.get("highlightedItem");
  const isTypingAhead = computed("isTypingAhead");
  const interactive = computed("isInteractive");
  const ariaActiveDescendant = highlightedValue ? getItemId(scope, highlightedValue) : void 0;
  function getItemState(props) {
    const itemDisabled = collection.getItemDisabled(props.item);
    const value2 = collection.getItemValue(props.item);
    ensure(value2, () => `[zag-js] No value found for item ${JSON.stringify(props.item)}`);
    const highlighted = highlightedValue === value2;
    return {
      value: value2,
      disabled: Boolean(disabled || itemDisabled),
      focused: highlighted && focused,
      focusVisible: highlighted && focusVisible,
      // deprecated
      highlighted: highlighted && (inputState.focused ? focused : focusVisible),
      selected: context.get("value").includes(value2)
    };
  }
  return {
    empty: value.length === 0,
    highlightedItem,
    highlightedValue,
    clearHighlightedValue() {
      send({ type: "HIGHLIGHTED_VALUE.SET", value: null });
    },
    selectedItems,
    hasSelectedItems: computed("hasSelectedItems"),
    value,
    valueAsString: computed("valueAsString"),
    collection,
    disabled: !!disabled,
    selectValue(value2) {
      send({ type: "ITEM.SELECT", value: value2 });
    },
    setValue(value2) {
      send({ type: "VALUE.SET", value: value2 });
    },
    selectAll() {
      if (!computed("multiple")) {
        throw new Error("[zag-js] Cannot select all items in a single-select listbox");
      }
      send({ type: "VALUE.SET", value: collection.getValues() });
    },
    highlightValue(value2) {
      send({ type: "HIGHLIGHTED_VALUE.SET", value: value2 });
    },
    highlightFirst() {
      send({ type: "HIGHLIGHT.FIRST" });
    },
    highlightLast() {
      send({ type: "HIGHLIGHT.LAST" });
    },
    highlightNext() {
      send({ type: "HIGHLIGHT.NEXT" });
    },
    highlightPrevious() {
      send({ type: "HIGHLIGHT.PREV" });
    },
    clearValue(value2) {
      if (value2) {
        send({ type: "ITEM.CLEAR", value: value2 });
      } else {
        send({ type: "VALUE.CLEAR" });
      }
    },
    getItemState,
    getRootProps() {
      return normalize.element({
        ...parts.root.attrs,
        dir: prop("dir"),
        id: getRootId(scope),
        "data-orientation": prop("orientation"),
        "data-disabled": dataAttr(disabled)
      });
    },
    getInputProps(props = {}) {
      const keyboardPriority = props.keyboardPriority ?? "caret";
      return normalize.input({
        ...parts.input.attrs,
        dir: prop("dir"),
        disabled,
        "data-disabled": dataAttr(disabled),
        autoComplete: "off",
        autoCorrect: "off",
        "aria-haspopup": "listbox",
        "aria-controls": getContentId(scope),
        "aria-autocomplete": "list",
        "aria-activedescendant": ariaActiveDescendant,
        spellCheck: false,
        enterKeyHint: "go",
        onFocus() {
          queueMicrotask(() => {
            send({ type: "INPUT.FOCUS", autoHighlight: !!props?.autoHighlight });
          });
        },
        onBlur() {
          send({ type: "CONTENT.BLUR", src: "input" });
        },
        onInput(event) {
          if (!props?.autoHighlight) return;
          if (event.currentTarget.value.trim()) return;
          queueMicrotask(() => {
            send({ type: "HIGHLIGHTED_VALUE.SET", value: null });
          });
        },
        onKeyDown(event) {
          if (event.defaultPrevented) return;
          if (isComposingEvent(event)) return;
          const nativeEvent = getNativeEvent(event);
          const forwardEvent = () => {
            event.preventDefault();
            const win = scope.getWin();
            const keyboardEvent = new win.KeyboardEvent(nativeEvent.type, nativeEvent);
            getContentEl(scope)?.dispatchEvent(keyboardEvent);
          };
          switch (nativeEvent.key) {
            case "ArrowLeft":
            case "ArrowRight": {
              if (!isGridCollection(collection)) return;
              if (event.ctrlKey) return;
              if (keyboardPriority !== "navigate") return;
              forwardEvent();
              break;
            }
            case "Home":
            case "End": {
              if (keyboardPriority !== "navigate") return;
              if (highlightedValue == null && event.shiftKey) return;
              forwardEvent();
              break;
            }
            case "ArrowDown":
            case "ArrowUp": {
              forwardEvent();
              break;
            }
            case "Enter":
              if (highlightedValue != null) {
                event.preventDefault();
                send({ type: "ITEM.CLICK", value: highlightedValue });
              }
              break;
          }
        }
      });
    },
    getLabelProps() {
      return normalize.element({
        dir: prop("dir"),
        id: getLabelId(scope),
        ...parts.label.attrs,
        "data-disabled": dataAttr(disabled)
      });
    },
    getValueTextProps() {
      return normalize.element({
        ...parts.valueText.attrs,
        dir: prop("dir"),
        "data-disabled": dataAttr(disabled)
      });
    },
    getItemProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        id: getItemId(scope, itemState.value),
        role: "option",
        ...parts.item.attrs,
        dir: prop("dir"),
        "data-value": itemState.value,
        "aria-selected": itemState.selected,
        "data-selected": dataAttr(itemState.selected),
        "data-layout": layout,
        "data-state": itemState.selected ? "checked" : "unchecked",
        "data-orientation": prop("orientation"),
        "data-highlighted": dataAttr(itemState.highlighted),
        "data-disabled": dataAttr(itemState.disabled),
        "aria-disabled": ariaAttr(itemState.disabled),
        onPointerMove(event) {
          if (!props.highlightOnHover) return;
          if (itemState.disabled || event.pointerType !== "mouse") return;
          if (itemState.highlighted) return;
          send({ type: "ITEM.POINTER_MOVE", value: itemState.value });
        },
        onMouseDown(event) {
          event.preventDefault();
          getContentEl(scope)?.focus();
        },
        onClick(event) {
          if (event.defaultPrevented) return;
          if (isDownloadingEvent(event)) return;
          if (isOpeningInNewTab(event)) return;
          if (isContextMenuEvent(event)) return;
          if (itemState.disabled) return;
          send({
            type: "ITEM.CLICK",
            value: itemState.value,
            shiftKey: event.shiftKey,
            anchorValue: highlightedValue,
            metaKey: isCtrlOrMetaKey(event)
          });
        }
      });
    },
    getItemTextProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        ...parts.itemText.attrs,
        "data-state": itemState.selected ? "checked" : "unchecked",
        "data-disabled": dataAttr(itemState.disabled),
        "data-highlighted": dataAttr(itemState.highlighted)
      });
    },
    getItemIndicatorProps(props) {
      const itemState = getItemState(props);
      return normalize.element({
        ...parts.itemIndicator.attrs,
        "aria-hidden": true,
        "data-state": itemState.selected ? "checked" : "unchecked",
        hidden: !itemState.selected
      });
    },
    getItemGroupLabelProps(props) {
      const { htmlFor } = props;
      return normalize.element({
        ...parts.itemGroupLabel.attrs,
        id: getItemGroupLabelId(scope, htmlFor),
        dir: prop("dir"),
        role: "presentation"
      });
    },
    getItemGroupProps(props) {
      const { id } = props;
      return normalize.element({
        ...parts.itemGroup.attrs,
        "data-disabled": dataAttr(disabled),
        "data-orientation": prop("orientation"),
        "data-empty": dataAttr(collection.size === 0),
        id: getItemGroupId(scope, id),
        "aria-labelledby": getItemGroupLabelId(scope, id),
        role: "group",
        dir: prop("dir")
      });
    },
    getContentProps() {
      return normalize.element({
        dir: prop("dir"),
        id: getContentId(scope),
        role: "listbox",
        ...parts.content.attrs,
        "data-activedescendant": ariaActiveDescendant,
        "aria-activedescendant": ariaActiveDescendant,
        "data-orientation": prop("orientation"),
        "aria-multiselectable": computed("multiple") ? true : void 0,
        "aria-labelledby": getLabelId(scope),
        tabIndex: 0,
        "data-layout": layout,
        "data-empty": dataAttr(collection.size === 0),
        style: {
          "--column-count": isGridCollection(collection) ? collection.columnCount : 1
        },
        onFocus() {
          send({ type: "CONTENT.FOCUS" });
        },
        onBlur() {
          send({ type: "CONTENT.BLUR" });
        },
        onKeyDown(event) {
          if (!interactive) return;
          const target = getEventTarget(event);
          if (!contains(event.currentTarget, getEventTarget(event))) return;
          const shiftKey = event.shiftKey;
          const keyMap = {
            ArrowUp(event2) {
              let nextValue = null;
              if (isGridCollection(collection) && highlightedValue) {
                nextValue = collection.getPreviousRowValue(highlightedValue);
              } else if (highlightedValue) {
                nextValue = collection.getPreviousValue(highlightedValue);
              }
              if (!nextValue && (prop("loopFocus") || !highlightedValue)) {
                nextValue = collection.lastValue;
              }
              if (!nextValue) return;
              event2.preventDefault();
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            ArrowDown(event2) {
              let nextValue = null;
              if (isGridCollection(collection) && highlightedValue) {
                nextValue = collection.getNextRowValue(highlightedValue);
              } else if (highlightedValue) {
                nextValue = collection.getNextValue(highlightedValue);
              }
              if (!nextValue && (prop("loopFocus") || !highlightedValue)) {
                nextValue = collection.firstValue;
              }
              if (!nextValue) return;
              event2.preventDefault();
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            ArrowLeft() {
              if (!isGridCollection(collection) && prop("orientation") === "vertical") return;
              let nextValue = highlightedValue ? collection.getPreviousValue(highlightedValue) : null;
              if (!nextValue && prop("loopFocus")) {
                nextValue = collection.lastValue;
              }
              if (!nextValue) return;
              event.preventDefault();
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            ArrowRight() {
              if (!isGridCollection(collection) && prop("orientation") === "vertical") return;
              let nextValue = highlightedValue ? collection.getNextValue(highlightedValue) : null;
              if (!nextValue && prop("loopFocus")) {
                nextValue = collection.firstValue;
              }
              if (!nextValue) return;
              event.preventDefault();
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            Home(event2) {
              if (isEditableElement(target)) return;
              event2.preventDefault();
              let nextValue = collection.firstValue;
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            End(event2) {
              if (isEditableElement(target)) return;
              event2.preventDefault();
              let nextValue = collection.lastValue;
              send({ type: "NAVIGATE", value: nextValue, shiftKey, anchorValue: highlightedValue });
            },
            Enter() {
              send({ type: "ITEM.CLICK", value: highlightedValue });
            },
            a(event2) {
              if (isCtrlOrMetaKey(event2) && computed("multiple") && !prop("disallowSelectAll")) {
                event2.preventDefault();
                send({ type: "VALUE.SET", value: collection.getValues() });
              }
            },
            Space(event2) {
              if (isTypingAhead && prop("typeahead")) {
                send({ type: "CONTENT.TYPEAHEAD", key: event2.key });
              } else {
                keyMap.Enter?.();
              }
            },
            Escape(event2) {
              if (prop("deselectable") && value.length > 0) {
                event2.preventDefault();
                event2.stopPropagation();
                send({ type: "VALUE.CLEAR" });
              }
            }
          };
          const exec = keyMap[getEventKey(event)];
          if (exec) {
            exec(event);
            return;
          }
          if (isEditableElement(target)) return;
          if (getByTypeahead.isValidEvent(event) && prop("typeahead")) {
            send({ type: "CONTENT.TYPEAHEAD", key: event.key });
            event.preventDefault();
          }
        }
      });
    }
  };
}

// src/index.ts
function isValidKey(e) {
  return !(e.metaKey || !isMac() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
var nonTextInputTypes = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
function isKeyboardFocusEvent(isTextInput, modality, e) {
  const eventTarget = e ? getEventTarget(e) : null;
  const doc = getDocument(eventTarget);
  const win = getWindow(eventTarget);
  const activeElement = getActiveElement(doc);
  isTextInput = isTextInput || activeElement instanceof win.HTMLInputElement && !nonTextInputTypes.has(activeElement?.type) || activeElement instanceof win.HTMLTextAreaElement || activeElement instanceof win.HTMLElement && activeElement.isContentEditable;
  return !(isTextInput && modality === "keyboard" && e instanceof win.KeyboardEvent && !Reflect.has(FOCUS_VISIBLE_INPUT_KEYS, e.key));
}
var currentModality = null;
var changeHandlers = /* @__PURE__ */ new Set();
var listenerMap = /* @__PURE__ */ new Map();
var hasEventBeforeFocus = false;
var hasBlurredWindowRecently = false;
var ignoreFocusEvent = false;
var FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};
function triggerChangeHandlers(modality, e) {
  for (let handler of changeHandlers) {
    handler(modality, e);
  }
}
function handleKeyboardEvent(e) {
  hasEventBeforeFocus = true;
  if (isValidKey(e)) {
    currentModality = "keyboard";
    triggerChangeHandlers("keyboard", e);
  }
}
function handlePointerEvent(e) {
  currentModality = "pointer";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    hasEventBeforeFocus = true;
    triggerChangeHandlers("pointer", e);
  }
}
function handleClickEvent(e) {
  if (isVirtualClick(e)) {
    hasEventBeforeFocus = true;
    currentModality = "virtual";
  }
}
function handleFocusEvent(e) {
  const target = getEventTarget(e);
  if (target === getWindow(target) || target === getDocument(target) || ignoreFocusEvent || !e.isTrusted) {
    return;
  }
  if (!hasEventBeforeFocus && !hasBlurredWindowRecently) {
    currentModality = "virtual";
    triggerChangeHandlers("virtual", e);
  }
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = false;
}
function handleWindowBlur() {
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = true;
}
function setupGlobalFocusEvents(root) {
  if (typeof window === "undefined" || listenerMap.get(getWindow(root))) {
    return;
  }
  const win = getWindow(root);
  const doc = getDocument(root);
  let focus = win.HTMLElement.prototype.focus;
  function patchedFocus() {
    hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  }
  try {
    Object.defineProperty(win.HTMLElement.prototype, "focus", {
      configurable: true,
      value: patchedFocus
    });
  } catch {
  }
  doc.addEventListener("keydown", handleKeyboardEvent, true);
  doc.addEventListener("keyup", handleKeyboardEvent, true);
  doc.addEventListener("click", handleClickEvent, true);
  win.addEventListener("focus", handleFocusEvent, true);
  win.addEventListener("blur", handleWindowBlur, false);
  if (typeof win.PointerEvent !== "undefined") {
    doc.addEventListener("pointerdown", handlePointerEvent, true);
    doc.addEventListener("pointermove", handlePointerEvent, true);
    doc.addEventListener("pointerup", handlePointerEvent, true);
  } else {
    doc.addEventListener("mousedown", handlePointerEvent, true);
    doc.addEventListener("mousemove", handlePointerEvent, true);
    doc.addEventListener("mouseup", handlePointerEvent, true);
  }
  win.addEventListener(
    "beforeunload",
    () => {
      tearDownWindowFocusTracking(root);
    },
    { once: true }
  );
  listenerMap.set(win, { focus });
}
var tearDownWindowFocusTracking = (root, loadListener) => {
  const win = getWindow(root);
  const doc = getDocument(root);
  const listenerData = listenerMap.get(win);
  if (!listenerData) {
    return;
  }
  try {
    Object.defineProperty(win.HTMLElement.prototype, "focus", {
      configurable: true,
      value: listenerData.focus
    });
  } catch {
  }
  doc.removeEventListener("keydown", handleKeyboardEvent, true);
  doc.removeEventListener("keyup", handleKeyboardEvent, true);
  doc.removeEventListener("click", handleClickEvent, true);
  win.removeEventListener("focus", handleFocusEvent, true);
  win.removeEventListener("blur", handleWindowBlur, false);
  if (typeof win.PointerEvent !== "undefined") {
    doc.removeEventListener("pointerdown", handlePointerEvent, true);
    doc.removeEventListener("pointermove", handlePointerEvent, true);
    doc.removeEventListener("pointerup", handlePointerEvent, true);
  } else {
    doc.removeEventListener("mousedown", handlePointerEvent, true);
    doc.removeEventListener("mousemove", handlePointerEvent, true);
    doc.removeEventListener("mouseup", handlePointerEvent, true);
  }
  listenerMap.delete(win);
};
function getInteractionModality() {
  return currentModality;
}
function setInteractionModality(modality) {
  currentModality = modality;
  triggerChangeHandlers(modality, null);
}
function isFocusVisible() {
  return currentModality === "keyboard" || currentModality === "virtual";
}
function trackFocusVisible(props = {}) {
  const { isTextInput, autoFocus, onChange, root } = props;
  setupGlobalFocusEvents(root);
  onChange?.({ isFocusVisible: autoFocus || isFocusVisible(), modality: currentModality });
  const handler = (modality, e) => {
    if (!isKeyboardFocusEvent(!!isTextInput, modality, e)) return;
    onChange?.({ isFocusVisible: isFocusVisible(), modality });
  };
  changeHandlers.add(handler);
  return () => {
    changeHandlers.delete(handler);
  };
}

// src/listbox.machine.ts
var { guards, createMachine } = setup();
var { or } = guards;
var machine = createMachine({
  props({ props }) {
    return {
      loopFocus: false,
      composite: true,
      defaultValue: [],
      multiple: false,
      typeahead: true,
      collection: collection.empty(),
      orientation: "vertical",
      selectionMode: "single",
      ...props
    };
  },
  context({ prop, bindable, getContext }) {
    const initialValue = prop("value") ?? prop("defaultValue") ?? [];
    const initialSelectedItems = prop("collection").findMany(initialValue);
    return {
      value: bindable(() => ({
        defaultValue: prop("defaultValue"),
        value: prop("value"),
        isEqual,
        onChange(value) {
          const context = getContext();
          const collection2 = prop("collection");
          const selectedItemMap = context.get("selectedItemMap");
          const proposed = deriveSelectionState({
            values: value,
            collection: collection2,
            selectedItemMap
          });
          const effectiveValue = prop("value") ?? value;
          const effective = effectiveValue === value ? proposed : deriveSelectionState({
            values: effectiveValue,
            collection: collection2,
            selectedItemMap: proposed.nextSelectedItemMap
          });
          context.set("selectedItemMap", effective.nextSelectedItemMap);
          return prop("onValueChange")?.({ value, items: proposed.selectedItems });
        }
      })),
      highlightedValue: bindable(() => ({
        defaultValue: prop("defaultHighlightedValue") || null,
        value: prop("highlightedValue"),
        sync: true,
        onChange(value) {
          prop("onHighlightChange")?.({
            highlightedValue: value,
            highlightedItem: prop("collection").find(value),
            highlightedIndex: prop("collection").indexOf(value)
          });
        }
      })),
      highlightedItem: bindable(() => ({
        defaultValue: null
      })),
      selectedItemMap: bindable(() => {
        return {
          defaultValue: createSelectedItemMap({
            selectedItems: initialSelectedItems,
            collection: prop("collection")
          })
        };
      }),
      focused: bindable(() => ({
        sync: true,
        defaultValue: false
      }))
    };
  },
  refs() {
    return {
      typeahead: { ...getByTypeahead.defaultOptions },
      focusVisible: false,
      inputState: { autoHighlight: false, focused: false }
    };
  },
  computed: {
    hasSelectedItems: ({ context }) => context.get("value").length > 0,
    isTypingAhead: ({ refs }) => refs.get("typeahead").keysSoFar !== "",
    isInteractive: ({ prop }) => !prop("disabled"),
    selection: ({ context, prop }) => {
      const selection = new Selection(context.get("value"));
      selection.selectionMode = prop("selectionMode");
      selection.deselectable = !!prop("deselectable");
      return selection;
    },
    multiple: ({ prop }) => prop("selectionMode") === "multiple" || prop("selectionMode") === "extended",
    selectedItems: ({ context, prop }) => resolveSelectedItems({
      values: context.get("value"),
      collection: prop("collection"),
      selectedItemMap: context.get("selectedItemMap")
    }),
    valueAsString: ({ computed, prop }) => prop("collection").stringifyItems(computed("selectedItems"))
  },
  initialState() {
    return "idle";
  },
  watch({ context, prop, track, action }) {
    track([() => context.get("value").toString()], () => {
      action(["syncSelectedItems"]);
    });
    track([() => context.get("highlightedValue")], () => {
      action(["syncHighlightedItem"]);
    });
    track([() => prop("collection").toString()], () => {
      action(["syncHighlightedValue"]);
    });
  },
  effects: ["trackFocusVisible"],
  on: {
    "HIGHLIGHTED_VALUE.SET": {
      actions: ["setHighlightedItem"]
    },
    "ITEM.SELECT": {
      actions: ["selectItem"]
    },
    "ITEM.CLEAR": {
      actions: ["clearItem"]
    },
    "VALUE.SET": {
      actions: ["setSelectedItems"]
    },
    "VALUE.CLEAR": {
      actions: ["clearSelectedItems"]
    },
    "HIGHLIGHT.FIRST": {
      actions: ["highlightFirstValue"]
    },
    "HIGHLIGHT.LAST": {
      actions: ["highlightLastValue"]
    },
    "HIGHLIGHT.NEXT": {
      actions: ["highlightNextValue"]
    },
    "HIGHLIGHT.PREV": {
      actions: ["highlightPreviousValue"]
    }
  },
  states: {
    idle: {
      effects: ["scrollToHighlightedItem"],
      on: {
        "INPUT.FOCUS": {
          actions: ["setFocused", "setInputState"]
        },
        "CONTENT.FOCUS": [
          {
            guard: or("hasSelectedValue", "hasHighlightedValue"),
            actions: ["setFocused"]
          },
          {
            actions: ["setFocused", "setDefaultHighlightedValue"]
          }
        ],
        "CONTENT.BLUR": {
          actions: ["clearFocused", "clearInputState"]
        },
        "ITEM.CLICK": {
          actions: ["setHighlightedItem", "selectHighlightedItem"]
        },
        "CONTENT.TYPEAHEAD": {
          actions: ["setFocused", "highlightMatchingItem"]
        },
        "ITEM.POINTER_MOVE": {
          actions: ["highlightItem"]
        },
        "ITEM.POINTER_LEAVE": {
          actions: ["clearHighlightedItem"]
        },
        NAVIGATE: {
          actions: ["setFocused", "setHighlightedItem", "selectWithKeyboard"]
        }
      }
    }
  },
  implementations: {
    guards: {
      hasSelectedValue: ({ context }) => context.get("value").length > 0,
      hasHighlightedValue: ({ context }) => context.get("highlightedValue") != null
    },
    effects: {
      trackFocusVisible: ({ scope, refs }) => {
        return trackFocusVisible({
          root: scope.getRootNode?.(),
          onChange(details) {
            refs.set("focusVisible", details.isFocusVisible);
          }
        });
      },
      scrollToHighlightedItem({ context, prop, scope }) {
        const exec = (immediate) => {
          const highlightedValue = context.get("highlightedValue");
          if (highlightedValue == null) return;
          const modality = getInteractionModality();
          if (modality === "pointer") return;
          const contentEl2 = getContentEl(scope);
          const scrollToIndexFn = prop("scrollToIndexFn");
          if (scrollToIndexFn) {
            const highlightedIndex = prop("collection").indexOf(highlightedValue);
            scrollToIndexFn?.({
              index: highlightedIndex,
              immediate,
              getElement() {
                return getItemEl(scope, highlightedValue);
              }
            });
            return;
          }
          const itemEl = getItemEl(scope, highlightedValue);
          scrollIntoView(itemEl, { rootEl: contentEl2, block: "nearest" });
        };
        raf(() => {
          setInteractionModality("virtual");
          exec(true);
        });
        const contentEl = () => getContentEl(scope);
        return observeAttributes(contentEl, {
          attributes: ["data-activedescendant"],
          callback() {
            exec(false);
          }
        });
      }
    },
    actions: {
      selectHighlightedItem({ context, prop, event, computed }) {
        const value = event.value ?? context.get("highlightedValue");
        const collection2 = prop("collection");
        if (value == null || !collection2.has(value)) return;
        const selection = computed("selection");
        if (event.shiftKey && computed("multiple") && event.anchorValue) {
          const next = selection.extendSelection(collection2, event.anchorValue, value);
          invokeOnSelect(selection, next, prop("onSelect"));
          context.set("value", Array.from(next));
        } else {
          const next = selection.select(collection2, value, event.metaKey);
          invokeOnSelect(selection, next, prop("onSelect"));
          context.set("value", Array.from(next));
        }
      },
      selectWithKeyboard({ context, prop, event, computed }) {
        const selection = computed("selection");
        const collection2 = prop("collection");
        if (event.shiftKey && computed("multiple") && event.anchorValue) {
          const next = selection.extendSelection(collection2, event.anchorValue, event.value);
          invokeOnSelect(selection, next, prop("onSelect"));
          context.set("value", Array.from(next));
          return;
        }
        if (prop("selectOnHighlight")) {
          const next = selection.replaceSelection(collection2, event.value);
          invokeOnSelect(selection, next, prop("onSelect"));
          context.set("value", Array.from(next));
        }
      },
      highlightItem({ context, event }) {
        context.set("highlightedValue", event.value);
      },
      highlightMatchingItem({ context, prop, event, refs }) {
        const value = prop("collection").search(event.key, {
          state: refs.get("typeahead"),
          currentValue: context.get("highlightedValue")
        });
        if (value == null) return;
        context.set("highlightedValue", value);
      },
      setHighlightedItem({ context, event }) {
        context.set("highlightedValue", event.value);
      },
      highlightFirstValue({ context, prop }) {
        context.set("highlightedValue", prop("collection").firstValue ?? null);
      },
      highlightLastValue({ context, prop }) {
        context.set("highlightedValue", prop("collection").lastValue ?? null);
      },
      highlightNextValue({ context, prop }) {
        const collection2 = prop("collection");
        const highlightedValue = context.get("highlightedValue");
        let nextValue = null;
        if (isGridCollection(collection2) && highlightedValue) {
          nextValue = collection2.getNextRowValue(highlightedValue);
        } else if (highlightedValue) {
          nextValue = collection2.getNextValue(highlightedValue);
        }
        if (!nextValue && (prop("loopFocus") || !highlightedValue)) {
          nextValue = collection2.firstValue;
        }
        if (!nextValue) return;
        context.set("highlightedValue", nextValue);
      },
      highlightPreviousValue({ context, prop }) {
        const collection2 = prop("collection");
        const highlightedValue = context.get("highlightedValue");
        let nextValue = null;
        if (isGridCollection(collection2) && highlightedValue) {
          nextValue = collection2.getPreviousRowValue(highlightedValue);
        } else if (highlightedValue) {
          nextValue = collection2.getPreviousValue(highlightedValue);
        }
        if (!nextValue && (prop("loopFocus") || !highlightedValue)) {
          nextValue = collection2.lastValue;
        }
        if (!nextValue) return;
        context.set("highlightedValue", nextValue);
      },
      clearHighlightedItem({ context }) {
        context.set("highlightedValue", null);
      },
      selectItem({ context, prop, event, computed }) {
        const collection2 = prop("collection");
        const selection = computed("selection");
        const next = selection.select(collection2, event.value);
        invokeOnSelect(selection, next, prop("onSelect"));
        context.set("value", Array.from(next));
      },
      clearItem({ context, event, computed }) {
        const selection = computed("selection");
        const value = selection.deselect(event.value);
        context.set("value", Array.from(value));
      },
      setSelectedItems({ context, event }) {
        context.set("value", event.value);
      },
      clearSelectedItems({ context }) {
        context.set("value", []);
      },
      syncSelectedItems({ context, prop }) {
        const next = deriveSelectionState({
          values: context.get("value"),
          collection: prop("collection"),
          selectedItemMap: context.get("selectedItemMap")
        });
        context.set("selectedItemMap", next.nextSelectedItemMap);
      },
      syncHighlightedItem({ context, prop }) {
        const collection2 = prop("collection");
        const highlightedValue = context.get("highlightedValue");
        const highlightedItem = highlightedValue ? collection2.find(highlightedValue) : null;
        context.set("highlightedItem", highlightedItem);
      },
      syncHighlightedValue({ context, prop, refs }) {
        const collection2 = prop("collection");
        const highlightedValue = context.get("highlightedValue");
        const { autoHighlight } = refs.get("inputState");
        if (autoHighlight) {
          queueMicrotask(() => {
            context.set("highlightedValue", prop("collection").firstValue ?? null);
          });
          return;
        }
        if (highlightedValue != null && !collection2.has(highlightedValue)) {
          queueMicrotask(() => {
            context.set("highlightedValue", null);
          });
        }
      },
      setFocused({ context }) {
        context.set("focused", true);
      },
      setDefaultHighlightedValue({ context, prop }) {
        const collection2 = prop("collection");
        const firstValue = collection2.firstValue;
        if (firstValue != null) {
          context.set("highlightedValue", firstValue);
        }
      },
      clearFocused({ context }) {
        context.set("focused", false);
      },
      setInputState({ refs, event }) {
        refs.set("inputState", { autoHighlight: !!event.autoHighlight, focused: true });
      },
      clearInputState({ refs }) {
        refs.set("inputState", { autoHighlight: false, focused: false });
      }
    }
  }
});
var diff = (a, b) => {
  const result = new Set(a);
  for (const item of b) result.delete(item);
  return result;
};
function invokeOnSelect(current, next, onSelect) {
  const added = diff(next, current);
  for (const item of added) {
    onSelect?.({ value: item });
  }
}

// src/listbox.props.ts
var props = createProps()([
  "collection",
  "defaultHighlightedValue",
  "defaultValue",
  "dir",
  "disabled",
  "deselectable",
  "disallowSelectAll",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "loopFocus",
  "onHighlightChange",
  "onSelect",
  "onValueChange",
  "orientation",
  "scrollToIndexFn",
  "selectionMode",
  "selectOnHighlight",
  "typeahead",
  "value"
]);
var splitProps = createSplitProps(props);
var itemProps = createProps()(["item", "highlightOnHover"]);
var splitItemProps = createSplitProps(itemProps);
var itemGroupProps = createProps()(["id"]);
var splitItemGroupProps = createSplitProps(itemGroupProps);
var itemGroupLabelProps = createProps()(["htmlFor"]);
var splitItemGroupLabelProps = createSplitProps(itemGroupLabelProps);

//#region node_modules/@skeletonlabs/skeleton-svelte/dist/internal/components/check.svelte
function Check($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const rest = derived(() => exclude_from_object(props, []));
		const attributes$11 = derived(() => mergeProps$1({
			xmlns: "http://www.w3.org/2000/svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, rest()));
		$$renderer.push(`<svg${attributes({ ...attributes$11() }, void 0, void 0, void 0, 3)}><path d="M20 6 9 17l-5-5"></path></svg>`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/root-context.js
var ListboxRootContext = createContext();
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$10 = derived(() => mergeProps$1(listbox().getContentProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$10());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><ul${attributes({ ...attributes$10() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></ul>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$9 = derived(() => mergeProps$1(listbox().getInputProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><input${attributes({ ...attributes$9() }, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/item-group-context.js
var ListboxItemGroupContext = createContext();
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-group-label.svelte
function Item_group_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const itemGroupProps = ListboxItemGroupContext.consume();
		const $$d = derived(() => splitItemGroupLabelProps({
			htmlFor: itemGroupProps().id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 1)), itemGroupLabelProps = derived(() => $$derived_array()[0]);
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps$1(listbox().getItemGroupLabelProps(itemGroupLabelProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-group.svelte
function Item_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const $$d = derived(() => splitItemGroupProps({
			id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 2)), itemGroupProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$7 = derived(() => mergeProps$1(listbox().getItemGroupProps(itemGroupProps()), rest()));
		ListboxItemGroupContext.provide(() => itemGroupProps());
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
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/item-context.js
var ListboxItemContext = createContext();
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-indicator.svelte
function check($$renderer) {
	Check($$renderer, { class: "size-4" });
}
function Item_indicator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const itemProps = ListboxItemContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback$1(props.children, check)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps$1(listbox().getItemIndicatorProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-text.svelte
function Item_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const itemProps = ListboxItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps$1(listbox().getItemTextProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const $$d = derived(() => splitItemProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), itemProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$4 = derived(() => mergeProps$1(listbox().getItemProps(itemProps()), rest()));
		ListboxItemContext.provide(() => itemProps());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><li${attributes({ ...attributes$4() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></li>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps$1(listbox().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$3());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><label${attributes({ ...attributes$3() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></label>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = ListboxRootContext.consume();
		derived(() => props.children)()($$renderer, listbox);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), listbox = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$2 = derived(() => mergeProps$1(listbox()().getRootProps(), rest()));
		ListboxRootContext.provide(() => listbox()());
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
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/provider.svelte.js
function useListbox(props) {
	const locale = LocaleProviderRootContext.consume();
	const service = useMachine(machine, () => ({
		dir: locale().dir,
		...typeof props === "function" ? props() : props
	}));
	const listbox = derived(() => connect(service, normalizeProps));
	return () => listbox();
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), listboxProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const listbox = useListbox(() => ({
			...listboxProps(),
			id
		}));
		const attributes$1 = derived(() => mergeProps$1(listbox().getRootProps(), rest()));
		ListboxRootContext.provide(() => listbox());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/anatomy.js
var Listbox = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	Input,
	Content,
	ItemGroup: Item_group,
	ItemGroupLabel: Item_group_label,
	Item,
	ItemText: Item_text,
	ItemIndicator: Item_indicator
});
//#endregion
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/hooks/use-list-collection.js
function useListCollection(options) {
	return new ListCollection(options);
}

export { Listbox as L, createAnatomy as c, useListCollection as u };
//# sourceMappingURL=use-list-collection.js-BasHVNWT.js.map
