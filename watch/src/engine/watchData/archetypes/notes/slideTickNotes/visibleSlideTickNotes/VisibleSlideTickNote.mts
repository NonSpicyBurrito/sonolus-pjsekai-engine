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

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    initialized = this.entityMemory(Boolean)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    preprocess() {
        super.preprocess()

        this.visualTime.copyFrom(
            Range.l.mul(note.duration).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.scaled > this.hiddenTime) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    get useFallbackSprite() {
        return !this.sprites.tick.exists
    }

    get useFallbackClip() {
        return !this.clips.tick.exists
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

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

    scheduleSFX() {
        if (this.useFallbackClip) {
            this.clips.fallback.schedule(this.targetTime, sfxDistance)
        } else {
            this.clips.tick.schedule(this.targetTime, sfxDistance)
        }
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        this.scheduleSFX()
    }

    render() {
        const y = approach(this.visualTime.min, this.visualTime.max, time.scaled)

        if (this.useFallbackSprite) {
            this.sprites.fallback.draw(this.spriteLayout.mul(y), this.z, 1)
        } else {
            this.sprites.tick.draw(this.spriteLayout.mul(y), this.z, 1)
        }
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        this.effect.spawn(flatEffectLayout({ lane: this.import.lane }), 0.6, false)
    }
}
