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

    render() {
        const { time, pos } = super.render()

        const z = getZ(layer.note.tick, time, this.data.lane)

        const b = -note.h
        const t = note.h

        if (!this.useFallbackSprites) {
            const w = note.h / scaledScreen.wToH

            const l = this.data.lane - w
            const r = this.data.lane + w

            this.sprites.diamond.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
        }

        return { time, pos }
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
