import { options } from '../../../../../configuration/options.js'
import { canStart, disallowEmpty, disallowEnd, disallowStart } from '../../../InputManager.js'
import { FlatNote } from '../FlatNote.js'

export abstract class TapNote extends FlatNote {
    leniency = 0.75

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (!canStart(touch)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        disallowEmpty(touch)
        disallowStart(touch)
        disallowEnd(touch, this.inputTime.max)

        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.startTime)

        this.despawn = true
    }
}
