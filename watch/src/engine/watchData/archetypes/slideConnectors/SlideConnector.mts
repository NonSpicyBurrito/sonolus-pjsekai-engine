import { EaseType, ease } from '../../../../../../shared/src/engine/data/EaseType.mjs'
import { approach } from '../../../../../../shared/src/engine/data/note.mjs'
import { options } from '../../../configuration/options.mjs'
import { note } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'
import { FlatNote } from '../notes/flatNotes/FlatNote.mjs'

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        normal: SkinSprite
        active: SkinSprite
        fallback: SkinSprite
    }

    abstract slideStartNote: FlatNote

    data = this.defineData({
        startRef: { name: 'start', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
    })

    initialized = this.entityMemory(Boolean)

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

    visualTime = this.entityMemory({
        min: Number,
        hidden: Number,
    })

    z = this.entityMemory(Number)

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime

        this.visualTime.min = this.head.scaledTime - note.duration
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.tail.scaledTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        this.renderConnector()
    }

    get startData() {
        return this.slideStartNote.data.get(this.data.startRef)
    }

    get headData() {
        return this.slideStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return this.slideStartNote.data.get(this.data.tailRef)
    }

    get useFallbackSprite() {
        return !this.sprites.normal.exists || !this.sprites.active.exists
    }

    globalInitialize() {
        this.start.time = bpmChanges.at(this.startData.beat).time

        this.head.lane = this.headData.lane
        this.head.l = this.head.lane - this.headData.size
        this.head.r = this.head.lane + this.headData.size

        this.tail.lane = this.tailData.lane
        this.tail.l = this.tail.lane - this.tailData.size
        this.tail.r = this.tail.lane + this.tailData.size

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - note.duration * options.hidden

        this.z = getZ(layer.note.connector, this.start.time, this.startData.lane)
    }

    renderConnector() {
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        const isActivated = time.now >= this.start.time

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.scaledTime, time.scaled + hiddenDuration),
            max: Math.min(this.tail.scaledTime, time.scaled + note.duration),
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
                min: approach(scaledTime.min - note.duration, scaledTime.min, time.scaled),
                max: approach(scaledTime.max - note.duration, scaledTime.max, time.scaled),
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

            const a = this.getAlpha(this.head.scaledTime, this.tail.scaledTime, scaledTime.min)

            if (this.useFallbackSprite) {
                this.sprites.fallback.draw(layout, this.z, a)
            } else if (options.connectorAnimation && isActivated) {
                const normalA = (Math.cos((time.now - this.start.time) * 2 * Math.PI) + 1) / 2

                this.sprites.normal.draw(layout, this.z, a * normalA)
                this.sprites.active.draw(layout, this.z, a * (1 - normalA))
            } else {
                this.sprites.normal.draw(layout, this.z, a)
            }
        }
    }

    getAlpha(a: number, b: number, x: number) {
        return Math.remap(a, b, 0.575, 0.075, x)
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
