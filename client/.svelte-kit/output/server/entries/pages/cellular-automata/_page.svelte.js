import { C as escape_html, S as attr, o as ensure_array_like } from "../../../chunks/server.js";
import { n as Listbox, t as useListCollection } from "../../../chunks/use-list-collection.js";
//#region src/routes/cellular-automata/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const collection = useListCollection({
			items: [{
				label: "Elementar Cellular Automaton",
				href: "/cellular-automata/elementar-cellular-automaton"
			}, {
				label: "Conway's Game of Life",
				href: "/cellular-automata/game-of-life"
			}],
			itemToString: (item) => item.label,
			itemToValue: (item) => item.href
		});
		$$renderer.push(`<div class="grid gap-8 px-50 py-10"><h1 class="h1">Cellular Automata</h1> <p class="max-w-prose text-lg">Simple rules can produce surprisingly complex worlds. <br/> <br/> Cellular automata are mathematical models made of a grid of cells, where each cell changes over time according to a small set of local rules. <br/> <br/> Despite their simplicity, these rules can generate patterns, structures, and behaviours that resemble surprisingly complex systems. <br/> <br/> This page is a collection of cellular automata I've implemented and experimented with. Each one explores a different set of rules and emergent behaviours — from familiar classics to more unusual experiments. <br/> <br/> Choose an automaton below to explore its rules and watch it evolve.</p> `);
		Listbox($$renderer, {
			class: "w-fit",
			collection,
			children: ($$renderer) => {
				if (Listbox.Content) {
					$$renderer.push("<!--[-->");
					Listbox.Content($$renderer, {
						children: ($$renderer) => {
							$$renderer.push(`<!--[-->`);
							const each_array = ensure_array_like(collection.items);
							for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
								let item = each_array[$$index];
								$$renderer.push(`<a${attr("href", item.href)} class="anchor">`);
								if (Listbox.Item) {
									$$renderer.push("<!--[-->");
									Listbox.Item($$renderer, {
										item,
										children: ($$renderer) => {
											if (Listbox.ItemText) {
												$$renderer.push("<!--[-->");
												Listbox.ItemText($$renderer, {
													children: ($$renderer) => {
														$$renderer.push(`<!---->${escape_html(item.label)}`);
													},
													$$slots: { default: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(`</a>`);
							}
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
