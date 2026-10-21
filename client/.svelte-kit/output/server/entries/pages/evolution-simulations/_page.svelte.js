import { C as escape_html, S as attr, o as ensure_array_like } from "../../../chunks/server.js";
import { n as Listbox, t as useListCollection } from "../../../chunks/use-list-collection.js";
//#region src/routes/evolution-simulations/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const collection = useListCollection({
			items: [{
				label: "Emojis",
				href: "/evolution-simulations/emojis"
			}],
			itemToString: (item) => item.label,
			itemToValue: (item) => item.href
		});
		$$renderer.push(`<div class="grid gap-8 px-50 py-10"><h1 class="h1">Evolution simulations</h1> <p class="max-w-prose text-lg">Some explorations of the fascinating world of evolution through interactive simulations. <br/><br/> From natural selection to complex patterns and emergent behaviors, discover how simple rules, beings, and interactions can give rise to unexpected complexity over time. Experiment with different parameters, observe the results, and see evolution unfold.</p> `);
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
