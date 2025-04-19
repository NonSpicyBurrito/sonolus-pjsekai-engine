import { EaseType, ease } from '../../../../../../shared/src/engine/data/EaseType.mjs'
import { approach } from '../../../../../../shared/src/engine/data/note.mjs'
import {
    slideConnectorReplayImport,
    slideConnectorReplayKeys,
} from '../../../../../../shared/src/engine/data/slideConnector.mjs'
import { options } from '../../../configuration/options.mjs'
import { getHitbox } from '../../lane.mjs'
import { note } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'
import { disallowEmpty } from '../InputManager.mjs'
import { SlideStartNote } from '../notes/flatNotes/slideStartNotes/SlideStartNote.mjs'

export enum VisualType {
    Waiting = 0,
    NotActivated = 1,
    Activated = 2,
}

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        normal: SkinSprite
        active: SkinSprite
        fallback: SkinSprite
    }

    abstract slideStartNote: SlideStartNote

    leniency = 1

    import = this.defineImport({
        startRef: { name: 'start', type: Number },
        endRef: { name: 'end', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
    })

    export = this.defineExport(slideConnectorReplayImport)

    start = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })
    end = this.entityMemory({
        time: Number,
        scaledTime: Number,
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
    })
    hiddenTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    z = this.entityMemory(Number)

    visual = this.entityMemory(DataType<VisualType>)

    exportIndex = this.entityMemory(Number)
    exportStartTime = this.entityMemory(Number)

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime

        this.tail.time = bpmChanges.at(this.tailImport.beat).time
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime

        this.visualTime.min = this.head.scaledTime - note.duration

        this.spawnTime = this.visualTime.min
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.scaled >= this.spawnTime
    }

    initialize() {
        this.start.time = bpmChanges.at(this.startImport.beat).time
        this.start.scaledTime = timeScaleChanges.at(this.start.time).scaledTime

        this.end.time = bpmChanges.at(this.endImport.beat).time
        this.end.scaledTime = timeScaleChanges.at(this.end.time).scaledTime

        this.head.lane = this.headImport.lane
        this.head.l = this.head.lane - this.headImport.size
        this.head.r = this.head.lane + this.headImport.size

        this.tail.lane = this.tailImport.lane
        this.tail.l = this.tail.lane - this.tailImport.size
        this.tail.r = this.tail.lane + this.tailImport.size

        if (options.hidden > 0)
            this.hiddenTime = this.tail.scaledTime - note.duration * options.hidden

        this.z = getZ(layer.note.connector, this.start.time, this.startImport.lane)

        this.exportStartTime = -1000
    }

    updateSequentialOrder = 1
    updateSequential() {
        if (time.now < this.head.time) return

        const s = this.getScale(timeScaleChanges.at(time.now - input.offset).scaledTime)

        const hitbox = getHitbox({
            l: this.getL(s),
            r: this.getR(s),
            leniency: this.leniency,
        })

        for (const touch of touches) {
            if (touch.ended) continue
            if (!hitbox.contains(touch.position)) continue

            disallowEmpty(touch)

            this.onActivate()
        }

        if (this.startSharedMemory.lastActiveTime === time.now) return

        this.onDeactivate()
    }

    updateParallel() {
        this.updateExport()

        if (time.now >= this.tail.time) {
            this.despawn = true
            return
        }

        if (time.scaled < this.visualTime.min) return

        this.updateVisualType()

        this.renderConnector()
    }

    get startImport() {
        return this.slideStartNote.import.get(this.import.startRef)
    }

    get startSharedMemory() {
        return this.slideStartNote.sharedMemory.get(this.import.startRef)
    }

    get endImport() {
        return this.slideStartNote.import.get(this.import.endRef)
    }

    get headImport() {
        return this.slideStartNote.import.get(this.import.headRef)
    }

    get tailImport() {
        return this.slideStartNote.import.get(this.import.tailRef)
    }

    get useFallbackSprite() {
        return !this.sprites.normal.exists || !this.sprites.active.exists
    }

    onActivate() {
        this.startSharedMemory.lastActiveTime = time.now
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDeactivate() {}

    updateExport() {
        if (this.exportStartTime === -1000) {
            if (this.startSharedMemory.lastActiveTime !== time.now) return

            this.exportStartTime = time.now
        } else {
            if (this.startSharedMemory.lastActiveTime === time.now && time.now < this.tail.time)
                return

            for (const [i, start, end] of slideConnectorReplayKeys) {
                if (i !== this.exportIndex) continue

                this.export(start, this.exportStartTime)
                this.export(end, time.now)
            }

            this.exportIndex++
            this.exportStartTime = -1000
        }
    }

    updateVisualType() {
        this.visual =
            this.startSharedMemory.lastActiveTime === time.now
                ? VisualType.Activated
                : time.now >= this.start.time + this.slideStartNote.windows.good.max + input.offset
                  ? VisualType.NotActivated
                  : VisualType.Waiting
    }

    renderConnector() {
        if (options.hidden > 0 && time.scaled > this.hiddenTime) return

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

            const a =
                this.getAlpha(this.start.scaledTime, this.end.scaledTime, scaledTime.min) *
                options.connectorAlpha

            if (this.useFallbackSprite) {
                this.sprites.fallback.draw(layout, this.z, a)
            } else if (options.connectorAnimation && this.visual === VisualType.Activated) {
                const normalA = (Math.cos((time.now - this.start.time) * 2 * Math.PI) + 1) / 2

                this.sprites.normal.draw(layout, this.z, a * (0.7 + 0.3 * normalA))
                this.sprites.active.draw(layout, this.z, a * (1 - normalA) * 0.3)
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
        return ease(this.import.ease, s)
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
