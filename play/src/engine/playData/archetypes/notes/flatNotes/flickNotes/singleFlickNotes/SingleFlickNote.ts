import { windows } from '../../../../../../../../../shared/src/engine/data/windows.js'
import { minFlickVR } from '../../../../../flick.js'
import {
    claimStart,
    disallowEmpty,
    disallowEnd,
    getClaimedStart,
} from '../../../../InputManager.js'
import { FlickNote } from '../FlickNote.js'

export abstract class SingleFlickNote extends FlickNote {
    activated = this.entityMemory(Boolean)

    updateSequential() {
        if (time.now < this.inputTime.min) return

        if (this.activated) return

        claimStart(this.info.index, this.targetTime, this.hitbox, this.fullHitbox)
    }

    touch() {
        if (time.now < this.inputTime.min) return

        if (!this.activated) {
            const index = getClaimedStart(this.info.index)
            if (index === -1) return

            const touch = touches.get(index)

            disallowEmpty(touch)
            disallowEnd(touch, this.targetTime + windows.slideEndLockoutDuration)

            this.activated = true
        }

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (touch.startTime < this.inputTime.min) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }
}
