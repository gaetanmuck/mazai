import { Mt as to_array, Ot as exclude_from_object, c as props_id, i as derived, kt as fallback, r as attributes } from "./server.js";
import { a as createContext, i as normalizeProps, n as useMachine, r as mergeProps, t as LocaleProviderRootContext } from "./root-context.js";
import { connect, machine, splitItemGroupLabelProps, splitItemGroupProps, splitItemProps, splitProps } from "@zag-js/listbox";
import { ListCollection } from "@zag-js/collection";
//#region node_modules/@skeletonlabs/skeleton-svelte/dist/internal/components/check.svelte
function Check($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const rest = derived(() => exclude_from_object(props, []));
		const attributes$11 = derived(() => mergeProps({
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
		const attributes$10 = derived(() => mergeProps(listbox().getContentProps(), rest()));
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
		const attributes$9 = derived(() => mergeProps(listbox().getInputProps(), rest()));
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
		const attributes$8 = derived(() => mergeProps(listbox().getItemGroupLabelProps(itemGroupLabelProps()), rest()));
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
		const attributes$7 = derived(() => mergeProps(listbox().getItemGroupProps(itemGroupProps()), rest()));
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
		const element = derived(() => props.element), children = derived(() => fallback(props.children, check)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(listbox().getItemIndicatorProps(itemProps()), rest()));
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
		const attributes$5 = derived(() => mergeProps(listbox().getItemTextProps(itemProps()), rest()));
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
		const attributes$4 = derived(() => mergeProps(listbox().getItemProps(itemProps()), rest()));
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
		const attributes$3 = derived(() => mergeProps(listbox().getLabelProps(), rest()));
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
		const attributes$2 = derived(() => mergeProps(listbox()().getRootProps(), rest()));
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
		const attributes$1 = derived(() => mergeProps(listbox().getRootProps(), rest()));
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
//#endregion
export { Listbox as n, useListCollection as t };
