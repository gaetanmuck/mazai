const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DrKcjRww.js",app:"_app/immutable/entry/app.CUOYS7ha.js",imports:["_app/immutable/entry/start.DrKcjRww.js","_app/immutable/chunks/CqdZJEZx.js","_app/immutable/chunks/nyuC9vPw.js","_app/immutable/entry/app.CUOYS7ha.js","_app/immutable/chunks/nyuC9vPw.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-DU-kLgVJ.js')),
			__memo(() => import('./nodes/1.js-B4BI2ca4.js')),
			__memo(() => import('./nodes/2.js-Bc2eha4j.js')),
			__memo(() => import('./nodes/3.js-BZbKEgft.js')),
			__memo(() => import('./nodes/4.js-DMpRJ6rl.js')),
			__memo(() => import('./nodes/5.js-TYknDY-O.js')),
			__memo(() => import('./nodes/6.js-Dnjf1JqB.js')),
			__memo(() => import('./nodes/7.js-BzizhCfJ.js')),
			__memo(() => import('./nodes/8.js-DLNnJImI.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/cellular-automata",
				pattern: /^\/cellular-automata\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cellular-automata/elementar-cellular-automaton",
				pattern: /^\/cellular-automata\/elementar-cellular-automaton\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cellular-automata/game-of-life",
				pattern: /^\/cellular-automata\/game-of-life\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/evolution-simulations",
				pattern: /^\/evolution-simulations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/evolution-simulations/emojis",
				pattern: /^\/evolution-simulations\/emojis\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/trading-backtests",
				pattern: /^\/trading-backtests\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-C0IVwDqj.js.map
