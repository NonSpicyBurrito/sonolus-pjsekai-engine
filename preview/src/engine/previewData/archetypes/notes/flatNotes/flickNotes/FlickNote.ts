import { FlickDirection } from '../../../../../../../../shared/src/engine/data/FlickDirection.js'
import { getArrowSpriteId } from '../../../../../../../../shared/src/engine/data/arrowSprites.js'
import { options } from '../../../../../configuration/options.js'
import { scaledScreen } from '../../../../scaledScreen.js'
import { getZ, layer, skin } from '../../../../skin.js'
import { FlatNote } from '../FlatNote.js'

export abstract class FlickNote extends FlatNote {
    abstract arrowSprites: {
        up: SkinSprite[]
        left: SkinSprite[]
        fallback: SkinSprite
    }

    flickImport = this.defineImport({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickImport.direction *= -1
    }

    render() {
        const { time, pos } = super.render()

        const z = getZ(layer.note.arrow, time, this.import.lane)

        const arrowSpriteId = getArrowSpriteId(
            this.arrowSprites,
            this.import.size,
            this.flickImport.direction,
        )

        if (skin.sprites.exists(arrowSpriteId)) {
            const w = (Math.clamp(this.import.size, 0, 3) * (-this.flickImport.direction || 1)) / 2

            skin.sprites.draw(
                arrowSpriteId,
                new Rect({
                    l: this.import.lane - w,
                    r: this.import.lane + w,
                    t: 2 * Math.abs(w) * scaledScreen.wToH,
                    b: 0,
                }).add(pos),
                z,
                1,
            )
        } else {
            const w = Math.clamp(this.import.size / 2, 1, 2)

            this.arrowSprites.fallback.draw(
                Quad.one
                    .rotate((Math.PI / 6) * this.flickImport.direction)
                    .scale(w, w * scaledScreen.wToH)
                    .translate(this.import.lane, w * scaledScreen.wToH)
                    .add(pos),
                z,
                1,
            )
        }

        return { time, pos }
    }
}
