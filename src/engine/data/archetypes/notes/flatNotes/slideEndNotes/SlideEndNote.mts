import { options } from '../../../../../configuration/options.mjs'
import { archetypes } from '../../../index.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class SlideEndNote extends FlatNote {
    leniency = 1

    slideEndData = this.defineData({
        slideRef: { name: 'slide', type: Number },
    })

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (this.startSharedMemory.lastActiveTime === time.now) return

        for (const touch of touches) {
            if (!touch.ended) continue
            if (!this.fullHitbox.contains(touch.position)) continue

            this.complete(touch)
            return
        }
    }

    get slideData() {
        return archetypes.NormalSlideConnector.data.get(this.slideEndData.slideRef)
    }

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideData.startRef)
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.time, this.targetTime, this.windows)
        this.result.accuracy = touch.time - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.time)

        this.despawn = true
    }
}
