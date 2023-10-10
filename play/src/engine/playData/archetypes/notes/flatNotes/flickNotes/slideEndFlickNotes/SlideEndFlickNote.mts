import { ease } from '../../../../../../../../../shared/src/engine/data/EaseType.mjs'
import { options } from '../../../../../../configuration/options.mjs'
import { minFlickVR } from '../../../../../flick.mjs'
import { getHitbox } from '../../../../../lane.mjs'
import { archetypes } from '../../../../index.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class SlideEndFlickNote extends FlickNote {
    slideEndFlickData = this.defineData({
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

        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime
        this.head.l = this.headData.lane - this.headData.size
        this.head.r = this.headData.lane + this.headData.size

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime
        this.tail.l = this.tailData.lane - this.tailData.size
        this.tail.r = this.tailData.lane + this.tailData.size
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (this.startInfo.state === EntityState.Active) return

        if (time.now < this.earlyInputTime) {
            this.earlyTouch()
        } else {
            this.lateTouch()
        }
    }

    get slideData() {
        return archetypes.NormalSlideConnector.data.get(this.slideEndFlickData.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideData.startRef)
    }

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideData.startRef)
    }

    get headData() {
        return archetypes.NormalSlideStartNote.data.get(this.slideData.headRef)
    }

    get tailData() {
        return archetypes.NormalSlideStartNote.data.get(this.slideData.tailRef)
    }

    earlyTouch() {
        if (this.startSharedMemory.lastActiveTime === time.now) return

        const s = ease(
            this.slideData.ease,
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
