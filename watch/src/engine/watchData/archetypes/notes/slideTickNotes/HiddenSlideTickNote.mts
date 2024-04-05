import { SlideTickNote } from './SlideTickNote.mjs'
import { getAttached } from './utils.mjs'

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
