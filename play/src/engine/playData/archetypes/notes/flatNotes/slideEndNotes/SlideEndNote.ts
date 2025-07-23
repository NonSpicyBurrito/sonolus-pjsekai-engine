import { claimEnd, getClaimedEnd } from '../../../InputManager.js'
import { archetypes } from '../../../index.js'
import { FlatNote } from '../FlatNote.js'

export abstract class SlideEndNote extends FlatNote {
    leniency = 1

    slideEndImport = this.defineImport({
        slideRef: { name: 'slide', type: Number },
    })

    updateSequential() {
        if (time.now < this.inputTime.min) return

        if (this.startInfo.state === EntityState.Active) return

        claimEnd(
            this.info.index,
            this.targetTime,
            this.hitbox,
            this.fullHitbox,
            this.startSharedMemory.lastActiveTime === time.now ? this.targetTime : 99999,
        )
    }

    touch() {
        if (time.now < this.inputTime.min) return

        if (this.startInfo.state === EntityState.Active) return

        const index = getClaimedEnd(this.info.index)
        if (index === -1) return

        this.complete(touches.get(index))
    }

    get slideImport() {
        return archetypes.NormalSlideConnector.import.get(this.slideEndImport.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideImport.startRef)
    }

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideImport.startRef)
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
