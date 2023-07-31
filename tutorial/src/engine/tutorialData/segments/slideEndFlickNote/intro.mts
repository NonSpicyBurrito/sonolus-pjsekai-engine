import { connector } from '../../components/connector.mjs'
import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const slideEndFlickNoteIntro = {
    enter() {
        flickArrow.showOverlay()
        noteDisplay.showOverlay('flickEnd')
        connector.showOverlayOut()
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()
        connector.clear()
    },
}
