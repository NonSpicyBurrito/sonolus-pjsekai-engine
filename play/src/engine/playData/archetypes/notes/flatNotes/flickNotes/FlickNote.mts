import { FlickDirection } from '../../../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { getArrowSpriteId } from '../../../../../../../../shared/src/engine/data/arrowSprites.mjs'
import { options } from '../../../../../configuration/options.mjs'
import { linearEffectLayout } from '../../../../particle.mjs'
import { scaledScreen } from '../../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../../skin.mjs'
import { FlatNote } from '../FlatNote.mjs'

export abstract class FlickNote extends FlatNote {
    leniency = 1

    abstract arrowSprites: {
        up: SkinSprite[]
        left: SkinSprite[]
        fallback: SkinSprite
    }

    abstract directionalEffect: ParticleEffect

    flickImport = this.defineImport({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    arrow = this.entityMemory({
        sprite: SkinSpriteId,
        layout: Quad,
        animation: Vec,
        z: Number,
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickImport.direction *= -1
    }

    initialize() {
        super.initialize()

        this.arrow.sprite = getArrowSpriteId(
            this.arrowSprites,
            this.import.size,
            this.flickImport.direction,
        )

        if (skin.sprites.exists(this.arrow.sprite)) {
            const w = (Math.clamp(this.import.size, 0, 3) * (-this.flickImport.direction || 1)) / 2

            new Rect({
                l: this.import.lane - w,
                r: this.import.lane + w,
                b: 1,
                t: 1 - 2 * Math.abs(w) * scaledScreen.wToH,
            })
                .toQuad()
                .copyTo(this.arrow.layout)
        } else {
            this.arrow.sprite = this.arrowSprites.fallback.id

            const w = Math.clamp(this.import.size / 2, 1, 2)

            new Rect({ l: -1, r: 1, b: 1, t: -1 })
                .toQuad()
                .rotate((Math.PI / 6) * this.flickImport.direction)
                .scale(w, w * scaledScreen.wToH)
                .translate(this.import.lane, 1 - w * scaledScreen.wToH)
                .copyTo(this.arrow.layout)
        }

        if (options.markerAnimation)
            new Vec(this.flickImport.direction, -2 * scaledScreen.wToH).copyTo(this.arrow.animation)

        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.import.lane)
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.time, this.targetTime, this.windows)
        this.result.accuracy = touch.time - this.targetTime

        if (!this.isCorrectDirection(touch)) {
            if (this.result.judgment === Judgment.Perfect) this.result.judgment = Judgment.Great

            if (this.result.accuracy < this.windows.perfect.max)
                this.result.accuracy = this.windows.perfect.max
        }

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.time)

        this.despawn = true
    }

    render() {
        super.render()

        if (options.markerAnimation) {
            const s = Math.mod(time.now, 0.5) / 0.5

            skin.sprites.draw(
                this.arrow.sprite,
                this.arrow.layout.add(this.arrow.animation.mul(s)).mul(this.y),
                this.arrow.z,
                1 - Math.ease('In', 'Cubic', s),
            )
        } else {
            skin.sprites.draw(this.arrow.sprite, this.arrow.layout.mul(this.y), this.arrow.z, 1)
        }
    }

    playNoteEffects() {
        super.playNoteEffects()

        this.playDirectionalNoteEffect()
    }

    playDirectionalNoteEffect() {
        this.directionalEffect.spawn(
            linearEffectLayout({
                lane: this.import.lane,
                shear: this.flickImport.direction,
            }),
            0.32,
            false,
        )
    }

    isCorrectDirection(touch: Touch) {
        if (this.flickImport.direction === FlickDirection.Up) return true

        const a = Math.PI / 2 - this.flickImport.direction
        return touch.dx * Math.cos(a) + touch.dy * Math.sin(a) > 0
    }
}
