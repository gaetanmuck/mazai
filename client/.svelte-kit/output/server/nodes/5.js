

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cellular-automata/game-of-life/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CPFFEwFk.js","_app/immutable/chunks/nyuC9vPw.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/wLRO4wdF.js"];
export const stylesheets = ["_app/immutable/assets/5.DicVa6Dx.css"];
export const fonts = [];
