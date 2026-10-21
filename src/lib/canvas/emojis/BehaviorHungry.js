import { Emoji } from './Emoji';
import { Vector } from './Vector';
import { World } from './World';

export class BehaviorHungry {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
		this.hungryTime = 0;
	}

	activate() {
		return 'hungry';
	}

	apply() {
		// Get the target
		let foods = this.world.getThings(this.moji.position, this.moji.sight);
		foods = foods.filter((t) => t.is == 'food' && t.alive);
		foods = foods.sort((food1, food2) => Vector.distance(food1.position, this.moji.position) - Vector.distance(food2.position, this.moji.position));

		if (foods.length > 0) {
			const target = foods[0];

			// If in range to eat
			if (target && Vector.distance(this.moji.position, target.position) <= Emoji.RANGE) {
				this.moji.actions.eat(target);
				return { behavior: 'hungry', target };
			}

			// Not in range: move towards food
			this.moji.actions.moveTowards(target.position);
			this.hungryTime++;

			return { behavior: 'hungry', target };
		}

		// No food is in sight
		this.moji.actions.search();
		this.hungryTime++;
		return { behavior: 'hungry' };
	}

	next() {
		// Get angry if patience is overflowed
		if (this.hungryTime >= this.moji.dna.patience) return this.moji.behaviors['angry'].activate();

		// Go sleep if tired
		if (this.moji.getEnergyRate() <= this.moji.dna.sleepyThreshold) return this.moji.behaviors['sleepy'].activate();

		return 'hungry';
	}
}
