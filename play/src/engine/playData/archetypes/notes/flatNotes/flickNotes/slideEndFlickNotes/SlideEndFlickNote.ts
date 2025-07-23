import { ease } from '../../../../../../../../../shared/src/engine/data/EaseType.js'
import { minFlickVR } from '../../../../../flick.js'
import { getHitbox } from '../../../../../lane.js'
import { archetypes } from '../../../../index.js'
import { FlickNote } from '../FlickNote.js'

export abstract class SlideEndFlickNote extends FlickNote {
    slideEndFlickImport = this.defineImport({
        slideRef: { name: 'slide', type: Number },
    })

    earlyInputTime = this.entityMemory(Number)

    head = this.entityMemory({
        time: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })

    initialize() {
        super.initialize()

        this.earlyInputTime = this.targetTime + input.offset

        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime
        this.head.l = this.headImport.lane - this.headImport.size
        this.head.r = this.headImport.lane + this.headImport.size

        this.tail.time = bpmChanges.at(this.tailImport.beat).time
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime
        this.tail.l = this.tailImport.lane - this.tailImport.size
        this.tail.r = this.tailImport.lane + this.tailImport.size
    }

    touch() {
        if (time.now < this.inputTime.min) return

        if (this.startInfo.state === EntityState.Active) return

        if (time.now < this.earlyInputTime) {
            this.earlyTouch()
        } else {
            this.lateTouch()
        }
    }

    get slideImport() {
        return archetypes.NormalSlideConnector.import.get(this.slideEndFlickImport.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideImport.startRef)
    }

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideImport.startRef)
    }

    get headImport() {
        return archetypes.NormalSlideStartNote.import.get(this.slideImport.headRef)
    }

    get tailImport() {
        return archetypes.NormalSlideStartNote.import.get(this.slideImport.tailRef)
    }

    earlyTouch() {
        if (this.startSharedMemory.lastActiveTime === time.now) return

        const s = ease(
            this.slideImport.ease,
            Math.unlerpClamped(
                this.head.scaledTime,
                this.tail.scaledTime,
                timeScaleChanges.at(time.now - input.offset).scaledTime,
            ),
        )

        const hitbox = getHitbox({
            l: Math.lerp(this.head.l, this.tail.l, s),
            r: Math.lerp(this.head.r, this.tail.r, s),
            leniency: this.leniency,
        })

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!hitbox.contains(touch.lastPosition)) continue
            if (!touch.ended && hitbox.contains(touch.position)) continue

            this.complete(touch)
            return
        }
    }

    lateTouch() {
        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }
}
