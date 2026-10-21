import { Vector } from './Vector';
import { BehaviorHungry } from './BehaviorHungry';
import { Emoji } from './Emoji';

export class BehaviorAngry {
	constructor(world, moji) {
		this.world = world;
		this.moji = moji;
	}

	activate() {
		return 'angry';
	}

	apply() {
		// Get everything in sight
		let things = this.world.getThings(this.moji.position, this.moji.sight);
		things = things.filter((t) => t.alive && t != this.moji);
		things = things.sort((thing1, thing2) => Vector.distance(thing1.position, this.moji.position) - Vector.distance(thing2.position, this.moji.position));

		// if nothing is in sight, look for something
		if (things.length == 0) {
			this.moji.actions.search();
			return;
		}

		// Take the closest thing in sight
		let target = things[0];

		// If the closest thing is a moji, get angry with him and try to hit it
		if (target.is == 'moji') {
			this.moji.behaviors['hungry'].hungryTime++;
			let hits = [];

			// Move towards the target, only if it is not in range
			if (Vector.distance(this.moji.position, target.position) > Emoji.RANGE) {
				this.moji.actions.moveTowards(target.position);
			} else {
				hits = [target];
				this.moji.actions.hit(target);
			}

			return { behavior: 'angry', target, hits };
		}

		// If the closest thing is a food, try to catch it
		if (target.is == 'food') {
			// If Food is in range
			if (Vector.distance(this.moji.position, target.position) <= Emoji.RANGE) {
				this.moji.actions.eat(target);
				return { behavior: 'angry', target };
			}

			// Move towards the food if it is not in range
			this.moji.actions.moveTowards(target.position);
			this.moji.behaviors['hungry'].hungryTime++;
			return { behavior: 'angry', target };
		}

		// // Look at what is in sight
		// let mojis = things.filter(t => t.is == 'moji')
		// let foods = things.filter(t => t.is == 'food')

		// // When food is in sight, has prio
		// if(foods.length > 0) {
		//     const target = foods[0]

		//     // If Food is in range
		//     if (Vector.distance(this.moji.position, target.position) <= Emoji.RANGE) {
		//         this.moji.actions.eat(target)
		//         return {behavior: 'angry', target}
		//     }

		//     // Food is not in range: move towards the food, hit everyone in range
		//     this.moji.actions.moveTowards(target.position)
		//     this.moji.behaviors['hungry'].hungryTime++
		//     const hits = this.hitInRange(mojis)

		//     return {behavior:'angry', target, hits}
		// }

		// // When food is not in sight, but mojis are in sight, go hit them
		// if (mojis.length > 0) {
		//     const target = mojis[0]

		//     // Move towards the target, only if it is not in range
		//     if (Vector.distance(this.moji.position, target.position) > Emoji.RANGE)
		//         this.moji.actions.moveTowards(target.position)
		//     this.moji.behaviors['hungry'].hungryTime++

		//     const hits = this.hitInRange(mojis)

		//     return {behavior:'angry', target, hits}
		// }

		// // When no one/things is in range
		// this.moji.actions.search()
		// this.moji.behaviors['hungry'].hungryTime++
		// return {behavior:'angry'}
	}

	next() {
		// Go sleep if tired
		if (this.moji.getEnergyRate() <= this.moji.dna.sleepyThreshold) return this.moji.behaviors['sleepy'].activate();

		// Return to hungry if not angry anymore
		if (this.moji.behaviors['hungry'].hungryTime < this.moji.dna.patience) return this.moji.behaviors['hungry'].activate();

		return 'angry';
	}

	hitInRange(mojis) {
		const hits = mojis.filter((m) => Vector.distance(m.position, this.moji.position) <= Emoji.RANGE);
		hits.forEach((m) => this.moji.actions.hit(m));

		return hits;
	}
}
