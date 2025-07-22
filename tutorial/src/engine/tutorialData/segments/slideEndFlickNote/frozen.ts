import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const slideEndFlickNoteFrozen = {
    enter() {
        flickArrow.showFrozen()
        noteDisplay.showFrozen('flickEnd')

        instruction.texts.flick.show()
    },

    update() {
        drawHand(
            Math.PI / 3,
            Math.remapClamped(0.25, 0.75, 0, 0.5, segment.time % 1),
            Math.unlerpClamped(1, 0.75, segment.time % 1),
        )
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
