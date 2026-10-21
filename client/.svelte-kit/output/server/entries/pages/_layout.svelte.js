import { C as escape_html, S as attr, o as ensure_array_like, s as head, t as attr_class, u as spread_props } from "../../chunks/server.js";
import { t as Icon } from "../../chunks/Icon.js";
//#region src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/chart-candlestick.svelte
function Chart_candlestick($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "chart-candlestick",
		"size": 24,
		"node": [
			["path", { "d": "M9 5v4" }],
			["rect", {
				"width": "4",
				"height": "6",
				"x": "7",
				"y": "9",
				"rx": "1"
			}],
			["path", { "d": "M9 15v2" }],
			["path", { "d": "M17 3v2" }],
			["rect", {
				"width": "4",
				"height": "8",
				"x": "15",
				"y": "5",
				"rx": "1"
			}],
			["path", { "d": "M17 13v3" }],
			["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }]
		],
		"aliases": ["candlestick-chart"]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/germ.svelte
function Germ($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "germ",
		"size": 24,
		"node": [
			["path", { "d": "m11 2 .925 1.848" }],
			["path", { "d": "M13 15h.01" }],
			["path", { "d": "m16 21-1-2.472" }],
			["path", { "d": "m19 2-1 1.804" }],
			["path", { "d": "m2 19 2.746-1.373" }],
			["path", { "d": "m22 16-2.474-2.13" }],
			["path", { "d": "m22 5-1.804 1" }],
			["path", { "d": "m3 10 2 2" }],
			["path", { "d": "M9 16h.01" }],
			["path", { "d": "M9 20v2" }],
			["path", { "d": "M9.33 7.035c-.51 1.478-1.786 2.93-3.09 3.794A5 5 0 009 20a12.1 12.1 0 0011.902-9.916A6 6 0 009.33 7.035" }],
			["circle", {
				"cx": "15",
				"cy": "9",
				"r": "2"
			}]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/house.svelte
function House($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "house",
		"size": 24,
		"node": [["path", { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]],
		"aliases": ["home"]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "menu",
		"size": 24,
		"node": [
			["path", { "d": "M4 5h16" }],
			["path", { "d": "M4 12h16" }],
			["path", { "d": "M4 19h16" }]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/virus.svelte
function Virus($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "virus",
		"size": 24,
		"node": [
			["path", { "d": "M12 14.991h.01" }],
			["path", { "d": "M12 22v-3" }],
			["path", { "d": "M12 2v3" }],
			["path", { "d": "M13 22h-2" }],
			["path", { "d": "M13 2h-2" }],
			["path", { "d": "M13.99 10H14" }],
			["path", { "d": "m16.5 19.794-1-1.733" }],
			["path", { "d": "m16.5 4.205-1 1.732" }],
			["path", { "d": "m19.794 16.5-1.732-1" }],
			["path", { "d": "m19.794 7.5-1.732 1" }],
			["path", { "d": "M2 12h3" }],
			["path", { "d": "M2 13v-2" }],
			["path", { "d": "M22 12h-3" }],
			["path", { "d": "M22 13v-2" }],
			["path", { "d": "m4.206 16.5 1.732-1" }],
			["path", { "d": "m4.206 7.5 1.732 1" }],
			["path", { "d": "m7.5 19.794 1-1.733" }],
			["path", { "d": "m7.5 4.205 1 1.732" }],
			["path", { "d": "M9 12h.01" }],
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "7"
			}]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/x.svelte
function X($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "x",
		"size": 24,
		"node": [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]]
	} }]));
}
//#endregion
//#region src/lib/components/Sidebar.svelte
function Sidebar($$renderer) {
	let items = [
		{
			label: "Home",
			href: "/",
			icon: House
		},
		{
			label: "Cellular Automata",
			href: "/cellular-automata",
			icon: Germ
		},
		{
			label: "Trading backtests",
			href: "/trading-backtests",
			icon: Chart_candlestick
		},
		{
			label: "Evolution simulations",
			href: "/evolution-simulations",
			icon: Virus
		}
	];
	let open = false;
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <button${attr_class("fixed top-3 left-3 z-50 md:hidden", void 0, {
		"btn": true,
		"btn-sm": true
	})} aria-label="Open sidebar">`);
	Menu($$renderer, { size: 20 });
	$$renderer.push(`<!----></button> <aside${attr_class("border-surface-200-800-token fixed inset-y-0 left-0 z-50 flex w-80 flex-col items-center border-r bg-surface-900 transition-transform duration-200 md:translate-x-0", void 0, {
		"-translate-x-full": true,
		"translate-x-0": open
	})}><div class="mt-20 mb-10 flex h-14 items-center justify-between px-4"><a href="/" class="text-lg font-semibold">mazai.dev</a> <button class="variant-ghost btn btn-sm md:hidden" aria-label="Close sidebar">`);
	X($$renderer, { size: 20 });
	$$renderer.push(`<!----></button></div> <nav class="flex-1 space-y-1 overflow-y-auto px-2 py-3"><!--[-->`);
	const each_array = ensure_array_like(items);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let item = each_array[$$index];
		$$renderer.push(`<a${attr("href", item.href)} class="hover:bg-surface-200-800-token flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors">`);
		if (item.icon) {
			$$renderer.push("<!--[0-->");
			const Icon = item.icon;
			if (Icon) {
				$$renderer.push("<!--[-->");
				Icon($$renderer, {});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span>${escape_html(item.label)}</span></a>`);
	}
	$$renderer.push(`<!--]--></nav></aside>`);
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	head("12qhfyh", $$renderer, ($$renderer) => {
		$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
	});
	$$renderer.push(`<div>`);
	Sidebar($$renderer, {});
	$$renderer.push(`<!----> <main>`);
	children($$renderer);
	$$renderer.push(`<!----></main></div>`);
}
//#endregion
export { _layout as default };
