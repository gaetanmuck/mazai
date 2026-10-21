import { World } from './World';
import { Vector } from './Vector';

export class Simulation {
	// for FPS infos:
	fpsRecords = Array(10).fill(Date.now());
	fpsLastWrittenTime = 0;
	fps = 0;

	// for data
	newData = 0;
	data = {
		totalDead: 0,
		population: [0],
		deads: [0],
		deadSizes: [],
		deadStrengths: [],
		deadBirthMasss: [],
		deadReproMasss: [],
		deadHungryThres: [],
		deadSleepyThres: [],
		deadPatiences: []
	};

	// For selection
	selected;

	// For interactions
	offset;

	constructor(width, height) {
		this.world = new World(width, height);

		this.selected = this.world.things[0];
	}

	initialize(canvas, ctx, options) {
		this.offset = {
			left: canvas.offsetLeft + canvas.clientLeft,
			top: canvas.offsetTop + canvas.clientTop
		};

		canvas.addEventListener('click', (event) => {
			const x = event.pageX - this.offset.left;
			const y = event.pageY - this.offset.top;
			const position = new Vector(x, y);
			const things = this.world.getThings(position, 25);
			if (things.length > 0) this.selected = things.sort((t1, t2) => Vector.distance(t1.position, position) - Vector.distance(t2.position, position))[0];
			else this.selected = undefined;

			this.draw(canvas, ctx, options);
		});

		this.drawStart(ctx, canvas);
	}

	next() {
		this.world.next();

		this.extractData();
	}

	draw(canvas, ctx, options) {
		// Background
		ctx.fillStyle = '#535353';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw the world
		this.world.draw(ctx, options);

		// FPS infos
		this.drawFPS(ctx);

		// Selected
		if (this.selected?.alive) this.selected.drawSelected(canvas, ctx);

		// General infos
		this.drawGeneralInfos(ctx);
	}

	extractData() {
		//prepare
		let mojis = this.world.things.filter((t) => t.is == 'moji');
		let deads = mojis.filter((m) => !m.alive);

		//detect change
		const lastPop = this.data.population[this.data.population.length - 1]?.count ?? 0;
		const currentPop = mojis.length - deads.length;
		if (lastPop == currentPop && deads.length == 0) return;

		this.newData++;

		//population
		this.data.population.push({ age: this.world.age, count: currentPop });
		this.data.deads.push({ age: this.world.age, count: deads.length });
		this.data.totalDead += deads.length;

		//average DNA
		this.data.avgDNA = {
			size: mojis.reduce((acc, curr) => acc + curr.dna.size, 0) / mojis.length,
			strength: mojis.reduce((acc, curr) => acc + curr.dna.strength, 0) / mojis.length,
			birthMass: mojis.reduce((acc, curr) => acc + curr.dna.birthMass, 0) / mojis.length,
			reproductionMass: mojis.reduce((acc, curr) => acc + curr.dna.reproductionMass, 0) / mojis.length,
			hungryThreshold: mojis.reduce((acc, curr) => acc + curr.dna.hungryThreshold, 0) / mojis.length,
			sleepyThreshold: mojis.reduce((acc, curr) => acc + curr.dna.sleepyThreshold, 0) / mojis.length,
			patience: mojis.reduce((acc, curr) => acc + curr.dna.patience, 0) / mojis.length
		};

		//dna analysis
		this.data.sizes = mojis.map((m) => m.dna.size);
		this.data.strengths = mojis.map((m) => m.dna.strength);
		this.data.birthMasss = mojis.map((m) => m.dna.birthMass);
		this.data.reproductionMasss = mojis.map((m) => m.dna.reproductionMass);
		this.data.hungryThresholds = mojis.map((m) => m.dna.hungryThreshold);
		this.data.sleepyThresholds = mojis.map((m) => m.dna.sleepyThreshold);
		this.data.patiences = mojis.map((m) => m.dna.patience);

		// Dead data
		if (deads.length) {
			this.data.deadSizes.push(...deads.map((m) => m.dna.size));
			this.data.deadStrengths.push(...deads.map((m) => m.dna.strength));
			this.data.deadBirthMasss.push(...deads.map((m) => m.dna.birthMass));
			this.data.deadReproMasss.push(...deads.map((m) => m.dna.reproductionMass));
			this.data.deadHungryThres.push(...deads.map((m) => m.dna.hungryThreshold));
			this.data.deadSleepyThres.push(...deads.map((m) => m.dna.sleepyThreshold));
			this.data.deadPatiences.push(...deads.map((m) => m.dna.patience));
		}
	}

	drawStart(ctx, canvas) {
		ctx.fillStyle = '#bbb';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '55px Helvetica';
		ctx.fillText('Click here, or press space to start', canvas.width / 2, canvas.height / 2);
	}

	drawFPS(ctx) {
		this.fpsRecords.shift();
		this.fpsRecords.push(Date.now());
		if (Date.now() - this.fpsLastWrittenTime > 500) {
			this.fps = 1000 / ((this.fpsRecords[this.fpsRecords.length - 1] - this.fpsRecords[0]) / 10);
			this.fpsLastWrittenTime = Date.now();
		}
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.font = '12px Helvetica';
		ctx.fillText('FPS: ' + Math.round(this.fps), 10, 15);
	}

	drawGeneralInfos(ctx) {
		let foodNb = 0;
		let mojiNb = 0;
		let mojiMasses = 0;
		this.world.things.forEach((t) => {
			if (t.is == 'moji') {
				mojiNb++;
				mojiMasses += t.mass;
			}
			if (t.is == 'food') foodNb++;
		});
		mojiMasses /= mojiNb;

		ctx.fillStyle = '#fff';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.font = '12px Helvetica';
		ctx.fillText('World age: ' + this.world.age, 10, 45);
		ctx.fillText('Emoji number: ' + mojiNb, 10, 60);
		ctx.fillText('Food number: ' + foodNb, 10, 75);
		ctx.fillText('Average mass: ' + Math.round(mojiMasses * 100) / 100, 10, 90);
		ctx.fillText('Total dead: ' + this.data.totalDead, 10, 105);
	}
}
