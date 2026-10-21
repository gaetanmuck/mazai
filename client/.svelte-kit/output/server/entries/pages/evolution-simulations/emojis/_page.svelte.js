import "../../../../chunks/index-server.js";
import "../../../../chunks/server.js";
//#region src/lib/canvas/emojis/Vector.js
var Vector = class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	copy() {
		return new Vector(this.x, this.y);
	}
	static random(world) {
		const x = world.minX + Math.random() * (world.maxX - world.minX);
		const y = world.minY + Math.random() * (world.maxY - world.minY);
		return new Vector(x, y);
	}
	static mult(vec, rate) {
		return new Vector(vec.x * rate, vec.y * rate);
	}
	static opposite(vec) {
		return Vector.mult(vec, -1);
	}
	static add(vec1, vec2) {
		return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
	}
	static sub(vec1, vec2) {
		return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
	}
	static mag2(vec) {
		return vec.x * vec.x + vec.y * vec.y;
	}
	static mag(vec) {
		return Math.sqrt(Vector.mag2(vec));
	}
	static normalize(vec) {
		const size = Vector.mag(vec);
		return new Vector(vec.x / size, vec.y / size);
	}
	static limit(vec, value) {
		if (value == 0) return new Vector(0, 0);
		const rate = Vector.mag(vec) / value;
		if (rate > 1) return Vector.mult(vec, 1 / rate);
		return vec;
	}
	static distance(vec1, vec2) {
		const x = (vec1.x - vec2.x) * (vec1.x - vec2.x);
		const y = (vec1.y - vec2.y) * (vec1.y - vec2.y);
		return Math.sqrt(x + y);
	}
};
//#endregion
//#region src/lib/canvas/emojis/Food.js
var Food = class Food {
	static CREATION_RATE = .03;
	static MASS = 2;
	static createRandom(world) {
		const food = new Food(world, Vector.random(world));
		world.things.push(food);
	}
	static foodGeneration(world) {
		if (Math.random() < Food.CREATION_RATE) this.createRandom(world);
	}
	constructor(world, position, mass = Food.MASS) {
		this.is = "food";
		this.world = world;
		this.position = position;
		this.alive = true;
		this.mass = mass;
		this.age = 0;
	}
	next() {
		this.age++;
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.font = "12px serif";
		ctx.fillText("🍕", this.position.x, this.position.y);
	}
	drawSelected(canvas, ctx) {
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		ctx.font = "12px Helvetica";
		ctx.fillText("Food", canvas.width - 10, 10);
		ctx.fillText("Age: " + this.age, canvas.width - 10, 25);
		ctx.fillText("Mass: " + this.mass, canvas.width - 10, 40);
	}
};
//#endregion
//#region src/lib/canvas/emojis/Actions.js
var Actions = class {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}
	wander() {
		const force = new Vector(Math.random() * this.moji.dna.strength - this.moji.dna.strength / 2, Math.random() * this.moji.dna.strength - this.moji.dna.strength / 2);
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}
	moveTowards(aim) {
		const direction = Vector.normalize(Vector.sub(aim, this.moji.position));
		const force = Vector.mult(direction, this.moji.dna.strength);
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}
	moveAwayFrom(aim) {
		const direction = Vector.normalize(Vector.sub(aim, this.moji.position));
		const force = Vector.mult(direction, -this.moji.dna.strength);
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}
	stop() {
		const direction = Vector.normalize(Vector.opposite(this.moji.velocity));
		const force = Vector.mult(direction, this.moji.dna.strength);
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));
		let acc = Vector.mult(force, 1 / this.moji.mass);
		acc = Vector.limit(acc, Vector.mag(this.moji.velocity));
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}
	search() {
		this.moveTowards(Vector.random(this.world));
	}
	eat(food) {
		this.moji.updateMass(this.moji.mass + food.mass);
		food.alive = false;
		this.moji.behaviors["hungry"].hungryTime = 0;
	}
	sleep() {
		if (this.moji.getEnergyRate() < 1) this.moji.updateEnergy(this.moji.energy + Emoji.SLEEP_ENERGY_REGEN);
	}
	hit(target) {
		this.moji.updateEnergy(this.moji.energy - this.moji.dna.strength);
		target.updateEnergy(target.energy - this.moji.dna.strength * this.moji.dna.strength * this.moji.dna.strength);
		target.checkAlive();
	}
};
//#endregion
//#region src/lib/canvas/emojis/BehaviorWander.js
var BehaviorWander = class {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}
	activate() {
		return "wander";
	}
	apply() {
		this.moji.actions.wander();
		return { behavior: "wander" };
	}
	next() {
		if (this.moji.getEnergyRate() <= this.moji.dna.hungryThreshold) return this.moji.behaviors["hungry"].activate();
		return "wander";
	}
};
//#endregion
//#region src/lib/canvas/emojis/BehaviorHungry.js
var BehaviorHungry = class {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
		this.hungryTime = 0;
	}
	activate() {
		return "hungry";
	}
	apply() {
		let foods = this.world.getThings(this.moji.position, this.moji.sight);
		foods = foods.filter((t) => t.is == "food" && t.alive);
		foods = foods.sort((food1, food2) => Vector.distance(food1.position, this.moji.position) - Vector.distance(food2.position, this.moji.position));
		if (foods.length > 0) {
			const target = foods[0];
			if (target && Vector.distance(this.moji.position, target.position) <= Emoji.RANGE) {
				this.moji.actions.eat(target);
				return {
					behavior: "hungry",
					target
				};
			}
			this.moji.actions.moveTowards(target.position);
			this.hungryTime++;
			return {
				behavior: "hungry",
				target
			};
		}
		this.moji.actions.search();
		this.hungryTime++;
		return { behavior: "hungry" };
	}
	next() {
		if (this.hungryTime >= this.moji.dna.patience) return this.moji.behaviors["angry"].activate();
		if (this.moji.getEnergyRate() <= this.moji.dna.sleepyThreshold) return this.moji.behaviors["sleepy"].activate();
		return "hungry";
	}
};
//#endregion
//#region src/lib/canvas/emojis/BehaviorAngry.js
var BehaviorAngry = class {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}
	activate() {
		return "angry";
	}
	apply() {
		let things = this.world.getThings(this.moji.position, this.moji.sight);
		things = things.filter((t) => t.alive && t != this.moji);
		things = things.sort((thing1, thing2) => Vector.distance(thing1.position, this.moji.position) - Vector.distance(thing2.position, this.moji.position));
		if (things.length == 0) {
			this.moji.actions.search();
			return;
		}
		let target = things[0];
		if (target.is == "moji") {
			this.moji.behaviors["hungry"].hungryTime++;
			let hits = [];
			if (Vector.distance(this.moji.position, target.position) > Emoji.RANGE) this.moji.actions.moveTowards(target.position);
			else {
				hits = [target];
				this.moji.actions.hit(target);
			}
			return {
				behavior: "angry",
				target,
				hits
			};
		}
		if (target.is == "food") {
			if (Vector.distance(this.moji.position, target.position) <= Emoji.RANGE) {
				this.moji.actions.eat(target);
				return {
					behavior: "angry",
					target
				};
			}
			this.moji.actions.moveTowards(target.position);
			this.moji.behaviors["hungry"].hungryTime++;
			return {
				behavior: "angry",
				target
			};
		}
	}
	next() {
		if (this.moji.getEnergyRate() <= this.moji.dna.sleepyThreshold) return this.moji.behaviors["sleepy"].activate();
		if (this.moji.behaviors["hungry"].hungryTime < this.moji.dna.patience) return this.moji.behaviors["hungry"].activate();
		return "angry";
	}
	hitInRange(mojis) {
		const hits = mojis.filter((m) => Vector.distance(m.position, this.moji.position) <= Emoji.RANGE);
		hits.forEach((m) => this.moji.actions.hit(m));
		return hits;
	}
};
//#endregion
//#region src/lib/canvas/emojis/BehaviorSleepy.js
var BehaviorSleepy = class {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}
	activate() {
		this.moji.updateMass(this.moji.mass - 1);
		this.moji.behaviors["hungry"].hungryTime = 0;
		return "sleepy";
	}
	apply() {
		if (Vector.mag(this.moji.velocity) > 0) this.moji.actions.stop();
		else this.moji.actions.sleep();
		return { behavior: "sleepy" };
	}
	next() {
		if (this.moji.getEnergyRate() >= 1) return this.moji.behaviors["wander"].activate();
		return "sleepy";
	}
};
//#endregion
//#region src/lib/canvas/emojis/EmojiDNA.js
var EmojiDNA = class EmojiDNA {
	static MUTATION_RANGE = .1;
	size = 1;
	static sizeRange = [.5, 10];
	strength = 5;
	static strengthRange = [0, 10];
	birthMass = 10;
	static birthMassRange = [1, 20];
	reproductionMass = 30;
	static reproductionMassRange = [10, 50];
	hungryThreshold = .98;
	static hungryThresholdRange = [0, 1];
	sleepyThreshold = .1;
	static sleepyThresholdRange = [0, 1];
	patience = 500;
	static patienceRange = [100, 1e3];
	constructor(dna) {
		this.size = dna?.size ?? this.size;
		this.strength = dna?.strength ?? this.strength;
		this.birthMass = dna?.birthMass ?? this.birthMass;
		this.reproductionMass = dna?.reproductionMass ?? this.reproductionMass;
		this.hungryThreshold = dna?.hungryThreshold ?? this.hungryThreshold;
		this.sleepyThreshold = dna?.sleepyThreshold ?? this.sleepyThreshold;
		this.patience = dna?.patience ?? this.patience;
	}
	mutationCopy() {
		return new EmojiDNA({
			size: EmojiDNA.mutate(this.size),
			strength: EmojiDNA.mutate(this.strength),
			birthMass: EmojiDNA.mutate(this.birthMass),
			reproductionMass: EmojiDNA.mutate(this.reproductionMass),
			hungryThreshold: EmojiDNA.mutate(this.hungryThreshold),
			sleepyThreshold: EmojiDNA.mutate(this.sleepyThreshold),
			patience: EmojiDNA.mutate(this.patience)
		});
	}
	drawSelected(canvas, ctx) {
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		ctx.font = "12px Helvetica";
		ctx.fillText("DNA details", canvas.width - 10, 130);
		ctx.fillText("Size:   " + Math.round(this.size * 100) / 100, canvas.width - 10, 145);
		ctx.fillText("Strength:   " + Math.round(this.strength * 100) / 100, canvas.width - 10, 160);
		ctx.fillText("Birth Mass:   " + Math.round(this.birthMass * 100) / 100, canvas.width - 10, 175);
		ctx.fillText("Reproduction Mass:   " + Math.round(this.reproductionMass * 100) / 100, canvas.width - 10, 190);
		ctx.fillText("Hungry Threshold:   " + Math.round(this.hungryThreshold * 100) / 100, canvas.width - 10, 205);
		ctx.fillText("Sleepy Threshold:   " + Math.round(this.sleepyThreshold * 100) / 100, canvas.width - 10, 220);
		ctx.fillText("Patience:   " + Math.round(this.patience * 100) / 100, canvas.width - 10, 235);
	}
	static createRandom() {
		const dna = {
			size: Math.random() * (EmojiDNA.sizeRange[1] - EmojiDNA.sizeRange[0]) + EmojiDNA.sizeRange[0],
			strength: Math.random() * (EmojiDNA.strengthRange[1] - EmojiDNA.strengthRange[0]) + EmojiDNA.strengthRange[0],
			birthMass: Math.random() * (EmojiDNA.birthMassRange[1] - EmojiDNA.birthMassRange[0]) + EmojiDNA.birthMassRange[0],
			reproductionMass: Math.random() * (EmojiDNA.reproductionMassRange[1] - EmojiDNA.reproductionMassRange[0]) + EmojiDNA.reproductionMassRange[0],
			hungryThreshold: Math.random() * (EmojiDNA.hungryThresholdRange[1] - EmojiDNA.hungryThresholdRange[0]) + EmojiDNA.hungryThresholdRange[0],
			sleepyThreshold: Math.random() * (EmojiDNA.sleepyThresholdRange[1] - EmojiDNA.sleepyThresholdRange[0]) + EmojiDNA.sleepyThresholdRange[0],
			patience: Math.random() * (EmojiDNA.patienceRange[1] - EmojiDNA.patienceRange[0]) + EmojiDNA.patienceRange[0]
		};
		return new EmojiDNA(dna);
	}
	static mutate(geneValue) {
		return geneValue * (1 + (Math.random() * EmojiDNA.MUTATION_RANGE * 2 - EmojiDNA.MUTATION_RANGE));
	}
};
//#endregion
//#region src/lib/canvas/emojis/Emoji.js
var Emoji = class Emoji {
	static SIGHT_COEF = 400;
	static ENERGY_COEF = 1e3;
	static PASSIV_ENERGY_CONSUMPTION = -1;
	static RANGE = 20;
	static SLEEP_ENERGY_REGEN = 100;
	behaviorReturn = void 0;
	static createRandom(world) {
		const moji = new Emoji(world, Vector.random(world));
		world.things.push(moji);
	}
	constructor(world, position, dna) {
		this.is = "moji";
		this.world = world;
		this.position = position;
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.alive = true;
		this.actions = new Actions(world, this), this.behaviors = {
			wander: new BehaviorWander(world, this),
			hungry: new BehaviorHungry(world, this),
			angry: new BehaviorAngry(world, this),
			sleepy: new BehaviorSleepy(world, this)
		};
		this.dna = dna ? new EmojiDNA(dna) : EmojiDNA.createRandom();
		this.age = 0;
		this.updateMass(this.dna.birthMass);
		this.energy = this.energyMax;
		this.behavior = this.behaviors["wander"].activate();
	}
	next() {
		if (!this.alive) return;
		this.sight = this.dna.size * Emoji.SIGHT_COEF;
		this.updateMass(this.mass);
		this.age++;
		this.updateEnergy(this.energy + Emoji.PASSIV_ENERGY_CONSUMPTION);
		this.behaviorReturn = this.behaviors[this.behavior].apply();
		this.behavior = this.behaviors[this.behavior].next();
		if (this.mass >= this.dna.reproductionMass) this.reproduction();
		this.applyDrag();
		this.move();
		this.stayInWorld();
		this.acceleration = new Vector(0, 0);
		this.checkAlive();
	}
	updateMass(number) {
		this.mass = number;
		this.energyMax = this.mass * Emoji.ENERGY_COEF;
	}
	updateEnergy(number) {
		this.energy = number;
		if (this.energy < 0) this.energy = 0;
		if (this.energy > this.energyMax) this.energy = this.energyMax;
	}
	getEnergyRate() {
		return this.energy / this.energyMax;
	}
	reproduction() {
		const newMass = Math.min(this.dna.birthMass, this.mass * .9);
		this.updateMass(this.mass - newMass);
		const newEmoji = new Emoji(this.world, this.position.copy(), this.dna.mutationCopy());
		newEmoji.updateMass(newMass);
		this.world.things.push(newEmoji);
	}
	checkAlive() {
		if (this.energy <= 0) {
			this.alive = false;
			console.log("Died of lack of energy", this);
		}
		if (this.mass < this.dna.birthMass) {
			this.alive = false;
			console.log("Died of lack of mass", this);
		}
		if (!this.alive) this.world.things.push(new Food(this.world, this.position.copy(), this.mass));
	}
	move() {
		this.velocity = Vector.add(this.velocity, this.acceleration);
		this.position = Vector.add(this.position, this.velocity);
	}
	stayInWorld() {
		if (this.position.x < this.world.minX) {
			this.position.x = this.world.minX - this.position.x + this.world.minX;
			this.velocity.x *= -1;
		}
		if (this.world.maxX < this.position.x) {
			this.position.x = this.world.maxX + this.world.maxX - this.position.x;
			this.velocity.x *= -1;
		}
		if (this.position.y < this.world.minY) {
			this.position.y = this.world.minY - this.position.y + this.world.minY;
			this.velocity.y *= -1;
		}
		if (this.world.maxY < this.position.y) {
			this.position.y = this.world.maxY + this.world.maxY - this.position.y - 3;
			this.velocity.y *= -1;
		}
	}
	applyDrag() {
		const dragCoef = Vector.mag2(this.velocity) * this.dna.size * World.DRAG_COEF;
		const dragDir = Vector.normalize(Vector.opposite(this.velocity));
		const drag = Vector.mult(dragDir, dragCoef);
		let dragAcc = Vector.mult(drag, 1 / this.mass);
		dragAcc = Vector.limit(dragAcc, Vector.mag(this.velocity));
		this.acceleration = Vector.add(this.acceleration, dragAcc);
	}
	draw(ctx, options) {
		ctx.beginPath();
		ctx.font = "25px serif";
		let emoji = "😶";
		if (this.behavior == "hungry") emoji = "😬";
		if (this.behavior == "sleepy") emoji = "😴";
		if (this.behavior == "angry") emoji = "😡";
		ctx.fillText(emoji, this.position.x, this.position.y + 2);
		if (options.energy) this.drawEnergy(ctx);
		if (options.velocity) this.drawVelocity(ctx);
		if (options.sight) this.drawSight(ctx);
		if (options.target && this.behaviorReturn?.target) this.drawTarget(ctx, this.behaviorReturn.target);
		if (this.behaviorReturn?.hits) this.drawHits(ctx, this.behaviorReturn.hits);
	}
	drawEnergy(ctx) {
		ctx.strokeStyle = "green";
		ctx.lineWidth = 3;
		ctx.beginPath();
		const rate = this.energy / (this.mass * Emoji.ENERGY_COEF) * 2 * Math.PI;
		ctx.arc(this.position.x, this.position.y, 15, 0, rate);
		ctx.stroke();
	}
	drawVelocity(ctx) {
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.position.x + this.velocity.x * 10, this.position.y + this.velocity.y * 10);
		ctx.stroke();
	}
	drawSight(ctx) {
		ctx.strokeStyle = "yellow";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.sight, 0, Math.PI * 2);
		ctx.stroke();
	}
	drawTarget(ctx, target) {
		ctx.strokeStyle = "purple";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(target.position.x, target.position.y);
		ctx.stroke();
	}
	drawHits(ctx, hits) {
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2;
		hits?.forEach((target) => {
			ctx.beginPath();
			ctx.moveTo(this.position.x, this.position.y);
			ctx.lineTo(target.position.x, target.position.y);
			ctx.stroke();
		});
	}
	drawSelected(canvas, ctx) {
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		ctx.font = "12px Helvetica";
		ctx.fillText("Emoji", canvas.width - 10, 10);
		ctx.fillText("Age: " + this.age, canvas.width - 10, 25);
		ctx.fillText("Mass: " + Math.round(this.mass * 10) / 10, canvas.width - 10, 40);
		ctx.fillText("Energy: " + Math.round(this.energy) + " / " + Math.round(this.energyMax) + " = " + Math.round(100 * this.getEnergyRate()) + "%", canvas.width - 10, 55);
		ctx.fillText("Behavior: " + this.behavior, canvas.width - 10, 70);
		ctx.fillText("Speed magnitude: " + Math.round(Vector.mag(this.velocity)), canvas.width - 10, 85);
		ctx.fillText("Hungry time: " + this.behaviors["hungry"].hungryTime, canvas.width - 10, 100);
		this.dna.drawSelected(canvas, ctx);
		this.drawEnergy(ctx);
		this.drawVelocity(ctx);
		this.drawSight(ctx);
		if (this.behaviorReturn?.target) this.drawTarget(ctx, this.behaviorReturn.target);
		if (this.behaviorReturn?.hits) this.drawHits(ctx, this.behaviorReturn.hits);
	}
};
//#endregion
//#region src/lib/canvas/emojis/World.js
var World = class {
	static DRAG_COEF = .1;
	constructor(width, height) {
		this.minX = 0;
		this.maxX = width;
		this.minY = 0;
		this.maxY = height;
		this.things = [];
		this.age = 0;
		for (let i = 0; i < 50; i++) Emoji.createRandom(this);
	}
	next() {
		this.things = this.things.filter((t) => t.alive);
		this.age++;
		this.things.forEach((t) => t.next());
		Food.foodGeneration(this);
	}
	draw(ctx, options) {
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.things.forEach((t) => t.draw(ctx, options));
	}
	getThings(position, radius) {
		return this.things.filter((t) => Vector.distance(t.position, position) <= radius);
	}
};
//#endregion
//#region src/routes/evolution-simulations/emojis/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let pauseFirstTurn = false;
		let frameSpeed;
		const start = () => {
			const wait = new Promise((resolve) => setTimeout(resolve, frameSpeed));
			if (pauseFirstTurn) pauseFirstTurn = false;
			wait.then(next);
		};
		const next = () => window.requestAnimationFrame(start);
		$$renderer.push(`<div class="grid gap-8 px-50 py-10"><h1 class="h1">Emojis</h1></div> <canvas class="svelte-debbcf"></canvas> <div class="grid gap-8 px-50 py-10"><h3 class="h3">Information</h3> <p>This is a yet another simulation of the <a href="https://wikipedia.org/wiki/Evolution">evolution by natural selection</a>. It involves a world with rules (explained here), and actors (Emojis and Food) evolving together.</p> <p>Be ware! Running this simulation can become CPU heavy in some cases, make sure you do not need to spare your battery before running it.</p> <h4 class="h4">1. Shortcuts</h4> <p>To ease controls, shortcuts have been added to the simulation:</p> <ul><li><code>space</code> : Pause / resume the simulation</li> <li><code>1</code> : Toggle Emoji's energy display</li> <li><code>2</code> : Toggle Emoji's velocity display</li> <li><code>3</code> : Toggle Emoji's sight</li> <li><code>4</code> : Toggle Emoji's target</li></ul> <p>In addition, user can click on the map to select a Emoji or a Food and get live details.</p> <h4 class="h4">2. World</h4> <h5 class="h5">Measurement units:</h5> <ul><li>The World is made of a rectangle of 1900 by 800 length unit. For simplicity, it corresponds to pixel on your screen.</li> <li>Time is represented by the age of the world (visible in the top left corner). Each unit of time is a frame.</li></ul> <h5 class="h5">Processing</h5> <p>On each unit of time is calculated the state of the next one. Since the unit of time is small enough, everything looks like smooth movements.</p> <p>On death, entities (food or Emojis) are removed from the world.</p> <h5 class="h5">Initialization</h5> <p>The first core principle of natural selection simulation is the population <strong>Initialization</strong>. Here population is randomly created at start (position and attributes) and let to live.</p> <h4 class="h4">3. Food</h4> <p>Food appear randomly in the world according to the creation rate setting. At each unit of time (i.e. frame) there is this rate of chance that a food pops somewhere.</p> <p>Food always have a mass of 2 units of mass.</p> <h4 class="h4">4. Emoji</h4> <h5 class="h5">Actions</h5> <p>Emoji have a limited set of possible actions: they can wander, move towards or away from a target, stop, search for something, eat, sleep, and hit another moji.</p> <h5 class="h5">Behaviors</h5> <p>Behavior tell how moji does act, depending on their state and what they see around.</p> <h5 class="h5">DNA</h5> <p>Each moji has its own DNA, describing how and when they have the previous mentioned behaviors. These parameters are actually those who are going to be selected through natural selection: if a Emoji is well adapted to the world (i.e. has a "good" DNA), he will most propably survive. On the contrary, if he has a "bad" DNA, he will die. This is the second principle of evolution: <strong>Selection</strong>.</p> <h5 class="h5">Reproduction</h5> <p>Once the selection is made, and the Emojis validates conditions (i.e. have a sufficient mass to reproduce), Emojis can reproduce themself (just like cells would do in our body), and duplicate their DNA. It is the third evolution principle: <strong>Reproduction</strong>.</p> <h5 class="h5">Mutation</h5> <p>On reproduction, each DNA gene is allowed to mutate. There is a lot of possibility of applying mutation, but each gene will be updated by a small random amount (depending on the settings). It is the fourths and last principle of natural seleciton: <strong>Mutation</strong>.</p></div>`);
	});
}
//#endregion
export { _page as default };
