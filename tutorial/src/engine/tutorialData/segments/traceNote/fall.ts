import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'

export const traceNoteFall = {
    enter() {
        traceDiamond.showFall('normal')
        noteDisplay.showFall('trace')
    },

    exit() {
        traceDiamond.clear()
        noteDisplay.clear()
    },
}
