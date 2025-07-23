import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'

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
