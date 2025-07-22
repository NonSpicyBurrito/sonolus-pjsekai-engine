import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const flickNoteFall = {
    enter() {
        flickArrow.showFall()
        noteDisplay.showFall('flick')
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()
    },
}
