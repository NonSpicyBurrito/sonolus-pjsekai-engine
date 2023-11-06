import { note } from '../../../../note.mjs'
import { scaledScreen } from '../../../../scaledScreen.mjs'
import { getZ, layer } from '../../../../skin.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class TraceNote extends FlatNote {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        diamond: SkinSprite
        fallback: SkinSprite
    }

    diamondLayout = this.entityMemory(Rect)

    diamondZ = this.entityMemory(Number)

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists ||
            !this.sprites.middle.exists ||
            !this.sprites.right.exists ||
            !this.sprites.diamond.exists
        )
    }

    globalInitialize() {
        super.globalInitialize()

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

    render() {
        super.render()

        if (!this.useFallbackSprites) {
            this.sprites.diamond.draw(this.diamondLayout.mul(this.y), this.diamondZ, 1)
        }
    }
}
