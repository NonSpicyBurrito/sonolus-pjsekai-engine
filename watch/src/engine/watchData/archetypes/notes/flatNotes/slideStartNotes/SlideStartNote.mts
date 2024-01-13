import { FlatNote } from '../FlatNote.mjs'

export abstract class SlideStartNote extends FlatNote {
    render() {
        if (time.scaled > this.visualTime.max) return

        super.render()
    }
}
