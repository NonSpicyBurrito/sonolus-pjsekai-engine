import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { traceDiamond } from '../../components/traceDiamond.mjs'

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
