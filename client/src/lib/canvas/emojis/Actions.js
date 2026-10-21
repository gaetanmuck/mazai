import { Vector } from './Vector';
import { Emoji } from './Emoji';

export class Actions {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}

	wander() {
		// Get the force
		const x = Math.random() * this.moji.dna.strength - this.moji.dna.strength / 2;
		const y = Math.random() * this.moji.dna.strength - this.moji.dna.strength / 2;
		const force = new Vector(x, y);

		// Consume energy
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));

		// Apply the force
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}

	moveTowards(aim) {
		// Get the force
		const direction = Vector.normalize(Vector.sub(aim, this.moji.position));
		const force = Vector.mult(direction, this.moji.dna.strength);

		// Consume energy
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));

		// Apply the force
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}

	moveAwayFrom(aim) {
		// Get the force (opposite of direction)
		const direction = Vector.normalize(Vector.sub(aim, this.moji.position));
		const force = Vector.mult(direction, -this.moji.dna.strength);

		// Consume energy
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));

		// Apply the force
		const acc = Vector.mult(force, 1 / this.moji.mass);
		this.moji.acceleration = Vector.add(this.moji.acceleration, acc);
	}

	stop() {
		// Determine the brake acceleration
		const direction = Vector.normalize(Vector.opposite(this.moji.velocity));
		const force = Vector.mult(direction, this.moji.dna.strength);

		// Consume energy
		this.moji.updateEnergy(this.moji.energy - Vector.mag(force));

		// Apply the force
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
		this.moji.behaviors['hungry'].hungryTime = 0;
	}

	sleep() {
		if (this.moji.getEnergyRate() < 1) this.moji.updateEnergy(this.moji.energy + Emoji.SLEEP_ENERGY_REGEN);
	}

	hit(target) {
		this.moji.updateEnergy(this.moji.energy - this.moji.dna.strength);
		target.updateEnergy(target.energy - this.moji.dna.strength * this.moji.dna.strength * this.moji.dna.strength);
		target.checkAlive();
	}
}
