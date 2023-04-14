import { options } from '../../../../../configuration/options.js'
import { minSFXDistance, note } from '../../../constants.js'
import { layer } from '../../../layer.js'
import { scaledScreen } from '../../../shared.js'
import { getScheduleSFXTime, getZ, perspectiveLayout } from '../../../utils.js'
import { Note } from '../../Note.js'
import { SlideTickNote } from '../SlideTickNote.js'

export abstract class VisibleSlideTickNote extends SlideTickNote {
    abstract sprites: {
        tick: SkinSprite
        fallback: SkinSprite
    }

    abstract clip: EffectClip

    abstract effect: ParticleEffect

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        this.life.miss = -40
    }

    preprocess() {
        super.preprocess()

        this.scheduleSFXTime = getScheduleSFXTime(this.targetTime)

        this.visualTime.max = timeScaleChanges.at(this.targetTime).scaledTime
        this.visualTime.min = this.visualTime.max - Note.duration

        this.spawnTime = Math.min(
            this.visualTime.min,
            timeScaleChanges.at(this.scheduleSFXTime).scaledTime,
        )
    }

    initialize() {
        super.initialize()

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - Note.duration * options.hidden

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSprite) {
            const l = this.data.lane - this.data.size
            const r = this.data.lane + this.data.size

            perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)
        } else {
            const w = note.h / scaledScreen.wToH

            new Rect({
                l: this.data.lane - w,
                r: this.data.lane + w,
                b,
                t,
            })
                .toQuad()
                .copyTo(this.spriteLayout)
        }

        this.z = getZ(layer.note.tick, this.targetTime, this.data.lane)
    }

    updateParallel() {
        super.updateParallel()
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled) this.scheduleSFX()

        if (time.scaled < this.visualTime.min) return
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    get useFallbackSprite() {
        return !this.sprites.tick.exists
    }

    scheduleSFX() {
        this.clip.schedule(this.targetTime, minSFXDistance)

        this.hasSFXScheduled = true
    }

    render() {
        this.y = Note.approach(this.visualTime.min, this.visualTime.max, time.scaled)

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
        this.clip.play(minSFXDistance)
    }

    playNoteEffect() {
        const w = 4
        const h = w * scaledScreen.wToH

        this.effect.spawn(
            new Rect({
                l: this.data.lane - w,
                r: this.data.lane + w,
                b: 1 + h,
                t: 1 - h,
            }),
            0.6,
            false,
        )
    }
}
