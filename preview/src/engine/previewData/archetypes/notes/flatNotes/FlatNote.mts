import { note } from '../../../note.mjs'
import { panel } from '../../../panel.mjs'
import { getZ, layer } from '../../../skin.mjs'
import { Note } from '../Note.mjs'

export abstract class FlatNote extends Note {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        fallback: SkinSprite
    }

    render() {
        const time = bpmChanges.at(this.data.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.note.body, time, this.data.lane)

        const l = this.data.lane - this.data.size
        const r = this.data.lane + this.data.size
        const b = -note.h
        const t = note.h

        if (this.useFallbackSprites) {
            this.sprites.fallback.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25

            this.sprites.left.draw(new Rect({ l, r: ml, b, t }).add(pos), z, 1)
            this.sprites.middle.draw(new Rect({ l: ml, r: mr, b, t }).add(pos), z, 1)
            this.sprites.right.draw(new Rect({ l: mr, r, b, t }).add(pos), z, 1)
        }

        return { time, pos }
    }

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists || !this.sprites.middle.exists || !this.sprites.right.exists
        )
    }
}
