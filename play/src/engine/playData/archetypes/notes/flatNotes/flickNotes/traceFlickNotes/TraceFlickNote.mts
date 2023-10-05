import { options } from '../../../../../../configuration/options.mjs'
import { minFlickVR } from '../../../../../flick.mjs'
import { note } from '../../../../../note.mjs'
import { scaledScreen } from '../../../../../scaledScreen.mjs'
import { getZ, layer } from '../../../../../skin.mjs'
import { disallowEmpty } from '../../../../InputManager.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class TraceFlickNote extends FlickNote {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        diamond: SkinSprite
        fallback: SkinSprite
    }

    diamondLayout = this.entityMemory(Rect)

    diamondZ = this.entityMemory(Number)

    initialize() {
        super.initialize()

        if (!this.useFallbackSprites) {
            const w = note.h / scaledScreen.wToH

            new Rect({
                l: this.data.lane - w,
                r: this.data.lane + w,
                b: 1 + note.h,
                t: 1 - note.h,
            }).copyTo(this.diamondLayout)

            this.diamondZ = getZ(layer.note.tick, this.targetTime, this.data.lane)
        }
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }

    render() {
        super.render()

        if (!this.useFallbackSprites) {
            this.sprites.diamond.draw(this.diamondLayout.mul(this.y), this.diamondZ, 1)
        }
    }

    complete(touch: Touch) {
        disallowEmpty(touch)

        const hitTime = Math.max(touch.time, this.targetTime)

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(time.now)

        this.despawn = true
    }

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists ||
            !this.sprites.middle.exists ||
            !this.sprites.right.exists ||
            !this.sprites.diamond.exists
        )
    }
}
