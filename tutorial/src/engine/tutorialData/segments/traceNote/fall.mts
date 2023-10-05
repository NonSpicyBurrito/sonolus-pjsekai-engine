import { noteDisplay } from '../../components/noteDisplay.mjs'
import { traceDiamond } from '../../components/traceDiamond.mjs'

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
