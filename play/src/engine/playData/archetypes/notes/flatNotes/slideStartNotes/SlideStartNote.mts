import { options } from '../../../../../configuration/options.mjs'
import { claimStart, disallowEmpty, getClaimedStart } from '../../../InputManager.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class SlideStartNote extends FlatNote {
    leniency = 1

    sharedMemory = this.defineSharedMemory({
        lastActiveTime: Number,
    })

    preprocess() {
        super.preprocess()

        this.sharedMemory.lastActiveTime = -1000
    }

    updateSequential() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        claimStart(this.info.index, this.targetTime, this.hitbox, this.fullHitbox)
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        const index = getClaimedStart(this.info.index)
        if (index === -1) return

        this.complete(touches.get(index))
    }

    complete(touch: Touch) {
        disallowEmpty(touch)

        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.startTime)

        this.despawn = true
    }

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}
