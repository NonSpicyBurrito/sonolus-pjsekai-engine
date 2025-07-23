import { SlideTickNote } from './SlideTickNote.js'
import { getAttached } from './utils.js'

export class HiddenSlideTickNote extends SlideTickNote {
    attachedSlideTickImport = this.defineImport({
        attachRef: { name: 'attach', type: Number },
    })

    preprocessOrder = 1
    preprocess() {
        super.preprocess()
        ;({ lane: this.import.lane, size: this.import.size } = getAttached(
            this.attachedSlideTickImport.attachRef,
            this.targetTime,
        ))
    }
}
