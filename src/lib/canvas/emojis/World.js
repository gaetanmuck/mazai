import { Food } from './Food';
import { Emoji } from './Emoji';
import { Vector } from './Vector';

export class World {
	static DRAG_COEF = 0.1; // Equivalent to density * 1/2 * Drag coef

	constructor(width, height) {
		this.minX = 0;
		this.maxX = width;
		this.minY = 0;
		this.maxY = height;

		this.things = [];
		this.age = 0;

		// initial population of Emojis
		for (let i = 0; i < 50; i++) {
			Emoji.createRandom(this);
		}
	}

	next() {
		// Filter dead first, so that, at the end of the turn, simulation can extract data from dead
		this.things = this.things.filter((t) => t.alive);

		this.age++;

		this.things.forEach((t) => t.next());

		Food.foodGeneration(this);

		// console.log(this.things)
	}

	draw(ctx, options) {
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		this.things.forEach((t) => t.draw(ctx, options));
	}

	getThings(position, radius) {
		return this.things.filter((t) => Vector.distance(t.position, position) <= radius);
	}
}
