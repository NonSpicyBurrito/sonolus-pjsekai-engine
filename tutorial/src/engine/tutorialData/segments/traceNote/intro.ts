import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'

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
