import { connector } from '../../components/connector.js'
import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'

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
