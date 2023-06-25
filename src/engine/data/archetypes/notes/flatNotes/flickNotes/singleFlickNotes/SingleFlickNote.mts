import { options } from '../../../../../../configuration/options.mjs'
import {
    claimStart,
    disallowEmpty,
    disallowEnd,
    getClaimedStart,
    inSlide,
} from '../../../../InputManager.mjs'
import { minFlickVR } from '../../../../constants.mjs'
import { windows } from '../../../../windows.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class SingleFlickNote extends FlickNote {
    activated = this.entityMemory(Boolean)

    updateSequential() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (this.activated) return

        claimStart(this.info.index, this.targetTime, this.hitbox, this.fullHitbox)
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (!this.activated) {
            const index = getClaimedStart(this.info.index)
            if (index === -1) return

            const touch = touches.get(index)

            disallowEmpty(touch)
            disallowEnd(touch, this.targetTime + windows.slideEndLockoutDuration(inSlide(touch)))

            this.activated = true
        }

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }
}
