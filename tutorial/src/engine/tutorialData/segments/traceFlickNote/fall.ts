import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'

export const traceFlickNoteFall = {
    enter() {
        flickArrow.showFall()
        traceDiamond.showFall('flick')
        noteDisplay.showFall('traceFlick')
    },

    exit() {
        flickArrow.clear()
        traceDiamond.clear()
        noteDisplay.clear()
    },
}
