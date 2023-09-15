import { FlickDirection } from '../../../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { getArrowSpriteId } from '../../../../../../../../shared/src/engine/data/arrowSprites.mjs'
import { options } from '../../../../../configuration/options.mjs'
import { scaledScreen } from '../../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../../skin.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class FlickNote extends FlatNote {
    abstract arrowSprites: {
        up: SkinSprite[]
        left: SkinSprite[]
        fallback: SkinSprite
    }

    flickData = this.defineData({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickData.direction *= -1
    }

    render() {
        const { time, pos } = super.render()

        const z = getZ(layer.note.arrow, time, this.data.lane)

        const arrowSpriteId = getArrowSpriteId(
            this.arrowSprites,
            this.data.size,
            this.flickData.direction,
        )

        if (skin.sprites.exists(arrowSpriteId)) {
            const w = (Math.clamp(this.data.size, 0, 3) * (-this.flickData.direction || 1)) / 2

            skin.sprites.draw(
                arrowSpriteId,
                new Rect({
                    l: this.data.lane - w,
                    r: this.data.lane + w,
                    t: 2 * Math.abs(w) * scaledScreen.wToH,
                    b: 0,
                }).add(pos),
                z,
                1,
            )
        } else {
            const w = Math.clamp(this.data.size / 2, 1, 2)

            this.arrowSprites.fallback.draw(
                Quad.one
                    .rotate((Math.PI / 6) * this.flickData.direction)
                    .scale(w, w * scaledScreen.wToH)
                    .translate(this.data.lane, w * scaledScreen.wToH)
                    .add(pos),
                z,
                1,
            )
        }

        return { time, pos }
    }
}
