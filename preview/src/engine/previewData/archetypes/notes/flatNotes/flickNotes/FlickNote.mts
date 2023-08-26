import { FlickDirection } from '../../../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { options } from '../../../../../configuration/options.mjs'
import { panel } from '../../../../panel.mjs'
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
        super.render()

        const time = bpmChanges.at(this.data.beat).time

        const position = panel.positionFromTime(time)
        const z = getZ(layer.note.arrow, time, this.data.lane)

        const arrowSpriteId = this.getArrowSpriteId()

        if (skin.sprites.exists(arrowSpriteId)) {
            const w = (Math.clamp(this.data.size, 0, 3) * (-this.flickData.direction || 1)) / 2

            skin.sprites.draw(
                arrowSpriteId,
                new Rect({
                    l: this.data.lane - w,
                    r: this.data.lane + w,
                    t: 2 * Math.abs(w) * scaledScreen.wToH,
                    b: 0,
                }).add(position),
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
                    .add(position),
                z,
                1,
            )
        }
    }

    getArrowSpriteId() {
        const size = Math.clamp(Math.round(this.data.size * 2), 1, 6)
        if (size === 1) {
            return this.flickData.direction
                ? this.arrowSprites.left[0].id
                : this.arrowSprites.up[0].id
        } else if (size === 2) {
            return this.flickData.direction
                ? this.arrowSprites.left[1].id
                : this.arrowSprites.up[1].id
        } else if (size === 3) {
            return this.flickData.direction
                ? this.arrowSprites.left[2].id
                : this.arrowSprites.up[2].id
        } else if (size === 4) {
            return this.flickData.direction
                ? this.arrowSprites.left[3].id
                : this.arrowSprites.up[3].id
        } else if (size === 5) {
            return this.flickData.direction
                ? this.arrowSprites.left[4].id
                : this.arrowSprites.up[4].id
        } else {
            return this.flickData.direction
                ? this.arrowSprites.left[5].id
                : this.arrowSprites.up[5].id
        }
    }
}
