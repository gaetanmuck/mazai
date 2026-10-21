import { Actions } from './Actions';
import { BehaviorWander } from './BehaviorWander';
import { BehaviorHungry } from './BehaviorHungry';
import { BehaviorAngry } from './BehaviorAngry';
import { BehaviorSleepy } from './BehaviorSleepy';
import { Vector } from './Vector';
import { World } from './World';
import { EmojiDNA } from './EmojiDNA';
import { Food } from './Food';

export class Emoji {
	static SIGHT_COEF = 400; // The distance of sight given by 1 size
	static ENERGY_COEF = 1000; // How much energy gives 1 mass
	static PASSIV_ENERGY_CONSUMPTION = -1; // What energy is consumed each frame, whatever the moji does
	static RANGE = 20; // How far can a Emoji do things

	static SLEEP_ENERGY_REGEN = 100; // How much energy receives a moji each frame when sleeping

	behaviorReturn = undefined;

	static createRandom(world) {
		const moji = new Emoji(world, Vector.random(world));
		world.things.push(moji);
	}

	constructor(world, position, dna) {
		// General params
		this.is = 'moji';
		this.world = world;
		this.position = position;
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.alive = true;
		((this.actions = new Actions(world, this)),
			(this.behaviors = {
				wander: new BehaviorWander(world, this),
				hungry: new BehaviorHungry(world, this),
				angry: new BehaviorAngry(world, this),
				sleepy: new BehaviorSleepy(world, this)
			}));

		// On birth
		this.dna = dna ? new EmojiDNA(dna) : EmojiDNA.createRandom();
		this.age = 0;
		this.updateMass(this.dna.birthMass);
		this.energy = this.energyMax;
		this.behavior = this.behaviors['wander'].activate();
	}

	next() {
		if (!this.alive) return;

		// Environment updates
		this.sight = this.dna.size * Emoji.SIGHT_COEF;
		this.updateMass(this.mass);

		// Evolving params
		this.age++;
		this.updateEnergy(this.energy + Emoji.PASSIV_ENERGY_CONSUMPTION);

		// Behave
		this.behaviorReturn = this.behaviors[this.behavior].apply();
		this.behavior = this.behaviors[this.behavior].next();

		// Reproduction
		if (this.mass >= this.dna.reproductionMass) this.reproduction();

		// Physics
		this.applyDrag();
		this.move();
		this.stayInWorld();
		this.acceleration = new Vector(0, 0);

		// Finalize
		this.checkAlive();
	}

	// Setter for mass
	updateMass(number) {
		this.mass = number;
		this.energyMax = this.mass * Emoji.ENERGY_COEF;
	}

	// Setter for energy
	updateEnergy(number) {
		this.energy = number;
		if (this.energy < 0) this.energy = 0;
		if (this.energy > this.energyMax) this.energy = this.energyMax;
	}

	getEnergyRate() {
		return this.energy / this.energyMax;
	}

	reproduction() {
		// The mass of the new Emoji can only take 90% of parent at most

		const newMass = Math.min(this.dna.birthMass, this.mass * 0.9);
		this.updateMass(this.mass - newMass);

		const newEmoji = new Emoji(this.world, this.position.copy(), this.dna.mutationCopy());
		newEmoji.updateMass(newMass);
		this.world.things.push(newEmoji);
	}

	checkAlive() {
		if (this.energy <= 0) {
			this.alive = false;
			console.log('Died of lack of energy', this);
		}

		if (this.mass < this.dna.birthMass) {
			this.alive = false;
			console.log('Died of lack of mass', this);
		}

		if (!this.alive) {
			this.world.things.push(new Food(this.world, this.position.copy(), this.mass));
		}
	}

	///////////////////////////////////////////////////
	///////////////////   PHYSICS   ///////////////////
	///////////////////////////////////////////////////

	move() {
		this.velocity = Vector.add(this.velocity, this.acceleration);
		this.position = Vector.add(this.position, this.velocity);
	}

	stayInWorld() {
		// Bounce
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

	////////////////////////////////////////////////////
	///////////////////   DRAWINGS   ///////////////////
	////////////////////////////////////////////////////

	draw(ctx, options) {
		ctx.beginPath();
		ctx.font = '25px serif';

		let emoji = '😶';
		if (this.behavior == 'hungry') emoji = '😬';
		if (this.behavior == 'sleepy') emoji = '😴';
		if (this.behavior == 'angry') emoji = '😡';
		ctx.fillText(emoji, this.position.x, this.position.y + 2);

		if (options.energy) this.drawEnergy(ctx);
		if (options.velocity) this.drawVelocity(ctx);
		if (options.sight) this.drawSight(ctx);

		if (options.target && this.behaviorReturn?.target) this.drawTarget(ctx, this.behaviorReturn.target);
		if (this.behaviorReturn?.hits) this.drawHits(ctx, this.behaviorReturn.hits);
	}

	drawEnergy(ctx) {
		ctx.strokeStyle = 'green';
		ctx.lineWidth = 3;
		ctx.beginPath();
		const rate = (this.energy / (this.mass * Emoji.ENERGY_COEF)) * 2 * Math.PI;
		ctx.arc(this.position.x, this.position.y, 15, 0, rate);
		ctx.stroke();
	}

	drawVelocity(ctx) {
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.position.x + this.velocity.x * 10, this.position.y + this.velocity.y * 10);
		ctx.stroke();
	}

	drawSight(ctx) {
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.sight, 0, Math.PI * 2);
		ctx.stroke();
	}

	drawTarget(ctx, target) {
		ctx.strokeStyle = 'purple';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(target.position.x, target.position.y);
		ctx.stroke();
	}

	drawHits(ctx, hits) {
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		hits?.forEach((target) => {
			ctx.beginPath();
			ctx.moveTo(this.position.x, this.position.y);
			ctx.lineTo(target.position.x, target.position.y);
			ctx.stroke();
		});
	}

	drawSelected(canvas, ctx) {
		// Make the selection visible
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2);
		ctx.stroke();

		// display information about selection
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		ctx.font = '12px Helvetica';
		ctx.fillText('Emoji', canvas.width - 10, 10);
		ctx.fillText('Age: ' + this.age, canvas.width - 10, 25);
		ctx.fillText('Mass: ' + Math.round(this.mass * 10) / 10, canvas.width - 10, 40);
		ctx.fillText('Energy: ' + Math.round(this.energy) + ' / ' + Math.round(this.energyMax) + ' = ' + Math.round(100 * this.getEnergyRate()) + '%', canvas.width - 10, 55);
		ctx.fillText('Behavior: ' + this.behavior, canvas.width - 10, 70);
		ctx.fillText('Speed magnitude: ' + Math.round(Vector.mag(this.velocity)), canvas.width - 10, 85);
		ctx.fillText('Hungry time: ' + this.behaviors['hungry'].hungryTime, canvas.width - 10, 100);

		this.dna.drawSelected(canvas, ctx);

		this.drawEnergy(ctx);
		this.drawVelocity(ctx);
		this.drawSight(ctx);
		if (this.behaviorReturn?.target) this.drawTarget(ctx, this.behaviorReturn.target);
		if (this.behaviorReturn?.hits) this.drawHits(ctx, this.behaviorReturn.hits);
	}
}
