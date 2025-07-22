import { noteDisplay } from '../../components/noteDisplay.js'
import { traceDiamond } from '../../components/traceDiamond.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const traceNoteFrozen = {
    enter() {
        traceDiamond.showFrozen('normal')
        noteDisplay.showFrozen('trace')

        instruction.texts.hold.show()
    },

    update() {
        drawHand(Math.PI / 3, 0, Math.unlerpClamped(1, 0.75, segment.time % 1))
    },

    exit() {
        traceDiamond.clear()
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
