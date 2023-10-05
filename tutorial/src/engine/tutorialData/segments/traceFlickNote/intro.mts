import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { traceDiamond } from '../../components/traceDiamond.mjs'

export const traceFlickNoteIntro = {
    enter() {
        flickArrow.showOverlay()
        traceDiamond.showOverlay('flick')
        noteDisplay.showOverlay('traceFlick')
    },

    exit() {
        flickArrow.clear()
        traceDiamond.clear()
        noteDisplay.clear()
    },
}
