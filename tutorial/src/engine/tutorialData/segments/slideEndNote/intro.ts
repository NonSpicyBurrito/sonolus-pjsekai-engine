import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const slideEndNoteIntro = {
    enter() {
        noteDisplay.showOverlay('slideEnd')
        connector.showOverlayOut()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
