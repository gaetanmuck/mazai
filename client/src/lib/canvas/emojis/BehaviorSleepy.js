import { Vector } from "./Vector"
import { World } from "./World"

export class BehaviorSleepy {

    constructor(world, moji) {
        this.world = world
        this.moji = moji
    }

    activate() {
        this.moji.updateMass(this.moji.mass - 1)
        this.moji.behaviors['hungry'].hungryTime = 0
        return 'sleepy';
    }

    apply() {

        // The moji needs to stop before falling asleep
        if (Vector.mag(this.moji.velocity) > 0) this.moji.actions.stop()
        else this.moji.actions.sleep()
        
        return {behavior: 'sleepy'}
    }

    next() {
        // If sleep is done, go wander
        if(this.moji.getEnergyRate() >= 1) return this.moji.behaviors['wander'].activate()

        return 'sleepy'
    }

}