import { lane } from '../../../../../../../shared/src/engine/data/lane.mjs'
import { approach } from '../../../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { toBucketWindows, Windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../../configuration/options.mjs'
import { sfxDistance } from '../../../effect.mjs'
import { note } from '../../../note.mjs'
import { circularEffectLayout, linearEffectLayout, particle } from '../../../particle.mjs'
import { getZ, layer } from '../../../skin.mjs'
import { SlotEffect } from '../../slotEffects/SlotEffect.mjs'
import { SlotGlowEffect } from '../../slotGlowEffects/SlotGlowEffect.mjs'
import { Note } from '../Note.mjs'

export abstract class FlatNote extends Note {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        fallback: SkinSprite
    }

    abstract clips: {
        perfect: EffectClip
        great?: EffectClip
        good?: EffectClip
        fallback?: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        circularFallback?: ParticleEffect
        linear: ParticleEffect
        linearFallback?: ParticleEffect
    }

    abstract slotEffect: SlotEffect
    abstract slotGlowEffect: SlotGlowEffect

    abstract windows: Windows

    abstract bucket: Bucket

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    initialized = this.entityMemory(Boolean)

    spriteLayouts = this.entityMemory({
        left: Quad,
        middle: Quad,
        right: Quad,
    })
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -80
    }

    preprocess() {
        super.preprocess()

        this.visualTime.copyFrom(
            Range.l.mul(note.duration).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )

        this.sharedMemory.despawnTime = timeScaleChanges.at(this.hitTime).scaledTime

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }

        if (options.slotEffectEnabled && (!replay.isReplay || this.import.judgment)) {
            this.spawnSlotEffects(this.hitTime)
        }

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
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

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists || !this.sprites.middle.exists || !this.sprites.right.exists
        )
    }

    get useFallbackClip() {
        return (
            !this.clips.perfect.exists ||
            ('great' in this.clips && !this.clips.great.exists) ||
            ('good' in this.clips && !this.clips.good.exists)
        )
    }

    get circularEffectId() {
        return 'circularFallback' in this.effects && !this.effects.circular.exists
            ? this.effects.circularFallback.id
            : this.effects.circular.id
    }

    get linearEffectId() {
        return 'linearFallback' in this.effects && !this.effects.linear.exists
            ? this.effects.linearFallback.id
            : this.effects.linear.id
    }

    get hitTime() {
        return this.targetTime + (replay.isReplay ? this.import.accuracy : 0)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        const l = this.import.lane - this.import.size
        const r = this.import.lane + this.import.size

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSprites) {
            perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayouts.middle)
        } else {
            const ml = l + 0.3
            const mr = r - 0.3

            perspectiveLayout({ l, r: ml, b, t }).copyTo(this.spriteLayouts.left)
            perspectiveLayout({ l: ml, r: mr, b, t }).copyTo(this.spriteLayouts.middle)
            perspectiveLayout({ l: mr, r, b, t }).copyTo(this.spriteLayouts.right)
        }

        this.z = getZ(layer.note.body, this.targetTime, this.import.lane)
    }

    scheduleSFX() {
        if ('fallback' in this.clips && this.useFallbackClip) {
            this.clips.fallback.schedule(this.hitTime, sfxDistance)
        } else {
            this.clips.perfect.schedule(this.hitTime, sfxDistance)
        }
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        if ('fallback' in this.clips && this.useFallbackClip) {
            this.clips.fallback.schedule(this.hitTime, sfxDistance)
        } else if ('great' in this.clips && 'good' in this.clips) {
            switch (this.import.judgment) {
                case Judgment.Perfect:
                    this.clips.perfect.schedule(this.hitTime, sfxDistance)
                    break
                case Judgment.Great:
                    this.clips.great.schedule(this.hitTime, sfxDistance)
                    break
                case Judgment.Good:
                    this.clips.good.schedule(this.hitTime, sfxDistance)
                    break
            }
        } else {
            this.clips.perfect.schedule(this.hitTime, sfxDistance)
        }
    }

    render() {
        this.y = approach(this.visualTime.min, this.visualTime.max, time.scaled)

        if (this.useFallbackSprites) {
            this.sprites.fallback.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
        } else {
            this.sprites.left.draw(this.spriteLayouts.left.mul(this.y), this.z, 1)
            this.sprites.middle.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
            this.sprites.right.draw(this.spriteLayouts.right.mul(this.y), this.z, 1)
        }
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        particle.effects.spawn(
            this.linearEffectId,
            linearEffectLayout({
                lane: this.import.lane,
                shear: 0,
            }),
            0.5,
            false,
        )
    }

    playCircularNoteEffect() {
        particle.effects.spawn(
            this.circularEffectId,
            circularEffectLayout({
                lane: this.import.lane,
                w: 1.75,
                h: 1.05,
            }),
            0.6,
            false,
        )
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
            perspectiveLayout({
                l: this.import.lane - this.import.size,
                r: this.import.lane + this.import.size,
                b: lane.b,
                t: lane.t,
            }),
            0.3,
            false,
        )
    }

    spawnSlotEffects(startTime: number) {
        const start = Math.floor(this.import.lane - this.import.size)
        const end = Math.ceil(this.import.lane + this.import.size)

        for (let i = start; i < end; i++) {
            this.slotEffect.spawn({
                startTime,
                lane: i + 0.5,
            })
        }

        this.slotGlowEffect.spawn({
            startTime,
            lane: this.import.lane,
            size: this.import.size,
        })
    }
}
