import { options } from '../../../../../configuration/options.mjs'
import { claimEnd, getClaimedEnd } from '../../../InputManager.mjs'
import { archetypes } from '../../../index.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class SlideEndNote extends FlatNote {
    leniency = 1

    slideEndData = this.defineData({
        slideRef: { name: 'slide', type: Number },
    })

    updateSequential() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (this.startInfo.state !== EntityState.Despawned) return

        claimEnd(
            this.info.index,
            this.targetTime,
            this.hitbox,
            this.fullHitbox,
            this.startSharedMemory.lastActiveTime === time.now ? this.targetTime : 99999,
        )
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (this.startInfo.state !== EntityState.Despawned) return

        const index = getClaimedEnd(this.info.index)
        if (index === -1) return

        this.complete(touches.get(index))
    }

    get slideData() {
        return archetypes.NormalSlideConnector.data.get(this.slideEndData.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideData.startRef)
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
