import { getAttached } from '../../utils.mjs'
import { VisibleSlideTickNote } from '../VisibleSlideTickNote.mjs'

export abstract class AttachedSlideTickNote extends VisibleSlideTickNote {
    attachedSlideTickData = this.defineData({
        attachRef: { name: 'attach', type: Number },
    })

    preprocessOrder = 1
    preprocess() {
        super.preprocess()
        ;({ lane: this.data.lane, size: this.data.size } = getAttached(
            this.attachedSlideTickData.attachRef,
            this.targetTime,
        ))
    }
}
