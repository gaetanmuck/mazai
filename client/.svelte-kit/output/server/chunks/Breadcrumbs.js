import { C as escape_html, S as attr, o as ensure_array_like } from "./server.js";
//#region src/lib/components/Breadcrumbs.svelte
function Breadcrumbs($$renderer, $$props) {
	let { links } = $$props;
	$$renderer.push(`<nav aria-label="Breadcrumb"><ol class="flex items-center gap-2"><!--[-->`);
	const each_array = ensure_array_like(links);
	for (let i = 0, $$length = each_array.length; i < $$length; i++) {
		let link = each_array[i];
		if (i > 0) $$renderer.push(`<!--[0--><span class="text-surface-900">/</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <li><a${attr("href", link.href)} class="flex items-center gap-2 hover:underline">`);
		if (link.icon) {
			$$renderer.push("<!--[0-->");
			const Icon = link.icon;
			if (Icon) {
				$$renderer.push("<!--[-->");
				Icon($$renderer, { size: 16 });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span>${escape_html(link.label)}</span></a></li>`);
	}
	$$renderer.push(`<!--]--></ol></nav>`);
}
//#endregion
export { Breadcrumbs as t };
