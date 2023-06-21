import { options } from '../../../../../../configuration/options.mjs'
import { canStart, disallowEmpty, disallowEnd, disallowStart } from '../../../../InputManager.mjs'
import { minFlickVR } from '../../../../constants.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class SingleFlickNote extends FlickNote {
    activated = this.entityMemory(Boolean)

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (!this.activated) {
            for (const touch of touches) {
                if (!touch.started) continue
                if (!this.fullHitbox.contains(touch.position)) continue
                if (!canStart(touch)) continue

                disallowEmpty(touch)
                disallowStart(touch)
                disallowEnd(touch, this.inputTime.max)

                this.activated = true
                break
            }
        }

        if (this.activated) {
            for (const touch of touches) {
                if (touch.vr < minFlickVR) continue
                if (!this.fullHitbox.contains(touch.lastPosition)) continue

                this.complete(touch)
                return
            }
        }
    }
}
