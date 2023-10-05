import { noteDisplay } from '../../components/noteDisplay.mjs'
import { traceDiamond } from '../../components/traceDiamond.mjs'

export const traceNoteIntro = {
    enter() {
        traceDiamond.showOverlay('normal')
        noteDisplay.showOverlay('trace')
    },

    exit() {
        traceDiamond.clear()
        noteDisplay.clear()
    },
}
