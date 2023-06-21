import { options } from '../../../../../../configuration/options.mjs'
import { canStart, disallowEmpty, disallowEnd, disallowStart } from '../../../../InputManager.mjs'
import { minFlickVR } from '../../../../constants.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class SingleFlickNote extends FlickNote {
    activated = this.entityMemory(Boolean)

    updateSequential() {
        this.handleTouches(this.hitbox)
    }

    touch() {
        this.handleTouches(this.fullHitbox)

        if (!this.activated) return

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }

    handleTouches(hitbox: Rect) {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (!this.activated) {
            for (const touch of touches) {
                if (!touch.started) continue
                if (!hitbox.contains(touch.position)) continue
                if (!canStart(touch)) continue

                disallowEmpty(touch)
                disallowStart(touch)
                disallowEnd(touch, this.inputTime.max)

                this.activated = true
                break
            }
        }
    }
}
