export type Simulation<TDATA, TOPTIONS> = {
	init: Function;
	start: Function;
	pause: Function;
	resume: Function;
	end: Function;
	changeOptions: Function;
	getData: () => TDATA;
	getOptions: () => TOPTIONS;
};
