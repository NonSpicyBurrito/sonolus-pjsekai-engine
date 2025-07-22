import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const traceFlickNoteFrozen = {
    enter() {
        flickArrow.showFrozen()
        traceDiamond.showFrozen('flick')
        noteDisplay.showFrozen('traceFlick')

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
        traceDiamond.clear()
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
