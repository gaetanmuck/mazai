import { World } from './World';

export class EmojiDNA {
	static MUTATION_RANGE = 0.1; // How big are the mutation: if MUTATION_RANGE == 0.1, mutation can go between 0.9 and 1.1 the initial value

	// The size of a Emoji, drag and sight depends on it
	size = 1;
	static sizeRange = [0.5, 10];

	// The strength of a Emoji, used for moving and hitting
	strength = 5;
	static strengthRange = [0, 10];

	// What is the mass on birth (also take this mass from parent)
	birthMass = 10;
	static birthMassRange = [1, 20];

	// How much mass a moji has to get for reproduction
	reproductionMass = 30;
	static reproductionMassRange = [10, 50];

	// At what energy / maxEnergy threshold a moji is getting hungry
	hungryThreshold = 0.98;
	static hungryThresholdRange = [0, 1];

	// At what energy / maxEnergy threshold a moji is going to sleep
	sleepyThreshold = 0.1;
	static sleepyThresholdRange = [0, 1];

	// How much frame a moji gets Angry if he does not get food
	patience = 500;
	static patienceRange = [100, 1000];

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
		// display information about selection
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		ctx.font = '12px Helvetica';
		ctx.fillText('DNA details', canvas.width - 10, 130);
		ctx.fillText('Size:   ' + Math.round(this.size * 100) / 100, canvas.width - 10, 145);
		ctx.fillText('Strength:   ' + Math.round(this.strength * 100) / 100, canvas.width - 10, 160);
		ctx.fillText('Birth Mass:   ' + Math.round(this.birthMass * 100) / 100, canvas.width - 10, 175);
		ctx.fillText('Reproduction Mass:   ' + Math.round(this.reproductionMass * 100) / 100, canvas.width - 10, 190);
		ctx.fillText('Hungry Threshold:   ' + Math.round(this.hungryThreshold * 100) / 100, canvas.width - 10, 205);
		ctx.fillText('Sleepy Threshold:   ' + Math.round(this.sleepyThreshold * 100) / 100, canvas.width - 10, 220);
		ctx.fillText('Patience:   ' + Math.round(this.patience * 100) / 100, canvas.width - 10, 235);
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
		const rnd = Math.random() * EmojiDNA.MUTATION_RANGE * 2 - EmojiDNA.MUTATION_RANGE;
		return geneValue * (1 + rnd);
	}
}
