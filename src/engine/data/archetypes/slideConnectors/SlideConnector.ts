import { options } from '../../../configuration/options.js'
import { effect } from '../../effect.js'
import { particle } from '../../particle.js'
import { disallowEmpty } from '../InputManager.js'
import { note } from '../constants.js'
import { layer } from '../layer.js'
import { Note } from '../notes/Note.js'
import { SlideStartNote } from '../notes/flatNotes/slideStartNotes/SlideStartNote.js'
import {
    circularEffectLayout,
    getHitbox,
    getScheduleSFXTime,
    getZ,
    linearEffectLayout,
    perspectiveLayout,
} from '../utils.js'
import { EaseType, ease } from './EaseType.js'

const VisualType = {
    Waiting: 0,
    NotActivated: 1,
    Activated: 2,
} as const

type VisualType = (typeof VisualType)[keyof typeof VisualType]

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        connector: {
            normal: SkinSprite
            active: SkinSprite
            fallback: SkinSprite
        }

        slide: {
            left: SkinSprite
            middle: SkinSprite
            right: SkinSprite
            fallback: SkinSprite
        }
    }

    abstract clip: EffectClip

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract slideStartNote: SlideStartNote

    leniency = 1

    data = this.defineData({
        startRef: { name: 'start', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
    })

    start = this.entityMemory({
        time: Number,
    })
    head = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        hidden: Number,
    })

    spawnTime = this.entityMemory(Number)

    hasSFXScheduled = this.entityMemory(Boolean)

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)
    effectInstanceIds = this.entityMemory({
        circular: ParticleEffectInstanceId,
        linear: ParticleEffectInstanceId,
    })

    connector = this.entityMemory({
        z: Number,
    })

    slide = this.entityMemory({
        z: Number,
    })

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime

        this.scheduleSFXTime = getScheduleSFXTime(this.head.time)

        this.visualTime.min = this.head.scaledTime - Note.duration

        this.spawnTime = Math.min(
            this.visualTime.min,
            timeScaleChanges.at(this.scheduleSFXTime).scaledTime,
        )
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.scaled >= this.spawnTime
    }

    initialize() {
        this.start.time = bpmChanges.at(this.startData.beat).time

        this.head.lane = this.headData.lane
        this.head.l = this.head.lane - this.headData.size
        this.head.r = this.head.lane + this.headData.size

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.lane = this.tailData.lane
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime
        this.tail.l = this.tail.lane - this.tailData.size
        this.tail.r = this.tail.lane + this.tailData.size

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - Note.duration * options.hidden

        this.connector.z = getZ(layer.note.connector, this.head.time, this.headData.lane)

        this.slide.z = getZ(layer.note.slide, this.head.time, this.headData.lane)
    }

    touchOrder = 1
    touch() {
        if (options.autoplay) return

        if (time.now < this.head.time) return

        const s = this.getScale(timeScaleChanges.at(time.now - input.offset).scaledTime)

        const hitbox = getHitbox({
            l: this.getL(s),
            r: this.getR(s),
            leniency: this.leniency,
        })

        for (const touch of touches) {
            if (!hitbox.contains(touch.position)) continue

            disallowEmpty(touch)

            this.startSharedMemory.lastActiveTime = time.now

            if (this.shouldPlaySFX && !this.sfxInstanceId) this.playSFX()

            if (this.shouldPlayCircularEffect && !this.effectInstanceIds.circular)
                this.spawnCircularEffect()

            if (this.shouldPlayLinearEffect && !this.effectInstanceIds.linear)
                this.spawnLinearEffect()
            return
        }

        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (this.shouldPlayCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldPlayLinearEffect && this.effectInstanceIds.linear) this.destroyLinearEffect()
    }

    updateParallel() {
        if (time.now >= this.tail.time) {
            this.despawn = true
            return
        }

        if (this.shouldScheduleSFX && !this.hasSFXScheduled) this.scheduleSFX()

        if (time.now < this.visualTime.min) return

        this.renderConnector()

        if (time.now < this.head.time) return

        if (this.shouldScheduleCircularEffect && !this.effectInstanceIds.circular)
            this.spawnCircularEffect()

        if (this.shouldScheduleLinearEffect && !this.effectInstanceIds.linear)
            this.spawnLinearEffect()

        if (this.effectInstanceIds.circular) this.updateCircularEffect()

        if (this.effectInstanceIds.linear) this.updateLinearEffect()

        this.renderSlide()
    }

    terminate() {
        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (
            (this.shouldScheduleCircularEffect || this.shouldPlayCircularEffect) &&
            this.effectInstanceIds.circular
        )
            this.destroyCircularEffect()

        if (
            (this.shouldScheduleLinearEffect || this.shouldPlayLinearEffect) &&
            this.effectInstanceIds.linear
        )
            this.destroyLinearEffect()
    }

    get startData() {
        return this.slideStartNote.data.get(this.data.startRef)
    }

    get startSharedMemory() {
        return this.slideStartNote.sharedMemory.get(this.data.startRef)
    }

    get headData() {
        return this.slideStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return this.slideStartNote.data.get(this.data.tailRef)
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && this.clip.exists && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && this.clip.exists && !options.autoplay && !options.autoSFX
    }

    get shouldScheduleCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists && options.autoplay
    }

    get shouldPlayCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists && !options.autoplay
    }

    get shouldScheduleLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists && options.autoplay
    }

    get shouldPlayLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists && !options.autoplay
    }

    get useFallbackConnectorSprites() {
        return !this.sprites.connector.normal.exists || !this.sprites.connector.active.exists
    }

    get useFallbackSlideSprites() {
        return (
            !this.sprites.slide.left.exists ||
            !this.sprites.slide.middle.exists ||
            !this.sprites.slide.right.exists
        )
    }

    scheduleSFX() {
        const id = this.clip.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)

        this.hasSFXScheduled = true
    }

    playSFX() {
        this.sfxInstanceId = this.clip.loop()
    }

    stopSFX() {
        effect.clips.stopLoop(this.sfxInstanceId)
        this.sfxInstanceId = 0
    }

    spawnCircularEffect() {
        this.effectInstanceIds.circular = this.effects.circular.spawn(new Quad(), 1, true)
    }

    updateCircularEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.circular,
            circularEffectLayout({
                lane,
                w: 3.5,
                h: 2.1,
            }),
        )
    }

    destroyCircularEffect() {
        particle.effects.destroy(this.effectInstanceIds.circular)
        this.effectInstanceIds.circular = 0
    }

    spawnLinearEffect() {
        this.effectInstanceIds.linear = this.effects.linear.spawn(new Quad(), 1, true)
    }

    updateLinearEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.linear,
            linearEffectLayout({
                lane,
                shear: 0,
            }),
        )
    }

    destroyLinearEffect() {
        particle.effects.destroy(this.effectInstanceIds.linear)
        this.effectInstanceIds.linear = 0
    }

    renderConnector() {
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        const visual = options.autoplay
            ? time.now >= this.start.time
                ? VisualType.Activated
                : VisualType.Waiting
            : this.startSharedMemory.lastActiveTime === time.now
            ? VisualType.Activated
            : time.now >= this.start.time + this.slideStartNote.windows.good.max + input.offset
            ? VisualType.NotActivated
            : VisualType.Waiting

        const hiddenDuration = options.hidden > 0 ? Note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.scaledTime, time.scaled + hiddenDuration),
            max: Math.min(this.tail.scaledTime, time.scaled + Note.duration),
        }

        for (let i = 0; i < 10; i++) {
            const scaledTime = {
                min: Math.lerp(visibleTime.min, visibleTime.max, i / 10),
                max: Math.lerp(visibleTime.min, visibleTime.max, (i + 1) / 10),
            }

            const s = {
                min: this.getScale(scaledTime.min),
                max: this.getScale(scaledTime.max),
            }

            const y = {
                min: Note.approach(scaledTime.min - Note.duration, scaledTime.min, time.scaled),
                max: Note.approach(scaledTime.max - Note.duration, scaledTime.max, time.scaled),
            }

            const layout = {
                x1: this.getL(s.min) * y.min,
                x2: this.getL(s.max) * y.max,
                x3: this.getR(s.max) * y.max,
                x4: this.getR(s.min) * y.min,
                y1: y.min,
                y2: y.max,
                y3: y.max,
                y4: y.min,
            }

            if (this.useFallbackConnectorSprites) {
                this.sprites.connector.fallback.draw(
                    layout,
                    this.connector.z,
                    visual === VisualType.NotActivated ? 0.5 : 1,
                )
            } else if (options.connectorAnimation && visual === VisualType.Activated) {
                const activeA = (Math.sin(time.now * 2 * Math.PI) + 1) / 2

                this.sprites.connector.active.draw(layout, this.connector.z, activeA)
                this.sprites.connector.normal.draw(layout, this.connector.z, 1 - activeA)
            } else {
                this.sprites.connector.normal.draw(
                    layout,
                    this.connector.z,
                    visual === VisualType.NotActivated ? 0.5 : 1,
                )
            }
        }
    }

    renderSlide() {
        const s = this.getScale(time.scaled)

        const l = this.getL(s)
        const r = this.getR(s)

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSlideSprites) {
            this.sprites.slide.fallback.draw(perspectiveLayout({ l, r, b, t }), this.slide.z, 1)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25

            this.sprites.slide.left.draw(perspectiveLayout({ l, r: ml, b, t }), this.slide.z, 1)
            this.sprites.slide.middle.draw(
                perspectiveLayout({ l: ml, r: mr, b, t }),
                this.slide.z,
                1,
            )
            this.sprites.slide.right.draw(perspectiveLayout({ l: mr, r, b, t }), this.slide.z, 1)
        }
    }

    getScale(scaledTime: number) {
        return this.ease(Math.unlerpClamped(this.head.scaledTime, this.tail.scaledTime, scaledTime))
    }

    ease(s: number) {
        return ease(this.data.ease, s)
    }

    getLane(scale: number) {
        return Math.lerp(this.head.lane, this.tail.lane, scale)
    }

    getL(scale: number) {
        return Math.lerp(this.head.l, this.tail.l, scale)
    }

    getR(scale: number) {
        return Math.lerp(this.head.r, this.tail.r, scale)
    }
}
