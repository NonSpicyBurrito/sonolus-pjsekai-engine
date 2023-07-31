import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { instruction } from '../../instruction.mjs'
import { segment } from '../../shared.mjs'
import { drawHand } from '../../utils.mjs'

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
