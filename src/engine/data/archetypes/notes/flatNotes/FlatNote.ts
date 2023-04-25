import { options } from '../../../../configuration/options.js'
import { particle } from '../../../particle.js'
import { lane, minSFXDistance, note } from '../../constants.js'
import { layer } from '../../layer.js'
import { SlotEffect } from '../../slotEffects/SlotEffect.js'
import { SlotGlowEffect } from '../../slotGlowEffects/SlotGlowEffect.js'
import {
    circularEffectLayout,
    getHitbox,
    getScheduleSFXTime,
    getZ,
    linearEffectLayout,
    perspectiveLayout,
} from '../../utils.js'
import { Note } from '../Note.js'

export abstract class FlatNote extends Note {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        fallback: SkinSprite
    }

    abstract clips:
        | EffectClip
        | {
              perfect: EffectClip
              great: EffectClip
              good: EffectClip
          }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract slotEffect: SlotEffect
    abstract slotGlowEffect: SlotGlowEffect

    abstract window: JudgmentWindows

    abstract bucket: Bucket

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

    inputTime = this.entityMemory({
        min: Number,
        max: Number,
    })

    spriteLayouts = this.entityMemory({
        left: Quad,
        middle: Quad,
        right: Quad,
    })
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: JudgmentWindow) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(this.window.perfect),
            great: toMs(this.window.great),
            good: toMs(this.window.good),
        })

        this.life.miss = -80
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
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - Note.duration * options.hidden

        this.inputTime.min = this.targetTime + this.window.good.min + input.offset
        this.inputTime.max = this.targetTime + this.window.good.max + input.offset

        const l = this.data.lane - this.data.size
        const r = this.data.lane + this.data.size

        getHitbox({ l, r, leniency: this.leniency }).copyTo(this.hitbox)

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSprites) {
            perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayouts.middle)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25

            perspectiveLayout({ l, r: ml, b, t }).copyTo(this.spriteLayouts.left)
            perspectiveLayout({ l: ml, r: mr, b, t }).copyTo(this.spriteLayouts.middle)
            perspectiveLayout({ l: mr, r, b, t }).copyTo(this.spriteLayouts.right)
        }

        this.z = getZ(layer.note.body, this.targetTime, this.data.lane)

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = this.window.good.max
        }
    }

    updateParallel() {
        if (options.autoplay && time.now >= this.targetTime) this.despawn = true
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled) this.scheduleSFX()

        if (time.scaled < this.visualTime.min) return
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.slotEffectEnabled) this.playSlotEffects(this.targetTime)
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists || !this.sprites.middle.exists || !this.sprites.right.exists
        )
    }

    scheduleSFX() {
        if ('perfect' in this.clips) {
            this.clips.perfect.schedule(this.targetTime, minSFXDistance)
        } else {
            this.clips.schedule(this.targetTime, minSFXDistance)
        }

        this.hasSFXScheduled = true
    }

    render() {
        this.y = Note.approach(this.visualTime.min, this.visualTime.max, time.scaled)

        if (this.useFallbackSprites) {
            this.sprites.fallback.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
        } else {
            this.sprites.left.draw(this.spriteLayouts.left.mul(this.y), this.z, 1)
            this.sprites.middle.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
            this.sprites.right.draw(this.spriteLayouts.right.mul(this.y), this.z, 1)
        }
    }

    playHitEffects(hitTime: number) {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.slotEffectEnabled) this.playSlotEffects(hitTime)
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playSFX() {
        if ('perfect' in this.clips) {
            if (this.result.judgment === Judgment.Perfect) {
                this.clips.perfect.play(minSFXDistance)
            } else if (this.result.judgment === Judgment.Great) {
                this.clips.great.play(minSFXDistance)
            } else if (this.result.judgment === Judgment.Good) {
                this.clips.good.play(minSFXDistance)
            }
        } else {
            this.clips.play(minSFXDistance)
        }
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        this.effects.linear.spawn(
            linearEffectLayout({
                lane: this.data.lane,
                shear: 0,
            }),
            0.5,
            false,
        )
    }

    playCircularNoteEffect() {
        this.effects.circular.spawn(
            circularEffectLayout({
                lane: this.data.lane,
                w: 1.75,
                h: 1.05,
            }),
            0.6,
            false,
        )
    }

    playSlotEffects(startTime: number) {
        const start = Math.floor(this.data.lane - this.data.size)
        const end = Math.ceil(this.data.lane + this.data.size)

        for (let i = start; i < end; i++) {
            this.slotEffect.spawn({
                startTime,
                lane: i + 0.5,
            })
        }

        this.slotGlowEffect.spawn({
            startTime,
            lane: this.data.lane,
            size: this.data.size,
        })
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
            perspectiveLayout({
                l: this.data.lane - this.data.size,
                r: this.data.lane + this.data.size,
                b: lane.b,
                t: lane.t,
            }),
            0.3,
            false,
        )
    }

    static approach(fromTime: number, toTime: number, now: number) {
        return 1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))
    }

    static get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    }
}