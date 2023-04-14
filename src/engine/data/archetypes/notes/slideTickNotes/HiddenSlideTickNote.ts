import { SlideTickNote } from './SlideTickNote.js'
import { getAttached } from './utils.js'

export class HiddenSlideTickNote extends SlideTickNote {
    attachedSlideTickData = this.defineData({
        attachRef: { name: 'attach', type: Number },
    })

    globalPreprocess() {
        this.life.miss = -40
    }

    preprocessOrder = 1
    preprocess() {
        super.preprocess()
        ;({ lane: this.data.lane, size: this.data.size } = getAttached(
            this.attachedSlideTickData.attachRef,
            this.targetTime,
        ))
    }
}
