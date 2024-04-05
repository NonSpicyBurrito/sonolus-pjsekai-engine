import { getHitbox } from '../../../lane.mjs'
import { disallowEmpty } from '../../InputManager.mjs'
import { Note } from '../Note.mjs'

export abstract class SlideTickNote extends Note {
    leniency = 1

    inputTime = this.entityMemory(Number)

    globalPreprocess() {
        if (this.hasInput) this.life.miss = -40
    }

    preprocess() {
        super.preprocess()

        this.inputTime = this.targetTime + input.offset

        this.spawnTime = timeScaleChanges.at(this.inputTime).scaledTime
    }

    initialize() {
        getHitbox({
            l: this.import.lane - this.import.size,
            r: this.import.lane + this.import.size,
            leniency: this.leniency,
        }).copyTo(this.fullHitbox)

        this.result.accuracy = 0.125
    }

    touch() {
        if (time.now < this.inputTime) return

        for (const touch of touches) {
            if (!this.fullHitbox.contains(touch.position)) continue

            this.complete(touch)
            return
        }
    }

    updateParallel() {
        if (time.now > this.inputTime) this.despawn = true
    }

    complete(touch: Touch) {
        disallowEmpty(touch)

        this.result.judgment = Judgment.Perfect
        this.result.accuracy = 0

        this.playHitEffects()

        this.despawn = true
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    playHitEffects() {}
}
