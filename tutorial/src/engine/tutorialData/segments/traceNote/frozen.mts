import { noteDisplay } from '../../components/noteDisplay.mjs'
import { traceDiamond } from '../../components/traceDiamond.mjs'
import { drawHand, instruction } from '../../instruction.mjs'
import { segment } from '../../segment.mjs'

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
