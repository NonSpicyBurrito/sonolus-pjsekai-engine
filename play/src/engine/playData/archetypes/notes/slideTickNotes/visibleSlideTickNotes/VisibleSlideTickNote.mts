import { approach } from '../../../../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../../configuration/options.mjs'
import { sfxDistance } from '../../../../effect.mjs'
import { note } from '../../../../note.mjs'
import { flatEffectLayout } from '../../../../particle.mjs'
import { scaledScreen } from '../../../../scaledScreen.mjs'
import { getZ, layer } from '../../../../skin.mjs'
import { SlideTickNote } from '../SlideTickNote.mjs'

export abstract class VisibleSlideTickNote extends SlideTickNote {
    abstract sprites: {
        tick: SkinSprite
        fallback: SkinSprite
    }

    abstract clips: {
        tick: EffectClip
        fallback: EffectClip
    }

    abstract effect: ParticleEffect

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    preprocess() {
        super.preprocess()

        this.visualTime.max = timeScaleChanges.at(this.targetTime).scaledTime
        this.visualTime.min = this.visualTime.max - note.duration

        this.spawnTime = this.visualTime.min

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    initialize() {
        super.initialize()

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSprite) {
            const l = this.import.lane - this.import.size
            const r = this.import.lane + this.import.size

            perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)
        } else {
            const w = note.h / scaledScreen.wToH

            new Rect({
                l: this.import.lane - w,
                r: this.import.lane + w,
                b,
                t,
            })
                .toQuad()
                .copyTo(this.spriteLayout)
        }

        this.z = getZ(layer.note.tick, this.targetTime, this.import.lane)
    }

    updateParallel() {
        super.updateParallel()
        if (this.despawn) return

        if (time.scaled < this.visualTime.min) return
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
    }

    get useFallbackSprite() {
        return !this.sprites.tick.exists
    }

    get useFallbackClip() {
        return !this.clips.tick.exists
    }

    scheduleSFX() {
        if (this.useFallbackClip) {
            this.clips.fallback.schedule(this.targetTime, sfxDistance)
        } else {
            this.clips.tick.schedule(this.targetTime, sfxDistance)
        }
    }

    render() {
        if (time.now >= this.targetTime) return

        this.y = approach(this.visualTime.min, this.visualTime.max, time.scaled)

        if (this.useFallbackSprite) {
            this.sprites.fallback.draw(this.spriteLayout.mul(this.y), this.z, 1)
        } else {
            this.sprites.tick.draw(this.spriteLayout.mul(this.y), this.z, 1)
        }
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playSFX() {
        if (this.useFallbackClip) {
            this.clips.fallback.play(sfxDistance)
        } else {
            this.clips.tick.play(sfxDistance)
        }
    }

    playNoteEffect() {
        this.effect.spawn(flatEffectLayout({ lane: this.import.lane }), 0.6, false)
    }
}
