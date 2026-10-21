import "../../../../chunks/index-server.js";
import { C as escape_html, S as attr, o as ensure_array_like } from "../../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../../chunks/Breadcrumbs.js";
//#region src/lib/canvas/game-of-life.ts
var StartingMap = /* @__PURE__ */ function(StartingMap) {
	StartingMap["Random25"] = "Random25";
	StartingMap["Random50"] = "Random50";
	StartingMap["Random75"] = "Random75";
	StartingMap["Pulsar"] = "Pulsar";
	StartingMap["PentaDecathlon"] = "PentaDecathlon";
	StartingMap["Rpentomino"] = "Rpentomino";
	StartingMap["Diehard"] = "Diehard";
	StartingMap["Acorn"] = "Acorn";
	StartingMap["GosperGliderGun"] = "GosperGliderGun";
	StartingMap["InfinitePattern1"] = "InfinitePattern1";
	StartingMap["InfinitePattern2"] = "InfinitePattern2";
	StartingMap["InfinitePattern3"] = "InfinitePattern3";
	return StartingMap;
}({});
var State = /* @__PURE__ */ function(State) {
	State[State["Pause"] = 0] = "Pause";
	State[State["Running"] = 1] = "Running";
	return State;
}(State || {});
//#endregion
//#region src/routes/cellular-automata/game-of-life/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			label: "Cellular automata",
			href: "/cellular-automata"
		}, {
			label: "Game Of Life",
			href: "/cellular-automata/game-of-life"
		}];
		const config = {
			horizontalCellNumber: 200,
			startingMap: StartingMap.Random75,
			fps: 20
		};
		config.fps;
		$$renderer.push(`<header class="w-fit border-b px-6 py-3">`);
		Breadcrumbs($$renderer, { links: breadcrumbs });
		$$renderer.push(`<!----></header> <div class="grid gap-8 px-10 py-10"><span class="flex place-items-end"><h1 class="flex-1 h1">Conway's Game of Life</h1> <a class="anchor" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Wikipedia page</a></span> <canvas class="svelte-1gz8c3q"></canvas> <span class="flex place-items-end"><h3 class="flex-1 h3">Options</h3></span> <span class="grid grid-cols-3 gap-4"><label class="label"><span class="label-text">Cell number by row</span> <input class="input" type="number" placeholder="Input"${attr("value", config.horizontalCellNumber)}/></label> <label class="label"><span class="label-text">Starting map</span> `);
		$$renderer.select({
			class: "select",
			value: config.startingMap
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(Object.values(StartingMap).filter((e) => isNaN(Number(e))));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let value = each_array[$$index];
				$$renderer.option({ value }, ($$renderer) => {
					$$renderer.push(`${escape_html(value)}`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`</label> <label class="label"><span class="label-text">FPS</span> <input class="input" type="number" placeholder="Input"${attr("value", config.fps)}/></label></span></div>`);
	});
}
//#endregion
export { _page as default };
