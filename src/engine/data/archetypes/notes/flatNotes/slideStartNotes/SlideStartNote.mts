import { options } from '../../../../../configuration/options.mjs'
import { canStart, disallowEmpty, disallowStart } from '../../../InputManager.mjs'
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

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.fullHitbox.contains(touch.position)) continue
            if (!canStart(touch)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        disallowEmpty(touch)
        disallowStart(touch)

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
