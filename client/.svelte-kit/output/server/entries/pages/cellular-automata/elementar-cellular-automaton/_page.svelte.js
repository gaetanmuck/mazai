import "../../../../chunks/index-server.js";
import { C as escape_html, S as attr, o as ensure_array_like } from "../../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../../chunks/Breadcrumbs.js";
//#endregion
//#region src/routes/cellular-automata/elementar-cellular-automaton/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			label: "Cellular automata",
			href: "/cellular-automata"
		}, {
			label: "Elementar Cellular Automaton",
			href: "/cellular-automata/elementar-cellular-automaton"
		}];
		const ruleElements = [
			{
				label: "⬜️⬜️⬜️",
				value: 0
			},
			{
				label: "⬜️⬜️⬛️",
				value: 1
			},
			{
				label: "⬜️⬛️⬜️",
				value: 2
			},
			{
				label: "⬜️⬛️⬛️",
				value: 3
			},
			{
				label: "⬛️⬜️⬜️",
				value: 4
			},
			{
				label: "⬛️⬜️⬛️",
				value: 5
			},
			{
				label: "⬛️⬛️⬜️",
				value: 6
			},
			{
				label: "⬛️⬛️⬛️",
				value: 7
			}
		];
		const config = {
			horizontalCellNumber: 489,
			startMode: "One cell in the middle",
			rule: [
				false,
				true,
				false,
				false,
				true,
				false,
				true,
				false
			]
		};
		function calcRuleNumber() {
			let ruleNumber = 0;
			for (let i = 0; i < config.rule.length; i++) ruleNumber += config.rule[i] ? Math.pow(2, i) : 0;
			return ruleNumber;
		}
		$$renderer.push(`<header class="w-fit border-b px-6 py-3">`);
		Breadcrumbs($$renderer, { links: breadcrumbs });
		$$renderer.push(`<!----></header> <div class="grid gap-8 px-10 py-10"><span class="flex place-items-end"><h1 class="flex-1 h1">Elementary Cellular Automaton</h1> <a class="anchor" href="https://en.wikipedia.org/wiki/Elementary_cellular_automaton" target="_blank">Wikipedia page</a></span> <canvas class="svelte-qflir4"></canvas> <span class="flex place-items-end"><h3 class="flex-1 h3">Current rule: ${escape_html(calcRuleNumber())}</h3> <label class="label w-50"><span class="label-text">Cell number by row</span> <input class="input" type="number" placeholder="Input"${attr("value", config.horizontalCellNumber)} min="1" max="1000"/></label></span> <div class="grid grid-cols-4 grid-rows-2 gap-4"><!--[-->`);
		const each_array = ensure_array_like(ruleElements);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<label class="flex items-center space-x-2"><input class="checkbox" type="checkbox"${attr("checked", config.rule[item.value], true)}/> <p>${escape_html(item.label)}</p></label>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
export { _page as default };
