import { Vector } from "./Vector"

export class BehaviorWander {

    constructor(world, moji) {
        this.world = world
        this.moji = moji
    }

    activate() {
        return 'wander'
    }

    apply() {
        this.moji.actions.wander();

        return {behavior: 'wander'}
    }

    next() {
        // If energy is dropping, get hungry
        if (this.moji.getEnergyRate() <= this.moji.dna.hungryThreshold) return this.moji.behaviors['hungry'].activate()

        return 'wander'
    }
}