import { FlatNote } from '../FlatNote.mjs'

export abstract class SlideStartNote extends FlatNote {
    abstract windows: JudgmentWindows

    render() {
        if (time.scaled > this.visualTime.max) return

        super.render()
    }
}
