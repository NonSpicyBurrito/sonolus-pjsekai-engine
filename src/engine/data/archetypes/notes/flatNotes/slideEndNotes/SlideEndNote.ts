import { options } from '../../../../../configuration/options.js'
import { canEnd } from '../../../InputManager.js'
import { FlatNote } from '../FlatNote.js'

export abstract class SlideEndNote extends FlatNote {
    leniency = 1

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.ended) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (!canEnd(touch, this.inputTime.min)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.time, this.targetTime, this.window)
        this.result.accuracy = touch.time - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.time)

        this.despawn = true
    }
}
